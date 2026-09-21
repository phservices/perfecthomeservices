import AcademyCta from "@/components/Academy/AcademyCta";
import AcademyDetails from "@/components/Academy/AcademyDetails";
import AcademyGallery from "@/components/Academy/AcademyGallery";
import AcademyHero from "@/components/Academy/AcademyHero";
import AcademyStory from "@/components/Academy/AcademyStory";
import Footer from "@/components/Footer";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Interior Design Academy in Enugu",
  description:
    "Train with Perfect Home Services' Interior Design Academy in Enugu. Learn practical design skills, space planning and client management from working professionals.",
  path: "/Academy",
  image: "/images/academy-1.jpg",
  keywords: ["interior design academy Enugu", "interior design training Nigeria", "learn interior design"],
});


export default function Page() {
  return (
    <>
      <AcademyHero />
      <AcademyDetails />
      <AcademyStory />
      <AcademyGallery />
      {/* <WhyChooseUs /> */}
      <AcademyCta />
      <Footer />
    </>
  );
}
