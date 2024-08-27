import PropertiesContainer from "@/components/properties-container";
import PropertiesSearchBar from "@/components/properties-searchbar";
import { PropertyListingSkeleton } from "@/components/skeleton";
import { Spacer } from "@nextui-org/spacer";
import { Suspense } from "react";

interface PropertyPageProps {
    searchParams: {
      searchQuery: string;
      propertyType: string;
      state: string;
      currentPage: number;
    };
  }
  
export default function PropertyPage({searchParams} : PropertyPageProps){
   
    const { searchQuery = '', propertyType = '00', state = 'All', currentPage = 1 } = searchParams;

    return (
        <>
          <PropertiesSearchBar />
          <Spacer y={8} />
          <Suspense 
            key={searchParams.searchQuery + searchParams.propertyType + searchParams.state + searchParams.currentPage} //make a unique key for suspense to run
            fallback={<PropertyListingSkeleton />}>
            <PropertiesContainer 
                searchQuery={searchParams.searchQuery}
                propertyType={searchParams.propertyType}
                state={searchParams.state}
                currentPage={searchParams.currentPage}
                />
          </Suspense>
        </>
      );
}