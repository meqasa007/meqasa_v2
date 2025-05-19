// import { ProductCardSkeleton } from "@/components/product-card-skeleton";
// import { Shell } from "@/components/shell";
// import { StoreCardSkeleton } from "@/components/store-card-skeleton";

// import { CategoryCardSkeleton } from "./category-card-skeleton";
import Shell from "@/layouts/shell";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export function LobbySkeleton() {
  return (
    <main>
      {/* Hero section with search */}
      <div className="relative">
        <div className="max-h-[305px] h-[305px] relative bg-gray-200">
          <Skeleton className="w-full h-full" />
        </div>
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 px-4 w-full max-w-4xl">
          <Card className="p-4 md:p-6">
            <div className="grid gap-4 md:grid-cols-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </Card>
        </div>
      </div>

      {/* Partner logos skeleton */}
      <div className="mt-[180px] hidden lg:flex justify-center overflow-hidden">
        <div className="flex gap-8 animate-pulse">
          {Array.from({ length: 8 }, (_, i) => (
            <Skeleton key={i} className="h-12 w-32" />
          ))}
        </div>
      </div>

      <Shell>
        <div className="w-full lg:p-4">
          {/* Grid ad skeleton */}
          <div className="mt-8">
            <Skeleton className="h-32 w-full rounded-lg" />
          </div>
        </div>
      </Shell>
    </main>
  );
}
