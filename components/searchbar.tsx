'use client'

import {
  Select,
  SelectItem
} from "@nextui-org/select";

import { SearchIcon } from "./icons";
import { Input } from "@nextui-org/input";
import { Slider } from "@nextui-org/slider";
import { Button } from "@nextui-org/button";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { useEffect, useState } from "react";
import { SharedSelection } from "@nextui-org/system";
import { useRouter, useSearchParams } from "next/navigation";

interface SearchBarProps {
  initialParams: {
    searchQuery?: string;
    propertyType?: string;
    state?: string;
  };
}

export default function SearchBar() {

  const searchParams = useSearchParams();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [state, setState] = useState<SharedSelection>(new Set(["All"]));
  const [selectedKeys, setSelectedKeys] = useState<SharedSelection>(new Set(["00"]));

  useEffect(() => {
    // Extract query parameters from the URL
    const querySearch = searchParams.get('searchQuery') || '';
    const queryType = searchParams.get('propertyType') || '';
    const queryState = searchParams.get('state') || 'All';

    // Update state based on query parameters
    setSearchQuery(querySearch);
    setSelectedKeys(new Set(queryType.split(',').length ? queryType.split(',') : ["00"]));
    setState(new Set([queryState]));
  }, [searchParams]);


  const handleSearch = () => {

    const typeQuery = Array.from(selectedKeys).join(',');
    const stateQuery = Array.from(state).join(',');
    
    const encodedSearchQuery = encodeURIComponent(searchQuery);
    const encodedTypeQuery = encodeURIComponent(typeQuery);
    const encodedStateQuery = encodeURIComponent(stateQuery);
    
    const url = `/listings?searchQuery=${encodedSearchQuery}&propertyType=${encodedTypeQuery}&state=${encodedStateQuery}`;

    router.push(url);
  }

  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      labelPlacement="outside"
      placeholder="Search your dream properties ..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  );

  const handlePropertyTypeChange = (keys: SharedSelection) => {
    const selectedKeysSet = new Set(keys);
    const keysArray = Array.from(keys);
    
    if(Array.from(keys).length==0){
      setSelectedKeys(new Set(["00"]));
    }else if(Array.from(keys).length==1 && keysArray[0]=="00"){
      setSelectedKeys(new Set(["00"]));
    }else if(Array.from(keys).length>1 && keysArray[keysArray.length - 1]=="00"){
      setSelectedKeys(new Set(["00"]));
    }else if(Array.from(keys).length>1 && keysArray[0]=="00"){
      selectedKeysSet.delete("00")
      setSelectedKeys(selectedKeysSet);
    }else if(Array.from(keys).length==7 && !selectedKeysSet.has("00")){
      setSelectedKeys(new Set(["00"]));
    }else{
      setSelectedKeys(selectedKeysSet);
    }
  };

  return (
    <Accordion variant="shadow" defaultExpandedKeys="1" isCompact>
      <AccordionItem key="1" aria-label="Search Criteria" subtitle="Press to expand" title="Search Criteria">
        <div className="flex flex-col gap-10 pb-5">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="basis-1/2 w-full">
              {searchInput}
            </div>
            <div className="basis-1/4">
              <Select 
                description="you may select more than 1 type" 
                placeholder="Select Property Type" 
                className="lg:max-w-xs" 
                selectionMode="multiple"
                selectedKeys={selectedKeys}
                onSelectionChange={handlePropertyTypeChange}
                >
                  <SelectItem key="00">All Type</SelectItem>
                  <SelectItem key="01">Apartment/Flat/Condo/SOHO</SelectItem>
                  <SelectItem key="02">Factory/Warehouse</SelectItem>
                  <SelectItem key="03">Hotel/Resott/Clubhouse</SelectItem>
                  <SelectItem key="04">Land</SelectItem>
                  <SelectItem key="05">Semi D/Bungalow/Villa</SelectItem>
                  <SelectItem key="06">Shop/Shop Office/Retail Space/Office</SelectItem>
                  <SelectItem key="07">Terrace/Townhouse/Link</SelectItem>
              </Select>
              {/* <Select value={propertyType} onValueChange={(value) => setPropertyType(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="00">All Type</SelectItem>
                  <SelectItem value="01">Apartment/Flat/Condo/SOHO</SelectItem>
                  <SelectItem value="02">Factory/Warehouse</SelectItem>
                  <SelectItem value="03">Hotel/Resott/Clubhouse</SelectItem>
                  <SelectItem value="04">Land</SelectItem>
                  <SelectItem value="05">Semi D/Bungalow/Villa</SelectItem>
                  <SelectItem value="06">Shop/Shop Office/Retail Space/Office</SelectItem>
                  <SelectItem value="07">Terrace/Townhouse/Link</SelectItem>
                </SelectContent>
              </Select> */}
            </div>
            <div className="basis-1/4">
              <Select 
                placeholder="Select State" 
                className="lg:max-w-xs"
                selectedKeys={state}
                onSelectionChange={setState}
              >
                  <SelectItem key="All">All State</SelectItem>
                  <SelectItem key="Johor">Johor</SelectItem>
                  <SelectItem key="Kedah">Kedah</SelectItem>
                  <SelectItem key="Kelantan">Kelantan</SelectItem>
                  <SelectItem key="Kuala Lumpur">Kuala Lumpur</SelectItem>
                  <SelectItem key="Labuan">Labuan</SelectItem>
                  <SelectItem key="Melaka">Melaka</SelectItem>
                  <SelectItem key="Negeri Sembilan">Negeri Sembilan</SelectItem>
                  <SelectItem key="Pahang">Pahang</SelectItem>
                  <SelectItem key="Perak">Perak</SelectItem>
                  <SelectItem key="Pulau Pinang">Pulau Pinang</SelectItem>
                  <SelectItem key="Putrajaya">Putrajaya</SelectItem>
                  <SelectItem key="Sabah">Sabah</SelectItem>
                  <SelectItem key="Sarawak">Sarawak</SelectItem>
                  <SelectItem key="Selangor">Selangor</SelectItem>
                  <SelectItem key="Terengganu">Terengganu</SelectItem>
                </Select>
              {/* <Select value={state} onValueChange={(value) => setState(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select State" defaultValue="All"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All State</SelectItem>
                  <SelectItem value="Johor">Johor</SelectItem>
                  <SelectItem value="Kedah">Kedah</SelectItem>
                  <SelectItem value="Kelantan">Kelantan</SelectItem>
                  <SelectItem value="Kuala Lumpur">Kuala Lumpur</SelectItem>
                  <SelectItem value="Labuan">Labuan</SelectItem>
                  <SelectItem value="Melaka">Melaka</SelectItem>
                  <SelectItem value="Negeri Sembilan">Negeri Sembilan</SelectItem>
                  <SelectItem value="Pahang">Pahang</SelectItem>
                  <SelectItem value="Perak">Perak</SelectItem>
                  <SelectItem value="Pulau Pinang">Pulau Pinang</SelectItem>
                  <SelectItem value="Putrajaya">Putrajaya</SelectItem>
                  <SelectItem value="Sabah">Sabah</SelectItem>
                  <SelectItem value="Sarawak">Sarawak</SelectItem>
                  <SelectItem value="Selangor">Selangor</SelectItem>
                  <SelectItem value="Terengganu">Terengganu</SelectItem>
                </SelectContent>
              </Select> */}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-10 px-2 items-center">
            <Slider
              label="Price Range"
              size="sm"
              step={100}
              minValue={0}
              maxValue={5000000}
              defaultValue={[0, 5000000]}
              formatOptions={{ style: "currency", currency: "MYR" }}
              className="max-w-md basis-5/5 gap-3"
            />
            <Slider
              label="Area Size (sqft)"
              size="sm"
              step={10}
              minValue={300}
              maxValue={10000}
              defaultValue={[300, 10000]}
              className="max-w-md basis-5/5 gap-3"
            />
            <Button onPress={handleSearch} className="bg-blue-500 text-white" fullWidth={true} endContent={<SearchIcon />}>
              Search
            </Button>
          </div>
        </div>

      </AccordionItem>
    </Accordion>
  )
}