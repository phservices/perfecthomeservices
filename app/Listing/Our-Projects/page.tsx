import Footer from "@/components/Footer";
import WhyChooseUs from "@/components/Home/WhyChooseUs";
import InteriorCta from "@/components/Interior/InteriorCta";
// import InteriorDetails from "@/components/Interior/InteriorDetails";
import InteriorHero from "@/components/Interior/InteriorHero";
import ProjectsGallery from "@/components/Projects/ProjectsGallery";
import { getProjectCategories, getPublishedProjects } from "@/lib/project-queries";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 300;

export const metadata = pageMetadata({
  title: "Our Projects & Portfolio",
  description:
    "Browse completed interior and exterior design projects by Perfect Home Services in Enugu, Nigeria, and see the quality of work we deliver.",
  path: "/Listing/Our-Projects",
  image: "/images/interior.jpg",
});

export default async function Page() {
  const [projects, categories] = await Promise.all([
    getPublishedProjects(),
    getProjectCategories(),
  ]);

  return (
    <>
      <InteriorHero />
      {/* <InteriorDetails /> */}
      <ProjectsGallery projects={projects} categories={categories} />
      <WhyChooseUs />
      <InteriorCta />
      <Footer />
    </>
  );
}
