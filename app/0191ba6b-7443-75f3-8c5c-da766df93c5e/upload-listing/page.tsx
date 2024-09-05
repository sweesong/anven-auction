'use client';

import { properties, propertiesColumns, xlsxProperties } from "@/lib/types"; 
import { Suspense, useState } from 'react';
import { Button, message, Popconfirm, Upload, Spin } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';
import { GitCompareIcon, SaveAllIcon } from "lucide-react";
import UploadSheetTable from "@/components/upload-sheet-table";
import GenerateDiffTables from "@/components/generate-diff-tables";

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

export default function UploadListing() {
    const [uploadFilename, setUploadFilename] = useState<string>();

    const [sheetData, setSheetData] = useState<any>(); //from spreadsheet

    const [newListing, setNewListing] = useState<properties[]>([]); //after compare, to be insert listing
    const [updListing, setUpdListing] = useState<properties[]>([]); //after compare, to be update listing
    const [closeListing, setCloseListing] = useState<properties[]>([]); //after compare, to be close listing
    const [updateDiff, setUpdateDiff] = useState<{ [key: string]: any }>(); //track the column that have different value

    const [isLoading, setLoading] = useState(false);
    const [isCanCompare, setCanCompare] = useState(false);
    const [isCanCommit, setCanCommit] = useState(false);


    const handleFileRead = (file: File) => {

        try {
            setLoading(true); // Start loading
            setCanCompare(false);
            setCanCommit(false);

            const reader = new FileReader();
            reader.readAsArrayBuffer(file); // Read file as binary string

            setUploadFilename(file.name);

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
                        let actualTitle: string = "";
                        let actualSize = 0;

                        if (isNaN(Number(size))) {
                            if (size.toString().trim().toLowerCase().endsWith("acres")) {
                                actualSize = Math.round(parseFloat(size.toString().trim().toLowerCase().replace("acres", "").trim()) * 43560);
                            } else if (size.toString().trim().toLowerCase().endsWith("acre")) {
                                actualSize = Math.round(parseFloat(size.toString().trim().toLowerCase().replace("acre", "").trim()) * 43560);
                            } else {
                                actualSize = 0;
                            }
                        } else {
                            actualSize = size;
                        }

                        actualExtraInfo = extra_info;

                        let tmpAddress = actualAddress?.split(',');
                        actualTitle = tmpAddress[0]; //by default use first part

                        const words = ["jalan", "lorong"];

                        if(words.some((word) => actualTitle.toLowerCase().includes(word.toLowerCase())))
                        {
                            if(tmpAddress.length>1){
                                actualTitle = tmpAddress[tmpAddress.length-2].trim() + ", " + tmpAddress[tmpAddress.length-1].trim()

                            const checkPostcode = actualTitle.split(/\s+/);

                            if (/^\d+$/.test(checkPostcode[0])) {
                                actualTitle = actualTitle.replace(checkPostcode[0],"").trim();
                            }
                            }
                        }

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
                            id: id,
                            title: actualTitle,
                            address: actualAddress,
                            size: actualSize,
                            estimate_price: actualEstimatePrice || null,
                            extra_info: actualExtraInfo || null,
                            indicator: "same"
                        };
                        return tmpProperties;
                    }, {} as { [key: string]: properties });

                    
                    setSheetData(retProperties);
                    setCanCompare(true);
                    setCanCommit(false);
                }
            };

        } catch (error) {
            setCanCompare(false);
            setCanCommit(false);
            message.error('Error loading the file. Please check if the file is valid.');
        } finally {
            setLoading(false);
        }
    };

    const beforeUpload = (file: File) => {
        const isXLSX = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        if (!isXLSX) {
            message.error(`${file.name} is not a XLSX file`);
            return isXLSX || Upload.LIST_IGNORE;
        } else {
            handleFileRead(file);
        }

        return false; // Prevent the upload action (to stop posting the file)
    };

    const handleGenerateDiff = async () => {
        setLoading(true);
        setCanCompare(false);
        setCanCommit(false);

        try {
            const response = await fetch('/0191ba6b-7443-75f3-8c5c-da766df93c5e/api/getdbdata');
            const data = await response.json();

            const dbData = data;

            const newSheetData: { [key: string]: Omit<properties, 'id'> } = Object.entries(sheetData).reduce(
                (acc, [key, value]) => {
                  const { id, ...rest } = value as properties; // Explicitly assert the type
                  acc[key] = rest; // Assign the rest of the properties without 'sid'
                  return acc;
                },
                {} as { [key: string]: Omit<properties, 'id'> }
              );

            let tmpUpdDiff: { [key: string]: any } = {};
            
            console.log("newSheetData");
            console.log(newSheetData);

            setSheetData(newSheetData);

            Object.keys(newSheetData).forEach(key => {
                if (!dbData[key]) {
                    newSheetData[key].indicator = "new";
                } else {
                    const objDiff = deepDiff(newSheetData[key], dbData[key]);
                    if (objDiff == null) {
                        newSheetData[key].indicator = "same";
                        dbData[key].indicator = "same";
                    } else {
                        newSheetData[key].indicator = "update";
                        dbData[key].indicator = "update";
                        tmpUpdDiff[key] = objDiff;
                    }
                }
            });

            const transformedNewData = Object.entries(newSheetData).map(([key, value]) => ({
                id: key,
                ...(value as Omit<properties, 'id'>),
            }));

            const transformedCloseData = Object.entries(dbData).map(([key, value]) => ({
                id: key,
                ...(value as Omit<properties, 'id'>),
            }));

            const newData = transformedNewData.filter(properties => properties.indicator === "new");
            const updateData = transformedNewData.filter(properties => properties.indicator === "update");
            const closeData = transformedCloseData.filter(properties => properties.indicator === "close");


            setNewListing(newData);
            setUpdListing(updateData);
            setCloseListing(closeData);
            setUpdateDiff(tmpUpdDiff);

            //console.log("newData");
            //console.log(newData);
            //console.log("updateData");
            //console.log(updateData);
            //console.log("closeData");
            //console.log(closeData);

            setCanCompare(false);
            setCanCommit(true);
            message.success('Successfully generate the different between worksheet and database.');
        } catch (error) {
            setCanCompare(true);
            setCanCommit(false);
            message.error('Error generating different: ' + error);
        } finally {
            setLoading(false);
        }
    };

    const confirm = (e: any) => {
        console.log(e);
        message.success('Click on Yes');
    };
    const cancel = (e: any) => {
        console.log(e);
        message.error('Click on No');
    };

    //console.log("updateDiff");
    //console.log(sheetData);

    return (
        <div className="flex flex-col gap-4">
            <span className="text-2xl">Upload Listing</span>
            <div className="flex flex-row gap-2">
                <Upload beforeUpload={beforeUpload} showUploadList={false}>
                    <Button disabled={isLoading} icon={<UploadOutlined />}>Select Excel File</Button>
                </Upload>
                <Button onClick={handleGenerateDiff} disabled={isLoading || !isCanCompare} icon={<GitCompareIcon />}>Generate Different</Button>
                <Popconfirm
                    title="Commit Data"
                    description="Are you sure to commit the data to database (cannot be reversed)?"
                    onConfirm={confirm}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button type="primary" disabled={isLoading || !isCanCommit} icon={<SaveAllIcon />}>Commit Change</Button>
                </Popconfirm>
            </div>
            {
                uploadFilename ? (
                    <div className="flex flex-row gap-5 text-sm">
                        <div><div className="font-bold">Filename:</div><span>{uploadFilename}</span></div>
                        <div><div className="font-bold">Total Listing:</div><span>{sheetData && Object.keys(sheetData).length.toString()}</span></div>
                    </div>
                ) : ""
            }

            {
                isLoading ? (
                    <Spin />
                ) : isCanCompare ? (
                    <Suspense fallback={<div>loading...</div>}>
                        <UploadSheetTable properties={Object.values(sheetData)} caption="New" updateDiff={null} />
                    </Suspense>
                ) : isCanCommit ? (
                    <Suspense fallback={<div>loading...</div>}>
                        <span className="text-sm">* please cross-check the data before commit the changes to database.</span>
                        <GenerateDiffTables
                            newProperties={newListing.sort((a, b) => parseInt(a.id.slice(2)) - parseInt(b.id.slice(2)))}
                            updateProperties={updListing.sort((a, b) => parseInt(a.id.slice(2)) - parseInt(b.id.slice(2)))}
                            closeProperties={closeListing.sort((a, b) => parseInt(a.id.slice(2)) - parseInt(b.id.slice(2)))}
                            updateDiff={updateDiff}
                        />
                    </Suspense>
                ) : null
            }

        </div>
    );
}
