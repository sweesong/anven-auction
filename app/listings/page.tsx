
import Listing from "@/components/listing";
import SearchBar from "@/components/searchbar";
import { Spacer } from "@nextui-org/spacer";

export default function ListingPage() {
  return (
    <>
    <SearchBar />
    <Spacer y={8} />
    <Listing />
    </>
  );
}
