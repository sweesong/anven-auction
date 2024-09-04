'use client';

import { formatDateToStr } from "@/lib/utils";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "./table";
import { Tabs, Tab } from "@nextui-org/tabs";
import { ScrollArea } from "./scrollarea";
import { Tooltip } from "@nextui-org/tooltip";
import { FilePlusIcon, GalleryVerticalIcon, PencilIcon, Trash2Icon } from "lucide-react";

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
    indicator: "new" | "update" | "close" | "same",
    id: string,
};

interface PropertyTableProps {
    newProperties: properties[];
    updateProperties: properties[];
    closeProperties: properties[];
    updateDiff: any;
}

type updateProperty = {
    [key: string]: any;
};

function findFieldValue(obj: updateProperty, id: string, field: string): any {
    // Access the object using the id and then the field
    return obj[id]?.[field];
}


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

export default function ImportTable({ newProperties, updateProperties, closeProperties, updateDiff }: PropertyTableProps) {

    let disableTab = [];

    if(newProperties.length==0)
        disableTab[disableTab.length] = "new";

    if(updateProperties.length==0)
        disableTab[disableTab.length] = "update";

    if(closeProperties.length==0)
        disableTab[disableTab.length] = "close";

    return (
        <section>
            <Tabs disabledKeys={disableTab}>
                <Tab 
                    key="new" 
                    title={
                        <div className="flex items-center space-x-2 gap-2">
                          <FilePlusIcon />
                          <span>New Listing ({newProperties.length})</span>
                        </div>
                      }>
                    {propertiesTable(newProperties, "new", null)}
                </Tab>
                <Tab 
                    key="update" 
                    title={
                        <div className="flex items-center space-x-2 gap-2">
                          <PencilIcon />
                          <span>Update Listing ({updateProperties.length})</span>
                        </div>
                      }>
                    {propertiesTable(updateProperties, "update", updateDiff)}
                </Tab>
                <Tab 
                    key="close" 
                    title={
                        <div className="flex items-center space-x-2 gap-2">
                          <Trash2Icon />
                          <span>Close Listing ({closeProperties.length})</span>
                        </div>
                      }>
                    {propertiesTable(closeProperties, "close", null)}
                </Tab>
            </Tabs>
        </section>
    )
}