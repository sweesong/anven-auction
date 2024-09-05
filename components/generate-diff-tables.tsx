'use client';

import { Tabs, Tab } from "@nextui-org/tabs";
import { FilePlusIcon, PencilIcon, Trash2Icon } from "lucide-react";
import UploadSheetTable from "./upload-sheet-table";
import { properties } from "@/lib/types";

interface PropertyTableProps {
    newProperties: properties[];
    updateProperties: properties[];
    closeProperties: properties[];
    updateDiff: any;
}

export default function GenerateDiffTables({ newProperties, updateProperties, closeProperties, updateDiff }: PropertyTableProps) {

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
                        <UploadSheetTable properties={newProperties} caption="new" />
                </Tab>
                <Tab 
                    key="update" 
                    title={
                        <div className="flex items-center space-x-2 gap-2">
                          <PencilIcon />
                          <span>Update Listing ({updateProperties.length})</span>
                        </div>
                      }>
                    <UploadSheetTable properties={updateProperties} caption="update" updateDiff={updateDiff}/>
                </Tab>
                <Tab 
                    key="close" 
                    title={
                        <div className="flex items-center space-x-2 gap-2">
                          <Trash2Icon />
                          <span>Close Listing ({closeProperties.length})</span>
                        </div>
                      }>
                    <UploadSheetTable properties={closeProperties} caption="close"/>
                </Tab>
            </Tabs>
        </section>
    )
}