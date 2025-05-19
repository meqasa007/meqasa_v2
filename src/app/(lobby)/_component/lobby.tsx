import { Suspense } from "react";
import { blog } from "@/assets/data/blog";
import { location } from "@/assets/data/location";
import AppPromotion from "@/components/app-promotion";
import BlogCard from "@/components/blog-card";
import ContentSection from "@/components/content-section";
import FeaturedProjectsCarousel from "@/components/featured-projects-carousel";
import GridAd from "@/components/grid-ad";
import { InfiniteMovingCards } from "@/components/infinite-moving-card";
import LocationCard from "@/components/location-card";
import MarketNewsCard from "@/components/market-news-card";
import PropertyListings from "@/components/property-listings";
import SearchForm from "@/components/search-form";
import SeoText from "@/components/seo-text";
import Shell from "@/layouts/shell";
import type { getAgentLogos } from "@/lib/get-agents-logos";
import type { getFeaturedListings } from "@/lib/get-featured-listings";
import type { getFeaturedProjects } from "@/lib/get-featured-projects";
import type { getFeaturedUnits } from "@/lib/get-featured-units";
import type { getHeroBanner } from "@/lib/get-hero-banner";
import type { getLatestListings } from "@/lib/get-latest-listing";
import MobilePageHeader from "./mobile-page-header";
import { LatestListingsTab } from "@/components/latest-listings-tab";
import type { getFlexiBanner } from "@/lib/get-flexi-banner";

interface LobbyProps {
  latestListingsPromise: ReturnType<typeof getLatestListings>;
  featuredProjectsPromise: ReturnType<typeof getFeaturedProjects>;
  featuredListingsPromise: ReturnType<typeof getFeaturedListings>;
  featuredUnitsPromise: ReturnType<typeof getFeaturedUnits>;
  agentsLogosPromise: ReturnType<typeof getAgentLogos>;
  heroBannerPromise: ReturnType<typeof getHeroBanner>;
  flexiBannerPromise: ReturnType<typeof getFlexiBanner>;
}

function LobbyContent({
  agentLogos,
  featuredProjects,
  featuredListings,
  latestListings,
  heroBanner,
  flexiBanner,
}: {
  agentLogos: Awaited<ReturnType<typeof getAgentLogos>>;
  featuredProjects: Awaited<ReturnType<typeof getFeaturedProjects>>;
  featuredListings: Awaited<ReturnType<typeof getFeaturedListings>>;
  latestListings: Awaited<ReturnType<typeof getLatestListings>>;
  heroBanner: Awaited<ReturnType<typeof getHeroBanner>>;
  flexiBanner: Awaited<ReturnType<typeof getFlexiBanner>>;
}) {
  const latestListingsForRent = latestListings.filter(
    (listing) => listing.contract === "rent",
  );
  const latestListingsForSale = latestListings.filter(
    (listing) => listing.contract === "sale",
  );

  console.log(flexiBanner);

  return (
    <main>
      <div className="relative">
        <div
          className="max-h-[305px] h-[305px] relative bg-contain bg-center"
          style={{
            backgroundImage: `url(https://dve7rykno93gs.cloudfront.net${heroBanner.src})`,
          }}
          role="img"
          aria-label="Hero banner showcasing featured properties"
        ></div>

        <MobilePageHeader />
        <SearchForm />
      </div>
      <div
        className="mt-[180px] hidden lg:flex"
        role="complementary"
        aria-label="Partner logos"
      >
        <InfiniteMovingCards
          items={agentLogos}
          direction="left"
          speed="normal"
        />
      </div>
      <Shell>
        <div className="w-full lg:p-4">
          <GridAd flexiBanner={flexiBanner} />
          <ContentSection
            title="Featured Projects"
            description="View all featured properties"
            href="/properties"
            className="pt-14 md:pt-20 lg:pt-24"
          >
            <FeaturedProjectsCarousel
              properties={featuredProjects.slice(0, 3)}
              delay={7000}
            />
            <br />
            <FeaturedProjectsCarousel
              properties={featuredProjects.slice(3, 6)}
              delay={5000}
            />
          </ContentSection>
          <ContentSection
            title="Latest Listings"
            description="View all recent property listings available."
            href="/listings"
            className="pt-14 md:pt-20 lg:pt-24"
          >
            <LatestListingsTab
              rentListings={latestListingsForRent}
              saleListings={latestListingsForSale}
            />
          </ContentSection>
          <ContentSection
            title="Featured Listings"
            description="View all featured property listings available."
            href="/listings"
            className="pt-14 md:pt-20 lg:pt-24"
          >
            <PropertyListings listings={featuredListings} />
          </ContentSection>
          <div className="lg:flex flex-col md:flex-row gap-6">
            <ContentSection
              title="Property Guides & Insights"
              description="Read our blog"
              href="/blog"
              className="pt-14 md:pt-20 lg:pt-24 flex-[2]"
              border
            >
              {blog.map((blog, index) => (
                <BlogCard
                  datePosted={blog.datePosted}
                  description={blog.description}
                  href={blog.href}
                  poster={blog.poster}
                  title={blog.title}
                  key={index}
                />
              ))}
            </ContentSection>

            <aside
              className="hidden md:block flex-1 mt-28"
              aria-label="Market News"
            >
              <h3 className="text-xl font-bold leading-tight tracking-tighter text-brand-accent lg:mb-8 lg:text-[23px] lg:font-extrabold">
                Market News
              </h3>
              <div role="list">
                {blog.slice(0, 3).map((blog, index) => (
                  <div key={index} role="listitem">
                    <MarketNewsCard
                      title={blog.title}
                      date="Jan 23,2023"
                      index={index}
                    />
                  </div>
                ))}
              </div>
            </aside>
          </div>
          <ContentSection
            title="Choice Neighborhoods"
            description="These neighborhoods are highly desirable for business, living, and pleasure. Find out why!"
            href="/"
            className="pt-14 md:pt-20 lg:pt-24 flex-[2]"
          >
            <div
              className="overflow-x-auto"
              role="region"
              aria-label="Neighborhoods"
            >
              <div className="grid grid-cols-[1fr_1fr_1fr_1fr] gap-3 lg:grid-cols-4 lg:gap-8">
                {location.map((item, i) => (
                  <LocationCard {...item} key={i} />
                ))}
              </div>
            </div>
          </ContentSection>
          <SeoText />
          <AppPromotion />
        </div>
      </Shell>
    </main>
  );
}

export default async function Lobby({
  agentsLogosPromise,
  featuredProjectsPromise,
  featuredListingsPromise,
  featuredUnitsPromise,
  latestListingsPromise,
  heroBannerPromise,
  flexiBannerPromise,
}: LobbyProps) {
  const [
    agentLogos,
    featuredProjects,
    featuredListings,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _featuredUnits, // Renamed to indicate it's unused
    latestListings,
    heroBanner,
    flexiBanner,
  ] = await Promise.all([
    agentsLogosPromise,
    featuredProjectsPromise,
    featuredListingsPromise,
    featuredUnitsPromise,
    latestListingsPromise,
    heroBannerPromise,
    flexiBannerPromise,
  ]);

  // const flexiBannerHtml = await getFlexiBanner();
  // console.log(flexiBannerHtml);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LobbyContent
        agentLogos={agentLogos}
        featuredProjects={featuredProjects}
        featuredListings={featuredListings}
        latestListings={latestListings}
        heroBanner={heroBanner}
        flexiBanner={flexiBanner}
      />
    </Suspense>
  );
}
