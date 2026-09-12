"use client";

import CleanDetails from "@/components/Cleaning/CleanDetails";
import CleanHero from "@/components/Cleaning/CleanHero";
import CleanProject from "@/components/Cleaning/CleanProject";
import Footer from "@/components/Footer";
import Cta from "@/components/Home/Cta";
import WhyChooseUs from "@/components/Home/WhyChooseUs";

export default function Page() {
  return (
    <>
      <CleanHero />
      <CleanDetails />
      <CleanProject />
      <WhyChooseUs />
      <Cta />
      <Footer />
    </>
  );
}
