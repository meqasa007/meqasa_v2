import type { DeveloperProject } from "@/types";
import { apiFetch } from "./api-client";

/**
 * Fetches the developer project details for a specific project ID from the MeQasa server.
 *
 * @param projectId - The unique identifier for the developer project to retrieve details for.
 * @returns A promise that resolves with an object of type {@link DeveloperProject},
 *          containing various details about the project.
 * @throws An error if the request fails or the server returns an error.
 */

export async function getDeveloperProject(
  projectId: number,
): Promise<DeveloperProject> {
  const url = `https://meqasa.com/developer-projects/profile/${projectId}?app=vercel`; // Added the `app=vercel` parameter

  return await apiFetch({
    url,
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded", // Set content type to x-www-form-urlencoded
    },
  });
}
