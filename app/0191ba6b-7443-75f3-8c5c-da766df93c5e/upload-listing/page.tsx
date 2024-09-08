'use client';

import { properties, propertiesColumns, xlsxProperties } from "@/lib/types";
import { Suspense, useState } from 'react';
import { Button, message, Popconfirm, Upload, Spin, Result } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';
import { GitCompareIcon, SaveAllIcon } from "lucide-react";
//import UploadSheetTable from "@/components/upload-sheet-table";
import GenerateDiffTables from "@/components/generate-diff-tables";
import UpdateSheetAntTable from "@/components/upload-sheet-ant-table";
import { signOut } from "next-auth/react";
import WithAuth from "@/components/withauth";
import { parseDate } from "@/lib/utils";


type ValidationErrors = {
    [id: string]: {
        title?: string[];
        auction_date?: string[];
        city?: string[];
        address?: string[];
        reserve_price?: string[];
        estimate_price?: string[];
        extra_info?: string[];
        size?: string[];
        type?: string[];
        tenure?: string[];
    };
};

function isValidDate(dateString: string): boolean {
    const regex = /^\d{2}-\d{2}-\d{4}$/;
    if (!dateString.match(regex)) return false;

    const [day, month, year] = dateString.split('-').map(Number);

    // Check if month is between 1 and 12
    if (month < 1 || month > 12) return false;

    // Check if day is valid for the given month
    const daysInMonth = new Date(year, month, 0).getDate();
    if (day < 1 || day > daysInMonth) return false;

    return true;
}

function validateProperties(propertiesObject: { [id: string]: properties }): ValidationErrors {
    const errors: ValidationErrors = {};
    
    // Validate each property
    for (const [id, property] of Object.entries(propertiesObject)) {
        const fieldErrors: {
            title?: string[];
            auction_date?: string[];
            city?: string[];
            address?: string[];
            reserve_price?: string[];
            estimate_price?: string[];
            extra_info?: string[];
            size?: string[];
            type?: string[];
            tenure?: string[];
        } = {};

        // Validate each field
        if (!property.title) {
            fieldErrors.title = fieldErrors.title || [];
            fieldErrors.title.push("Title is required");
        }

        if (!property.city) {
            fieldErrors.city = fieldErrors.city || [];
            fieldErrors.city.push("City is required");
        }

        if (!property.address) {
            fieldErrors.address = fieldErrors.address || [];
            fieldErrors.address.push("Address is required");
        }

        if (!isValidDate(property.auction_date)) {
            fieldErrors.auction_date = fieldErrors.auction_date || [];
            fieldErrors.auction_date.push("Invalid date format");
        }

        if (property.reserve_price < 0) {
            fieldErrors.reserve_price = fieldErrors.reserve_price || [];
            fieldErrors.reserve_price.push("Reserve price must be more than 0");
        }

        if (property.size <= -1) {
            fieldErrors.size = fieldErrors.size || [];
            fieldErrors
                .size.push("Size must be 0 or above");
        }

        if (!property.type) {
            fieldErrors.type = fieldErrors.type || [];
            fieldErrors.type.push("Type is required");
        }

        // Add fieldErrors to errors object if there are any errors
        if (Object.keys(fieldErrors).length > 0) {
            errors[id] = fieldErrors;
        }
    }

    return errors;
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

const UploadListing = () => {
    const [uploadFilename, setUploadFilename] = useState<string>();

    const [sheetData, setSheetData] = useState<any>(); //from spreadsheet
    const [invalidData, setInvalidData] = useState<any>();

    const [newListing, setNewListing] = useState<properties[]>([]); //after compare, to be insert listing
    const [updListing, setUpdListing] = useState<properties[]>([]); //after compare, to be update listing
    const [closeListing, setCloseListing] = useState<properties[]>([]); //after compare, to be close listing
    const [updateDiff, setUpdateDiff] = useState<{ [key: string]: any }>(); //track the column that have different value

    const [isLoading, setLoading] = useState(false);
    const [isCanCompare, setCanCompare] = useState(false);
    const [isCanCommit, setCanCommit] = useState(false);
    const [isDataValid, setDataValid] = useState(true);
    const [isSuccessCommit, setSuccessCommit] = useState(false);
    const [isErrorCommit, setErrorCommit] = useState(false);
    const [isNoDiff, setNoDiff] = useState(false);

    const [isPopConfirmVisible, setIsPopConfirmVisible] = useState(false);


    const handleFileRead = (file: File) => {

        try {
            setLoading(true); // Start loading
            setCanCompare(false);
            setCanCommit(false);
            setSuccessCommit(false);
            setErrorCommit(false);
            setNoDiff(false);

            const reader = new FileReader();
            reader.readAsArrayBuffer(file); // Read file as binary string

            setUploadFilename(file.name);

            reader.onload = (e: ProgressEvent<FileReader>) => {
                let validHeaderFormat = false;
                const data = e.target?.result;
                if (data) {
                    // Parse the Excel file data using SheetJS
                    const workbook = XLSX.read(data, { type: 'binary' });
                    const firstSheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[firstSheetName];

                    if (!worksheet) {
                        return false;
                    }
                    //verify if the xlsx is valid format by checking the header at 3rd row
                    const expectedHeaders = ['new', 'id', 'auction date', 'city', 'address']; // Replace with your expected headers

                    // Get the range for the 3rd row
                    const ref = worksheet['!ref'];
                    if (ref) {
                        const range = XLSX.utils.decode_range(ref);
                        const thirdRowCells = [];
                        for (let col = range.s.c; col <= 4; col++) {
                            const cellAddress = { c: col, r: 3 }; // 2 represents the 3rd row (0-based index)
                            const cellRef = XLSX.utils.encode_cell(cellAddress);
                            if (worksheet[cellRef]) {
                                thirdRowCells.push(worksheet[cellRef].v);
                            } else {
                                thirdRowCells.push(null); // Or use an empty string if preferred
                            }
                        }

                        // Check if the 3rd row headers match the expected headers
                        validHeaderFormat = thirdRowCells.every((value, index) => value?.toLowerCase() === expectedHeaders[index].toLowerCase());
                        //console.log('Headers match:', validHeaderFormat);

                    }

                    if (!validHeaderFormat) {
                        setLoading(false); // Start loading
                        setCanCompare(false);
                        setCanCommit(false);
                        setSheetData(null);

                        message.error("Header format is not expected. Possibly wrong file. Please check the file manually.")
                        return false;
                    }


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

                        if (words.some((word) => actualTitle.toLowerCase().includes(word.toLowerCase()))) {
                            if (tmpAddress.length > 1) {
                                actualTitle = tmpAddress[tmpAddress.length - 2].trim() + ", " + tmpAddress[tmpAddress.length - 1].trim()

                                const checkPostcode = actualTitle.split(/\s+/);

                                if (/^\d+$/.test(checkPostcode[0])) {
                                    actualTitle = actualTitle.replace(checkPostcode[0], "").trim();
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

                    const validationErrors = validateProperties(retProperties);

                    if (Object.keys(validationErrors).length>0) {
                        setInvalidData(validationErrors);
                        setDataValid(false);
                        setSheetData(null);
                        setCanCompare(false);
                        setCanCommit(false);
                        message.error("worksheet consist of invalid data. please fix it.")
                    } else {
                        setSheetData(retProperties);
                        setCanCompare(true);
                        setCanCommit(false);
                        setDataValid(true);
                    }
                }
            };

        } catch (error) {
            setCanCompare(false);
            setCanCommit(false);
            setSheetData(null);
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

            //console.log("newSheetData");
            //console.log(newSheetData);

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
            if(Object.keys(tmpUpdDiff).length>0){
                setCanCompare(false);
                setCanCommit(true);
                setNoDiff(false);
            }else{
                setCanCompare(false);
                setCanCommit(false);
                setNoDiff(true);
            }
        } catch (error) {
            setCanCompare(true);
            setCanCommit(false);
            message.error('Error generating different: ' + error);
        } finally {
            setLoading(false);
        }
    };

    const mergeListings = () => {
        // Add a common 'action' property for each listing based on its type
        const newListings = newListing.map(item => ({ ...item, action: 'insert', createdByWs: uploadFilename }));
        const updatedListings = updListing.map(item => ({ ...item, action: 'update', createdByWs: uploadFilename }));
        const closedListings = closeListing.map(item => ({ ...item, action: 'delete', createdByWs: uploadFilename }));
    
        return [...newListings, ...updatedListings, ...closedListings];
    };

    const handleCommit = async () => {
        setLoading(true);
        setCanCommit(false);
        setIsPopConfirmVisible(false);

        try {
            const mergedListings = mergeListings();

            const mergedListingsWithoutIndicator = mergedListings.map(listing => {
                const { indicator, auction_date, ...rest } = listing; // Destructure to remove indicator
                return {
                    ...rest,
                    auction_date: auction_date ? parseDate(auction_date) : null, // Convert auction_date to Date
                };
            });
            
            
             const response = await fetch('/0191ba6b-7443-75f3-8c5c-da766df93c5e/api/upload-listing', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(mergedListingsWithoutIndicator),
            });
    
            if (response.ok) {
                const ret = await response.json();

                if(ret.success==1){
                    //successfully load
                    setSuccessCommit(true);
                    setErrorCommit(false);
                }else{
                    //have error
                    setSuccessCommit(false);
                    setErrorCommit(true);
                }
            } else {
                throw new Error('Failed to commit data');
            }
        } catch (error) {
            //message.error('Error committing data: ' + error);
            //have error
            setSuccessCommit(false);
            setErrorCommit(true);
        } finally {
            setUploadFilename("");
            setSheetData(null);
            setLoading(false);
        }
    };

    const handleConfirm = () => {
        // Close the Popconfirm first, then trigger the commit
        handleCommit();
    };
    
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
                    onConfirm={handleConfirm}
                    onCancel={() => setIsPopConfirmVisible(false)}
                    okText="Yes"
                    cancelText="No"
                    onOpenChange={setIsPopConfirmVisible}  // Manages visibility state
                >
                    <Button type="primary" onClick={() => setIsPopConfirmVisible(true)} disabled={isLoading || !isCanCommit} icon={<SaveAllIcon />}>Commit Change</Button>
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
                    <Spin tip="Loading" size="large" />
                ) : (
                    <Spin size="large" spinning={isLoading}>
                    <Suspense fallback={<div>loading...</div>}>
                        {
                            !isDataValid ? (
                                <div>
                                    <span>The worksheet contains 1 or more invalid data. Please fix all the issues below and re-upload the worksheet.</span>
                                    <pre className="bg-gray-100">{JSON.stringify(invalidData, null, 2)}</pre>
                                </div>
                            ) : isCanCompare ? (
                                <UpdateSheetAntTable properties={Object.values(sheetData)} caption="new" />
                            ) : isCanCommit ? (
                                <div className="flex flex-col gap-2">
                                    <span className="text-sm">* Please cross-check the changes before committing to the system. You may hover the <span className="text-red-500">red text</span> to view the existing data for comparison purpose.</span>
                                    <GenerateDiffTables
                                        newProperties={newListing.sort((a, b) => parseInt(a.id.slice(2)) - parseInt(b.id.slice(2)))}
                                        updateProperties={updListing.sort((a, b) => parseInt(a.id.slice(2)) - parseInt(b.id.slice(2)))}
                                        closeProperties={closeListing.sort((a, b) => parseInt(a.id.slice(2)) - parseInt(b.id.slice(2)))}
                                        updateDiff={updateDiff}
                                    />
                                </div>
                            ) : isSuccessCommit ? (
                                <Result
                                    status="success"
                                    title="Successfully commit the changes to database."
                                    subTitle="You may re-upload the same file to confirm. It should not generate any different by now."
                                />
                            ) : isErrorCommit ? (
                                <Result
                                    status="warning"
                                    title="There are some problem with the commit."
                                    subTitle="Please try again. Contact Admin if the issue persists."
                                />
                            ) : isNoDiff ? (
                                <Result
                                    status="info"
                                    title="No different found by comparing the worksheet and database."
                                />
                            ) : null
                        }
                    </Suspense>
                    </Spin>
                )
            }
        </div>
    );
}

export default UploadListing;