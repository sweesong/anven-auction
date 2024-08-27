import PropertiesContainer from "@/components/properties-container";
import PropertiesSearchBar from "@/components/properties-searchbar";
import { PropertyListingSkeleton } from "@/components/skeleton";
import { Spacer } from "@nextui-org/spacer";
import { Suspense } from "react";

interface PropertyPageProps {
    searchParams?: {
      searchQuery?: string;
      propertyType?: string;
      state?: string;
      minPrice?: number;
      maxPrice?: number;
      minSize?: number;
      maxSize?: number;
      currentPage?: number;
    };
  }
  
export default function PropertyPage({searchParams = {}} : PropertyPageProps){
   
    const { 
      searchQuery = '', 
      propertyType = '00', 
      state = 'All', 
      minPrice = 0,
      maxPrice = 10000000,
      minSize = 0,
      maxSize = 50000,
      currentPage = 1 } = searchParams;

    const suspenseKey = `${searchQuery}-${propertyType}-${state}-${currentPage}-${minPrice}-${maxPrice}-${minSize}-${maxSize}`;

    return (
        <>
          <PropertiesSearchBar />
          <Spacer y={8} />
          <Suspense 
            key={suspenseKey} //make a unique key for suspense to run
            fallback={<PropertyListingSkeleton />}>
            <PropertiesContainer 
                searchQuery={searchQuery}
                propertyType={propertyType}
                state={state}
                minPrice={minPrice}
                maxPrice={maxPrice}
                minSize={minSize}
                maxSize={maxSize}
                currentPage={currentPage}
                />
          </Suspense>
        </>
      );
}