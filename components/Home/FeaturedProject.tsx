import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";
import Button from "../ui/Button";
import SectionHeading from "../ui/SectionHeading";

export default function FeaturedProject({ projects }: { projects: Project[] }) {
  if (projects.length === 0) return null;

  return (
    <section className="bg-white">
      <div className="py-16 sm:py-20 md:py-24 lg:py-28">
        <div className="container mx-auto px-5 sm:px-6 md:px-8">
          <SectionHeading
            eyebrow="Featured Projects"
            title="Turning Ideas Into Spaces People Love"
            description="Every project tells a story. Explore some of the homes, offices, and commercial spaces we've transformed through thoughtful design and professional execution."
          />

          <div className="mt-12 grid grid-cols-1 gap-5 md:mt-14 md:grid-cols-2">
            {projects.map((project) => (
              <Link
                key={project.id}
                href={`/Listing/Our-Projects/${project.slug}`}
                className="group relative block h-[300px] w-full overflow-hidden rounded-2xl bg-[#EFE7DE] shadow-[0_20px_44px_-24px_rgba(26,26,26,0.3)] sm:h-[360px] lg:h-[460px]"
              >
                {project.cover_image_url && (
                  <Image
                    src={project.cover_image_url}
                    alt={project.cover_image_alt || project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-5 text-white sm:p-6 lg:p-7">
                  <span className="mb-1.5 inline-block text-[11px] font-bold uppercase tracking-[0.1em] text-[#F89A0B]">
                    {project.category}
                  </span>
                  <h3 className="font-display text-[19px] font-semibold leading-[118%] text-white sm:text-[21px] lg:text-[24px]">
                    {project.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 flex justify-center md:mt-12">
            <Link href="/Listing/Our-Projects">
              <Button
                style="danger"
                type="button"
                text="text-[#1A1A1A]"
                
              >
                View More Projects
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
