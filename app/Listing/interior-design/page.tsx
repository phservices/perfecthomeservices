"use client";

import Footer from "@/components/Footer";
import Cta from "@/components/Home/Cta";
import WhyChooseUs from "@/components/Home/WhyChooseUs";
import InteriorDetails from "@/components/Interior/InteriorDetails";
import InteriorHero from "@/components/Interior/InteriorHero";
import OurProjects from "@/components/Interior/OurProjects";

export default function Page() {
  return (
    <>
      <InteriorHero />
      <InteriorDetails />
      <OurProjects />
      <WhyChooseUs />
      <Cta />
      <Footer />
    </>
  );
}
