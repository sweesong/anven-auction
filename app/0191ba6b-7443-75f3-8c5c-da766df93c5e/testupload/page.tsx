'use client';

import { useState } from 'react';
import { Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';

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

export default function TestUpload() {
    const [excelData, setExcelData] = useState<any>(null);

    const handleFileRead = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
            const data = e.target?.result;
            if (data) {
                // Parse the Excel file data using SheetJS
                const workbook = XLSX.read(data, { type: 'binary' });
                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];
                const jsonData = XLSX.utils.sheet_to_json(worksheet);
                let fetchProperties: xlsxProperties[] = XLSX.utils.sheet_to_json(worksheet, { header: propertiesColumns });
                let sliceProperties = fetchProperties.slice(3).map(({ xx, ...propertiesNoHeader }) => propertiesNoHeader);

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

                setExcelData(retProperties);
            }
        };
        reader.readAsArrayBuffer(file); // Read file as binary string
    };

    const beforeUpload = (file: File) => {
        handleFileRead(file);
        return false; // Prevent the upload action (to stop posting the file)
    };

    return (
        <div>
            <Upload beforeUpload={beforeUpload} showUploadList={false}>
                <Button icon={<UploadOutlined />}>Select Excel File</Button>
            </Upload>

            {excelData && (
                <div>
                    <h3>Excel Data:</h3>
                    <pre>{JSON.stringify(excelData, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}
