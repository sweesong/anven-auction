'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

import { SearchIcon } from "./icons";
import { Input } from "@nextui-org/input";
import { Slider } from "@nextui-org/slider";
import { Button } from "@nextui-org/button";
import { Accordion, AccordionItem } from "@nextui-org/accordion";

export default function SearchBar() {

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
    />
  );

  return (

    <Accordion variant="shadow" isCompact>
      <AccordionItem key="1" aria-label="Search Criteria" subtitle="Press to expand" title="Search Criteria">
        <div className="flex flex-col gap-10 pb-5">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="basis-1/2 w-full">
              {searchInput}
            </div>
            <div className="basis-1/4">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Type</SelectItem>
                  <SelectItem value="landed">Terrace</SelectItem>
                  <SelectItem value="condo">Condominium</SelectItem>
                  <SelectItem value="bungalow">Bungalow</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="basis-1/4">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select State" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All State</SelectItem>
                  <SelectItem value="selangor">Selangor</SelectItem>
                  <SelectItem value="penang">Penang</SelectItem>
                  <SelectItem value="johor">Johor</SelectItem>
                </SelectContent>
              </Select>
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
            <Button className="bg-blue-500 text-white" fullWidth={true} endContent={<SearchIcon />}>
              Search
            </Button>
          </div>
        </div>

      </AccordionItem>
    </Accordion>
  )
}