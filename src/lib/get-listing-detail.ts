import { apiFetch } from "./api-client";
import type { ListingDetails } from "@/types";

export interface SimilarListings extends ListingDetails {
  summary: string;
}

/**
 * Fetches the listing details for a specific listing ID from the MeQasa server.
 *
 * @param id - The unique identifier for the listing to retrieve details for.
 * @returns A promise that resolves with an object of type {@link SimilarListings},
 * which includes various details such as the summary of the listing.
 * @throws An error if the request fails or the server returns an error.
 */

export async function getListingDetails(id: string): Promise<SimilarListings> {
  const url = "https://meqasa.com/mqrouter/ref";

  return await apiFetch<SimilarListings>({
    url,
    method: "POST",
    params: {
      refref: id,
      app: "vercel",
    },
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
