import AcademyCta from "@/components/Academy/AcademyCta";
import AcademyDetails from "@/components/Academy/AcademyDetails";
import AcademyFaq from "@/components/Academy/AcademyFaq";
import AcademyGallery from "@/components/Academy/AcademyGallery";
import AcademyHero from "@/components/Academy/AcademyHero";
import AcademyInfo from "@/components/Academy/AcademyInfo";
import AcademyStory from "@/components/Academy/AcademyStory";
import JsonLd from "@/components/JsonLd";
import { getAcademySettings } from "@/lib/academy";
import { pageMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

export const revalidate = 300;

export const metadata = pageMetadata({
  title: "Interior Design Academy in Enugu | PHS Academy",
  description:
    "Learn interior design in Enugu with practical training, expert guidance, projects and certification through Perfect Home Services Academy.",
  path: "/Interior-design-academy-enugu",
  image: "/images/Interior-design-academy-enugu.jpg",
  keywords: ["interior design academy in Enugu", "interior design training in Enugu", "interior design course Enugu","interior design school Enugu","learn interior design in Enugu","interior design classes Enugu","interior decoration training Enugu","interior design certification Enugu"],
});

const pageUrl = `${SITE_URL}/Interior-design-academy-enugu`;

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Interior Design Academy in Enugu",
    serviceType: "Interior Design Training",
    description:
      "A 3-month practical interior design training programme in Enugu with classroom lessons, site visits, and a Certificate of Completion upon graduation.",
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
      { "@type": "ListItem", position: 2, name: "Interior Design Academy in Enugu", item: pageUrl },
    ],
  },
];

export default async function Page() {
  const academy = await getAcademySettings();

  return (
    <>
      <JsonLd data={jsonLd} />
      <AcademyHero />
      <AcademyDetails />
      <AcademyInfo settings={academy} />
      <AcademyStory />
      <AcademyGallery />
      {/* <WhyChooseUs /> */}
      <AcademyFaq faqs={academy.faqs} />
      <AcademyCta />

    </>
  );
}
