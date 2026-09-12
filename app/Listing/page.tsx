"use client";

import Footer from "@/components/Footer";
import Academy from "@/components/Home/Academy";
import Cta from "@/components/Home/Cta";
import ListingHero from "@/components/Listing/ListingHero";
import ListingStory from "@/components/Listing/ListingStory";
import ServiceBlock from "@/components/Listing/ServiceBlock";

export default function Page() {
  return (
    <>
      <ListingHero />
      <ListingStory />
      <ServiceBlock />
      <Academy />
      <Cta />
      <Footer />
    </>
  );
}
