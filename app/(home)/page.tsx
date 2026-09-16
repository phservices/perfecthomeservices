"use client";

import Footer from "@/components/Footer";
import Academy from "@/components/Home/Academy";
import Cta from "@/components/Home/Cta";
import FeaturedService from "@/components/Home/FeaturedService";
// import Founder from "@/components/Home/Founder";
import Hero from "@/components/Home/Hero";
import Introduction from "@/components/Home/Introduction";
import ServiceArea from "@/components/Home/ServiceArea";
import Testimonials from "@/components/Home/Testimonials";
import TrustedSolution from "@/components/Home/TrustedSolution";
import WhyChooseUs from "@/components/Home/WhyChooseUs";

export default function Page() {
  return (
    <>
      <Hero />
      <TrustedSolution />
      <Introduction />
      <WhyChooseUs />
      <FeaturedService />
      <Academy />
      {/* <Founder /> */}
      <Testimonials />
      <ServiceArea />
      <Cta />
      <Footer />
    </>
  );
}
