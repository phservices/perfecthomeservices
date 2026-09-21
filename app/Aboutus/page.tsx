import AboutHero from "@/components/About/AboutHero";
import HealthyRoom from "@/components/About/HealthyRoom";
import Mission from "@/components/About/Mission";
import OurStory from "@/components/About/OurStory";
import Values from "@/components/About/Values";
import WhyTrust from "@/components/About/WhyTrust";
import Founder from "@/components/Home/Founder";
import Cta from "@/components/Home/Cta";
import Footer from "@/components/Footer";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Us",
  description:
    "Learn the story, mission and values behind Perfect Home Services, the Enugu team creating healthier, better-designed homes and spaces across Nigeria.",
  path: "/Aboutus",
  image: "/images/About-1.jpg",
});
// import Values from "@/components/About/Values";

export default function Page() {
  return (
    <>
      <AboutHero />
      <OurStory />
      <Mission />
      <Values />
      <Founder />
      <WhyTrust />
      <HealthyRoom />
      <Cta />
      <Footer />
    </>
  );
}
