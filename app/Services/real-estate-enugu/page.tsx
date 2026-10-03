import WhyChooseUs from "@/components/Home/WhyChooseUs";
import JsonLd from "@/components/JsonLd";
import RealCta from "@/components/RealEstate/RealCta";
import RealDetails from "@/components/RealEstate/RealDetails";
import RealHero from "@/components/RealEstate/RealHero";
import RealProject from "@/components/RealEstate/RealProject";
import { pageMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Real Estate Company in Enugu | Perfect Home Services",
  description:
    "Explore real estate services in Enugu, including property sales, rentals, relocation, resale support, consultation and property investment guidance.",
  path: "/Services/real-estate-enugu",
  image: "/images/real-1.jpg",
  keywords: ["real estate company in Enugu", "real estate in Enugu", "real estate agency Nigeria","property company Enugu","properties for sale in Enugu","houses for sale in Enugu","property for rent in Enugu","real estate services Enugu","property management Enugu","property consultation Enugu","property investment Enugu","property relocation Enugu"],
});

const pageUrl = `${SITE_URL}/Services/real-estate-enugu`;

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Real Estate Services in Enugu",
    serviceType: "Real Estate",
    description:
      "Explore real estate services in Enugu, including property sales, rentals, relocation, resale support, consultation and property investment guidance.",
    provider: {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#business`,
    },
    areaServed: { "@type": "City", name: "Enugu" },
    url: pageUrl,
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/Services` },
      { "@type": "ListItem", position: 3, name: "Real Estate in Enugu", item: pageUrl },
    ],
  },
];

export default function Page() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <RealHero />
      <RealDetails />
      <RealProject />
      <WhyChooseUs variant="real-estate" />
      <RealCta />
    </>
  );
}
