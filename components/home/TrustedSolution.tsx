
"use client";

import { services } from "@/utils/Content/HomePage.Content";
import Button from "../ui/Button";

export default function TrustedSolution() {
  return (
    <section className="bg-[#F8FAFC]">
      <div className="container mx-auto px-5 sm:px-6 md:px-8">
        <div className="py-16 sm:py-20 md:py-24 lg:py-[105px]">
          {/* Section Label */}
          <h1
            className="
              mb-3
              font-sans
              text-center
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
            Trusted Solutions
          </h1>

          {/* Main Heading */}
          <p
            className="
              mb-3
              font-sans
              text-center
              text-[24px]
              font-semibold
              leading-[115%]
              text-[#1A1A1A]
              sm:text-[28px]
              md:mb-2
              md:text-center
              md:text-[32px]
            "
          >
            Complete Interior Design & Property Solutions
          </p>

          {/* Description */}
          <p
            className="
              mx-0
              mb-7
              max-w-[800px]
              font-inter
              text-center
              text-[16px]
              leading-[145%]
              text-[#1A1A1A]
              sm:text-[18px]
              md:mx-auto
              md:mb-8
              md:text-center
              lg:text-[20px]
              lg:leading-[120%]
            "
          >
            Perfect Home Services delivers professional solutions for
            residential, commercial, and industrial properties. Every project
            is handled with careful planning, quality workmanship, and
            attention to detail. Our services include:
          </p>

          {/* CTA */}
          <div className="mb-7 flex justify-center md:mb-8 md:justify-center">
            <Button
              type="button"
              style="danger"
              css="
                h-[48px]
                w-full
                max-w-[200px]
                text-[13px]
                font-semibold
                sm:h-[50px]
              "
            >
              See all Services
            </Button>
          </div>

          {/* Services */}
          <div className="mx-auto flex max-w-[1000px] flex-wrap items-center justify-center gap-2 sm:gap-3">
            {services.map((service) => (
              <span
                key={service}
                className="
                  rounded-full
                  border
                  border-[#F97316]
                  bg-[#FFF7ED]
                  px-3
                  py-2
                  font-sans
                  text-[12px]
                  font-medium
                  text-[#1A1A1A]
                  sm:px-4
                  sm:text-[13px]
                  md:text-[14px]
                "
              >
                {service}
              </span>
            ))}

            {/* Real Estate */}
            <span
              className="
                rounded-full
                border
                border-[#F97316]
                bg-[#FFF7ED]
                px-3
                py-2
                font-sans
                text-[12px]
                font-medium
                text-[#1A1A1A]
                sm:px-4
                sm:text-[13px]
                md:text-[14px]
              "
            >
              Real Estate Services
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
