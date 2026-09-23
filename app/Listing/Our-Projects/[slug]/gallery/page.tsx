import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import BeforeAfterSlider from "@/components/Projects/BeforeAfterSlider";
import ProjectGalleryGrid from "@/components/Projects/ProjectGalleryGrid";
import { getPublishedProject, getPublishedProjects } from "@/lib/project-queries";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const revalidate = 300;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const projects = await getPublishedProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getPublishedProject(slug);
  if (!project) return { title: "Project not found", robots: { index: false } };

  const title = `${project.title} — Full Gallery`;
  const url = `${SITE_URL}/Listing/Our-Projects/${project.slug}/gallery`;

  return {
    title: { absolute: `${title} | ${SITE_NAME}` },
    description: `All photos from the ${project.title} project by Prefect Homes.`,
    alternates: { canonical: url },
    robots: { index: false },
  };
}

export default async function ProjectGalleryPage({ params }: Props) {
  const { slug } = await params;
  const project = await getPublishedProject(slug);
  if (!project) notFound();

  const photos = [
    ...(project.cover_image_url
      ? [{ src: project.cover_image_url, alt: project.cover_image_alt || project.title }]
      : []),
    ...project.gallery.map((g) => ({ src: g.image_url, alt: g.image_alt || project.title })),
  ];

  return (
    <>
      <div className="bg-[#151515] pb-5 pt-1">
        <Header />
      </div>

      <div className="mx-auto max-w-[1100px] px-5 pb-20 pt-12 sm:px-6 lg:pt-16">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-[#1A1A1A]/55">
          <Link href="/Listing/Our-Projects" className="hover:text-[#F89A0B]">
            Our Projects
          </Link>
          <span className="mx-2">/</span>
          <Link href={`/Listing/Our-Projects/${project.slug}`} className="hover:text-[#F89A0B]">
            {project.title}
          </Link>
          <span className="mx-2">/</span>
          <span>Full Gallery</span>
        </nav>

        <span className="mb-2 inline-block text-[11px] font-bold uppercase tracking-[0.1em] text-[#6F4322]">
          {project.category}
        </span>
        <h1 className="font-display text-[28px] font-semibold leading-[115%] text-[#1A1A1A] sm:text-[36px] lg:text-[42px]">
          {project.title} — Full Gallery
        </h1>

        {project.beforeAfter.length > 0 && (
          <section className="mt-10">
            <h2 className="mb-5 text-[20px] font-semibold text-[#1A1A1A] sm:text-[24px]">
              Before &amp; After
            </h2>
            <p className="mb-6 max-w-[640px] text-[15px] leading-[160%] text-[#1A1A1A]/70">
              Drag the handle to compare — or use the arrow keys once it&apos;s focused.
            </p>
            <div className="grid gap-8 sm:grid-cols-2">
              {project.beforeAfter.map((pair) => (
                <BeforeAfterSlider
                  key={pair.id}
                  label={pair.label || undefined}
                  beforeSrc={pair.before_image_url}
                  beforeAlt={pair.before_alt || `${project.title} before`}
                  afterSrc={pair.after_image_url}
                  afterAlt={pair.after_alt || `${project.title} after`}
                />
              ))}
            </div>
          </section>
        )}

        {photos.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-5 text-[20px] font-semibold text-[#1A1A1A] sm:text-[24px]">Photos</h2>
            <ProjectGalleryGrid photos={photos} />
          </section>
        )}

        <div className="mt-14 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href={`/Listing/Our-Projects/${project.slug}`}
            className="text-[15px] font-semibold text-[#1A1A1A] underline underline-offset-4 hover:text-[#F89A0B]"
          >
            ← Back to project
          </Link>
          <Link
            href="/Contact"
            className="inline-flex items-center justify-center bg-[#6F4322] px-7 py-3.5 text-[14px] font-bold uppercase tracking-[0.05em] text-white transition-colors hover:bg-[#5A3519]"
          >
            Discuss a Similar Project
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
}
