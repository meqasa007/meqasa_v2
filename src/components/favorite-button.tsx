"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface FavoriteButtonProps {
  projectId: number;
  className?: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function FavoriteButton({ projectId, className }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    const newState = !isFavorite;
    setIsFavorite(newState);

    if (newState) {
      toast.success("Added to favorites", {
        description: "This project has been added to your favorites",
        action: {
          label: "Undo",
          onClick: () => {
            setIsFavorite(false);
            toast("Action undone");
          },
        },
      });
    } else {
      toast("Removed from favorites", {
        description: "This project has been removed from your favorites",
      });
    }
  };

  return (
    <Button
      variant="outline"
      onClick={toggleFavorite}
      className={cn(
        "gap-2 transition-colors hover:bg-rose-50",
        isFavorite &&
          "bg-brand-primary/20 text-brand-primary hover:text-brand-primary hover:bg-rose-100",
        className,
      )}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <Heart
        className={cn(
          "h-4 w-4 transition-colors",
          isFavorite && "fill-current",
        )}
      />
      <span>{isFavorite ? "Remove from favorites" : "Add to favorites"}</span>
    </Button>
  );
}
