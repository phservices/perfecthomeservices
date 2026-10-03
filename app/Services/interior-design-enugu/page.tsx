import type { Metadata } from "next";
import WhyChooseUs from "@/components/Home/WhyChooseUs";
import InteriorCta from "@/components/Interior/InteriorCta";
import InteriorDetails from "@/components/Interior/InteriorDetails";
import InteriorHero from "@/components/Interior/InteriorHero";
import OurProjects from "@/components/Interior/OurProjects";
import JsonLd from "@/components/JsonLd";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Interior Designer in Enugu | Perfect Home Services",
  description:
    "Learn interior design in Enugu with practical training, expert guidance, projects and certification through Perfect Home Services Academy.",
  keywords: [
    "interior design in Enugu",
    "exterior design in Enugu",
    "interior designer Enugu State",
    "home interior design Enugu",
    "residential interior design Enugu",
    "office interior design Enugu",
    "commercial interior design Enugu",
    "home decoration Enugu",
    "interior design services Enugu",
    "interior design company Enugu",
  ],
  alternates: {
    canonical: "/Services/interior-design-enugu",
  },
  openGraph: {
    title: "Interior & Exterior Design Services | Perfect Home Services",
    description:
      "Learn interior design in Enugu with practical training, expert guidance, projects and certification through Perfect Home Services Academy.",
    url: "/Services/interior-design-enugu",
    siteName: "Perfect Home Services",
    images: [
      {
        url: "/images/interior.jpg",
        width: 1200,
        height: 630,
        alt: "Interior design project by Perfect Home Services",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Interior & Exterior Design Services | Perfect Home Services",
    description:
      "Learn interior design in Enugu with practical training, expert guidance, projects and certification through Perfect Home Services Academy.",
    images: ["/images/interior.jpg"],
  },
};

const pageUrl = `${SITE_URL}/Services/interior-design-enugu`;

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Interior Design in Enugu",
    serviceType: "Interior & Exterior Design",
    description:
      "Residential and commercial interior design, space planning, 3D visualisation, renovation, and construction finishing services in Enugu, Nigeria.",
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
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: `${SITE_URL}/Services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Interior Design in Enugu",
        item: pageUrl,
      },
    ],
  },
];

export default function Page() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <InteriorHero />
      <InteriorDetails />
      <OurProjects />
      <WhyChooseUs />
      <InteriorCta />
    </>
  );
}
