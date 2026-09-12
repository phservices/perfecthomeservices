"use client";

import Image from "next/image";

export default function CleanProject() {
  return (
    <section className="bg-[#FDF8F3]">
      <div className="py-[48px] sm:py-[64px] lg:py-[80px]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-[#000000B8] text-[24px] sm:text-[28px] lg:text-[32px] leading-[130%] font-bold font-sans mb-[12px]">
            Our Projects
          </h2>

          <p className="mx-auto max-w-[560px] text-center text-[14px] sm:text-[15px] lg:text-[16px] font-inter font-normal leading-[150%] text-[#000000CC] mb-[32px] sm:mb-[40px]">
           See how we&apos;ve restored homes, offices, and commercial spaces through our professional cleaning and fumigation services.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[16px] sm:gap-[20px] lg:gap-[24px]">
            {projects.map((project) => (
              <div
                key={project.id}
                className="relative aspect-square w-full overflow-hidden rounded-[8px] bg-[#EFE7DE]"
              >
                <Image
                  src={project.src}
                  alt={project.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const projects = [
  { id: 1, src: "/images/clean-1.jpg", alt: "Completed interior fit-out with wooden desk and shelving" },
  { id: 2, src: "/images/clean-2.jpg", alt: "Custom cabinetry and workspace finishing" },
  { id: 3, src: "/images/clean-3.jpg", alt: "Warm-lit study area with built-in shelves" }
];