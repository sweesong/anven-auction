
import Listing from "@/components/listing";
import SearchBar from "@/components/searchbar";
import { Spacer } from "@nextui-org/spacer";

export default async function Home() {

  return (
    <>
    <SearchBar />
    <Spacer y={8} />
    <Listing />
    </>
   )            
}