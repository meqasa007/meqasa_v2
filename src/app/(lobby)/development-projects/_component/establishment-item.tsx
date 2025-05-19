import { CardContent } from "@/components/ui/card";
import type { ReactNode } from "react";
import DistanceIndicator from "./distance-indicator";


interface EstablishmentItemProps {
  name: string;
  distance: number | string;
  unit?: "km" | "mi";
  icon?: ReactNode;
}

export default function EstablishmentItem({
  name,
  distance,
  unit = "km",
  icon,
}: EstablishmentItemProps) {
  return (
    <CardContent>
      <div className="group cursor-pointer w-full flex items-center justify-between">
        <div className="flex items-center">
          {icon && <div className="mr-3">{icon}</div>}
          <span className="text-gray-700 font-medium">{name}</span>
        </div>
        {/* <Separator /> */}
        <DistanceIndicator distance={distance} unit={unit} />
      </div>
    </CardContent>
  );
}
