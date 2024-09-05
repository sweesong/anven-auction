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
import { ScrollArea } from "@/components/scrollarea";
import { Tooltip } from '@nextui-org/tooltip';
import { properties, propertyTabColumn } from "@/lib/types"; // Adjust import to your actual types
import { formatDateToStr, parseDate } from "@/lib/utils";

// Helper function to generate table cells
function generateTableCell(id: string, field: string, fieldValue: any, property: any, updateDiff?: any): any {

    if ((field === "estimate_price" && !property.estimate_price) ||
        (field === "extra_info" && !property.extra_info)) {
        return <TableCell></TableCell>;
    }

    let tableCell = (
        <TableCell className={updateDiff?.[id]?.[field] ? "text-red-500" : ""}>
            {fieldValue}
        </TableCell>
    );

    if (updateDiff?.[id]?.[field]) {
        tableCell = (
            <Tooltip content={"Prev: " + updateDiff?.[id]?.[field]}>
                {tableCell}
            </Tooltip>
        );
    }

    return tableCell;
}

// Main component for the properties table
interface PropertiesTableProps {
    properties: properties[];
    caption: string;
    updateDiff?: any;
}

export default function UploadSheetTable({ properties, caption, updateDiff } : PropertiesTableProps){
    return (
        <>
            <ScrollArea className="h-[500px] rounded-md border">
                <Table className="sticky top-0">
                    <TableCaption>
                        <span className="font-bold text-xs pt-5">end of your {caption} auction listing</span>
                    </TableCaption>
                    <TableHeader>
                        <TableRow key="colheader">
                            <TableHead key="no.">No.</TableHead>
                            {
                                // Replace `propertyTabColumn` with the actual column definition array
                                propertyTabColumn.map((tab) => (
                                    <TableHead key={tab.key}>{tab.label}</TableHead>
                                ))
                            }
                        </TableRow>
                    </TableHeader>
                    <TableBody className="overflow-y-auto h-[500px] ">
                        {properties.map((property, key) => (
                            <TableRow className="text-xs" key={property.id}>
                                <TableCell>{key + 1}</TableCell>
                                <TableCell>{property.id}</TableCell>
                                {generateTableCell(property.id, "title", property.title, property, updateDiff)}
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
                        ))}
                    </TableBody>
                </Table>
            </ScrollArea>
        </>
    );
};