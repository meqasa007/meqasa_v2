"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Camera, Dot, Phone } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

import { AddFavoriteButton } from "@/components/add-favorite-button";
import { ImageWithFallback } from "@/components/common/image-with-fallback";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { TopAdBadge } from "@/components/ui/premium-badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import { buildInnerHtml, cn } from "@/lib/utils";
import { DeveloperContactCard } from "@/components/developer/cards/developer-contact-card";
import type { MeqasaListing } from "@/types/meqasa";

export function ResultsCard({ result }: { result: MeqasaListing }) {
  const [isOpen, setIsOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Compute details page link and cleanPath for listingId extraction
  let detailsLink = "";
  let cleanPath = "";
  if (result.isunit) {
    const citySlug =
      result.locationstring?.split(" ").join("-").toLowerCase() || "";
    const typeSlug = result.type?.toLowerCase().split(" ").join("-") || "";
    detailsLink = `/developer-unit/${result.bedroomcount}-bedroom-${typeSlug}-for-${result.contract}-in-${citySlug}-unit-${result.listingid}`;
    cleanPath = `-${result.listingid}`; // fallback for unit
  } else {
    cleanPath = result.detailreq
      ? result.detailreq.replace(/^https?:\/\/[^/]+\//, "")
      : "";
    detailsLink = `/listings${cleanPath}`;
  }

  // Extract listing ID from cleanPath for the favorite button
  const listingIdMatch = /-(\d+)$/.exec(cleanPath);
  const listingId = parseInt(
    listingIdMatch?.[1] ?? result.listingid ?? "0",
    10,
  );

  const agentImageUrl = result.owner.image?.startsWith("http")
    ? result.owner.image
    : result.owner.image
      ? `https://meqasa.com/fascimos/somics/${result.owner.image}`
      : "";

  return (
    <Card className="flex flex-col gap-4 rounded-lg py-0 text-brand-accent shadow-none transition-all duration-300 hover:shadow-md md:flex-row md:border md:border-brand-border md:p-4 md:hover:shadow-sm md:hover:border-brand-primary/30">
      <CardHeader className="min-w-[256px] sm:min-w-[300px] p-0 relative">
        <div className="relative min-h-[202px] sm:min-h-[225px] min-w-[256px] sm:min-w-[300px] overflow-hidden rounded-lg group-hover:scale-[1.02] transition-transform duration-300">
          <Link href={detailsLink} className="absolute inset-0 z-10" aria-label={`View details for ${result.summary}`}>
            <AspectRatio ratio={4 / 3}>
              {/* Loading Skeleton - only show when image hasn't loaded */}
              {!imageLoaded && (
                <div className="absolute inset-0 z-10">
                  <Skeleton className="h-[202px] sm:h-[225px] w-full rounded-lg animate-pulse" />
                </div>
              )}

              <ImageWithFallback
                className={cn(
                  "relative z-20 h-[202px] sm:h-[225px] w-full rounded-lg object-cover transition-all duration-300",
                  imageLoaded ? "opacity-100" : "opacity-0"
                )}
                src={result.image}
                alt={result.summary || "Property image"}
                width={300}
                height={225}
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 300px"
                quality={85}
                fallbackAlt={`${result.summary || "Property"} - Image not available`}
                priority={false}
                onLoad={() => setImageLoaded(true)}
              />
            </AspectRatio>
          </Link>

          {/* Top Ad Badge */}
          {result.istopad && (
              <Badge className="absolute left-4 top-4 z-30 h-6 bg-brand-accent text-white uppercase tracking-wide shadow-sm">
              {result.availability}
            </Badge>
 
          )}

          {/* Favorite Button - Enhanced positioning */}
          {listingId > 0 && (
            <div className="absolute right-3 top-3 z-30 opacity-80 group-hover:opacity-100 transition-opacity duration-200">
              <AddFavoriteButton listingId={listingId} />
            </div>
          )}

          {/* Photo Count Button */}
            <Badge
            className="absolute bottom-3 right-3 z-30 bg-black/70 text-white text-xs sm:text-sm hover:bg-black/90 transition-colors duration-200"
            aria-label={`View ${result.photocount} photos`}
          >
            <Camera className="mr-1.5 h-3 w-3 sm:h-4 sm:w-4" />
            <span>{result.photocount}</span>
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col justify-between px-4 pb-4 md:p-0">
        <div>
          <Link href={detailsLink}>
            <h3 className="font-bold capitalize text-brand-accent text-base sm:text-lg leading-tight line-clamp-2">
              {result.summary}
            </h3>
          </Link>

          {/* Price Section - Enhanced */}
          <div className="flex h-fit items-baseline gap-2 pt-2 sm:pt-3">
            <span
              className="text-lg font-bold text-brand-primary leading-tight sm:text-xl"
              dangerouslySetInnerHTML={buildInnerHtml(result.pricepart1)}
            />
            {result.pricepart2 && (
              <span className="text-sm font-medium text-brand-muted leading-tight sm:text-base">
                {result.pricepart2}
              </span>
            )}
          </div>

          {/* Description */}
          {result.description && (
            <p
              className="line-clamp-2 pt-2 sm:pt-3 text-sm text-brand-muted leading-relaxed transition-colors group-hover:text-gray-700 sm:text-base"
              dangerouslySetInnerHTML={buildInnerHtml(result.description)}
            />
          )}

          {/* Property Details - Enhanced */}
          <div className="flex items-center justify-between gap-2 pt-2 sm:pt-3 text-sm sm:text-base">
            <div className="flex items-center gap-1 text-brand-muted flex-wrap sm:flex-nowrap overflow-hidden">
              {result.bedroomcount && (
                <div className="flex items-center gap-1 whitespace-nowrap">
                  <span className="font-medium">
                    {result.bedroomcount} Bed{parseInt(result.bedroomcount) !== 1 ? 's' : ''}
                  </span>
                  {(result.bathroomcount || result.garagecount || result.floorarea) && (
                    <Dot className="h-3 w-3 sm:h-4 sm:w-4 text-brand-accent flex-shrink-0" />
                  )}
                </div>
              )}
              {result.bathroomcount && (
                <div className="flex items-center gap-1 whitespace-nowrap">
                  <span className="font-medium">
                    {result.bathroomcount} Bath{parseInt(result.bathroomcount) !== 1 ? 's' : ''}
                  </span>
                  {(result.garagecount || result.floorarea) && (
                    <Dot className="h-3 w-3 sm:h-4 sm:w-4 text-brand-accent flex-shrink-0" />
                  )}
                </div>
              )}
              {result.garagecount && (
                <div className="flex items-center gap-1 whitespace-nowrap">
                  <span className="font-medium">
                    {result.garagecount} Parking
                  </span>
                  {result.floorarea && (
                    <Dot className="h-3 w-3 sm:h-4 sm:w-4 text-brand-accent flex-shrink-0" />
                  )}
                </div>
              )}
              {result.floorarea && (
                <span className="font-medium whitespace-nowrap">
                  {result.floorarea} m²
                </span>
              )}
            </div>

            {/* Top Ad Badge for Mobile */}
            {result.istopad && (
              <TopAdBadge size="sm" />
            )}
          </div>
        </div>

        <CardFooter className="mt-4 flex items-center justify-between p-0">
          {/* Agent Info */}
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border border-brand-border shadow-sm transition-transform group-hover:scale-105">
              <AvatarImage
                src={agentImageUrl}
                className="rounded-full object-cover"
                alt={`${result.owner.name || "Agent"} avatar`}
              />
              <AvatarFallback className="flex h-10 w-10 items-center justify-center rounded-full border bg-slate-50 text-sm sm:text-base font-semibold text-brand-accent">
                {result.owner.name
                  ? result.owner.name.slice(0, 2).toUpperCase()
                  : "NA"}
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col">
              {result.owner.name && (
                <span className="text-sm font-medium text-brand-accent line-clamp-1 sm:text-base md:hidden">
                  {result.owner.name}
                </span>
              )}
              <div className="hidden md:block">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="line-clamp-1 w-fit text-left text-sm text-brand-muted cursor-help hover:text-brand-accent transition-colors sm:text-base">
                        Updated {result.recency}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Updated {result.recency}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <span className="text-xs text-brand-muted md:hidden sm:text-sm">
                Updated {result.recency}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 shadow-none text-brand-accent border-brand-border hover:shadow-sm"
                  aria-label={`Contact ${result.owner.name || "agent"}`}
                >
                  <Phone className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg w-full overflow-hidden p-4 sm:p-6">
                <DeveloperContactCard
                  developerName={result.owner.name || "Agent"}
                  developerId={result.listingid}
                  logoSrc={agentImageUrl}
                  fallbackImage="/placeholder-image.png"
                  onClose={() => setIsOpen(false)}
                />
              </DialogContent>
            </Dialog>

            <Link
              href={detailsLink}
              className={cn(
                buttonVariants({ variant: "default", size: "sm" }),
                "w-28 sm:w-32 font-semibold bg-brand-primary hover:bg-brand-primary-dark text-white transition-all duration-200 hover:shadow-md active:scale-95",
              )}
            >
              <span className="hidden sm:inline">View details</span>
              <span className="sm:hidden">Details</span>
            </Link>
          </div>
        </CardFooter>
      </CardContent>
    </Card>
  );
}
