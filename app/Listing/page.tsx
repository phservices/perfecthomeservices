import Footer from "@/components/Footer";
import Academy from "@/components/Home/Academy";
import Cta from "@/components/Home/Cta";
import ListingHero from "@/components/Listing/ListingHero";
import ListingStory from "@/components/Listing/ListingStory";
import OurProcess from "@/components/Listing/OurProcess";
import ServiceBlock from "@/components/Listing/ServiceBlock";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Our Services",
  description:
    "Explore Perfect Home Services: interior & exterior design, industrial cleaning and fumigation, and real estate services for homes and businesses in Enugu, Nigeria.",
  path: "/Listing",
  image: "/images/listingHero.jpg",
});

export default function Page() {
  return (
    <>
      <ListingHero />
      <ListingStory />
      <ServiceBlock />
      <OurProcess />
      <Academy />
      <Cta />
      <Footer />
    </>
  );
}
