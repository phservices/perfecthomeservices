"use client";

import Link from "next/link";
import Header from "../Header";
import Button from "../ui/Button";

const HERO_VIDEO_URL =
  // "https://res.cloudinary.com/dqqeeocay/video/upload/f_auto,q_auto/v1789521195/document_5859328757550031074_tqspeg.mp4";
  "https://res.cloudinary.com/dqqeeocay/video/upload/v1789525590/document_5859328757550031075_ghqzxp.mp4";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-4 sm:pt-6 md:pt-8 lg:pt-10">
      {/* Background video */}
      <video
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        src={HERO_VIDEO_URL}
        poster="/images/Hero-bg.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />

      {/* Dark overlay for text contrast */}
      <div className="absolute inset-0 -z-10 bg-black/55" />

      <Header />

      <div className="container mx-auto px-5 sm:px-6 md:px-8">
        <div className="flex min-h-[560px] flex-col justify-center py-16 sm:py-20 md:min-h-[620px] md:py-24 lg:min-h-[680px] lg:py-0">
          {/* Eyebrow */}
          <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 font-sans text-xs font-medium uppercase tracking-[0.14em] text-white backdrop-blur-sm sm:text-sm">
            <span className="h-[6px] w-[6px] rounded-full bg-[#F89A0B]" />
            Interior &amp; Exterior Design Studio
          </span>

          {/* Heading */}
          <h1
            className="
              mb-5
              w-full
              max-w-[820px]
              font-display
              font-semibold
              leading-[112%]
              tracking-[-0.01em]
              text-[34px]
              text-white
              sm:text-[42px]
              md:text-[52px]
              lg:text-[64px]
            "
          >
            Creating Healthy Rooms for Perfect Living.
          </h1>

          {/* Description */}
          <p
            className="
              mb-9
              w-full
              max-w-[640px]
              font-sans
              text-[16px]
              leading-[160%]
              text-white/80
              sm:text-[17px]
              md:text-[18px]
            "
          >
            Perfect Home Services is an interior and exterior design company
            based in Enugu State, Nigeria — delivering home improvement,
            construction finishing, industrial cleaning, fumigation, real
            estate, and interior design training under one trusted brand.
          </p>

          {/* Buttons */}
          <div className="flex w-full flex-col gap-3 sm:flex-row sm:gap-4">
            <Link href="/Contact">
              <Button
                style="danger"
                type="button"
                text="text-[#1A1A1A]"
                css="
                w-full
                sm:w-auto
                sm:min-w-[190px]
                px-7
                py-4
                text-[14px]
                font-sans
                font-semibold
              "
              >
                Book a Consultation
              </Button>
            </Link>

            <Link href="/Listing">
              <Button
                style="primary"
                type="button"
                css="
                  w-full
                  sm:w-auto
                  sm:min-w-[190px]
                  px-7
                  py-4
                  text-[14px]
                  font-sans
                  font-semibold
                "
              >
                Explore Our Services
              </Button>
            </Link>
          </div>

          {/* Stat strip */}
          <div className="mt-14 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-white/15 pt-8 sm:mt-16 md:mt-20">
            {[
              { value: "2017", label: "Founded In" },
              { value: "3", label: "Core Service Lines" },
              { value: "Enugu", label: "Home Base, Nigeria" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="font-display text-2xl font-semibold text-white sm:text-3xl">
                  {stat.value}
                </span>
                <span className="font-sans text-xs text-white/65 sm:text-sm">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
