'use client';

import { formatDateToStr } from "@/lib/utils";
import { Suspense, useState } from 'react';
import { Button, message, Popconfirm, Upload, Spin } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/table";
import { Tabs, Tab } from "@nextui-org/tabs";
import { ScrollArea } from "@/components/scrollarea";
import { Tooltip } from '@nextui-org/tooltip';
import { GitCompareIcon, SaveAllIcon } from "lucide-react";
import ImportTable from "@/components/import-table";

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

type propertiesNoID = {
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

type properties = {
    id: string,
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

const propertyTabColumn = [
    {
        key: "id",
        label: "ID",
    },
    {
        key: "auction_date",
        label: "Auction Date",
    },
    {
        key: "city",
        label: "City",
    },
    {
        key: "address",
        label: "Address",
    },
    {
        key: "reserve_price",
        label: "Reserve Price",
    },
    {
        key: "estimate_price",
        label: "Estimate Price",
    },
    {
        key: "extra_info",
        label: "Extra Info",
    },
    {
        key: "size",
        label: "Size",
    },
    {
        key: "type",
        label: "Type",
    },
    {
        key: "tenure",
        label: "Tenure",
    },
];

function parseDate(dateString: string) {
    const [day, month, year] = dateString.toString().split('-');
    return new Date(`${year}-${month}-${day}`);
}

function generateTableCell(id: string, field: string, fieldvalue: any, property: any, updateDiff?: any): any {

    if ((field == "estimate_price" && !property.estimate_price) ||
        (field == "extra_info" && !property.extra_info)
    ) {
        return (<TableCell></TableCell>)
    }

    let tableCell = (<TableCell className={updateDiff?.[id]?.[field] ? "text-red-500" : ""}>{fieldvalue}</TableCell>)

    if (updateDiff?.[id]?.[field]) {
        tableCell = (<Tooltip content={"Prev: " + updateDiff?.[id]?.[field]}>{tableCell}</Tooltip>)
    }

    return tableCell;
}

function propertiesTable(properties: properties[], caption: string, updateDiff?: any) {
    return (
        <>
            <ScrollArea className="h-[500px] rounded-md border">
                <Table className="sticky top-0">
                    <TableCaption><span className="font-bold text-xs pt-5">end of your {caption} auction listing</span></TableCaption>
                    <TableHeader>
                        <TableRow key="colheader">
                            <TableHead key="no.">No.</TableHead>
                            {
                                propertyTabColumn.map((tab) => (
                                    <TableHead key={tab.key}>{tab.label}</TableHead>
                                ))
                            }
                        </TableRow>
                    </TableHeader>
                    <TableBody className="overflow-y-auto h-[500px] ">
                        {properties.map((property, key) => {

                            return (
                                <TableRow className="text-xs" key={property.id}>
                                    <TableCell>{key + 1}</TableCell>
                                    <TableCell>{property.id}</TableCell>
                                    {generateTableCell(property.id, "auction_date", formatDateToStr(parseDate(property.auction_date.toString())), property, updateDiff)}
                                    {generateTableCell(property.id, "city", property.city, property, updateDiff)}
                                    {generateTableCell(property.id, "address", property.address, property, updateDiff)}
                                    {generateTableCell(property.id, "reserve_price", "RM " + property.reserve_price?.toLocaleString("en-US"), property, updateDiff)}
                                    {generateTableCell(property.id, "estimate_price", "RM " + property.estimate_price?.toLocaleString("en-US"), property, updateDiff)}
                                    {generateTableCell(property.id, "extra_info", property.extra_info, property, updateDiff)}
                                    {generateTableCell(property.id, "size", property.size.toLocaleString("en-US"), property, updateDiff)}
                                    {generateTableCell(property.id, "type", property.type, property, updateDiff)}
                                    {generateTableCell(property.id, "tenure", property.tenure, property, updateDiff)}
                                </TableRow>
                            )
                        }
                        )}
                    </TableBody>
                </Table>
            </ScrollArea>
        </>
    )
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

export default function TestUpload() {
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
                    let actualTitle = null;
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
                }, {} as { [key: string]: propertiesNoID });

                setSheetData(retProperties);
                setLoading(false);
                setCanCompare(true);
                setCanCommit(false);
            }
        };

    };

    const beforeUpload = (file: File) => {
        handleFileRead(file);
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

            let tmpUpdDiff: { [key: string]: any } = {};

            Object.keys(sheetData).forEach(key => {
                if (!dbData[key]) {
                    sheetData[key].indicator = "new";
                } else {
                    const objDiff = deepDiff(sheetData[key], dbData[key]);
                    if (objDiff == null) {
                        sheetData[key].indicator = "same";
                        dbData[key].indicator = "same";
                    } else {
                        sheetData[key].indicator = "update";
                        dbData[key].indicator = "update";
                        tmpUpdDiff[key] = objDiff;
                    }
                }
            });

            const transformedNewData = Object.entries(sheetData).map(([key, value]) => ({
                id: key,
                ...(value as propertiesNoID),
            }));

            const transformedCloseData = Object.entries(dbData).map(([key, value]) => ({
                id: key,
                ...(value as propertiesNoID),
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
            setSheetData([]);
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
    //console.log(updateDiff);

    return (
        <div className="flex flex-col gap-4">
            <h3>Import Listing</h3>
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
                    <div className="font-bold text-sm">Filename: {uploadFilename}</div>
                ) : ""
            }

            {
                isLoading ? (
                    <Spin />
                ) : isCanCompare ? (
                    <Suspense fallback={<div>loading...</div>}>
                        {propertiesTable(Object.values(sheetData), "New")}
                    </Suspense>
                ) : isCanCommit ? (
                    <Suspense fallback={<div>loading...</div>}>
                        <span className="text-sm">* please cross-check the data before commit the changes to database.</span>
                        <ImportTable
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
