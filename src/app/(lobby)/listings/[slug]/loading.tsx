import Shell from "@/layouts/shell";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export default function ListingLoading() {
  return (
    <main>
      <Shell>
        <div className="space-y-3 mb-3">
          {/* Breadcrumbs skeleton */}
          <div className="flex items-center gap-2 pt-4">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-20" />
          </div>
          {/* Title skeleton */}
          <Skeleton className="h-8 w-3/4" />
        </div>
      </Shell>

      {/* Image carousel skeleton */}
      <section className="border-b border-brand-badge-ongoing bg-black min-h-[200px] md:min-h-[400px] flex items-center justify-center">
        <Skeleton className="w-full h-[200px] md:h-[400px]" />
      </section>

      <Shell>
        <div className="grid grid-cols-1 text-brand-accent w-full mt-4 md:grid-cols-[2fr,1fr] lg:gap-8 lg:px-0">
          <div>
            {/* Price and badges skeleton */}
            <div className="flex items-center gap-4">
              <Skeleton className="h-8 w-48" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-24" />
              </div>
            </div>

            {/* Property features skeleton */}
            <div className="flex items-center gap-4 py-2">
              <div className="flex items-center gap-4 flex-wrap">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-24" />
              </div>
            </div>

            {/* Property badges skeleton */}
            <div className="flex items-center gap-4 mb-6">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-48" />
            </div>

            {/* Property details skeleton */}
            <Card className="p-6 mb-6">
              <Skeleton className="h-6 w-32 mb-4" />
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Array.from({ length: 9 }, (_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                ))}
              </div>
            </Card>

            {/* Description skeleton */}
            <div className="space-y-4 mb-6">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>

            {/* Amenities skeleton */}
            <div className="space-y-4 mb-6">
              <Skeleton className="h-6 w-32" />
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Array.from({ length: 6 }, (_, i) => (
                  <Skeleton key={i} className="h-6 w-32" />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar skeleton */}
          <div className="space-y-6">
            <Card className="p-6">
              <Skeleton className="h-6 w-32 mb-4" />
              <div className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            </Card>

            <Card className="p-6">
              <Skeleton className="h-6 w-32 mb-4" />
              <div className="space-y-4">
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
              </div>
            </Card>
          </div>
        </div>
      </Shell>
    </main>
  );
}
