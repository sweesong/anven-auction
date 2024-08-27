import PropertyListing from "@/components/properties-list1";
import PropertiesSearchBar from "@/components/properties-searchbar";
import { Spacer } from "@nextui-org/spacer";
import { fetchProperties } from '../../lib/actions';

interface ListingPageProps {
  searchParams: {
    searchQuery?: string;
    propertyType?: string;
    state?: string;
    page?: string;
  };
}

export default async function ListingPage({ searchParams }: ListingPageProps) {

  const { searchQuery = '', propertyType = '', state = 'All' } = searchParams;

  const pageSize = 20; // Number of items per page
  const { totalProperties, properties } = await fetchProperties(1, pageSize, searchQuery,
    propertyType,
    state); // Fetch the first page
  
  return (
    <>
      <PropertiesSearchBar />
      <Spacer y={8} />
      <PropertyListing  auctionListings={properties} totalListings={totalProperties} pageSize={pageSize} />
    </>
  );
}