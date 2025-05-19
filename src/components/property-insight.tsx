import Image from "next/image";

import React from "react";

export default function PropertyInsight() {
  return (
    <aside className="mt-16 border-y">
      <div className="py-8">
        <div>
          <h3 className="mb-6 text-xl font-bold text-b-accent">
            Property Insights
          </h3>
          <div className="flex items-center gap-6">
            <Image
              alt="icon"
              src="/insights_price@3x.webp"
              width={32}
              height={32}
              className="hidden h-8 w-8 object-cover lg:block"
            />
            <div>
              <p className="font-light text-b-accent">
                This property is priced{" "}
                <span className="font-semibold">12% less</span> than the average
                cost of one-bedroom rentals in Lakeside Estate.
              </p>
              <small className="text-sm text-b-muted-dark">
                Avg. price: $3,200
              </small>
            </div>
          </div>
          <div className="mt-8 flex items-center gap-6">
            <Image
              alt="icon"
              src="/insights_floorarea@3x.webp"
              width={32}
              height={32}
              className="hidden h-8 w-8 object-cover lg:block"
            />
            <div>
              <p className="font-light text-b-accent">
                This property measures{" "}
                <span className="font-semibold">2% smaller</span> than the
                average size of one-bedroom rentals in Lakeside Estate.
              </p>
              <small className="text-sm text-b-muted-dark">
                Avg. size: 474 sqft
              </small>
            </div>
          </div>
        </div>
        <p className="mt-6 border-t border-border-b pt-3 text-xs text-b-muted-dark">
          The data presented reflects average rental prices and sizes for
          one-bedroom listings in Lakeside Estate as listed on meqasa.com.
        </p>
      </div>
    </aside>
  );
}
