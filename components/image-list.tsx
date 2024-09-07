import React, { useEffect, useState } from 'react';
import { Button, Spin, Table } from 'antd';
import type { TableProps } from 'antd';
import { ReloadIcon } from '@radix-ui/react-icons';

type ImageData = {
    Key: string;
    LastModified: string;
    ETag: string;
    Size: number;
    StorageClass: string;
};

export default function ImageList() {
    const [images, setImages] = useState<ImageData[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchImages = async () => {
        const res = await fetch('/0191ba6b-7443-75f3-8c5c-da766df93c5e/api/get-img-list');
        const data = await res.json();
        data.sort((a: any, b: any) => (new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime()))
        setImages(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchImages();
    }, []);

    const refreshImages = async () => {
        setLoading(false);
        fetchImages();
    }

    const columns: TableProps<ImageData>['columns'] = [
        {
            title: 'Thumbnail',
            dataIndex: 'Key',
            key: 'thumbnail',
            render: (text: string) => (
                <img
                    src={`https://anvenauction.s3.ap-southeast-2.amazonaws.com/${text}`}
                    alt="thumbnail"
                    style={{ width: '50px', height: '50px', objectFit: 'cover' }} // Adjust size as needed
                />
            ),
        },
        {
            title: 'File',
            dataIndex: 'Key',
            key: 'key',
            render: (text: string) => (
                <a href={`https://anvenauction.s3.ap-southeast-2.amazonaws.com/${text}`} target="_blank" rel="noopener noreferrer">
                    {text}
                </a>
            ),
        },
        {
            title: 'Last Modified',
            dataIndex: 'LastModified',
            key: 'lastModified',
            render: (text: string) => new Date(text).toLocaleString(),
        },
        {
            title: 'Size (bytes)',
            dataIndex: 'Size',
            key: 'size',
            render: (text: number) => `${text.toLocaleString()} bytes`,
        },
        {
            title: 'Storage Class',
            dataIndex: 'StorageClass',
            key: 'storageClass',
        },
    ];

    return (
        <div className='flex flex-col gap-2'>
            <div className='flex flex-row gap-2 items-center'>
                <h1>Image List</h1>
                <Button onClick={refreshImages} type="dashed" shape="circle" icon={<ReloadIcon />}/>
            </div>

            {loading ? (
                <Spin />
            ) : (
                <Table
                    dataSource={images.map((item, index) => ({
                        key: index,
                        ...item,
                    }))}
                    columns={columns}
                    pagination={false} // You can enable pagination if you expect many rows
                />
            )}
        </div>
    );
};
