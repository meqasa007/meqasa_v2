import { Skeleton } from "@/components/ui/skeleton";
import Shell from "@/layouts/shell";

export default function DeveloperUnitLoading() {
  return (
    <main>
      <Shell>
        <div className="space-y-3 mb-3">
          <div className="flex items-center gap-2 pt-4">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-8 w-3/4" />
        </div>
      </Shell>

      {/* Image Carousel Skeleton */}
      <section className="border-b border-brand-badge-ongoing bg-black h-[200px] md:h-[400px]">
        <Skeleton className="w-full h-full" />
      </section>

      <Shell>
        <div className="grid grid-cols-1 text-brand-accent w-full mt-4 md:grid-cols-[2fr,1fr] lg:gap-8 lg:px-0">
          <div>
            {/* Price and Badges */}
            <div className="flex items-center gap-4">
              <Skeleton className="h-8 w-48" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-24" />
              </div>
            </div>

            {/* Property Features */}
            <div className="flex items-center gap-4 py-2">
              <div className="flex items-center gap-4">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-20" />
              </div>
            </div>

            {/* Property Status Badges */}
            <div className="flex items-center gap-4 mb-6">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-48" />
            </div>
          </div>

          {/* Contact Card Sidebar */}
          <aside className="hidden lg:block">
            <Skeleton className="h-[400px] w-full" />
          </aside>
        </div>
      </Shell>
    </main>
  );
}
