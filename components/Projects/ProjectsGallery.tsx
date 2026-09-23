"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";
import { ALL_CATEGORY } from "@/lib/projects";

export default function ProjectsGallery({
  projects,
  categories,
}: {
  projects: Project[];
  categories: string[];
}) {
  const [active, setActive] = useState(ALL_CATEGORY);
  const filtered = active === ALL_CATEGORY ? projects : projects.filter((p) => p.category === active);
  const tabs = [ALL_CATEGORY, ...categories];

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

          {categories.length > 0 && (
            <div className="mb-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActive(tab)}
                  aria-pressed={active === tab}
                  className={`rounded-full px-5 py-2.5 text-[14px] font-semibold transition-colors ${
                    active === tab
                      ? "bg-[#6F4322] text-white"
                      : "border border-[#E2E2E2] text-[#1A1A1A] hover:border-[#6F4322] hover:text-[#6F4322]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          )}

          {filtered.length === 0 ? (
            <p className="py-16 text-center text-lg text-[#1A1A1A]/60">
              {projects.length === 0
                ? "New projects are coming soon. Check back shortly!"
                : "No projects in this category yet."}
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((project) => (
                <Link
                  key={project.id}
                  href={`/Listing/Our-Projects/${project.slug}`}
                  className="group relative block overflow-hidden bg-[#EFE7DE]"
                >
                  <div className="relative aspect-[4/5] w-full">
                    {project.cover_image_url && (
                      <Image
                        src={project.cover_image_url}
                        alt={project.cover_image_alt || project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <span className="mb-1.5 inline-block text-[10px] font-bold uppercase tracking-[0.1em] text-[#F89A0B]">
                      {project.category}
                    </span>
                    <h3 className="text-[18px] font-semibold leading-[125%] text-white sm:text-[20px]">
                      {project.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
