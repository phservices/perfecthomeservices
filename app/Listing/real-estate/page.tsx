"use client";

import Footer from "@/components/Footer";
import Cta from "@/components/Home/Cta";
import WhyChooseUs from "@/components/Home/WhyChooseUs";
import RealCta from "@/components/RealEstate/RealCta";
import RealDetails from "@/components/RealEstate/RealDetails";
import RealHero from "@/components/RealEstate/RealHero";
import RealProject from "@/components/RealEstate/RealProject";

export default function Page() {
  return (
    <>
      <RealHero />
      <RealDetails />
      <RealProject />
      <WhyChooseUs />
      <RealCta />
      <Footer />
    </>
  );
}
