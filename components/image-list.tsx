import React, { useEffect, useState } from 'react';
import { Spin, Table } from 'antd';
import type { TableProps } from 'antd';

type ImageData = {
  Key: string;
  LastModified: string;
  ETag: string;
  Size: number;
  StorageClass: string;
};

export default function ImageList(){
  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      const res = await fetch('/0191ba6b-7443-75f3-8c5c-da766df93c5e/api/get-img-list');
      const data = await res.json();
      data.sort((a: any, b: any) => (new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime()))
      setImages(data);
      setLoading(false);
    };
    fetchImages();
  }, []);

  const columns: TableProps<ImageData>['columns'] = [
    {
      title: 'File',
      dataIndex: 'Key',
      key: 'key',
      render: (text: string) => (
        <a href={`/api/get-image/${text}`} target="_blank" rel="noopener noreferrer">
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
    <div>
      <h1>Image List</h1>
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
