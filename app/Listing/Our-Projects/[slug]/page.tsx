import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { getPublishedProject, getPublishedProjects } from "@/lib/project-queries";
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from "@/lib/site";

export const revalidate = 300;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const projects = await getPublishedProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

function describe(project: { description: string; category: string; title: string }) {
  return (
    project.description.slice(0, 155).trim() ||
    `${project.title} — a ${project.category} project by Prefect Homes.`
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getPublishedProject(slug);
  if (!project) return { title: "Project not found", robots: { index: false } };

  const title = project.title;
  const description = describe(project);
  const url = `${SITE_URL}/Listing/Our-Projects/${project.slug}`;
  const image = project.cover_image_url || `${SITE_URL}${DEFAULT_OG_IMAGE}`;

  return {
    title: { absolute: `${title} | ${SITE_NAME}` },
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title,
      description,
      url,
      siteName: SITE_NAME,
      section: project.category,
      images: [{ url: image, alt: project.cover_image_alt || project.title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await getPublishedProject(slug);
  if (!project) notFound();

  const hasGallery = project.gallery.length > 0 || project.beforeAfter.length > 0;
  const url = `${SITE_URL}/Listing/Our-Projects/${project.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Our Projects", item: `${SITE_URL}/Listing/Our-Projects` },
      { "@type": "ListItem", position: 3, name: project.title, item: url },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <div className="bg-[#151515] pb-5 pt-1">
        <Header />
      </div>

      <article className="mx-auto max-w-[900px] px-5 pb-16 pt-12 sm:px-6 lg:pt-16">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-[#1A1A1A]/55">
          <Link href="/Listing/Our-Projects" className="hover:text-[#F89A0B]">
            Our Projects
          </Link>
          <span className="mx-2">/</span>
          <span>{project.category}</span>
        </nav>

        <span className="mb-3 inline-block text-[11px] font-bold uppercase tracking-[0.1em] text-[#6F4322]">
          {project.category}
        </span>
        <h1 className="font-display text-[32px] font-semibold leading-[115%] text-[#1A1A1A] sm:text-[42px] lg:text-[50px]">
          {project.title}
        </h1>

        {project.cover_image_url && (
          <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl">
            <Image
              src={project.cover_image_url}
              alt={project.cover_image_alt || project.title}
              fill
              priority
              sizes="(min-width: 900px) 900px, 100vw"
              className="object-cover"
            />
          </div>
        )}

        {project.description && (
          <p className="mt-8 whitespace-pre-line text-[16px] leading-[170%] text-[#333333] sm:text-[18px]">
            {project.description}
          </p>
        )}

        <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          {hasGallery ? (
            <Link
              href={`/Listing/Our-Projects/${project.slug}/gallery`}
              className="inline-flex items-center justify-center bg-[#6F4322] px-7 py-3.5 text-[14px] font-bold uppercase tracking-[0.05em] text-white transition-colors hover:bg-[#5A3519]"
            >
              View Full Gallery
            </Link>
          ) : (
            <span />
          )}
          <Link
            href="/Contact"
            className="text-[15px] font-semibold text-[#1A1A1A] underline underline-offset-4 hover:text-[#F89A0B]"
          >
            Discuss a similar project
          </Link>
        </div>
      </article>

      <Footer />
    </>
  );
}
