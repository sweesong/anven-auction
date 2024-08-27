import { PropertyListingSkeleton } from "@/components/skeleton";
import PropertiesSearchBar from "@/components/properties-searchbar";
import { Spacer } from "@nextui-org/spacer";

export default function Loading() {
    return (
        <>
            <PropertiesSearchBar />
            <Spacer y={8} />
            <PropertyListingSkeleton />
        </>
    );
}