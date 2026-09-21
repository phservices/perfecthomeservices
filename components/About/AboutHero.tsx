"use client";

import Link from "next/link";
import Header from "../Header";
import Button from "../ui/Button";

export default function AboutHero() {
  return (
    <section className="bg-about-1 pt-5 sm:pt-7 md:pt-10 lg:pt-[50px]">
      <Header />

      <div className="container mx-auto px-5 sm:px-6 md:px-8">
        <div className="flex flex-col items-center py-16 text-center sm:py-20 md:py-24 lg:pb-[86px] lg:pt-[72px]">
          {/* Heading */}
          <h1
            className="
                     mb-4
                     w-full
                     max-w-[881px]
                     font-bold
                     leading-[105%]
                     text-[28px]
                     text-white
                     sm:text-[32px]
                     md:text-[40px]
                     lg:text-[48px]
                   "
          >
            Who We Are
          </h1>

          {/* Description */}
          <p
            className="
                     mb-8
                     w-full
                     max-w-[881px]
                     font-inter
                     text-[16px]
                     leading-[150%]
                     text-white
                     sm:text-[17px]
                     md:mb-9
                     md:text-[18px]
                     md:leading-[145%]
                     lg:text-[20px]
                     lg:leading-[120%]
                   "
          >
            Since 2017, Perfect Home Services has grown from a painting and
            wallpaper company into a full-service interior design, construction
            finishing, cleaning, fumigation, and real estate company trusted
            across Enugu and Nigeria.
          </p>

          {/* Buttons */}
          <div className="flex w-full flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
            <Link href="/Listing">
              <Button
                style="danger"
                type="button"
                text="text-[#F8FAFC]"
                css="
                w-full
                sm:w-auto
                sm:min-w-[165px]
                px-[24.29px]
                py-[15.55px]
                text-[16px]
                font-bold
              "
              >
                Explore Our Services
              </Button>
            </Link>

            <Link href="/Contact">
              <Button
                style="primary"
                type="button"
                css="
                w-full
                sm:w-auto
                sm:min-w-[165px]
                px-[24.29px]
                py-[15.55px]
                text-[16px]
                font-bold
              "
              >
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
