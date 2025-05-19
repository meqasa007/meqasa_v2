"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface PropertyFavoritesBannerProps {
  propertyId: number;
  propertyType: "listing" | "project";
}

export default function PropertyFavoritesBanner({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  propertyId,
  propertyType,
}: PropertyFavoritesBannerProps) {
  const [filled, setFilled] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Only animate when not hovered
    if (!isHovered) {
      const interval = setInterval(() => {
        setFilled((prev) => !prev);
      }, 1500);

      return () => clearInterval(interval);
    }
  }, [isHovered]);

  const toggleFavorite = () => {
    const newState = !isFavorite;
    setIsFavorite(newState);
    setFilled(newState); // Keep heart filled when favorited

    if (newState) {
      toast.success("Added to favorites", {
        description: `This ${propertyType} has been added to your favorites`,
        action: {
          label: "Undo",
          onClick: () => {
            setIsFavorite(false);
            setFilled(false);
            toast("Action undone");
          },
        },
      });
    } else {
      toast("Removed from favorites", {
        description: `This ${propertyType} has been removed from your favorites`,
      });
    }
  };

  return (
    <div className="w-full py-10 border-y border-gray-200 mt-4">
      <div className="w-full bg-blue-50 rounded-lg p-4 flex items-center">
        <div
          className={cn(
            "bg-white border border-rose-100 rounded-full p-2 mr-4 relative cursor-pointer transition-colors",
            isFavorite && "border-rose-200 bg-rose-50",
            "hover:border-rose-200 hover:bg-rose-50",
          )}
          onClick={toggleFavorite}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          role="button"
          tabIndex={0}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <AnimatePresence mode="wait">
            {filled || isFavorite ? (
              <motion.div
                key="filled"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Heart
                  className={cn(
                    "h-5 w-5 text-brand-primary",
                    isFavorite && "fill-current",
                  )}
                />
              </motion.div>
            ) : (
              <motion.div
                key="outline"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Heart className="h-5 w-5 text-brand-primary" />
              </motion.div>
            )}
          </AnimatePresence>
          <div className="h-5 w-5 opacity-0">
            <Heart />
          </div>
        </div>
        <p className="text-brand-accent">
          Like this {propertyType}? Add as favorites and compare listings
        </p>
      </div>
    </div>
  );
}
