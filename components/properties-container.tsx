import { fetchProperties } from "@/lib/actions";
import PropertyListing from "./properties-list";
import { SearchIcon } from "lucide-react";

export default async function PropertiesContainer({
    searchQuery,
    propertyType,
    state,
    minPrice,
    maxPrice,
    minSize,
    maxSize,
    currentPage
}: {
    searchQuery: string;
    propertyType: string;
    state: string;
    minPrice: number;
    maxPrice: number;
    minSize: number;
    maxSize: number;
    currentPage?: number;
}) {

    const pageSize = 20; // Number of items per page

    const { totalProperties, properties } = await fetchProperties(
        1, 
        pageSize, 
        searchQuery,
        propertyType,
        state,
        minPrice,
        maxPrice,
        minSize,
        maxSize,
    );
    
    if(totalProperties===0){
        return (
            <div className="flex w-full items-center justify-center gap-2 pt-10">
            <SearchIcon />
            <span>{"We're sorry. We couldn't find any results based on your criteria."}</span>
            </div>
        )
    }

    return (
        <div>
            <PropertyListing properties={properties} totalProperties={totalProperties} pageSize={pageSize} />
        </div>
    )
}