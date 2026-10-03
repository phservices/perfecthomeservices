
"use client";

import Image from "next/image";
import Button from "../ui/Button";
import Link from "next/link";

export default function OurStory() {
  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-[84px]">
      <div className="container mx-auto px-5 sm:px-6 md:px-8">
        {/* Section heading */}
        <div className="mb-10 text-center sm:mb-12 md:mb-14 lg:mb-[40px]">
          <p className="mb-3 font-sans text-lg font-semibold text-[#000000B8] sm:text-xl md:text-2xl">
            Our Story
          </p>

          <h2 className="mx-auto max-w-[700px] font-sans text-2xl font-semibold leading-[110%] text-black sm:text-3xl md:text-[32px] md:leading-[100%]">
            Every Great Space Begins With a Vision
          </h2>
        </div>

        {/* Story content */}
        <div className="grid justify-center gap-8 md:grid-cols-1 md:items-center xl:grid-cols-[1fr_419px_1fr] lg:gap-4">
          {/* First story */}
          <div className="font-inter text-[#1A1A1A]">
            <p className="text-base leading-[145%] font-normal sm:text-lg md:text-xl lg:text-2xl lg:leading-[120%]">
              <span
                aria-hidden="true"
                className="mr-1 align-baseline text-5xl font-normal leading-[0] sm:text-6xl md:text-[70px]"
              >
                “
              </span>
              Perfect Home Services was established in 2017, beginning as a
              painting and wallpaper installation company. As the demand for
              complete interior solutions grew, the company expanded through
              professional training, industry certifications, and years of
              practical experience to become a full-service interior design and
              construction finishing company.
            </p>
          </div>

          {/* Image */}
          <div className="relative aspect-[419/399] w-full overflow-hidden rounded-2xl">
            <Image
              src="/images/our-story.jpg"
              fill
              sizes="
                (max-width: 768px) 100vw,
                (max-width: 1024px) 50vw,
                419px
              "
              alt="Interior space representing the story of Perfect Home Services"
              className="object-cover"
            />
          </div>

          {/* Second story */}
          <div className="font-inter text-[#1A1A1A]">
            <p className="text-base leading-[145%] font-normal sm:text-lg md:text-xl lg:text-2xl lg:leading-[120%]">
              Today, we provide creative design solutions, quality finishing
              services, industrial cleaning, fumigation, and real estate
              services for residential, commercial, and industrial properties
              in Enugu and across Nigeria. Every project reflects our commitment
              to quality workmanship, professionalism, and client satisfaction.
            </p>

            <div className="mt-6">
              <Link href="/Services">
                <Button
                  style="danger"
                  type="button"
                  text="text-[#1A1A1A]"
                  
                >
                  Explore Our Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
