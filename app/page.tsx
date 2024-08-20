
import Listing from "@/components/listing";
import SearchBar from "@/components/searchbar";
import { Spacer } from "@nextui-org/spacer";

export default function Home() {

  return (
    <>
    <SearchBar />
    <Spacer y={8} />
    <Listing />
    </>
   )            
}