import React, { Suspense } from "react";
import { list } from "@vercel/blob";
import XLSX from "xlsx";
import { fetchAllProperties } from "@/lib/actions";
import ImportTable from "@/components/import-table";
import Upload, { UploadProps } from "antd/es/upload";
import message from "antd/es/message";
import MenuDashboard from "@/components/menu-dashboard";

let latestXlsxURL: string="";

const props: UploadProps = {
  name: 'file',
  action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
  maxCount: 1,
  listType: "picture",
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    console.log(info);

    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      console.log("error failed");
      extractNewProperties();
    }
  },
};

const propertiesColumns = [
  'xx',
  'id',
  'auction_date',
  'city',
  'address',
  'reserve_price',
  'size',
  'type',
  'tenure'
];

// Define the type for the sub-arrays based on the column names
type xlsxProperties = {
  xx: string,
  id: string,
  auction_date: string,
  city: string,
  address: string,
  reserve_price: number,
  size: number,
  type: string,
  tenure: string
};

type properties = {
  title: string,
  auction_date: string,
  city: string,
  address: string,
  reserve_price: number,
  estimate_price?: number | null,
  extra_info?: string | null,
  size: number,
  type: string,
  tenure: string,
  indicator: "new" | "update" | "close" | "same"
};

function deepDiff(newObj: any, oldObj: any): any {
  const diff: any = {};

  for (const key of Object.keys(newObj)) {
    if (key !== "indicator") { // Skip the "indicator" field
      if (newObj[key] !== oldObj[key]) {
        diff[key] = oldObj[key];//{ newObj: newObj[key], oldObj: oldObj[key] };
      }
    }
  }

  return Object.keys(diff).length > 0 ? diff : null;
}

async function extractNewProperties(): Promise<{ [key: string]: properties }> {

  const { blobs } = await list({ prefix: 'auction_listing/' });

  latestXlsxURL = blobs.sort((a,b) => (new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()))[0].url;

  const data = await (await fetch(latestXlsxURL)).arrayBuffer();

  const workbook = XLSX.read(data);

  const worksheet = workbook.Sheets[workbook.SheetNames[0]];

  let fetchProperties: xlsxProperties[] = XLSX.utils.sheet_to_json(worksheet, { header: propertiesColumns });

  let sliceProperties = fetchProperties.slice(3).map(({ xx, ...propertiesNoHeader }) => propertiesNoHeader);

  const retProperties = sliceProperties.reduce((tmpProperties, { id, address, size, ...property }) => {

    const [actualAddress, extra_info] = address.split('\n');
    let actualEstimatePrice = null;
    let actualExtraInfo = null;
    let actualTitle = null;
    let actualSize = 0;

    if(isNaN(Number(size))){

      if(size.toString().trim().toLowerCase().endsWith("acres"))
      {
        actualSize = Math.round(parseFloat(size.toString().trim().toLowerCase().replace("acres","").trim()) * 43560);
      }else if(size.toString().trim().toLowerCase().endsWith("acre"))
      {
        actualSize = Math.round(parseFloat(size.toString().trim().toLowerCase().replace("acre","").trim()) * 43560);
      }else{
        actualSize = 0;
      }
    }else{
      actualSize = size;
    }

    actualExtraInfo = extra_info;

    actualTitle = actualAddress.split(',')[0];

    if (extra_info != null && (extra_info.toLowerCase().startsWith("estimated market price:") || extra_info.toLowerCase().startsWith("estimated market value:"))) {
      let tmpEstimatePrice = extra_info.toLowerCase().replace("estimated market price:", "").replace("estimated market value:", "").trim();
      if (tmpEstimatePrice.toLowerCase().endsWith("k")) {
        actualEstimatePrice = Number.parseFloat(tmpEstimatePrice.replace("k", "")) * 1000;
        actualExtraInfo = null;
      } else if (tmpEstimatePrice.toLowerCase().endsWith("mil")) {
        actualEstimatePrice = Number.parseFloat(tmpEstimatePrice.replace("mil", "")) * 1000000;
        actualExtraInfo = null;
      } else {
        actualEstimatePrice = null;
      }
    }

    tmpProperties[id] = {
      ...property,
      title: actualTitle,
      address: actualAddress,
      size: actualSize,
      estimate_price: actualEstimatePrice || null,
      extra_info: actualExtraInfo || null,
      indicator: "same"
    };

    return tmpProperties;
  }, {} as { [key: string]: properties });


  return retProperties;
}

async function extractDBProperties(): Promise<{ [key: string]: properties }> {

  const { totalProperties, properties: fetchProperties } = await fetchAllProperties();

  const retProperties = fetchProperties.reduce((tmpProperties, { id, ...tmpProperty }) => {

    tmpProperties[id] = {
      ...tmpProperty,
      indicator: "close",
    }

    return tmpProperties;
  }, {} as { [key: string]: properties });

  return retProperties;
}


export default async function CheckPage() {
  
  const sheetProperties = await extractNewProperties() || null;
  const dbProperties = await extractDBProperties();

  let updateDiff: { [key: string]: any } = {};

  Object.keys(sheetProperties).forEach(key => {
    const value = sheetProperties[key as keyof typeof sheetProperties];
    if (!dbProperties[key]) {
      //new properties not exist in database
      sheetProperties[key].indicator = "new";
    }
    else {
      //new properties exist in database, need to check the value if any update one
      const objDiff = deepDiff(sheetProperties[key],dbProperties[key]);

      if(objDiff==null){
        sheetProperties[key].indicator = "same";
        dbProperties[key].indicator = "same";
      }else{
        sheetProperties[key].indicator = "update";
        dbProperties[key].indicator = "update";
        updateDiff[key] = objDiff; 
      }
    }
  })

  const transformedNewData = Object.entries(sheetProperties).map(([key, value]) => ({
    id: key,
    ...value,
  }));

  const transformedCloseData = Object.entries(dbProperties).map(([key, value]) => ({
    id: key,
    ...value,
  }));

  const newData = Object.values(transformedNewData).filter(properties => properties.indicator === "new");
  const updateData = Object.values(transformedNewData).filter(properties => properties.indicator === "update");
  const closeData = Object.values(transformedCloseData).filter(properties => properties.indicator === "close");

  //console.log("transformedNewData: " + transformedNewData.length.toString());
  //console.log("newData: " + newData.length.toString());
  //console.log("updateData: " + updateData.length.toString());
  //console.log("closeData: " + closeData.length.toString());

  for (const key in updateDiff) {
    if (updateDiff[key].estimate_price === null) {
      updateDiff[key].estimate_price = "N/A";
    }
  }
  
  //console.log(updateDiff);
  //console.log(dbProperties["AB62360"]);
  //console.log(sheetProperties["AB62360"]);
  //console.log(deepDiff(sheetProperties["AB65121"],dbProperties["AB65121"]));
  
  return (
    <div className="min-h-screen flex flex-col gap-4">
      <MenuDashboard menu="check" />
      <Suspense fallback={<div>Loading..</div>}>
        <div>The following result checks against latest uploaded xlsx file: <span className="font-bold">{latestXlsxURL}</span></div>
        <ImportTable
          newProperties={newData.sort((a, b) => parseInt(a.id.slice(2)) - parseInt(b.id.slice(2)))}
          updateProperties={updateData.sort((a, b) => parseInt(a.id.slice(2)) - parseInt(b.id.slice(2)))}
          closeProperties={closeData.sort((a, b) => parseInt(a.id.slice(2)) - parseInt(b.id.slice(2)))}
          updateDiff={updateDiff}
        />
      </Suspense>
    </div>
  )
}