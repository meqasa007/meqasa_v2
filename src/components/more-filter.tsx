import { Filter } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function MoreFilter() {
  return (
    <Popover>
      <PopoverTrigger className="flex min-w-[150px] max-w-[150px] cursor-pointer items-center  rounded-lg text-base font-medium text-white">
        More filters <Filter className="ml-2 h-5 w-5" />
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-4">
        <div className="mb-4 grid grid-cols-2 items-center gap-2">
          <Select name="period">
            <SelectTrigger className="h-11 min-w-fit font-semibold text-b-accent">
              <SelectValue placeholder="Rent period" />
            </SelectTrigger>
            <SelectContent className="text-b-accent">
              <SelectGroup>
                {[
                  { label: "Daily", value: "day" },
                  { label: "Weekly", value: "week" },
                  { label: "Up to 6 months", value: "month" },
                  { label: "12 months plus", value: "year" },
                ].map((str, i) => (
                  <SelectItem
                    value={str.value}
                    className="py-1.5 hover:text-b-accent"
                    key={i}
                  >
                    {str.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select name="sort">
            <SelectTrigger className="h-11 min-w-full font-semibold text-b-accent">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="border-none text-b-accent shadow-spread">
              <SelectGroup>
                {[
                  { label: "New to old", value: "new" },
                  { label: "Old to new", value: "old" },
                  { label: "Lower to higher", value: "low" },
                  { label: "Higher to lower", value: "high" },
                ].map((str, i) => (
                  <SelectItem
                    value={str.value}
                    className="py-1.5 hover:text-b-accent"
                    key={i}
                  >
                    {str.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {/* <div className="border-b pb-4 ">
      <RadioGroup
        defaultValue="1"
        name="beds"
        className="flex flex-wrap items-center"
      >
        <div className="flex items-center space-x-1 rounded-full border px-2 py-1.5 ">
          <RadioGroupItem value="1" id="r1" />
          <Label htmlFor="r1" className="cursor-pointer text-xs">
            1 Bedroom
          </Label>
        </div>
        <div className="flex items-center space-x-1 rounded-full border px-2 py-1.5 ">
          <RadioGroupItem value="2" id="r2" />
          <Label htmlFor="r2" className="cursor-pointer text-xs">
            2 Bedrooms
          </Label>
        </div>
        <div className="flex items-center space-x-1 rounded-full border px-2 py-1.5 ">
          <RadioGroupItem value="3" id="r3" />
          <Label htmlFor="r3" className="cursor-pointer text-xs">
            3 Bedrooms
          </Label>
        </div>
        <div className="flex items-center space-x-1 rounded-full border px-2 py-1.5 ">
          <RadioGroupItem value="4" id="r4" />
          <Label htmlFor="r4" className="cursor-pointer text-xs">
            4 Bedrooms
          </Label>
        </div>
        <div className="flex items-center space-x-1 rounded-full border px-2 py-1.5 ">
          <RadioGroupItem value="5" id="r5" />
          <Label htmlFor="r5" className="cursor-pointer text-xs">
            5 Bedrooms
          </Label>
        </div>
      </RadioGroup>
    </div> */}
        <div className="flex items-start justify-between pt-8 text-sm font-semibold text-b-accent">
          <span>Only show...</span>
          <div>
            <div className="mb-2 flex items-center space-x-2">
              <Checkbox
                id="furnished"
                name="furn"
                className="data-[state=checked]:border-0 data-[state=checked]:bg-primary data-[state=checked]:text-white"
              />
              <label
                htmlFor="furnished"
                className="cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Furnished Properties
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="owner"
                name="own"
                className="data-[state=checked]:border-0 data-[state=checked]:bg-primary data-[state=checked]:text-white"
              />
              <label
                htmlFor="owner"
                className="cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                For by Owner
              </label>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
