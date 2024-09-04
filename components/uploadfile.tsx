'use client';

import React, { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd';
import { Button, message, Upload } from 'antd';

interface UploadFileProps {
    onUploadSuccess?: () => void;
}

export default function UploadFile({ onUploadSuccess }: UploadFileProps) {
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const handleChange: UploadProps['onChange'] = (info) => {
        let newFileList = [...info.fileList];

        // Limit the number of uploaded files (only show the most recent file)
        newFileList = newFileList.slice(-1);

        // Read from response and show file link
        newFileList = newFileList.map((file) => {
            if (file.response) {
                // Update file URL from response
                file.url = file.response.url;
            }
            return file;
        });

        // Handle file status
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
            setFileList([]);
            // Call the onUploadSuccess callback to refresh data
            if (onUploadSuccess) {
                onUploadSuccess();
            }
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
            setFileList(newFileList);
        } else {
            setFileList(newFileList);
        }
    };

    const handleBefore: UploadProps['beforeUpload'] = (file) => {
        const isXLSX = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        if (!isXLSX) {
        message.error(`${file.name} is not a XLSX file`);
        }
        return isXLSX || Upload.LIST_IGNORE;
    }

    const props: UploadProps = {
        action: (file) => `/0191ba6b-7443-75f3-8c5c-da766df93c5e/api/upload?filename=${file.name}`, // Update to your Vercel API route
        onChange: handleChange,
        beforeUpload: handleBefore,
        multiple: false, // Only allow single file upload
    };

    return (
        <Upload {...props} fileList={fileList}>
            <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
    );
};
