import { NextApiRequest, NextApiResponse } from 'next';
import { list } from '@vercel/blob';
import XLSX from 'xlsx';
import { fetchAllProperties } from '@/lib/actions';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

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

async function extractNewProperties(): Promise<{ [key: string]: properties }> {
  const { blobs } = await list({ prefix: 'auction_listing/' });
  const latestXlsxURL = blobs.sort((a,b) => (new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()))[0].url;
  console.log("latestXlsxURL:" + latestXlsxURL);
  const data = await (await fetch("https://anvenauction.s3.ap-southeast-2.amazonaws.com/Auction_Listing_2024_08_31.xlsx")).arrayBuffer();
  const workbook = XLSX.read(data);
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  console.log("sheet name:" + workbook.SheetNames[0]);

  let fetchProperties: xlsxProperties[] = XLSX.utils.sheet_to_json(worksheet, { header: propertiesColumns });
  let sliceProperties = fetchProperties.slice(3).map(({ xx, ...propertiesNoHeader }) => propertiesNoHeader);

  console.log("sliceProperties" + sliceProperties);

  console.log("sliceProperties[0]" + sliceProperties[0]);
  
  const retProperties = sliceProperties.reduce((tmpProperties, { id, address, size, ...property }) => {
    const [actualAddress, extra_info] = address.split('\n');
    let actualEstimatePrice = null;
    let actualExtraInfo = null;
    let actualTitle = null;
    let actualSize = 0;

    if(isNaN(Number(size))){
      if(size.toString().trim().toLowerCase().endsWith("acres")) {
        actualSize = Math.round(parseFloat(size.toString().trim().toLowerCase().replace("acres","").trim()) * 43560);
      } else if(size.toString().trim().toLowerCase().endsWith("acre")) {
        actualSize = Math.round(parseFloat(size.toString().trim().toLowerCase().replace("acre","").trim()) * 43560);
      } else {
        actualSize = 0;
      }
    } else {
      actualSize = size;
    }

    actualExtraInfo = extra_info;
    actualTitle = actualAddress?.split(',')[0];

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
    };
    return tmpProperties;
  }, {} as { [key: string]: properties });

  return retProperties;
}

function deepDiff(newObj: any, oldObj: any): any {
  const diff: any = {};
  for (const key of Object.keys(newObj)) {
    if (key !== "indicator") { 
      if (newObj[key] !== oldObj[key]) {
        diff[key] = oldObj[key];
      }
    }
  }
  return Object.keys(diff).length > 0 ? diff : null;
}

export async function GET(request: Request): Promise<NextResponse> {
  //try {
    console.log("hello");
    const sheetProperties = await extractNewProperties();
    console.log("hello1");
    const dbProperties = await extractDBProperties();
    console.log("hello2");

    let updateDiff: { [key: string]: any } = {};

    Object.keys(sheetProperties).forEach(key => {
      if (!dbProperties[key]) {
        sheetProperties[key].indicator = "new";
      } else {
        const objDiff = deepDiff(sheetProperties[key], dbProperties[key]);
        if (objDiff == null) {
          sheetProperties[key].indicator = "same";
          dbProperties[key].indicator = "same";
        } else {
          sheetProperties[key].indicator = "update";
          dbProperties[key].indicator = "update";
          updateDiff[key] = objDiff;
        }
      }
    });

    const transformedNewData = Object.entries(sheetProperties).map(([key, value]) => ({
      id: key,
      ...value,
    }));

    const transformedCloseData = Object.entries(dbProperties).map(([key, value]) => ({
      id: key,
      ...value,
    }));

    const newData = transformedNewData.filter(properties => properties.indicator === "new");
    const updateData = transformedNewData.filter(properties => properties.indicator === "update");
    const closeData = transformedCloseData.filter(properties => properties.indicator === "close");

    return NextResponse.json({
        data: [...newData, ...updateData, ...closeData],
        updateDiff
      });
  //} catch (error) {
  //  return NextResponse.json({ error: 'Failed to process properties' });
 // }
}
