"use client";
import {
  Building,
  DollarSign,
  MapPin,
  Search,
  SearchIcon
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
// import MoreFilter from "./more-filter";

const SearchForm = ({ className }: { className?: string }) => {
  // const [activeTab, setActiveTab] = useState("buy");

  const propertyTypeOptions = siteConfig.selectOptions?.propertyType ?? [];
  const bedroomsOptions = siteConfig.selectOptions?.bedrooms ?? [];
  const minPriceOptions = siteConfig.selectOptions?.minPrice ?? [];
  const maxPriceOptions = siteConfig.selectOptions?.maxPrice ?? [];
  const landTypeOptions = siteConfig.selectOptions?.landType ?? [];
  const landSizeOptions = siteConfig.selectOptions?.landSize ?? [];

  return (
    <div
      className={cn(
        "hidden lg:block absolute left-1/2 w-[920px] -translate-x-1/2 -translate-y-1/2 rounded-xl p-5 md:p-6",
        className,
      )}
      style={{ background: "rgba(11,17,52,.75)" }}
    >
      <Tabs
        defaultValue="rent"
        // onValueChange={setActiveTab}
        className="w-full"
      >
        <div className="flex justify-center">
          <TabsList className=" grid h-10 w-1/2 grid-cols-4">
            <TabsTrigger
              value="rent"
              className="text-base  data-[state=active]:bg-rose-500 font-semibold data-[state=active]:text-white text-brand-accent"
            >
              Rent
            </TabsTrigger>
            <TabsTrigger
              value="buy"
              className="text-base data-[state=active]:bg-rose-500 font-semibold data-[state=active]:text-white text-brand-accent"
            >
              Buy
            </TabsTrigger>
            <TabsTrigger
              value="land"
              className="text-base data-[state=active]:bg-rose-500 font-semibold data-[state=active]:text-white text-brand-accent"
            >
              Land
            </TabsTrigger>
            <TabsTrigger
              value="short-let"
              className="text-base data-[state=active]:bg-rose-500 font-semibold data-[state=active]:text-white text-brand-accent"
            >
              Short Let
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="rent" className="animate-fade-in mt-0">
          <form onSubmit={(e) => e.preventDefault()} className="">
            <div className="grid">
              <div className="">
                <div className="relative mt-3 hidden h-[60px] w-full items-center rounded-xl bg-white shadow-sm lg:flex">
                  <Label htmlFor="query" className="sr-only">
                    search
                  </Label>
                  <SearchIcon className="absolute left-4" />
                  <Input
                    id="query"
                    name="search"
                    placeholder="Search for location"
                    className="h-full rounded-xl border-none py-4 pl-[52px] pr-4 text-base font-light text-b-accent shadow-none focus-visible:ring-0  focus-visible:ring-transparent
                  focus-visible:ring-offset-0 lg:rounded-l-xl lg:rounded-r-none 
                  "
                  />
                  <Button
                    type="submit"
                    className="my-1.5 mr-1.5 hidden h-12 w-[115px] rounded-lg bg-primary font-bold  md:block bg-rose-500 hover:bg-rose-500/90"
                  >
                    Search
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-4 mt-2">
              <div className="space-y-2">
                <Label
                  htmlFor="propertyType"
                  className="sr-only text-sm font-medium text-accent-foreground"
                >
                  Property Type
                </Label>
                <div className="relative">
                  <select
                    id="propertyType"
                    name="propertyType"
                    className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  >
                    {propertyTypeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="bedrooms"
                  className="sr-only text-sm font-medium text-accent-foreground"
                >
                  Bedrooms
                </Label>
                <div className="relative">
                  <select
                    id="bedrooms"
                    name="bedrooms"
                    className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  >
                    {bedroomsOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="minPrice"
                  className="sr-only text-sm font-medium text-accent-foreground"
                >
                  Min Price
                </Label>
                <div className="relative">
                  <select
                    id="minPrice"
                    name="minPrice"
                    className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  >
                    {minPriceOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="maxPrice"
                  className="sr-only text-sm font-medium text-accent-foreground"
                >
                  Max Price
                </Label>
                <div className="relative">
                  <select
                    id="maxPrice"
                    name="maxPrice"
                    className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  >
                    {maxPriceOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {/* <div className="space-y-2">
                <MoreFilter />
              </div> */}
            </div>
          </form>
        </TabsContent>

        <TabsContent value="buy" className="animate-fade-in mt-0">
          <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
            <div className="grid grid-cols-3 items-center gap-5">
              <div className="col-span-2">
                {/* <Label
                  htmlFor="location"
                  className="sr-only text-sm font-medium text-accent-foreground"
                >
                  Location
                </Label> */}
                <div className="relative">
                  <MapPin
                    size={18}
                    className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
                  />
                  <Input
                    id="location"
                    placeholder="Enter a location"
                    className="h-12 rounded-lg pl-10 placeholder:text-gray-400"
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="btn-hover-effect h-12 w-full cursor-pointer rounded-lg bg-[#f93a5d] text-base text-white hover:bg-[#f93a5d]/90"
              >
                <Search size={18} className="mr-2" />
                Search
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
              <div className="space-y-2">
                {/* <Label
                  htmlFor={siteConfig.selectOptions.option.propertyType.id}
                  className="sr-only text-sm font-medium text-accent-foreground"
                >
                  {siteConfig.selectOptions.option.propertyType.label}
                </Label> */}
                <Select>
                  <SelectTrigger className="h-12 w-full rounded-lg">
                    <div className="flex items-center">
                      <Building size={18} className="mr-2 text-gray-400" />
                      <SelectValue placeholder="Property types" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {propertyTypeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="bedrooms"
                  className="sr-only text-sm font-medium text-accent-foreground"
                >
                  Bedrooms
                </Label>
                <Select>
                  <SelectTrigger className="h-12 w-full rounded-lg">
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    {bedroomsOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="minPrice"
                  className="sr-only text-sm font-medium text-accent-foreground"
                >
                  Min Price
                </Label>
                <Select>
                  <SelectTrigger className="h-12 w-full rounded-lg">
                    <div className="flex items-center">
                      <DollarSign size={18} className="mr-2 text-gray-400" />
                      <SelectValue placeholder="Any price" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {minPriceOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="maxPrice"
                  className="sr-only text-sm font-medium text-accent-foreground"
                >
                  Max Price
                </Label>
                <Select>
                  <SelectTrigger className="h-12 w-full rounded-lg">
                    <div className="flex items-center">
                      <DollarSign size={18} className="mr-2 text-gray-400" />
                      <SelectValue placeholder="Any price" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {maxPriceOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
          {/* <QuickLinks /> */}
        </TabsContent>

        <TabsContent value="land" className="animate-fade-in mt-0">
          <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
            <div className="grid grid-cols-3 items-center gap-5">
              <div className="col-span-2">
                {/* <Label
                  htmlFor="location"
                  className="sr-only text-sm font-medium text-accent-foreground"
                >
                  Location
                </Label> */}
                <div className="relative">
                  <MapPin
                    size={18}
                    className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
                  />
                  <Input
                    id="location"
                    placeholder="Enter a location"
                    className="h-12 rounded-lg pl-10 placeholder:text-gray-400"
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="btn-hover-effect h-12 w-full cursor-pointer rounded-lg bg-[#f93a5d] text-base text-white hover:bg-[#f93a5d]/90"
              >
                <Search size={18} className="mr-2" />
                Search
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
              <div className="space-y-2">
                <Label
                  htmlFor="landType"
                  className="sr-only text-sm font-medium text-accent-foreground"
                >
                  Land Type
                </Label>
                <div className="relative">
                  <select
                    id="landType"
                    name="landType"
                    className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  >
                    {landTypeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="landSize"
                  className="sr-only text-sm font-medium text-accent-foreground"
                >
                  Land Size
                </Label>
                <div className="relative">
                  <select
                    id="landSize"
                    name="landSize"
                    className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  >
                    {landSizeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="minPrice"
                  className="sr-only text-sm font-medium text-accent-foreground"
                >
                  Min Price
                </Label>
                <Select>
                  <SelectTrigger className="h-12 w-full rounded-lg">
                    <div className="flex items-center">
                      <DollarSign size={18} className="mr-2 text-gray-400" />
                      <SelectValue placeholder="Any price" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {minPriceOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="maxPrice"
                  className="sr-only text-sm font-medium text-accent-foreground"
                >
                  Max Price
                </Label>
                <Select>
                  <SelectTrigger className="h-12 w-full rounded-lg">
                    <div className="flex items-center">
                      <DollarSign size={18} className="mr-2 text-gray-400" />
                      <SelectValue placeholder="Any price" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {maxPriceOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
          {/* <QuickLinks /> */}
        </TabsContent>
        <TabsContent value="short-let" className="animate-fade-in mt-0">
          <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
            <div className="grid grid-cols-3 items-center gap-5">
              <div className="col-span-2">
                {/* <Label
                  htmlFor="location"
                  className="sr-only text-sm font-medium text-accent-foreground"
                >
                  Location
                </Label> */}
                <div className="relative">
                  <MapPin
                    size={18}
                    className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
                  />
                  <Input
                    id="location"
                    placeholder="Enter a location"
                    className="h-12 rounded-lg pl-10 placeholder:text-gray-400"
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="btn-hover-effect h-12 w-full cursor-pointer rounded-lg bg-[#f93a5d] text-base text-white hover:bg-[#f93a5d]/90"
              >
                <Search size={18} className="mr-2" />
                Search
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
              <div className="space-y-2">
                <Label
                  htmlFor="bedrooms"
                  className="sr-only text-sm font-medium text-accent-foreground"
                >
                  Bedroom
                </Label>
                <Select>
                  <SelectTrigger className="h-12 w-full rounded-lg">
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    {bedroomsOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="minPrice"
                  className="sr-only text-sm font-medium text-accent-foreground"
                >
                  Min Price
                </Label>
                <Select>
                  <SelectTrigger className="h-12 w-full rounded-lg">
                    <div className="flex items-center">
                      <DollarSign size={18} className="mr-2 text-gray-400" />
                      <SelectValue placeholder="Any price" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {minPriceOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="maxPrice"
                  className="sr-only text-sm font-medium text-accent-foreground"
                >
                  Max Price
                </Label>
                <Select>
                  <SelectTrigger className="h-12 w-full rounded-lg">
                    <div className="flex items-center">
                      <DollarSign size={18} className="mr-2 text-gray-400" />
                      <SelectValue placeholder="Any price" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {maxPriceOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
          {/* <QuickLinks /> */}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SearchForm;
