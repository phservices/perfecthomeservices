import Footer from "@/components/Footer";
import Cta from "@/components/Home/Cta";
import WhyChooseUs from "@/components/Home/WhyChooseUs";
import RealCta from "@/components/RealEstate/RealCta";
import RealDetails from "@/components/RealEstate/RealDetails";
import RealHero from "@/components/RealEstate/RealHero";
import RealProject from "@/components/RealEstate/RealProject";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Real Estate Services in Enugu, Nigeria",
  description:
    "Buy, sell and manage property with Perfect Home Services. Trusted real estate guidance and listings for homes and commercial spaces in Enugu, Nigeria.",
  path: "/Listing/real-estate",
  image: "/images/real-1.jpg",
  keywords: ["real estate Enugu", "property for sale Enugu", "real estate agent Nigeria"],
});

export default function Page() {
  return (
    <>
      <RealHero />
      <RealDetails />
      <RealProject />
      <WhyChooseUs variant="real-estate" />
      <RealCta />
      <Footer />
    </>
  );
}
