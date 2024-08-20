import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { Divider } from "@nextui-org/divider";
import { Image } from "@nextui-org/image";
import { BedSingleIcon, CalculatorIcon, GavelIcon} from "lucide-react";
import { WhatsAppIcon } from "./icons";
import { Link } from "@nextui-org/link";
import { AuctionListing } from "../lib/definitions";
import { formatDateToStr } from "@/lib/utils";
import { Tooltip } from "@nextui-org/tooltip";


interface ListingCardProps {
    listing: AuctionListing;
}

export default function ListingCard({ listing }: ListingCardProps) {

    var whatsappString: string = "https://api.whatsapp.com/send?phone=60122412818&text=[from website] Interested on this ->" + listing.title;

    whatsappString = whatsappString.replace(/ /g,"%20");

    return (
        <Card className="w-full">
            <CardHeader className="absolute z-10 top-1 flex-col !items-start">
            <Chip variant="shadow" color="warning">{listing.type}</Chip>
            </CardHeader>
            <Image
                removeWrapper
                alt="Card background"
                className="z-0 w-full h-60 object-cover"
                src={listing.image_url}
            />
            <CardBody>
                <div className="flex flex-col">
                    <div className="flex-1 flex flex-col justify-between">
                        <div className="flex flex-col p-1 mt-auto min-h-[60px] gap-1">
                            <div className="font-bold text-gray-800">{listing.title}</div>
                        </div>
                        <div className="flex-1 flex-col p-1 mt-auto min-h-[40px] gap-1">
                            <div className="flex flex-col text-gray-800 font-semibold gap-1">
                                <div className="flex flex-row font-bold text-xl gap-2">
                                    <div className="flex items-center gap-1">
                                    RM {listing.reserve_price.toLocaleString('en-US')}
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
                                    <Tooltip content="Estimated Market Prices">{listing.estimate_price!=null?"RM "+listing.estimate_price.toLocaleString('en-US'):"N/A"}</Tooltip>
                                    
                                </div>
                                <div className="flex gap-1 items-center">
                                    <GavelIcon size={14} />
                                    <Tooltip content="Auction Date">
                                        <div className="text-xs">{formatDateToStr(listing.auction_date)}</div>
                                    </Tooltip>
                                </div>
                            </div>
                            <div className="text-gray-600 pt-4 text-xs text-gray-400">{listing.address}</div>
                        </div>
                    </div>
                </div>
            </CardBody>
            <Divider />
            <CardFooter className="text-xs text-gray-500">
                <div className="flex flex-col gap-1">
                    <Chip color="warning" className="text-gray-800" size="sm" radius="sm" variant="bordered">{listing.tenure}</Chip>
                    <div className="flex flex-row lg:flex-row justify-between items-center gap-1">
                        <Chip color="warning" className="text-gray-800" size="sm" radius="sm" variant="bordered">Size: {listing.size.toLocaleString('en-US')} sqft</Chip>
                    </div>
                </div>
            </CardFooter>
        </Card>

    )
}


/*
<div className="border border-gray-300 max-w-lg w-full bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative w-full max-w-sm mx-auto">
                <Chip variant="shadow" color="warning" className="absolute top-2 left-2 text-white px-2 py-2">{listing.type}</Chip>
                <Image className="w-full h-48 object-cover" src={listing.img} alt="Property Image" />
                <RectangleEllipsisIcon className="text-gray-400 absolute bottom-2 right-2 bg-white p-1 rounded-full" />
            </div>
            <div className="flex flex-col p-4">
                <div className="flex-1 flex flex-col justify-between min-h-[160px]">
                    <div className="flex flex-col p-1 mt-auto min-h-[60px] gap-1">
                        <div className="text-gray-800">{listing.title}</div>
                    </div>
                    <div className="flex-1 flex-col p-1 mt-auto min-h-[20px] gap-1">
                        <div className="flex flex-row items-center justify-between text-gray-800 font-semibold gap-1">
                            <div>RM {listing.price.toLocaleString('en-US')}</div>
                            <div className="flex gap-1 text-sm items-center">
                                <GavelIcon size={14} />
                                28 AUG 2024 (MON)
                            </div>
                        </div>
                        <div className="text-gray-600 pt-2 text-xs text-gray-400">{listing.address}</div>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <Divider/>
                    <div className="flex items-center justify-between gap-1 text-xs text-gray-700">
                        <div className="flex gap-1  items-center">
                            *Freehold
                        </div>
                        <div className="flex gap-1 items-center">
                            *LA/BU: 3,498sf/3,064sf
                        </div>
                        <div className="flex gap-1 items-center">
                            *4+1r/5b
                        </div>
                    </div>
                </div>
            </div>
        </div>
*/

