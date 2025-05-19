import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Card } from "@/components/ui/card";
import { getLeaderboardBanner } from "@/lib/get-leaderboard-banner";

export default async function HeaderAd() {
  const leaderboardBanner = await getLeaderboardBanner();

  return (
    <div
      className="border-b py-[10px] lg:flex"
      role="banner"
      aria-label="Header advertisement"
    >
      <div className="mx-auto flex justify-between h-auto max-w-6xl w-[72rem]">
        <Link
          href="/"
          className="relative w-[240px] h-[90px]"
          aria-label="Meqasa Home"
        >
          <Image
            src="/logo.png"
            alt="Meqasa Logo"
            fill
            sizes="(max-width: 240px) 100vw, 240px"
            className="object-contain"
            priority
          />
        </Link>
        <Card
          className="overflow-hidden rounded-sm p-0 shadow-none"
          role="complementary"
          aria-label="Advertisement"
        >
          <div dangerouslySetInnerHTML={{ __html: leaderboardBanner }}></div>
        </Card>
      </div>
    </div>
  );
}
