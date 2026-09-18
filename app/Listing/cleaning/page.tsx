"use client";

import CleanCta from "@/components/Cleaning/CleanCta";
import CleanDetails from "@/components/Cleaning/CleanDetails";
import CleanHero from "@/components/Cleaning/CleanHero";
import CleanProject from "@/components/Cleaning/CleanProject";
import Footer from "@/components/Footer";
import WhyChooseUs from "@/components/Home/WhyChooseUs";

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
