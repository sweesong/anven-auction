import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { Divider } from "@nextui-org/divider";
import { Image } from "@nextui-org/image";
import { CalculatorIcon, GavelIcon} from "lucide-react";
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
