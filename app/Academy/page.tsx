"use client";

import AcademyDetails from "@/components/Academy/AcademyDetails";
import AcademyGallery from "@/components/Academy/AcademyGallery";
import AcademyHero from "@/components/Academy/AcademyHero";
import AcademyStory from "@/components/Academy/AcademyStory";
import Footer from "@/components/Footer";
import Cta from "@/components/Home/Cta";
import WhyChooseUs from "@/components/Home/WhyChooseUs";

export default function Page() {
  return (
    <>
      <AcademyHero />
      <AcademyDetails />
      <AcademyStory />
      <AcademyGallery />
      <WhyChooseUs />
      <Cta />
      <Footer />
    </>
  );
}
