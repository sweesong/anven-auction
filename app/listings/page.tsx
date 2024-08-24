import Listing from "@/components/listing";
import SearchBar from "@/components/searchbar";
import { Spacer } from "@nextui-org/spacer";
import { getPaginatedListings } from '../../lib/prisma';

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
  const { totalListings, auctionListings } = await getPaginatedListings(1, pageSize, searchQuery,
    propertyType,
    state); // Fetch the first page
  
  return (
    <>
      <SearchBar />
      <Spacer y={8} />
      <Listing  auctionListings={auctionListings} totalListings={totalListings} pageSize={pageSize} />
    </>
  );
}