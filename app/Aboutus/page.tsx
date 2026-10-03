import AboutHero from "@/components/About/AboutHero";
import Credentials from "@/components/About/Credentials";
import HealthyRoom from "@/components/About/HealthyRoom";
import Mission from "@/components/About/Mission";
import OurJourney from "@/components/About/OurJourney";
import OurStory from "@/components/About/OurStory";
import Values from "@/components/About/Values";
import WhyTrust from "@/components/About/WhyTrust";
import Founder from "@/components/Home/Founder";
import Cta from "@/components/Home/Cta";
import { getCredentials } from "@/lib/credentials";
import { pageMetadata } from "@/lib/seo";
import ServiceArea from "@/components/Home/ServiceArea";

export const revalidate = 300;

export const metadata = pageMetadata({
  title: "About Us",
  description:
    "Learn the story, mission and values behind Perfect Home Services, the Enugu team creating healthier, better-designed homes and spaces across Nigeria.",
  path: "/Aboutus",
  image: "/images/About-1.jpg",
});
// import Values from "@/components/About/Values";

export default async function Page() {
  const credentials = await getCredentials();

  return (
    <>
      <AboutHero />
      <OurStory />
      <OurJourney />
      <Mission />
      <Values />
      <ServiceArea />
      <Founder />
      <Credentials credentials={credentials} />
      <WhyTrust />
      <HealthyRoom />
      <Cta />

    </>
  );
}
