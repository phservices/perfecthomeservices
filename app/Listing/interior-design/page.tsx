import type { Metadata } from "next";
import Footer from "@/components/Footer";
import WhyChooseUs from "@/components/Home/WhyChooseUs";
import InteriorCta from "@/components/Interior/InteriorCta";
import InteriorDetails from "@/components/Interior/InteriorDetails";
import InteriorHero from "@/components/Interior/InteriorHero";
import OurProjects from "@/components/Interior/OurProjects";

export const metadata: Metadata = {
  title: "Interior & Exterior Design Services in Enugu, Nigeria",
  description:
    "Professional interior and exterior design services in Enugu, Nigeria. Perfect Home Services delivers space planning, construction finishing, furniture and lighting design, and full-scale renovations for homes, offices, and commercial properties.",
  keywords: [
    "interior design Enugu",
    "exterior design Nigeria",
    "interior designer Enugu State",
    "construction finishing Enugu",
    "home renovation Nigeria",
    "space planning",
    "Perfect Home Services",
  ],
  alternates: {
    canonical: "/Listing/interior-design",
  },
  openGraph: {
    title: "Interior & Exterior Design Services | Perfect Home Services",
    description:
      "Space planning, construction finishing, and full interior & exterior design solutions for homes, offices, and commercial properties in Enugu, Nigeria.",
    url: "/Listing/interior-design",
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
      "Space planning, construction finishing, and full interior & exterior design solutions for homes, offices, and commercial properties in Enugu, Nigeria.",
    images: ["/images/interior.jpg"],
  },
};

export default function Page() {
  return (
    <>
      <InteriorHero />
      <InteriorDetails />
      <OurProjects />
      <WhyChooseUs />
      <InteriorCta />
      <Footer />
    </>
  );
}
