import { ArrowRight } from "lucide-react";

interface DistanceIndicatorProps {
  distance: string | number;
  unit?: "km" | "mi";
}

export default function DistanceIndicator({
  distance,
  unit = "km",
}: DistanceIndicatorProps) {
  // Format the distance if it's a number
  const formattedDistance = typeof distance === "number" ? distance : distance;

  return (
    <div className="flex items-center text-rose-500 font-medium text-sm transition-transform group-hover:translate-x-1">
      <ArrowRight
        size={16}
        className="mr-1 transition-transform group-hover:translate-x-1"
      />
      <span>
        {formattedDistance}
        {unit}
      </span>
    </div>
  );
}
