'use client'

import {
  Select,
  SelectItem
} from "@nextui-org/select";

import { SearchIcon } from "../lib/icons";
import { Input } from "@nextui-org/input";
import { Slider } from "@nextui-org/slider";
import { Button } from "@nextui-org/button";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { useEffect, useState } from "react";
import { SharedSelection } from "@nextui-org/system";
import { useRouter, useSearchParams } from "next/navigation";

export default function PropertiesSearchBar() {

  const searchParams = useSearchParams();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [state, setState] = useState<SharedSelection>(new Set(["All"]));
  const [selectedKeys, setSelectedKeys] = useState<SharedSelection>(new Set(["00"]));
  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const [sizeRange, setSizeRange] = useState([0, 50000]);

  useEffect(() => {
    // Extract query parameters from the URL
    const querySearch = searchParams.get('searchQuery') || '';
    const queryType = searchParams.get('propertyType') || '00';
    const queryState = searchParams.get('state') || 'All';
    const minPrice = parseInt(searchParams.get('minPrice') || '0', 10);
    const maxPrice = parseInt(searchParams.get('maxPrice') || '10000000', 10);
    const minSize = parseInt(searchParams.get('minSize') || '0', 10);
    const maxSize = parseInt(searchParams.get('maxSize') || '50000', 10);

    // Update state based on query parameters
    setSearchQuery(querySearch);
    setSelectedKeys(new Set(queryType.split(',').length ? queryType.split(',') : ["00"]));
    setState(new Set([queryState]));
    setPriceRange([minPrice, maxPrice]);
    setSizeRange([minSize, maxSize]);
  }, [searchParams]);


  const handleSearch = () => {

    const typeQuery = Array.from(selectedKeys).join(',');
    const stateQuery = Array.from(state).join(',');
    
    const encodedSearchQuery = encodeURIComponent(searchQuery);
    const encodedTypeQuery = encodeURIComponent(typeQuery);
    const encodedStateQuery = encodeURIComponent(stateQuery);

    const minPrice = priceRange[0];
    const maxPrice = priceRange[1];

    const minSize = sizeRange[0];
    const maxSize = sizeRange[1];
    
    const url = `/properties?searchQuery=${encodedSearchQuery}&propertyType=${encodedTypeQuery}&state=${encodedStateQuery}&minPrice=${minPrice}&maxPrice=${maxPrice}&minSize=${minSize}&maxSize=${maxSize}`;

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
      description="you may search the id by just input the number" 
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

  const priceValueChange = (value: any) => {
    setPriceRange(value);
  };

  const sizeValueChange = (value: any) => {
    setSizeRange(value);
  };

  return (
    <Accordion variant="shadow" defaultExpandedKeys="1" isCompact>
      <AccordionItem key="1" aria-label="Search Criteria" subtitle="Press to expand" title="Search Criteria">
        <div className="flex flex-col gap-5 pb-5">
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
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-10 px-2 items-center">
            <div className="flex flex-col items-center md-flex-row w-full">
            <Slider
              label="Price Range (RM)"
              size="sm"
              step={100000}
              minValue={0}
              maxValue={10000000}
              defaultValue={[priceRange[0], priceRange[1]]}
              showTooltip={true}
              showOutline={true}
              formatOptions={{ maximumFractionDigits: 0 }}
              tooltipValueFormatOptions={{ maximumFractionDigits: 0 }}
              className="max-w-md basis-5/5 gap-3"
              onChange={priceValueChange}
            />
            <span className="text-xs text-gray-400">drag both to the max to search for more than 10mil</span>
            </div>
            <div className="flex flex-col items-center md-flex-row w-full">
            <Slider
              label="Area Size (Sqft)"
              size="sm"
              step={250}
              minValue={0}
              maxValue={50000}
              defaultValue={[sizeRange[0], sizeRange[1]]}
              showTooltip={true}
              showOutline={true}
              formatOptions={{ maximumFractionDigits: 0 }}
              tooltipValueFormatOptions={{ maximumFractionDigits: 0 }}
              className="max-w-md basis-5/5 gap-3"
              onChange={sizeValueChange}
            />
            <span className="text-xs text-gray-400">drag both to the max to search for more than 50k</span>
            </div>
            <Button onPress={handleSearch} className="bg-blue-500 text-white" fullWidth={true} endContent={<SearchIcon />}>
              Search
            </Button>
          </div>
        </div>

      </AccordionItem>
    </Accordion>
  )
}