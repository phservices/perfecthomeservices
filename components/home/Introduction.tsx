"use client";

import Image from "next/image";
import Button from "../ui/Button";

export default function Introduction() {
  return (
    <section className="bg-[#F8FAFC]">
      <div className="py-12 sm:py-16 md:py-[62px] lg:py-[84px]">
        <div className="container mx-auto px-5 sm:px-6 md:px-8">
          {/* Section Label */}
          <h1
            className="
              mb-3
              font-sans
              text-start
              text-[16px]
              font-semibold
              leading-[100%]
              text-[#000000B8]
              sm:text-[18px]
              md:mb-4
              md:text-center
              md:text-[20px]
              lg:text-[24px]
            "
          >
            Brief Introduction
          </h1>

          {/* Section Heading */}
          <p
            className="
              mb-8
              font-sans
              text-start
              text-[24px]
              font-semibold
              leading-[115%]
              text-[#1A1A1A]
              sm:text-[28px]
              md:mb-8
              md:text-center
              md:text-[32px]
              lg:mb-10
            "
          >
            Building Beautiful Spaces Since 2017
          </p>

          {/* Content */}
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-8 lg:gap-12">
            {/* Text */}
            <div className="order-2 flex flex-col md:order-1">
              <p
                className="
                  mb-5
                  font-inter
                  text-[16px]
                  font-normal
                  leading-[145%]
                  text-[#1A1A1ACC]
                  sm:text-[17px]
                  lg:mb-6
                  lg:text-[20px]
                  lg:leading-[120%]
                "
              >
                Perfect Home Services started in 2017 as a painting and
                wallpaper installation company. Through years of experience and
                professional training, the company has grown into a trusted
                interior design and construction finishing brand serving homes,
                offices, commercial buildings, and industrial facilities.
              </p>

              <p
                className="
                  mb-6
                  font-inter
                  text-[16px]
                  font-normal
                  leading-[145%]
                  text-[#1A1A1ACC]
                  sm:text-[17px]
                  lg:mb-7
                  lg:text-[20px]
                  lg:leading-[120%]
                "
              >
                Today, we continue to deliver practical design solutions that
                improve how people live, work, and experience their spaces.
              </p>

              {/* Button */}
              <div className="flex w-full justify-start">
                <Button
                  style="danger"
                  type="button"
                  css="
                    w-full
                    max-w-[220px]
                    px-5
                    py-3
                    text-[14px]
                    font-sans
                    font-semibold
                    leading-[100%]
                    text-[#1A1A1A]
                    sm:text-[16px]
                  "
                >
                  Learn More About Us
                </Button>
              </div>
            </div>

            {/* Image */}
            <div
              className="
                order-1
                h-[260px]
                w-full
                overflow-hidden
                rounded-[8px]
                sm:h-[320px]
                md:order-2
                md:h-[300px]
                lg:h-[399px]
              "
            >
              <Image
                src="/images/intro.jpg"
                alt="Interior of a beautiful home"
                width={632}
                height={399}
                className="h-full w-full rounded-[8px] object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
