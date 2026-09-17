"use client";

import Image from "next/image";
import Link from "next/link";

export default function OurProjects() {
  return (
    <section className="bg-white">
      <div className="py-[48px] sm:py-[64px] lg:py-[80px]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-[#000000B8] text-[24px] sm:text-[28px] lg:text-[32px] leading-[130%] font-bold font-sans mb-[12px]">
            Our Projects
          </h2>

          <p className="mx-auto max-w-[560px] text-center text-[16px] sm:text-[16px] lg:text-[16px] font-inter font-normal leading-[150%] text-[#000000CC] mb-[32px] sm:mb-[40px]">
            Explore our completed projects and see how we&apos;ve transformed
            residential and commercial spaces through thoughtful design, quality
            finishing, and expert craftsmanship.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[18px]">
            {projects.map((project) => (
              <article
                key={project.id}
                className="flex flex-col overflow-hidden border border-[#E2E2E2] bg-white"
              >
                {/* Image */}
                <div className="relative w-full aspect-[16/9] sm:aspect-[580/330] bg-[#EFE7DE]">
                  <Image
                    src={project.src}
                    alt={project.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col items-start px-[20px] pt-[28px] pb-[20px]">
                  <span className="mb-[6px] text-[9px] font-bold uppercase tracking-[0.08em] text-[#6F4322]">
                    {project.category}
                  </span>

                  <h3 className="mb-[10px] text-[22px] sm:text-[24px] font-normal leading-[120%] text-[#1A1A1A]">
                    {project.title}
                  </h3>

                  <p className="mb-[16px] text-[16px] leading-[150%] text-[#333333]">
                    {project.description}
                  </p>

                  <Link
                    href={project.href}
                    className="mt-auto inline-flex items-center justify-center bg-[#6F4322] px-[21px] py-[13px] text-[13px] font-semibold leading-none text-white transition-colors hover:bg-[#5A3519] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6F4322]"
                  >
                    Discuss a Similar Project
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const projects = [
  {
    id: 1,
    src: "/images/imgs-1.jpg",
    alt: "Open-plan living room with floating staircase and blue sofas",
    category: "Residential",
    title: "The Holloway Residence",
    description:
      "Warm, contemporary living with natural textures, soft neutrals and carefully considered details.",
    href: "/Contact",
  },
  {
    id: 2,
    src: "/images/imgs-2.jpg",
    alt: "Bright family room with arched windows and white brick fireplace",
    category: "Residential",
    title: "Modern Family Retreat",
    description:
      "A refined home environment designed around comfort, movement and everyday life.",
    href: "/Contact",
  },
  {
    id: 3,
    src: "/images/imgs-3.jpg",
    alt: "Commercial interior with wooden surfaces and shelving",
    category: "Commercial",
    title: "The Timber & Co. Showroom",
    description:
      "A commercial fit-out built around warm timber finishes, custom shelving and durable surfaces designed for daily foot traffic.",
    href: "/Contact",
  },
  {
    id: 4,
    src: "/images/imgs-4.jpg",
    alt: "Residential workspace with accent lighting",
    category: "Residential",
    title: "The Home Office Studio",
    description:
      "A quiet home workspace shaped by layered accent lighting and considered storage, built for focus without losing warmth.",
    href: "/Contact",
  },
];