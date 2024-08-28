import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { Divider } from "@nextui-org/divider";
import { Image } from "@nextui-org/image";
import { CalculatorIcon, GavelIcon } from "lucide-react";
import { WhatsAppIcon } from "../lib/icons";
import { Link } from "@nextui-org/link";
import { formatDateToStr } from "@/lib/utils";
import { Tooltip } from "@nextui-org/tooltip";
import { PropertyCardProps } from "@/lib/types";
import { contactConfig } from "@/config/contact";


export function PropertyCardGrid(property: PropertyCardProps) {

    var whatsappString: string = contactConfig.whatsapp_linkmsg;

    whatsappString = whatsappString.replace("[id]", "[" + property.id + "]");
    whatsappString = whatsappString.replace("[title]", "[" + property.title + "]");
    whatsappString = whatsappString.replace("[address]", "[" + property.address + "]");
    whatsappString = whatsappString.replace("[auctiondate]", "[" + formatDateToStr(property.auction_date) + "]");
    whatsappString = whatsappString.replace("[price]", "[RM " + property.reserve_price.toLocaleString("en-US") + "]");

    whatsappString = whatsappString.replace(/ /g, "%20");

    return (
        <Card className="w-full">
            <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                <Chip variant="shadow" color="warning">{property.type}</Chip>
            </CardHeader>
            <Image
                removeWrapper
                alt="Card background"
                className="z-0 w-full h-60 object-cover"
                src={property.image_url == null ? "placeholder.png" : property.image_url}
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
                                        <Tooltip content="Whatsapp Me">
                                            <Link className="text-green-600"
                                                isExternal
                                                showAnchorIcon
                                                href={whatsappString}
                                                anchorIcon={<WhatsAppIcon />}
                                            />
                                        </Tooltip>
                                    </div>
                                </div>
                                <div className="flex flex-row text-xs text-gray-400 gap-1">

                                    <CalculatorIcon size={14} />
                                    <Tooltip content="Estimated Market Prices">{property.estimate_price != null ? "RM " + property.estimate_price.toLocaleString('en-US') : "N/A"}</Tooltip>

                                </div>
                                <div className="flex gap-1 items-center">
                                    <GavelIcon size={14} />
                                    <Tooltip content="Auction Date">
                                        <div className="text-xs">{formatDateToStr(property.auction_date)}</div>
                                    </Tooltip>
                                </div>
                            </div>
                            <div className="text-gray-600 pt-4 text-xs text-gray-400">{property.address}</div>
                        </div>
                    </div>
                </div>
            </CardBody>
            <Divider />
            <CardFooter className="text-xs text-gray-500">
                <div className="flex flex-col gap-1">
                    <Chip color="warning" className="text-gray-800" size="sm" radius="sm" variant="bordered">Tenure: {property.tenure}</Chip>
                    <div className="flex flex-row lg:flex-row justify-between items-center gap-1">
                        <Chip color="warning" className="text-gray-800" size="sm" radius="sm" variant="bordered">Size: {property.size.toLocaleString('en-US')} sqft</Chip>
                    </div>
                </div>
            </CardFooter>
        </Card>

    )
}

export function PropertyCardList(property: PropertyCardProps) {

    var whatsappString: string = contactConfig.whatsapp_linkmsg;

    whatsappString = whatsappString.replace("[id]", "[" + property.id + "]");
    whatsappString = whatsappString.replace("[title]", "[" + property.title + "]");
    whatsappString = whatsappString.replace("[address]", "[" + property.address + "]");
    whatsappString = whatsappString.replace("[auctiondate]", "[" + formatDateToStr(property.auction_date) + "]");
    whatsappString = whatsappString.replace("[price]", "[RM " + property.reserve_price.toLocaleString("en-US") + "]");

    whatsappString = whatsappString.replace(/ /g, "%20");

    return (
        <Card
            isBlurred
            className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
            shadow="sm"
        >
            <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                <Chip variant="shadow" color="warning">{property.type}</Chip>
            </CardHeader>
            <CardBody>
                <div className="grid grid-cols-12 gap-6 items-center justify-center">
                    <div className="relative col-span-4">
                        <Image
                            alt="Album cover"
                            className="z-0 object-cover"
                            height={200}
                            shadow="md"
                            src={property.image_url == null ? "placeholder.png" : property.image_url}
                            width="100%"
                        />
                    </div>

                    <div className="flex flex-col col-span-8 gap-2">
                        <div className="flex justify-between items-start min-h-[100px] mt-10">
                            <div className="flex flex-col gap-0">
                                <span className="text-xs text-gray-400">#{property.id}</span>
                                <h3 className="font-semibold text-foreground/90">{property.title}</h3>
                                <p className="text-small text-foreground/80 min-h-[40px]">{property.address}</p>
                                <div className="flex flex-row items-center gap-2">
                                <h1 className="text-large font-medium mt-2">RM {property.reserve_price.toLocaleString("en-US")}</h1>
                                <Tooltip content="Whatsapp Me">
                                            <Link className="text-green-600"
                                                isExternal
                                                showAnchorIcon
                                                href={whatsappString}
                                                anchorIcon={<WhatsAppIcon />}
                                            />
                                        </Tooltip>
                                        </div>
                            </div>
                        </div>
                        <div className="flex flex-row text-xs text-gray-400 gap-1">
                            <CalculatorIcon size={14} />
                            <Tooltip content="Estimated Market Prices">{property.estimate_price != null ? "RM " + property.estimate_price.toLocaleString('en-US') : "N/A"}</Tooltip>

                        </div>
                        <div className="flex gap-1 items-center">
                            <GavelIcon size={14} />
                            <Tooltip content="Auction Date">
                                <div className="text-xs">{formatDateToStr(property.auction_date)}</div>
                            </Tooltip>
                        </div>

                        <div className="flex flex-col mt-3 gap-1">
                            <div className="flex justify-between">
                                <p className="text-small"><Chip color="warning" className="text-gray-800" size="sm" radius="sm" variant="bordered">Tenure: {property.tenure}</Chip></p>
                                <p className="text-small text-foreground/50"><Chip color="warning" className="text-gray-800" size="sm" radius="sm" variant="bordered">Size: {property.size.toLocaleString('en-US')} sqft</Chip></p>
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