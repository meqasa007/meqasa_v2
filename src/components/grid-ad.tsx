"use client";

import { ImageWithFallback } from "@/components/common/image-with-fallback";
import { buildRichInnerHtml } from "@/lib/utils";
import { useEffect, useState } from "react";
import { GridBannerSkeleton } from "./streaming/GridBannerSkeleton";
import { Card } from "./ui/card";

interface GridAdProps {
  flexiBanner: string;
  error?: string;
}

/**
 * Unified GridAd Component with Fallbacks
 *
 * - Preloads all banner + static images before rendering.
 * - Shows skeleton until images are ready (with 3s fallback).
 * - Uses blur-up + fallback images for resilience.
 */
export default function GridAd({ flexiBanner, error }: GridAdProps) {
  const [mounted, setMounted] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadedMap, setLoadedMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Extract <img src=""> URLs from flexiBanner HTML
    const extractImageUrls = (html: string): string[] => {
      try {
        const doc = new DOMParser().parseFromString(html, "text/html");
        return Array.from(doc.querySelectorAll("img"))
          .map((img) => img.src)
          .filter(Boolean);
      } catch {
        return [];
      }
    };

    // Static images we always preload
    const staticImageUrls = [
      "https://dve7rykno93gs.cloudfront.net/pieoq/1572277987.webp",
      "https://dve7rykno93gs.cloudfront.net/pieoq/1649141906.webp",
    ];

    const flexiBannerImageUrls = extractImageUrls(flexiBanner);
    const allImageUrls = [...staticImageUrls, ...flexiBannerImageUrls];

    let loadedCount = 0;
    const totalImages = allImageUrls.length;

    const markLoaded = (url: string) => {
      loadedCount++;
      setLoadedMap((prev) => ({ ...prev, [url]: true }));
      if (loadedCount >= totalImages) {
        setTimeout(() => setImagesLoaded(true), 100); // smooth transition
      }
    };

    // Preload images
    allImageUrls.forEach((url) => {
      const img = new window.Image();
      img.onload = () => markLoaded(url);
      img.onerror = () => markLoaded(url);
      img.src = url;
    });

    // Fallback: if images still not loaded after 3s, show content
    const fallbackTimer = setTimeout(() => setImagesLoaded(true), 3000);
    return () => clearTimeout(fallbackTimer);
  }, [mounted, flexiBanner]);

  // Blur placeholder for Next.js <Image>
  const blurDataURL =
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAQABgDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAMGBP/EACAQAAEDBAICAwAAAAAAAAAAAAECAwQABREGEiExE1HB/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAL/xAAYEQEBAQEBAAAAAAAAAAAAAAAAARECEv/aAAwDAQACEQMRAD8A0kup7jLkSktFTqXW4VBwKS2qCWlOKGCUp3BsEjJOD6nVZ/q67kJhp1oYfBBVyCrwB4lfX0o1HqVPUC9TSLsGkKJU0pClJ1gDPJORz4z2BI6bTEMStqRIebTKUVv5S2ppOSCCdoJI+p8fY+oj7z/2Q==";

  if (!mounted || !imagesLoaded) {
    return <GridBannerSkeleton />;
  }

  if (error) {
    return (
      <section
        className="hidden lg:block"
        aria-label="Error loading featured items"
      >
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-600">
          <p className="font-medium">Error loading featured items</p>
          <p className="text-sm">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="hidden lg:block" aria-label="Featured items grid">
      <div
        className="grid h-full grid-cols-1 gap-4 sm:grid-cols-6 sm:grid-rows-4"
        role="grid"
      >
        {/* First banner image */}
        <Card className="relative h-60 overflow-hidden rounded-lg sm:col-span-3 sm:row-span-2">
          <a
            href="https://www.thorpe-bedu.com/belton-residences/"
            target="_blank"
            rel="noopener noreferrer"
            className="relative block h-full"
          >
            <ImageWithFallback
              src="https://dve7rykno93gs.cloudfront.net/pieoq/1572277987.webp"
              alt="Belton Residences - Selling Fast"
              fill
              className={`object-cover transition-all duration-700 ${
                loadedMap[
                  "https://dve7rykno93gs.cloudfront.net/pieoq/1572277987.webp"
                ]
                  ? "blur-0 opacity-100"
                  : "opacity-90 blur-sm"
              }`}
              placeholder="blur"
              blurDataURL={blurDataURL}
              sizes="(max-width: 768px) 100vw, 50vw"
              fallbackAlt="Ad image not available"
            />
          </a>
        </Card>

        {/* Second banner image */}
        <Card className="relative h-60 overflow-hidden rounded-lg sm:col-span-3 sm:row-span-2">
          <a
            href="/follow-ad-2502?u=https://meqasa.com/1-bedroom-apartment-for-sale-in-nungua-unit-3222"
            target="_blank"
            className="relative block h-full"
          >
            <ImageWithFallback
              src="https://dve7rykno93gs.cloudfront.net/pieoq/1649141906.webp"
              alt="Belton Residences - Premium Properties"
              fill
              className={`object-cover transition-all duration-700 ${
                loadedMap[
                  "https://dve7rykno93gs.cloudfront.net/pieoq/1649141906.webp"
                ]
                  ? "blur-0 opacity-100"
                  : "opacity-90 blur-sm"
              }`}
              placeholder="blur"
              blurDataURL={blurDataURL}
              sizes="(max-width: 768px) 100vw, 50vw"
              fallbackAlt="Ad image not available"
            />
          </a>
        </Card>

        {/* Flexi banner slot */}
        <Card
          className="h-full overflow-hidden rounded-lg sm:col-span-3 sm:col-start-4 sm:row-span-4 sm:row-start-1"
          dangerouslySetInnerHTML={buildRichInnerHtml(flexiBanner)}
        />
      </div>
    </section>
  );
}
