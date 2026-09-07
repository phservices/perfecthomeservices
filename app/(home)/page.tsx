"use client";

import Footer from "@/components/Footer";
import Academy from "@/components/home/Academy";
import Cta from "@/components/home/Cta";
import FeaturedService from "@/components/home/FeaturedService";
import Founder from "@/components/home/Founder";
import Hero from "@/components/home/Hero";
import Introduction from "@/components/home/Introduction";
import ServiceArea from "@/components/home/ServiceArea";
import Testimonials from "@/components/home/Testimonials";
import TrustedSolution from "@/components/home/TrustedSolution";
import WhyChooseUs from "@/components/home/WhyChooseUs";

export default function Page() {
  return (
    <>
      <Hero />
      <TrustedSolution />
      <Introduction />
      <WhyChooseUs />
      <FeaturedService />
      <Academy />
      <Founder />
      <Testimonials />
      <ServiceArea />
      <Cta />
      <Footer />
    </>
  );
}
