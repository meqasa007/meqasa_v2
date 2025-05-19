import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ListingDetails } from "@/types";
import PropertyListings from "./property-listings";
import { useMemo } from "react";

/**
 * Represents a property listing with essential details.
 * @typedef {Object} Listing
 * @property {string} detailreq - The detail request identifier
 * @property {string} image - URL of the property image
 * @property {string} streetaddress - The street address of the property
 * @property {string} bathroomcount - Number of bathrooms (renamed from baths)
 * @property {string} bedroomcount - Number of bedrooms (renamed from beds)
 * @property {string} garages - Number of garages
 * @property {string} title - The property title
 * @property {string} contract - The contract type
 * @property {string} price - The property price
 */
type Listing = Pick<
  ListingDetails,
  | "detailreq"
  | "image"
  | "streetaddress"
  | "baths"
  | "beds"
  | "garages"
  | "title"
  | "contract"
  | "price"
> & {
  bathroomcount: string;
  bedroomcount: string;
};

/**
 * Props for the LatestListingsTab component.
 * @interface LatestListingsTabProps
 * @property {Listing[]} rentListings - Array of properties available for rent
 * @property {Listing[]} saleListings - Array of properties available for sale
 * @property {boolean} [isLoading=false] - Whether the listings are currently loading
 * @property {Error|null} [error=null] - Error object if loading failed
 */
interface LatestListingsTabProps {
  rentListings: Listing[];
  saleListings: Listing[];
  isLoading?: boolean;
  error?: Error | null;
}

/**
 * A component that renders a tabbed interface for viewing latest property listings.
 *
 * @component
 * @example
 * ```tsx
 * <LatestListingsTab
 *   rentListings={rentProperties}
 *   saleListings={saleProperties}
 *   isLoading={false}
 *   error={null}
 * />
 * ```
 *
 * @param {LatestListingsTabProps} props - The component props
 * @returns {JSX.Element} A tabbed interface showing rent and sale listings
 *
 * @remarks
 * - The component displays two tabs: "For Rent" and "For Sale"
 * - Each tab shows a list of properties using the PropertyListings component
 * - If no properties are available, a message is displayed
 * - Loading and error states are handled with appropriate UI feedback
 * - The component is fully accessible with proper ARIA attributes
 */
export function LatestListingsTab({
  rentListings,
  saleListings,
  isLoading = false,
  error = null,
}: LatestListingsTabProps) {
  const tabs = useMemo(
    () => [
      { value: "rent", label: "For Rent", listings: rentListings },
      { value: "sale", label: "For Sale", listings: saleListings },
    ],
    [rentListings, saleListings],
  );

  if (error) {
    return (
      <div role="alert" className="text-red-500">
        Error loading listings: {error.message}
      </div>
    );
  }

  if (isLoading) {
    return <div aria-busy="true">Loading listings...</div>;
  }

  return (
    <Tabs defaultValue="rent" className="w-full">
      <TabsList
        className="grid w-[400px] grid-cols-2"
        aria-label="Property listing categories"
      >
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            aria-label={`View properties ${tab.label.toLowerCase()}`}
            className="data-[state=active]:bg-brand-accent font-semibold data-[state=active]:text-white text-brand-muted"
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent
          key={tab.value}
          value={tab.value}
          className="mt-8"
          aria-labelledby={`tab-${tab.value}`}
        >
          {tab.listings.length > 0 ? (
            <PropertyListings listings={tab.listings} />
          ) : (
            <p role="status" aria-live="polite">
              No properties currently available for {tab.label.toLowerCase()}.
              Please check back later.
            </p>
          )}
        </TabsContent>
      ))}
    </Tabs>
  );
}
