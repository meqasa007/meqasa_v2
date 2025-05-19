import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Icons } from "@/components/icons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dot } from "lucide-react";
import { PlaceholderImage } from "./placeholder-image";
import { AspectRatio } from "./ui/aspect-ratio";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

export type Unit = {
  unitid: number;
  terms: string;
  unittype: string;
  beds: number;
  baths: number;
  garages: number;
  hasbalcony: number;
  price: number;
  floorarea: number;
  unitname: string;
  fullyfurnished: number;
  availableunits: number;
  sellingprice: number;
  sellingpricecsign: string;
  city: string;
  address: string;
  title: string;
  coverphoto: string;
  unittypename: string;
  unittypeslug: string;
};

export default function UnitCard({ unit }: { unit: Unit }) {
  const [imgError, setImgError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  return (
    <Card
      className="size-full rounded-xl p-0 relative gap-0 border-none shadow-none"
      role="article"
      aria-labelledby={`unit-title-${unit.unitid}`}
    >
      <Link
        href={`/developer-unit/${unit.beds}-bedroom-${unit.unittypename.toLowerCase().split(" ").join("-")}-for-${unit.terms}-in-${unit.city.split(" ").join("-").toLowerCase()}-unit-${unit.unitid}`}
        aria-label={`View details for ${unit.title}`}
        className="focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 rounded-xl"
      >
        <CardHeader className="p-0 border-b border-b-gray-100 gap-0 rounded-xl shadow-elegant-sm">
          <AspectRatio ratio={4 / 3}>
            {!imgError ? (
              <Image
                className={cn(
                  "object-cover rounded-xl transition-opacity duration-300",
                  isLoading ? "opacity-0" : "opacity-100",
                )}
                src={`https://meqasa.com/uploads/imgs/${unit.coverphoto}`}
                onError={() => setImgError(true)}
                onLoad={() => setIsLoading(false)}
                sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
                fill
                loading="lazy"
                alt={`${unit.title} - ${unit.beds} bedroom, ${unit.baths} bathroom property in ${unit.city}`}
                aria-hidden={isLoading}
              />
            ) : (
              <PlaceholderImage
                asChild
                aria-label={`Image placeholder for ${unit.title}`}
                role="img"
              />
            )}
            {isLoading && !imgError && (
              <div
                className="absolute inset-0 bg-gray-100 animate-pulse rounded-xl"
                aria-hidden="true"
                role="presentation"
              />
            )}
          </AspectRatio>

          <div
            className="absolute top-3 left-3 z-10 flex gap-2"
            role="status"
            aria-label="Property status"
          >
            <Badge
              className="rounded-sm bg-brand-accent capitalize"
              aria-label={`Property is ${unit.terms === "sale" ? "for sale" : "for rent"}`}
            >
              {unit.terms === "sale" ? "For Sale" : "For Rent"}
            </Badge>
            {unit.fullyfurnished === 1 && (
              <Badge
                className="rounded-sm bg-brand-primary capitalize"
                aria-label="Property is furnished"
              >
                Furnished
              </Badge>
            )}
          </div>
        </CardHeader>
      </Link>

      <Link
        href={`/developer-unit/${unit.beds}-bedroom-${unit.unittypename.toLowerCase().split(" ").join("-")}-for-${unit.terms}-in-${unit.city.split(" ").join("-").toLowerCase()}-unit-${unit.unitid}`}
        aria-label={`View details for ${unit.title}`}
        className="focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 rounded-xl"
      >
        <CardContent className="px-0 pb-0 space-y-1">
          <CardTitle
            id={`unit-title-${unit.unitid}`}
            className="line-clamp-1 text-xs font-bold text-brand-primary md:text-sm pt-2 capitalize"
          >
            {unit.title}
          </CardTitle>
          <div>
            <span
              className="text-sm capitalize text-brand-muted line-clamp-1"
              aria-label={`Location: ${unit.address}, ${unit.city}`}
            >
              {unit.address}, {unit.city}
            </span>
            <div
              className="mt-1 flex items-center text-sm text-brand-muted"
              aria-label={`${unit.beds} bedrooms, ${unit.baths} bathrooms, ${unit.floorarea} square meters`}
            >
              {unit.beds} Beds{" "}
              <Dot
                className="h-[12px] w-[12px] text-brand-accent"
                aria-hidden="true"
              />{" "}
              {unit.baths} Baths{" "}
              <Icons.dot
                className="h-[12px] w-[12px] text-brand-accent"
                aria-hidden="true"
              />{" "}
              {unit.floorarea} m²
            </div>
            {unit.availableunits > 0 && (
              <div
                className="mt-2 text-sm text-brand-accent font-medium"
                role="status"
                aria-label={`${unit.availableunits} units available`}
              >
                {unit.availableunits} Units Available
              </div>
            )}
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
