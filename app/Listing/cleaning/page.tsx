import CleanCta from "@/components/Cleaning/CleanCta";
import CleanDetails from "@/components/Cleaning/CleanDetails";
import CleanHero from "@/components/Cleaning/CleanHero";
import CleanProject from "@/components/Cleaning/CleanProject";
import Footer from "@/components/Footer";
import WhyChooseUs from "@/components/Home/WhyChooseUs";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Industrial Cleaning & Fumigation in Enugu",
  description:
    "Professional industrial and commercial cleaning, post-construction cleaning and fumigation services in Enugu, Nigeria. Book a reliable cleaning team today.",
  path: "/Listing/cleaning",
  image: "/images/industrial-cleaning.jpg",
  keywords: ["cleaning services Enugu", "industrial cleaning Nigeria", "fumigation Enugu", "post-construction cleaning"],
});

export default function Page() {
  return (
    <>
      <CleanHero />
      <CleanDetails />
      <CleanProject />
      <WhyChooseUs variant="cleaning" />
      <CleanCta />
      <Footer />
    </>
  );
}
