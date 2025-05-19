/**
 * Fetches the flexi banner HTML markup from the server.
 *
 * @returns A promise that resolves with the HTML markup for the flexi banner.
 */
export async function getFlexiBanner(): Promise<string> {
  try {
    const response = await fetch("https://meqasa.com/hp-10", {
      method: "POST",
      headers: {
        Accept: "text/html, application/xhtml+xml",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ app: "vercel" }),
    });

    if (!response.ok) {
      console.error(
        `Flexi banner request failed with status: ${response.status}`,
      );
      throw new Error(`Failed to fetch flexi banner: ${response.status}`);
    }

    const text = await response.text();
    console.log("Flexi banner response:", text);
    return text;
  } catch (error) {
    console.error("Error fetching flexi banner:", error);
    throw error;
  }
}
