"use client";

import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";

// item type
type Item = {
  imbroker: string;
  first: string;
  name: string;
  name2: string;
};

/**
 * Renders a horizontally moving set of cards with optional pause on hover.
 *
 * @param {Object} props - Component props
 * @param {Item[]} props.items - An array of items to display in the cards.
 * @param {"left" | "right"} [props.direction="left"] - The direction of card movement.
 * @param {"fast" | "normal" | "slow"} [props.speed="fast"] - The speed of the card movement.
 * @param {boolean} [props.pauseOnHover=true] - Whether to pause the animation on hover.
 * @param {string} [props.className] - Additional classes for styling the container.
 * @returns {JSX.Element} A React component rendering an infinite moving card animation.
 */

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: Item[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [isPaused, setIsPaused] = React.useState(false);

  const addAnimation = React.useCallback(() => {
    if (containerRef.current) {
      containerRef.current.style.setProperty(
        "--animation-direction",
        direction === "left" ? "forwards" : "reverse",
      );
      containerRef.current.style.setProperty(
        "--animation-duration",
        speed === "fast" ? "30s" : speed === "normal" ? "60s" : "70s",
      );
    }
  }, [direction, speed]);

  const handlePause = React.useCallback(() => {
    setIsPaused(true);
  }, []);

  const handleResume = React.useCallback(() => {
    setIsPaused(false);
  }, []);

  useEffect(() => {
    addAnimation();
  }, [addAnimation]);

  if (!items || items.length === 0) {
    return <p>No items available</p>;
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller max-w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className,
      )}
      role="region"
      aria-label="Scrolling content"
      onMouseEnter={pauseOnHover ? handlePause : undefined}
      onMouseLeave={pauseOnHover ? handleResume : undefined}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-8",
          "animate-marquee",
          isPaused && "hover:[animation-play-state:paused]",
        )}
        role="list"
      >
        {items.map((item) => {
          const imageUrl = item.imbroker
            ? `https://dve7rykno93gs.cloudfront.net/fascimos/somics/${item.imbroker}`
            : "/default-image.jpg";

          return (
            <div
              className="rounded-lg border border-gray-100 shadow-elegant-sm flex items-center aspect-square"
              key={item.first}
            >
              <Link
                href={`/${item.first}`}
                className="block focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label={`View details for ${item.name}`}
                tabIndex={0}
              >
                <div className="flex min-w-[120px] max-w-[120px] items-center justify-center overflow-hidden p-4">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger
                        aria-describedby={`tooltip-${item.first}`}
                        className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        <Image
                          alt={item.name}
                          src={imageUrl}
                          width={100}
                          height={50}
                          className="h-full w-full object-contain"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "/default-image.jpg";
                          }}
                        />
                      </TooltipTrigger>
                      <TooltipContent
                        id={`tooltip-${item.first}`}
                        className="z-50"
                      >
                        <p>{item.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </Link>
            </div>
          );
        })}
      </ul>
      {pauseOnHover && (
        <button
          className="absolute bottom-2 right-2 rounded-full bg-white p-2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={isPaused ? handleResume : handlePause}
          aria-label={isPaused ? "Resume scrolling" : "Pause scrolling"}
        >
          {isPaused ? "▶" : "⏸"}
        </button>
      )}
    </div>
  );
};
