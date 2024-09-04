'use client';

import React, { useEffect, useState } from 'react';
import UploadFile from '@/components/uploadfile';
import { Spinner } from '@nextui-org/spinner';
import MenuDashboard from '@/components/menu-dashboard';
import { ScrollArea } from '@/components/scrollarea';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/table';

const fetchFileList = async () => {
    const response = await fetch('/0191ba6b-7443-75f3-8c5c-da766df93c5e/api/filelist');
    if (!response.ok) {
        throw new Error('Failed to fetch uploaded file list');
    }
    return response.json();
};

export default function UploadPage() {
    const [filelist, setFileList] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const refreshData = async () => {
        setLoading(true);
        try {
            const updatedFileList = await fetchFileList();
            setFileList(updatedFileList);
        } catch (error) {
            console.error(error);
            setFileList([]);
        }
        setLoading(false);
    };

    useEffect(() => {
        refreshData();
    }, []);


    return (
        <section className='flex flex-col gap-5'>
            <MenuDashboard menu="upload" />
            <div className='flex flex-col gap-4'>
                <div className='flex flex-row gap-2 items-center'>
                <UploadFile onUploadSuccess={refreshData} />
                </div>
                <div className='flex flex-col'>
                    {
                    loading ? <Spinner /> :
                        <ScrollArea className="h-[400px] rounded-md border">
                        <Table className="sticky top-0">
                            <TableCaption><span className="font-bold text-xs pt-5">end of your auction listing file</span></TableCaption>
                            <TableHeader>
                                <TableRow key="colheader">
                                    <TableHead className='w-[10px]' key="no.">No.</TableHead>
                                    <TableHead key="filename">File Name</TableHead>
                                    <TableCell>Size (Kb)</TableCell>
                                    <TableHead key="uploadedat">Uploaded At</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filelist.map((file: any, key: any) => (
                                    <TableRow className="text-xs" key={key}>
                                    <TableCell>{key+1}</TableCell>
                                    <TableCell>{file.Key}</TableCell>
                                    <TableCell>{Math.ceil(file.Size/1024)}</TableCell>
                                    <TableCell>{new Date(file.LastModified).toLocaleDateString() + " "+ new Date(file.LastModified).toLocaleTimeString()}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        </ScrollArea>
                    }
                </div>
            </div>
        </section>
    );
}
