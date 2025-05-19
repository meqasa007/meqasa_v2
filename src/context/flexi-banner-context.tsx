"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { getFlexiBanner } from "@/lib/get-flexi-banner";

interface FlexiBannerContextType {
  flexiBanner: string;
  isLoading: boolean;
  error: string | null;
}

const FlexiBannerContext = createContext<FlexiBannerContextType>({
  flexiBanner: "",
  isLoading: false,
  error: null,
});

export function FlexiBannerProvider({ children }: { children: ReactNode }) {
  const [flexiBanner, setFlexiBanner] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFlexiBanner() {
      setIsLoading(true);
      try {
        const banner = await getFlexiBanner();
        setFlexiBanner(banner);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch flexi banner",
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchFlexiBanner();
  }, []);

  return (
    <FlexiBannerContext.Provider value={{ flexiBanner, isLoading, error }}>
      {children}
    </FlexiBannerContext.Provider>
  );
}

export function useFlexiBanner() {
  const context = useContext(FlexiBannerContext);
  if (context === undefined) {
    throw new Error("useFlexiBanner must be used within a FlexiBannerProvider");
  }
  return context;
}
