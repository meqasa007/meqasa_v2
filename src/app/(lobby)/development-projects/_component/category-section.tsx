import EstablishmentItem from "./establishment-item";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CategoryIcon } from "./category-icon";
import type { ReactNode } from "react";
// import { Card, CardHeader, CardContent } from "../ui/Card";
// import CategoryIcon from "../icons/CategoryIcon";

export interface Establishment {
  id: string | number;
  name: string;
  distance: number | string;
  unit?: "km" | "mi";
}

interface CategorySectionProps {
  title: string;
  category: string;
  establishments: Establishment[];
  icon?: ReactNode;
}

type CategoryType =
  | "airport"
  | "mall"
  | "school"
  | "cafe"
  | "office"
  | "restaurant"
  | "hospital"
  | "bank";

export default function CategorySection({
  title,
  category,
  establishments,
  icon,
}: CategorySectionProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center">
          {icon ?? (
            <CategoryIcon category={category as CategoryType} size={20} />
          )}
          <h3 className="ml-3 text-xl font-semibold text-gray-800">{title}</h3>
        </div>
      </CardHeader>
      <CardContent>
        {establishments.map((establishment) => (
          <EstablishmentItem
            key={establishment.id}
            name={establishment.name}
            distance={establishment.distance}
            unit={establishment.unit}
          />
        ))}
      </CardContent>
    </Card>
  );
}
