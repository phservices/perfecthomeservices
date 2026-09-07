
"use client";

import { FeaturedServices } from "@/utils/Content/HomePage.Content";
import Image from "next/image";

export default function FeaturedService() {
  return (
    <section className="bg-[#FFF9F1]">
      <div className="py-12 sm:py-14 md:py-16 lg:py-[84px]">
        <div className="container mx-auto px-5 sm:px-6 md:px-8">
          
          {/* Section Label */}
          <h3
            className="
              mb-3
              text-start
              font-sans
              text-[16px]
              font-semibold
              leading-[110%]
              text-[#000000B8]
              sm:text-[18px]
              md:mb-4
              md:text-center
              md:text-[20px]
              lg:text-[24px]
            "
          >
            Featured Services
          </h3>

          {/* Main Heading */}
          <h2
            className="
              mx-0
              mb-3
              max-w-[1000px]
              text-start
              font-sans
              text-[23px]
              font-semibold
              leading-[115%]
              text-[#000000]
              sm:text-[26px]
              md:mx-auto
              md:mb-2
              md:text-center
              md:text-[30px]
              lg:text-[32px]
              lg:leading-[110%]
            "
          >
            Everything You Need to Create and Maintain Exceptional Spaces.
          </h2>

          {/* Description */}
          <p
            className="
              mx-0
              mb-8
              w-full
              max-w-[996px]
              text-start
              font-inter
              text-[16px]
              font-normal
              leading-[145%]
              text-[#1A1A1A]
              sm:text-[17px]
              md:mx-auto
              md:mb-10
              md:text-center
              lg:mb-[50px]
              lg:text-[20px]
              lg:leading-[120%]
            "
          >
            Whether you&apos;re starting from scratch, refreshing an existing
            space, or ensuring your environment stays clean and healthy, our
            team is equipped to deliver results you&apos;ll love.
          </p>

          {/* Featured Services */}
          <div
            className="
              grid
              grid-cols-1
              gap-3
              sm:grid-cols-2
              sm:gap-3
              lg:grid-cols-3
              lg:gap-[9px]
            "
          >
            {FeaturedServices.map((service, index) => (
              <div
                key={index}
                className="
                  relative
                  h-[280px]
                  w-full
                  overflow-hidden
                  rounded-[5px]
                  sm:h-[300px]
                  md:h-[340px]
                  lg:h-[399px]
                "
              >
                {/* Image */}
                <Image
                  src={service.img}
                  alt={service.title}
                  width={500}
                  height={500}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                {/* Content */}
                <div
                  className="
                    absolute
                    bottom-0
                    left-0
                    right-0
                    p-4
                    text-white
                    sm:p-5
                    lg:p-6
                  "
                >
                  <h3
                    className="
                      font-sans
                      text-[18px]
                      font-semibold
                      leading-[115%]
                      text-[#F8FAFC]
                      sm:text-[20px]
                      lg:text-[24px]
                      lg:leading-[100%]
                    "
                  >
                    {service.title}
                  </h3>

                  <p
                    className="
                      mt-2
                      font-inter
                      text-[13px]
                      font-normal
                      leading-[140%]
                      text-white
                      sm:text-[14px]
                      lg:mt-[6px]
                      lg:text-[16px]
                      lg:leading-[120%]
                    "
                  >
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
