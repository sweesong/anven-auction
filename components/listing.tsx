'use client'

import ListingCard from "./listingcard";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./select";
import { useMemo, useState } from 'react';
import { auction_listings } from "@prisma/client";
import { Pagination } from "@nextui-org/pagination";

type AuctionListingPageProps = {
    auctionListings: auction_listings[];
    totalListings: number;
    pageSize: number;
};

export default function Listing({ auctionListings, totalListings, pageSize }: AuctionListingPageProps) {

    const [sort, setSort] = useState<string>('newest');
    const [currentPage, setCurrentPage] = useState<number>(1);

    // Memoize sorted listings
    const sortedListings = useMemo(() => {
        return [...auctionListings].sort((a, b) => {
            if (sort === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            if (sort === 'recent_auction') return new Date(b.auction_date).getTime() - new Date(a.auction_date).getTime();
            if (sort === 'price_asc') return a.reserve_price - b.reserve_price;
            if (sort === 'price_desc') return b.reserve_price - a.reserve_price;
            return 0;
        });
    }, [sort, auctionListings]);

    // Memoize paginated listings
    const paginatedListings = useMemo(() => {
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return sortedListings.slice(startIndex, endIndex);
    }, [currentPage, sortedListings, pageSize]);

    const handleSortChange = (value: string) => {
        setSort(value);
        setCurrentPage(1); // Reset to first page when sorting changes
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div>
            <div className="flex flex-row justify-between items-center pt-2 pb-5">
                <div>Display 1-{totalListings} of {totalListings.toString()} results</div>
                <div className="w-[180px]">
                    <Select
                        onValueChange={handleSortChange}
                        defaultValue={sort}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Sort By" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="newest">Newest</SelectItem>
                            <SelectItem value="recent_auction">Recent Auction</SelectItem>
                            <SelectItem value="price_desc">Highest Price</SelectItem>
                            <SelectItem value="price_asc">Lowest Price</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {paginatedListings.map(listing => (
                    <ListingCard key={listing.id} listing={listing} />
                ))}
            </div>
            <div className="flex flex-row sm: justify-center md:justify-end">
                <Pagination
                    total={Math.ceil(totalListings / pageSize)}
                    initialPage={currentPage}
                    onChange={handlePageChange}
                    size="lg"
                    showShadow
                    className="flex justify-center mt-5"
                />
            </div>
        </div>
    )
}