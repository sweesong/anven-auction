import Listing from "@/components/listing";
import SearchBar from "@/components/searchbar";
import { Spacer } from "@nextui-org/spacer";
import { getPaginatedListings } from '../../lib/prisma';

export default async function ListingPage() {

  const pageSize = 20; // Number of items per page
  const { totalListings, auctionListings } = await getPaginatedListings(1, pageSize); // Fetch the first page

  console.log("refresh data");

  return (
    <>
    <SearchBar />
    <Spacer y={8} />
    <Listing  auctionListings={auctionListings} totalListings={totalListings} pageSize={pageSize} />
    </>
  );
}
