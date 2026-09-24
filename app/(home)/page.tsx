import Footer from "@/components/Footer";
import Academy from "@/components/Home/Academy";
import Cta from "@/components/Home/Cta";
import Faq from "@/components/Home/Faq";
import FeaturedProject from "@/components/Home/FeaturedProject";
import FeaturedService from "@/components/Home/FeaturedService";
// import Founder from "@/components/Home/Founder";
import Hero from "@/components/Home/Hero";
import Introduction from "@/components/Home/Introduction";
import ServiceArea from "@/components/Home/ServiceArea";
import Testimonials from "@/components/Home/Testimonials";
import TrustedSolution from "@/components/Home/TrustedSolution";
import WhyChooseUs from "@/components/Home/WhyChooseUs";
import { pageMetadata } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import { faqs } from "@/utils/Content/faqs";
import { getPublishedProjects } from "@/lib/project-queries";

export const revalidate = 300;

export const metadata = pageMetadata({
  title: "Interior Design, Cleaning & Real Estate in Enugu, Nigeria",
  description:
    "Perfect Home Services delivers interior & exterior design, industrial cleaning and fumigation, and real estate services in Enugu and across Nigeria. Book a free consultation.",
  path: "/",
  keywords: ["interior design Enugu", "cleaning services Enugu", "fumigation Nigeria", "real estate Enugu", "Perfect Home Services"],
});

export default async function Page() {
  const featuredProjects = (await getPublishedProjects()).slice(0, 2);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }}
      />
      <Hero />
      <TrustedSolution />
      <Introduction />
      <WhyChooseUs />
      <FeaturedService />
      <FeaturedProject projects={featuredProjects} />
      <Academy />
      {/* <Founder /> */}
      <Testimonials />
      <ServiceArea />
      <Faq />
      <Cta />
      <Footer />
    </>
  );
}
