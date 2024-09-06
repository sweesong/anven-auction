import React, { useState } from 'react';
import { Space, Table, Tag, Tooltip } from 'antd';
import type { TableProps } from 'antd';
import { properties } from '@/lib/types';
import { formatDateToStr, parseDate } from '@/lib/utils';

interface DataType {
    key: string,
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
};

const data: DataType[] = [
  {
    key: 'AA1234',
    id: 'AA1234',
    title: 'string',
    auction_date: 'string',
    city: 'string',
    address: 'string',
    reserve_price: 100000,
    estimate_price: null,
    extra_info: null,
    size: 1334,
    type: 'Condominium',
    tenure: 'Freehold',
  }
];

interface UpdateSheetTableProps {
    properties: properties[];
    caption: string;
    updateDiff?: any; // Adjust the type based on your actual data structure
}

export default function UpdateSheetAntTable({properties,caption,updateDiff}: UpdateSheetTableProps){

    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            ellipsis: true,
            sorter: {
                compare: (a, b) => parseInt(a.id.substring(2)) - parseInt(b.id.substring(2)),
                multiple: 1,
              },
            fixed: true,
          },
          {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            sorter: {
                compare: (a, b) => a.title.localeCompare(b.title),
                multiple: 2,
              },
            ellipsis: true,
          },
          {
            title: 'Auction Date',
            dataIndex: 'auction_date',
            key: 'auction_date',
            ellipsis: true,
            width: 130,
            sorter: {
                compare: (a, b) => parseDate(a.auction_date).getTime() - parseDate(b.auction_date).getTime(),
                multiple: 2,
              },
            render: (text, record) => {
                const cellStyle = updateDiff?updateDiff[record.key]?.auction_date? { color: 'red' } : {} : "";
                if(cellStyle==""){
                    return <div>{formatDateToStr(parseDate(text))}</div>;
                }else{
                    const tooltipContent = updateDiff?.[record.key]?.auction_date;
                    return  <Tooltip title={tooltipContent}><div style={cellStyle}>{formatDateToStr(parseDate(text))}</div></Tooltip>;
                }
              },
          },
          {
            title: 'City',
            dataIndex: 'city',
            key: 'city',
            ellipsis: true,
            render: (text, record) => {
                const cellStyle = updateDiff?updateDiff[record.key]?.city? { color: 'red' } : {} : "";
                if(cellStyle==""){
                    return <div>{text}</div>;
                }else{
                    const tooltipContent = updateDiff?.[record.key]?.city;
                    return  <Tooltip title={tooltipContent}><div style={cellStyle}>{text}</div></Tooltip>;
                }
              },
          },
          {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            width: 350,
            render: (text, record) => {
                const cellStyle = updateDiff?updateDiff[record.key]?.address? { color: 'red' } : {} : "";
                if(cellStyle==""){
                    return <div>{text}</div>;
                }else{
                    const tooltipContent = updateDiff?.[record.key]?.address;
                    return  <Tooltip title={tooltipContent}><div style={cellStyle}>{text}</div></Tooltip>;
                }
              },
          },
          {
            title: 'Reserve Price',
            dataIndex: 'reserve_price',
            key: 'reserve_price',
            ellipsis: true,
            width: 120,
            sorter: {
                compare: (a, b) => a.reserve_price - b.reserve_price,
                multiple: 6,
              },
              render: (text, record) => {
                const cellStyle = updateDiff?updateDiff[record.key]?.reserve_price? { color: 'red' } : {} : "";
                if(cellStyle==""){
                    return <div>{text? "RM "+ text.toLocaleString("en-US") : ""}</div>;
                }else{
                    const tooltipContent = updateDiff?.[record.key]?.reserve_price;
                    return  <Tooltip title={tooltipContent}><div style={cellStyle}>{text? "RM "+ text.toLocaleString("en-US") : ""}</div></Tooltip>;
                }
              },
          },
          {
            title: 'Estimate Price',
            dataIndex: 'estimate_price',
            key: 'estimate_price',
            ellipsis: true,
            width: 120,
            sorter: {
                compare: (a, b) => {
                    if (a.estimate_price == null) return -1; // Treat null as the smallest value
                    if (b.estimate_price == null) return 1; // Treat null as the smallest value
                    return a.estimate_price - b.estimate_price; // Normal sorting for non-null values
                  },
                multiple: 7,
              },
              render: (text, record) => {
                const cellStyle = updateDiff?updateDiff[record.key]?.estimate_price? { color: 'red' } : {} : "";
                if(cellStyle==""){
                    return <div>{text? "RM "+ text.toLocaleString("en-US") : ""}</div>;
                }else{
                    const tooltipContent = updateDiff?.[record.key]?.estimate_price;
                    return  <Tooltip title={tooltipContent}><div style={cellStyle}>{text? "RM "+ text.toLocaleString("en-US") : ""}</div></Tooltip>;
                }
              },
          },
          {
            title: 'Extra Info',
            dataIndex: 'extra_info',
            key: 'extra_info',
            ellipsis: true,
            render: (text, record) => {
                const cellStyle = updateDiff?updateDiff[record.key]?.extra_info? { color: 'red' } : {} : "";
                if(cellStyle==""){
                    return <div>{text}</div>;
                }else{
                    const tooltipContent = updateDiff?.[record.key]?.extra_info;
                    return  <Tooltip title={tooltipContent}><div style={cellStyle}>{text}</div></Tooltip>;
                }
              },
          },
          {
            title: 'Size',
            dataIndex: 'size',
            key: 'size',
            ellipsis: true,
            sorter: {
                compare: (a, b) => a.size - b.size,
                multiple: 9,
              },
            render: (text, record) => {
            const cellStyle = updateDiff?updateDiff[record.key]?.size? { color: 'red' } : {} : "";
            if(cellStyle==""){
                return <div>{text.toLocaleString("en-US")}</div>;
            }else{
                const tooltipContent = updateDiff?.[record.key]?.size;
                return  <Tooltip title={tooltipContent}><div style={cellStyle}>{text.toLocaleString("en-US")}</div></Tooltip>;
            }
            },
          },
          {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            width: 200,
            render: (text, record) => {
                const cellStyle = updateDiff?updateDiff[record.key]?.type? { color: 'red' } : {} : "";
                if(cellStyle==""){
                    return <div>{text}</div>;
                }else{
                    const tooltipContent = updateDiff?.[record.key]?.type;
                    return  <Tooltip title={tooltipContent}><div style={cellStyle}>{text}</div></Tooltip>;
                }
              },
          },
          {
            title: 'Tenure',
            dataIndex: 'tenure',
            key: 'tenure',
            ellipsis: true,
            render: (text, record) => {
                const cellStyle = updateDiff?updateDiff[record.key]?.tenure? { color: 'red' } : {} : "";
                if(cellStyle==""){
                    return <div>{text}</div>;
                }else{
                    const tooltipContent = updateDiff?.[record.key]?.tenure;
                    return  <Tooltip title={tooltipContent}><div style={cellStyle}>{text}</div></Tooltip>;
                }
              },
          },
    ];
    
    type propertiesWithKey = properties & {
        key: string; // Add your new field here
    };

    const propertiesArray = Object.values(properties) as properties[];

    const propertiesWithKeyArray: propertiesWithKey[] = propertiesArray.map(property => ({
        ...property,
        key: property.id // Duplicate the id field to Key
    }));

    if(updateDiff){
        Object.keys(updateDiff).forEach(key => {
            if (updateDiff[key].estimate_price===null) {
                updateDiff[key].estimate_price = "N/A"; // Set auction_date to "N/A" if null or undefined
            }
        });

        //console.log(updateDiff);
    }

    return (
        <div className='text-xs'>
        <Table 
            columns={columns} 
            dataSource={propertiesWithKeyArray} 
            size="small"
            bordered
            virtual
            scroll={{ x: 1500, y: 400 }}
            pagination={false}
            //title={() => 'Header'}
            //footer={() => 'Footer'}
            //pagination={{ pageSize: 100 }}
            />
        </div>
    )
};


