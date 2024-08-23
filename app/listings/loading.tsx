import SearchBar from "@/components/searchbar";
import React from "react";
import { Card } from "@nextui-org/card";
import { Skeleton } from "@nextui-org/skeleton";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/select";
import { Spacer } from "@nextui-org/spacer";



export default function Loading() {

    const cardSkeletons = [];

    for (let i = 0; i < 10; i++) {
        cardSkeletons.push(<CardSkeleton key={i}/>);
    }

    return (
        <>
            <SearchBar />
            <Spacer y={8} />
            <div>
                <div className="flex flex-row justify-between items-center pt-2 pb-5">
                    <div>Retrieving results...</div>
                    <div className="w-[180px]">
                        <Select>
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
                    {cardSkeletons}
                </div>
            </div>
        </>
    );
}


export function CardSkeleton() {
    return (
        <Card className="w-full space-y-5 p-4" radius="lg">
            <Skeleton className="rounded-lg">
                <div className="h-24 rounded-lg bg-default-300"></div>
            </Skeleton>
            <div className="space-y-3">
                <Skeleton className="w-3/5 rounded-lg">
                    <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="w-4/5 rounded-lg">
                    <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="w-2/5 rounded-lg">
                    <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                </Skeleton>
            </div>
        </Card>
    );
}
