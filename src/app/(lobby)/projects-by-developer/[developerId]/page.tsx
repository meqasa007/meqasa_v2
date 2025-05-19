import { Breadcrumbs } from "@/components/bread-crumbs";
import ContactCard from "@/components/contact-card";
import ContentSection from "@/components/content-section";
import Shell from "@/layouts/shell";
import { getDeveloperProfile } from "@/lib/get-developer-profile";
import { CheckCircle, MapPin } from "lucide-react";
import Image from "next/image";
import { DeveloperTabs } from "../_component/developer-tabs";
import ClientReviews from "../_component/client-reviews";

export default async function DeveloperProfilePage({
  params,
}: {
  params: Promise<{ developerId: string }>;
}) {
  const { developerId } = await params;
  const id = developerId.toString().split("-")[
    developerId.toString().split("-").length - 1
  ];

  // get developer profile
  const developer = await getDeveloperProfile(Number(id));

  return (
    <main>
      <div className="relative w-full h-[450px] overflow-hidden flex ">
        {/* Background Image */}
        <Image
          src={`https://meqasa.com/uploads/imgs/${developer?.developer?.hero}`}
          alt="Office building"
          fill
          sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
          className="object-cover "
          unoptimized
          priority
        />

        <Shell>
          {/* Content Container */}
          <div className="relative z-10 p-6 pb-12 flex items-end">
            {/* Company Logo Card */}
            <div className="bg-white rounded-md p-2 w-[160px] h-[160px] flex items-center justify-center mr-6 shadow-md">
              <Image
                src={`https://meqasa.com/uploads/imgs/${developer?.developer?.logo}`}
                alt="Goldkey Properties Logo"
                width={120}
                height={120}
                className="object-contain w-auto h-auto"
              />
            </div>

            {/* Company Info */}
            <div className="text-white">
              <h1 className="text-3xl font-semibold mb-3">
                {developer?.developer?.companyname}
              </h1>
              <div className="flex items-center mb-2">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                <span className="text-sm">active on meqasa</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-red-400 mr-2" />
                <span className="text-sm">{developer?.developer?.address}</span>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-52 bg-gradient-to-t from-black to-transparent"></div>
        </Shell>
      </div>
      <Shell>
        <div className="grid grid-cols-1 text-b-accent w-full mt-12 md:grid-cols-[2fr,1fr] lg:gap-8 lg:px-0">
          <div>
            <Breadcrumbs
              className="pb-4"
              segments={[
                { title: "Home", href: "/" },
                { title: `Developers`, href: "/devlopers" },
                // { title: `Apartment`, href: "/properties" },
                // { title: `East Legon`, href: "/properties" },
              ]}
            />
            <DeveloperTabs developer={developer} />
            <ContentSection
              title="About Developer"
              description=""
              href=""
              className="pt-14 md:pt-20 pb-10 md:pb-0"
              btnHidden
            >
              <p
                dangerouslySetInnerHTML={{
                  __html: developer?.developer?.about,
                }}
              />
            </ContentSection>
            <ContentSection
              title={`What clients are saying about ${developer?.developer?.companyname}`}
              description=""
              href=""
              className="pt-14 md:pt-20 pb-10 md:pb-0 "
              btnHidden
            >
              <ClientReviews />
            </ContentSection>
          </div>
          <aside className="hidden lg:block pb-6">
            <ContactCard
              src
              name={developer?.developer?.companyname}
              image={`${developer?.developer?.logo}`}
            />
          </aside>
        </div>
      </Shell>
    </main>
  );
}
