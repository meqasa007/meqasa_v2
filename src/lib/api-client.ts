// eslint-disable-next-line @typescript-eslint/no-unused-vars
type FetchOptions<T> = {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  params?: Record<string, string>;
  headers?: Record<string, string>;
};

/**
 * Makes a request to the given URL with the given parameters.
 *
 * @param url The URL to make the request to.
 * @param method The HTTP method to use.
 * @param params Optional parameters to send in the request body.
 * @param headers Optional headers to send with the request.
 * @returns A promise that resolves with the JSON data returned by the server.
 * @throws An error if the request fails or the server returns an error.
 */
export async function apiFetch<T>({
  url,
  method,
  params,
  headers,
}: FetchOptions<T>): Promise<T> {
  try {
    const options: RequestInit = {
      method,
      headers: {
        // "Content-Type": "application/x-www-form-urlencoded",
        ...headers,
      },
    };

    // Only add body if the method is not GET
    if (params && method !== "GET") {
      options.body = new URLSearchParams(params).toString();
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    return (await response.json()) as T;
  } catch (error) {
    throw new Error(
      `API fetch failed: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}
