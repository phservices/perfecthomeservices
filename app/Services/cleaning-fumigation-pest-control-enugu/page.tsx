import CleanCta from "@/components/Cleaning/CleanCta";
import CleanDetails from "@/components/Cleaning/CleanDetails";
import CleanHero from "@/components/Cleaning/CleanHero";
import CleanProject from "@/components/Cleaning/CleanProject";
import WhyChooseUs from "@/components/Home/WhyChooseUs";
import JsonLd from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Cleaning, Fumigation & Pest Control in Enugu | PHS",
  description:
    "Professional cleaning, fumigation and pest control services in Enugu for homes, offices and commercial spaces. Book Perfect Home Services.",
  path: "/Services/cleaning-fumigation-pest-control-enugu",
  image: "/images/industrial-cleaning.jpg",
  keywords: ["cleaning services in Enugu", "fumigation services in Enugu", "pest control in Enugu", "cleaning company in Enugu","house cleaning services Enugu","home cleaning services Enugu","office cleaning services Enugu","commercial cleaning services Enugu","deep cleaning services Enugu","post construction cleaning Enugu","fumigation company Enugu","pest control services Enugu","pest control company Enugu"],
});

const pageUrl = `${SITE_URL}/Services/cleaning-fumigation-pest-control-enugu`;

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Cleaning, Fumigation & Pest Control in Enugu",
    serviceType: "Cleaning, Fumigation & Pest Control",
    description:
      "Professional residential and commercial cleaning, fumigation, pest control, post-construction cleaning, and disinfection services in Enugu, Nigeria.",
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
      { "@type": "ListItem", position: 3, name: "Cleaning, Fumigation & Pest Control in Enugu", item: pageUrl },
    ],
  },
];

export default function Page() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <CleanHero />
      <CleanDetails />
      <CleanProject />
      <WhyChooseUs variant="cleaning" />
      <CleanCta />

    </>
  );
}
