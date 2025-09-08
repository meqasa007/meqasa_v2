import { Breadcrumbs } from "@/components/layout/bread-crumbs";
import ContactCard from "@/components/common/contact-card";
import ContentSection from "@/components/layout/content-section";
import Shell from "@/layouts/shell";
import { buildRichInnerHtml } from "@/lib/utils";
import { getDeveloperProfile } from "@/lib/get-developer-profile";
import { CheckCircle, MapPin, Building2 } from "lucide-react";
import { ImageWithFallback } from "@/components/common/image-with-fallback";
import { DeveloperTabs } from "../_component/developer-tabs";
import ClientReviews from "../_component/client-reviews";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { StreamingErrorBoundary } from "@/components/streaming/StreamingErrorBoundary";
import { Skeleton } from "@/components/ui/skeleton";
import type { DeveloperDetails } from "@/types";
import type { Metadata } from "next";
import { ExpandableDescription } from "@/components/expandable-description";

// Data validation helper - more lenient validation
function validateDeveloperData(developer: DeveloperDetails) {
  if (!developer?.developer) {
    console.warn("Developer data missing developer object");
    return false;
  }

  // Only require essential fields - hero and logo are optional for better UX
  const requiredFields = ["companyname", "address"] as const;
  const hasRequiredFields = requiredFields.every((field) => {
    const hasField = developer.developer[field];
    if (!hasField) {
      console.warn(`Missing required field: ${field}`);
    }
    return hasField;
  });

  // Log optional fields for debugging
  if (!developer.developer.hero) {
    console.warn("Missing hero image - will show fallback");
  }
  if (!developer.developer.logo) {
    console.warn("Missing logo - will show fallback");
  }

  return hasRequiredFields;
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ developerId: string }>;
}): Promise<Metadata> {
  try {
    const { developerId } = await params;
    const id = developerId.split("-").pop();

    if (!id) {
      return {
        title: "Developer Not Found",
        description: "The requested developer profile could not be found.",
      };
    }

    const developer = await getDeveloperProfile(Number(id));

    if (!developer?.developer) {
      return {
        title: "Developer Not Found",
        description: "The requested developer profile could not be found.",
      };
    }

    const companyName = developer.developer.companyname;
    const address = developer.developer.address;
    const description =
      developer.developer.description ??
      `Explore properties and projects by ${companyName}, a leading developer in ${address}.`;

    return {
      title: `${companyName} - Developer Profile | MeQasa`,
      description: description,
      keywords: [
        `${companyName}`,
        "developer",
        "properties",
        "real estate",
        address,
        "MeQasa",
      ],
      openGraph: {
        title: `${companyName} - Developer Profile`,
        description: description,
        type: "website",
        url: `https://meqasa.com/projects-by-developer/${developerId}`,
        images: developer.developer.logo
          ? [
              {
                url: `https://meqasa.com/uploads/imgs/${developer.developer.logo}`,
                width: 1200,
                height: 630,
                alt: `${companyName} logo`,
              },
            ]
          : [],
      },
      twitter: {
        card: "summary_large_image",
        title: `${companyName} - Developer Profile`,
        description: description,
        images: developer.developer.logo
          ? [`https://meqasa.com/uploads/imgs/${developer.developer.logo}`]
          : [],
      },
      alternates: {
        canonical: `https://meqasa.com/projects-by-developer/${developerId}`,
      },
    };
  } catch {
    return {
      title: "Developer Profile | MeQasa",
      description: "Explore developer profiles and properties on MeQasa.",
    };
  }
}

// Generate structured data for SEO
function generateStructuredData(
  developer: DeveloperDetails,
  developerId: string
) {
  const companyName = developer.developer.companyname;
  const address = developer.developer.address;
  const logo = developer.developer.logo;
  const website = developer.developer.website;

  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: companyName,
    address: {
      "@type": "PostalAddress",
      addressLocality: address,
    },
    image: logo ? `https://meqasa.com/uploads/imgs/${logo}` : undefined,
    url: `https://meqasa.com/projects-by-developer/${developerId}`,
    sameAs: [
      website && `https://${website}`,
      developer.developer.facebook &&
        `https://facebook.com/${developer.developer.facebook}`,
      developer.developer.twitter &&
        `https://twitter.com/${developer.developer.twitter}`,
      developer.developer.linkedin &&
        `https://linkedin.com/company/${developer.developer.linkedin}`,
      developer.developer.instagram &&
        `https://instagram.com/${developer.developer.instagram}`,
    ].filter(Boolean),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${companyName} Properties`,
      itemListElement:
        developer.projects?.map((project) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "RealEstateListing",
            name: project.projectname,
            description: `Property by ${companyName}`,
            image: `https://meqasa.com/uploads/imgs/${project.photo}`,
          },
        })) || [],
    },
  };
}

export default async function DeveloperProfilePage({
  params,
}: {
  params: Promise<{ developerId: string }>;
}) {
  const { developerId } = await params;
  const id = developerId.split("-").pop();

  if (!id) {
    notFound();
  }

  try {
    const developer = await getDeveloperProfile(Number(id));

    if (!developer?.developer) {
      notFound();
    }

    // Validate required data
    if (!validateDeveloperData(developer)) {
      console.error("Developer data validation failed:", developer);
      notFound();
    }

    // Generate structured data
    const structuredData = generateStructuredData(developer, developerId);

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <main
          role="main"
          aria-label={`${developer.developer.companyname} developer profile`}
        >
          <div className="relative w-full min-h-[200px] h-[300px] sm:min-h-[250px] sm:h-[350px] md:min-h-[400px] md:h-[50vh] md:max-h-[600px] overflow-hidden flex">
            {/* Background Image with fallback */}
            {developer.developer.hero ? (
              <ImageWithFallback
                src={`https://meqasa.com/uploads/imgs/${developer.developer.hero}`}
                alt={`${developer.developer.companyname} office building`}
                fill
                sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
                className="object-cover"
                unoptimized
                priority
                fallbackAlt="Developer office building"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-brand-primary to-brand-primary/80 flex items-center justify-center">
                <div className="text-center text-white">
                  <Building2 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <h2 className="text-2xl font-semibold opacity-75">
                    {developer.developer.companyname}
                  </h2>
                </div>
              </div>
            )}

            <Shell>
              {/* Content Container */}
              <div
                className="absolute bottom-0 left-0 w-full h-48 sm:h-56 md:h-64 bg-gradient-to-t from-black/95 to-transparent"
                aria-hidden="true"
              />
              <div className="absolute bottom-4 md:pb-4 z-10 px-0 flex flex-col sm:flex-row items-start sm:items-end h-fit gap-4 sm:gap-6">
                {/* Company Logo Card */}
                {developer.developer.logo && (
                  <div
                    className="bg-white/90 backdrop-blur-sm rounded-md p-2 min-w-[120px] min-h-[120px] sm:min-w-[140px] sm:min-h-[140px] md:min-w-[160px] md:min-h-[160px] w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] md:w-[160px] md:h-[160px] md:flex items-center justify-center shadow-lg hidden"
                    role="img"
                    aria-label={`${developer.developer.companyname} logo`}
                  >
                    <ImageWithFallback
                      src={`https://meqasa.com/uploads/imgs/${developer.developer.logo}`}
                      alt={`${developer.developer.companyname} logo`}
                      width={120}
                      height={120}
                      className="object-contain w-auto h-auto"
                      fallbackAlt={`${developer.developer.companyname} logo`}
                    />
                  </div>
                )}

                {/* Company Info */}
                <div className="text-white drop-shadow-lg">
                  <h1 className="text-2xl sm:text-3xl font-semibold mb-2 sm:mb-3 text-white">
                    {developer.developer.companyname}
                  </h1>
                  <div className="flex items-center mb-2">
                    <CheckCircle
                      className="w-4 h-4 sm:w-5 sm:w-5 text-green-400 mr-2"
                      aria-hidden="true"
                      role="img"
                    />
                    <span className="text-xs sm:text-sm font-medium text-white/90">
                      <span className="sr-only">Status: </span>
                      active on meqasa
                    </span>
                  </div>
                  <div className="flex items-center">
                    <MapPin
                      className="w-5 h-5 text-brand-primary mr-2 flex-shrink-0"
                      aria-hidden="true"
                      role="img"
                    />
                    <span className="text-xs sm:text-sm font-medium text-white/90 line-clamp-1">
                      <span className="sr-only">Location: </span>
                      {developer.developer.address}
                    </span>
                  </div>
                </div>
              </div>
            </Shell>
          </div>
          <Shell>
            <div className="grid grid-cols-1 text-brand-accent w-full mt-4 lg:grid-cols-[2fr_1fr] lg:gap-8 lg:px-0">
              <div>
                <nav aria-label="Breadcrumb navigation">
                  <Breadcrumbs
                    className="pb-4 text-gray-600"
                    segments={[
                      { title: "Home", href: "/" },
                      { title: "Developers", href: "/developers" },
                      { title: developer.developer.companyname, href: "#" },
                    ]}
                  />
                </nav>

                {/* Error boundary around DeveloperTabs */}
                <StreamingErrorBoundary
                  errorFallback={
                    <div
                      className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center"
                      role="alert"
                      aria-live="polite"
                    >
                      <h2 className="text-2xl font-semibold text-red-600 mb-4">
                        Something went wrong
                      </h2>
                      <p className="text-gray-600 mb-6 max-w-md">
                        We encountered an error while loading the developer
                        projects. Please try again.
                      </p>
                      <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-brand-primary text-white rounded-md hover:bg-brand-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2"
                        aria-label="Retry loading developer projects"
                      >
                        Try again
                      </button>
                    </div>
                  }
                >
                  <Suspense
                    fallback={
                      <div
                        className="mt-8"
                        role="status"
                        aria-label="Loading developer projects and units"
                      >
                        <Skeleton className="h-64 w-full" />
                      </div>
                    }
                  >
                    <DeveloperTabs developer={developer} />
                  </Suspense>
                </StreamingErrorBoundary>

                <section aria-labelledby="about-developer-heading">
                  <ContentSection
                    title="About Developer"
                    description=""
                    href=""
                    className="pt-10 sm:pt-14 md:pt-20 pb-8 sm:pb-10 md:pb-0"
                    btnHidden
                  >
                    <ExpandableDescription
                      description={buildRichInnerHtml(
                        developer.developer.about ?? ""
                      )}
                      name={developer.developer.companyname}
                      href={`/projects-by-developer/${developerId}`}
                    />
                  </ContentSection>
                </section>

                <section aria-labelledby="client-reviews-heading">
                  <ContentSection
                    title={`What clients are saying about ${developer.developer.companyname}`}
                    description=""
                    href=""
                    className="pt-10 sm:pt-14 md:pt-20 pb-8 sm:pb-10 md:pb-0"
                    btnHidden
                  >
                    {/* Error boundary around ClientReviews */}
                    <StreamingErrorBoundary
                      errorFallback={
                        <div
                          className="flex flex-col items-center justify-center min-h-[200px] p-8 text-center"
                          role="alert"
                          aria-live="polite"
                        >
                          <h2 className="text-xl font-semibold text-red-600 mb-4">
                            Something went wrong
                          </h2>
                          <p className="text-gray-600 mb-6 max-w-md">
                            We encountered an error while loading client
                            reviews. Please try again.
                          </p>
                          <button
                            onClick={() => window.location.reload()}
                            className="px-4 py-2 bg-brand-primary text-white rounded-md hover:bg-brand-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2"
                            aria-label="Retry loading client reviews"
                          >
                            Try again
                          </button>
                        </div>
                      }
                    >
                      <Suspense
                        fallback={
                          <div
                            className="h-32"
                            role="status"
                            aria-label="Loading client reviews"
                          >
                            <Skeleton className="h-full w-full" />
                          </div>
                        }
                      >
                        <ClientReviews />
                      </Suspense>
                    </StreamingErrorBoundary>
                  </ContentSection>
                </section>
              </div>
              <aside
                className="hidden md:block pb-6"
                aria-label="Contact information"
              >
                <ContactCard
                  name={developer.developer.companyname}
                  image={developer.developer.logo}
                  src
                  projectId={developerId}
                  pageType="project"
                />
              </aside>
            </div>
          </Shell>
        </main>
      </>
    );
  } catch (error: unknown) {
    console.error("Error fetching developer profile:", error);
    notFound();
  }
}
