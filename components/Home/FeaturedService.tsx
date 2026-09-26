"use client";

import { FeaturedServices } from "@/utils/Content/HomePage.Content";
import Image from "next/image";
import SectionHeading from "../ui/SectionHeading";

export default function FeaturedService() {
  return (
    <section className="bg-[#FBF9F6]">
      <div className="py-16 sm:py-20 md:py-24 lg:py-28">
        <div className="container mx-auto px-5 sm:px-6 md:px-8">
          <SectionHeading
            eyebrow="Featured Services"
            title="Everything You Need for Exceptional Spaces"
            description="Whether you're starting from scratch, refreshing an existing space, or ensuring your environment stays clean and healthy, our team is equipped to deliver results you'll love."
          />

          {/* Featured Services */}
          <div
            className="
              mt-12
              grid
              grid-cols-1
              gap-5
              sm:grid-cols-2
              md:mt-14
              lg:grid-cols-3
            "
          >
            {FeaturedServices.map((service, index) => (
              <div
                key={index}
                className="
                  group
                  relative
                  h-[340px]
                  w-full
                  overflow-hidden
                  rounded-2xl
                  shadow-[0_20px_44px_-24px_rgba(26,26,26,0.3)]
                  sm:h-[360px]
                  md:h-[380px]
                  lg:h-[420px]
                "
              >
                {/* Image */}
                <Image
                  src={service.img}
                  alt={service.title}
                  width={500}
                  height={500}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Dark Gradient Overlay: on small cards the text wraps higher, so the dark part reaches higher too */}
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/60 via-55% to-black/10 xl:from-black/85 xl:via-black/30 xl:via-50% xl:to-transparent" />

                {/* Content */}
                <div
                  className="
                    absolute
                    bottom-0
                    left-0
                    right-0
                    p-5
                    text-white
                    sm:p-6
                    lg:p-7
                  "
                >
                  <h3
                    className="
                      font-display
                      text-[19px]
                      font-semibold
                      leading-[118%]
                      text-white
                      sm:text-[21px]
                      lg:text-[24px]
                    "
                  >
                    {service.title}
                  </h3>

                  <p
                    className="
                      mt-2
                      font-sans
                      text-[13.5px]
                      font-normal
                      leading-[145%]
                      text-white/80
                      sm:text-[14.5px]
                      lg:text-[15.5px]
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
