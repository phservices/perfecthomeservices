"use client";

import AcademyCta from "@/components/Academy/AcademyCta";
import AcademyDetails from "@/components/Academy/AcademyDetails";
import AcademyGallery from "@/components/Academy/AcademyGallery";
import AcademyHero from "@/components/Academy/AcademyHero";
import AcademyStory from "@/components/Academy/AcademyStory";
import Footer from "@/components/Footer";


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
