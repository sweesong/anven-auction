import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
    size?: number;
  };

export type PropertyCardProps = {
    id: string;
    title: string;
    auction_date: Date;
    city: string;
    address: string;
    reserve_price: number;
    estimate_price: number | null;
    size: number;
    type: string;
    tenure: string;
    extra_info: string | null;
    image_url: string | null;
    createdAt: Date;
    updatedAt: Date | null;
}

/*
export type propertiesNoID = {
    sid: string,
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
*/

export type xlsxProperties = {
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

export type properties = {
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

export const propertiesColumns = [
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

export const propertyTabColumn = [
    {
        key: "id",
        label: "ID",
    },
    {
        key: "title",
        label: "Title",
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