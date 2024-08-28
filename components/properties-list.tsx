'use client'

import { PropertyCardGrid, PropertyCardList } from "./property-card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./select";
import { useMemo, useState } from 'react';
import { Pagination } from "@nextui-org/pagination";
import { PropertyCardProps } from "@/lib/types";
import { AlignJustifyIcon, Grid2x2Check, Grid2x2CheckIcon, Grid2X2Icon, LayoutGridIcon, LayoutListIcon, ListIcon } from "lucide-react";
import { Button } from "@nextui-org/button";
import { Tooltip } from "@nextui-org/tooltip";

type PropertiesListProps = {
    properties: PropertyCardProps[];
    totalProperties: number;
    pageSize: number;
};

export default function PropertyListing({ properties, totalProperties, pageSize }: PropertiesListProps) {
    const [sort, setSort] = useState<string>('newest');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    const sortedProperties = useMemo(() => {
        return [...properties].sort((a, b) => {
            if (sort === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            if (sort === 'recent_auction') return new Date(a.auction_date).getTime() - new Date(b.auction_date).getTime();
            if (sort === 'price_asc') return a.reserve_price - b.reserve_price;
            if (sort === 'price_desc') return b.reserve_price - a.reserve_price;
            return 0;
        });
    }, [sort, properties]);

    // Memoize paginated listings
    const paginatedProperties = useMemo(() => {
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return sortedProperties.slice(startIndex, endIndex);
    }, [currentPage, sortedProperties, pageSize]);

    const handleSortChange = (value: string) => {
        setSort(value);
        setCurrentPage(1); // Reset to first page when sorting changes
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 100, behavior: 'smooth' });
    };

    // Calculate the displayed range
    const startIndex = (currentPage - 1) * pageSize + 1;
    const endIndex = Math.min(currentPage * pageSize, totalProperties);

    return (
        <div>
            <div className="flex flex-row justify-between items-center pt-2 pb-5">
                <div>Displaying {startIndex}-{endIndex} of {totalProperties} results</div>
                <div className="flex flex-row items-center gap-2 ">
                    <div className="hidden sm:flex">
                        <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            aria-label="Like"
                            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}>
                            {

                                viewMode === 'grid' ? <Tooltip content="Go to List View"><LayoutListIcon color="grey" /></Tooltip> : <Tooltip content="Go to Grid View"><LayoutGridIcon color="grey" /></Tooltip>

                            }
                        </Button>
                    </div>
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
            </div>
            {
                viewMode === 'grid' ?
                    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                        {paginatedProperties.map(property => (
                            <PropertyCardGrid key={property.id} {...property} />
                        ))}
                    </div>
                    :
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                        {paginatedProperties.map(property => (
                            <PropertyCardList key={property.id} {...property} />
                        ))}
                    </div>
            }
            <div className="flex flex-row sm: justify-center md:justify-end">
                <Pagination
                    total={Math.ceil(totalProperties / pageSize)}
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