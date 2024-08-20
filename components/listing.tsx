import ListingCard from "./listingcard";
import { fetchAuctionListing } from "../lib/data";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./select";
import { ArrowUpIcon } from "lucide-react";


export default async function Listing() {

    const listings = await fetchAuctionListing();

    return (
        <div>
            <div className="flex flex-row justify-between items-center pt-2 pb-5">
                <div>Showing 1-9 of 13 results</div>
                <div className="w-[180px]">
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Sort By" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="date_desc">Closest Date</SelectItem>
                            <SelectItem value="price_desc">Highest Price</SelectItem>
                            <SelectItem value="price_asc">Lowest Price</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {listings.map(listing => (
                    <ListingCard key={listing.id} listing={listing} />
                ))}
            </div>
        <div/>
    )
}