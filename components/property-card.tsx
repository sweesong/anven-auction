import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { Divider } from "@nextui-org/divider";
import { CalculatorIcon, GavelIcon, PercentIcon } from "lucide-react";
import { WhatsAppIcon } from "../lib/icons";
import { Link } from "@nextui-org/link";
import { formatDateToStr } from "@/lib/utils";
import { Tooltip } from "@nextui-org/tooltip";
import { PropertyCardProps } from "@/lib/types";
import { contactConfig } from "@/config/contact";
import Image from 'antd/es/image';
import { Spacer } from "@nextui-org/spacer";
import { VERCEL_IMAGE_BASE_URL } from "@/config/constants";

const getWhatsappStr = (property: PropertyCardProps): string => {
    var whatsappString: string = contactConfig.whatsapp_linkmsg;

    whatsappString = whatsappString.replace("[id]", "[" + property.id + "]");
    whatsappString = whatsappString.replace("[title]", "[" + property.title + "]");
    whatsappString = whatsappString.replace("[address]", "[" + property.address + "]");
    whatsappString = whatsappString.replace("[auctiondate]", "[" + formatDateToStr(property.auction_date) + "]");
    whatsappString = whatsappString.replace("[price]", "[RM " + property.reserve_price.toLocaleString("en-US") + "]");

    whatsappString = whatsappString.replace(/ /g, "%20");

    return whatsappString;
};

const getPropertyImageLink = (id: string) : string => {

    const strImageLink = VERCEL_IMAGE_BASE_URL + id.toString() + ".png";

    return strImageLink;
}

export function PropertyCardGrid(property: PropertyCardProps) {

    const whatsappString = getWhatsappStr(property);

    let discountRate : number = -1;

    if(property.estimate_price!=null){
        discountRate = ((property.estimate_price - property.reserve_price) / property.estimate_price) * 100;
        discountRate = Math.ceil(discountRate);
    }

    return (
        <Card className="w-full">
            <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                <Chip variant="shadow" color="warning">{property.type}</Chip>
            </CardHeader>
            <Image
                alt={"image:#" + property.id.toString()}
                className="z-0 w-full h-60 object-cover"
                src={getPropertyImageLink(property.id)}
                fallback="placeholder.png"
                width="100%"
            />
            <CardBody>
                <div className="flex flex-col">
                    <div className="flex-1 flex flex-col justify-between">
                        <div className="flex flex-col p-1 mt-auto min-h-[80px] gap-1">
                            <span className="text-xs text-gray-400">#{property.id}</span>
                            <div className="font-bold text-gray-800">{property.title}</div>
                        </div>
                        <div className="flex-1 flex-col p-1 mt-auto min-h-[40px] gap-1">
                            <div className="flex flex-col text-gray-800 font-semibold gap-1">
                                <div className="flex flex-row font-bold text-xl gap-2">
                                    <div className="flex items-center gap-1">
                                        RM {property.reserve_price.toLocaleString("en-US")}
                                        {discountRate > -1 ? (<Chip size="sm" radius="sm" endContent={<PercentIcon size={10} />} color="danger">-{discountRate}</Chip>) : ''} 
                                    </div>
                                </div>
                                <div className="flex flex-row text-xs text-gray-400 gap-1">
                                    {property.estimate_price != null 
                                    ? (<span className="flex flex-row gap-1"><CalculatorIcon size={14} /> Est. Market Price: RM {property.estimate_price.toLocaleString('en-US')}</span>)
                                    : (<Spacer y={4} />)
                                    }
                                </div>
                                <div className="flex gap-1 items-center">
                                    <GavelIcon size={14} />
                                    <Tooltip content="Auction Date">
                                        <div className="text-xs">{formatDateToStr(property.auction_date)}</div>
                                    </Tooltip>
                                </div>
                            </div>
                            <div className="text-gray-600 pt-4 text-xs text-gray-400">
                                [<Link className="text-sm text-green-600" isExternal showAnchorIcon href={whatsappString} anchorIcon={<WhatsAppIcon size={12} />}>Whatsapp Me<Spacer x={1} /></Link>], {property.address}
                            </div>
                        </div>
                    </div>
                </div>
            </CardBody>
            <Divider />
            <CardFooter className="text-xs text-gray-500 min-h-[80px]">
                <div className="flex flex-wrap gap-1">
                    {property.size > 0 ? <Chip color="warning" className="text-gray-800" size="sm" radius="sm" variant="bordered">Size: {property.size>50000? ((property.size/43560).toLocaleString('en-US') + " acres") : (property.size.toLocaleString('en-US') + "sqft")}</Chip> : ""}
                    {property.tenure != "N/A" ? <Chip color="warning" className="text-gray-800" size="sm" radius="sm" variant="bordered">{property.tenure}</Chip> : ""}
                    {property.extra_info != null ? <Chip color="warning" className="text-gray-800" size="sm" radius="sm" variant="bordered">{property.extra_info}</Chip> : ""}
                </div>
            </CardFooter>
        </Card>

    )
}

export function PropertyCardList(property: PropertyCardProps) {

    const whatsappString = getWhatsappStr(property);

    let discountRate : number = -1;

    if(property.estimate_price!=null){
        discountRate = ((property.estimate_price - property.reserve_price) / property.estimate_price) * 100;
        discountRate = Math.ceil(discountRate);
    }

    return (
        <Card
            isBlurred
            className="border-none bg-background/60 dark:bg-default-100/50"
            shadow="sm"
        >
            <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                <Chip variant="shadow" color="warning">{property.type}</Chip>
            </CardHeader>
            <CardBody>
                <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
                    <div className="relative col-span-6 md:col-span-3">
                        <div className="aspect-w-16 aspect-h-9">
                            <Image
                                alt={"image:#" + property.id.toString()}
                                className="z-0 object-cover md:max-h-[200px]"
                                width="100%"
                                src={getPropertyImageLink(property.id)}
                                fallback="placeholder.png"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col col-span-6 md:col-span-9 gap-2">
                        <div className="flex justify-between items-start">
                            <div className="flex flex-col">
                                <span className="text-xs text-gray-400">#{property.id}</span>
                                <h3 className="font-semibold text-foreground/90">{property.title}</h3>
                                <p className="text-small text-foreground/80">[<Link className="text-sm text-green-600" isExternal showAnchorIcon href={whatsappString} anchorIcon={<WhatsAppIcon size={12}/>}>Whatsapp Me<Spacer x={1} /></Link>], {property.address}</p>
                                <div className="flex flex-row items-center gap-2">
                                    <div className="font-bold text-xl mt-2">
                                        RM {property.reserve_price.toLocaleString("en-US")}
                                    </div>
                                    <div>{discountRate > -1 ? (<Chip radius="sm" size="sm" endContent={<PercentIcon size={10} />} color="danger">-{discountRate}</Chip>) : ''} </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row text-xs text-gray-400 gap-1">
                            {property.estimate_price != null 
                            ? (<span className="flex flex-row gap-1"><CalculatorIcon size={14} /> Est. Market Price: RM {property.estimate_price.toLocaleString('en-US')}</span>) : ""
                            }
                        </div>
                        <div className="flex gap-1 items-center">
                            <GavelIcon size={14} />
                            <Tooltip content="Auction Date">
                                <div className="text-xs">{formatDateToStr(property.auction_date)}</div>
                            </Tooltip>
                        </div>

                        <div className="flex flex-col mt-2 gap-1">
                            <div className="flex gap-2 text-small text-foreground/50">
                            {property.size > 0 ? <Chip color="warning" className="text-gray-800" size="sm" radius="sm" variant="bordered">Size: {property.size>50000? ((property.size/43560).toLocaleString('en-US') + " acres") : (property.size.toLocaleString('en-US') + "sqft")}</Chip> : ""}
                                    {property.tenure != "N/A" ? <Chip color="warning" className="text-gray-800" size="sm" radius="sm" variant="bordered">{property.tenure}</Chip> : ""}
                                    {property.extra_info != null ? <Chip color="warning" className="text-gray-800" size="sm" radius="sm" variant="bordered">{property.extra_info}</Chip> : ""}
                            
                            </div>
                        </div>
                        <div className="flex w-full items-center justify-center">
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}