import Footer from "@/components/Footer";
import WhyChooseUs from "@/components/Home/WhyChooseUs";
import InteriorCta from "@/components/Interior/InteriorCta";
// import InteriorDetails from "@/components/Interior/InteriorDetails";
import InteriorHero from "@/components/Interior/InteriorHero";
import OurProjects from "@/components/Interior/OurProjects";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Our Projects & Portfolio",
  description:
    "Browse completed interior and exterior design projects by Perfect Home Services in Enugu, Nigeria, and see the quality of work we deliver.",
  path: "/Listing/Our-Projects",
  image: "/images/interior.jpg",
});

export default function Page() {
  return (
    <>
      <InteriorHero />
      {/* <InteriorDetails /> */}
      <OurProjects />
      <WhyChooseUs />
      <InteriorCta />
      <Footer />
    </>
  );
}
