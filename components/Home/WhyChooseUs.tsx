"use client";

import Image from "next/image";
import Button from "../ui/Button";
import { perfectHomeServices } from "@/utils/Content/HomePage.Content";
import Link from "next/link";
import SectionHeading from "../ui/SectionHeading";

export default function WhyChooseUs() {
  return (
    <section className="bg-white">
      <div className="container mx-auto px-5 sm:px-6 md:px-8">
        <div className="py-16 sm:py-20 md:py-24 lg:py-28">
          <SectionHeading
            eyebrow="Why Choose Perfect Home Services"
            title="Why Clients Choose Us, Every Time"
          />

          {/* CTA */}
          <div className="mt-8 flex justify-center">
            <Link href="/Contact">
              <Button
                style="danger"
                type="button"
                text="text-[#1A1A1A]"
                css="
                  h-[52px]
                  px-7
                  text-[14px]
                  font-sans
                  font-semibold
                "
              >
                Let&apos;s Discuss Your Project
              </Button>
            </Link>
          </div>

          {/* Service Cards */}
          <div
            className="
              mt-12
              grid
              grid-cols-1
              gap-5
              sm:grid-cols-2
              md:mt-14
              lg:grid-cols-4
            "
          >
            {perfectHomeServices.map((service, index) => (
              <div
                key={index}
                className="
                  group
                  flex
                  w-full
                  flex-col
                  rounded-2xl
                  border
                  border-[#1A1A1A]/8
                  bg-white
                  p-6
                  shadow-[0_16px_36px_-28px_rgba(26,26,26,0.35)]
                  transition-all
                  duration-200
                  hover:-translate-y-1
                  hover:border-[#F89A0B]/40
                  hover:shadow-[0_24px_48px_-24px_rgba(248,154,11,0.3)]
                  sm:p-7
                "
              >
                {/* Icon */}
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#F89A0B14] transition-colors group-hover:bg-[#F89A0B22]">
                  <Image
                    src={service.icon}
                    alt={service.title}
                    width={24}
                    height={24}
                    className="h-6 w-6 object-contain"
                  />
                </div>

                {/* Title */}
                <h3
                  className="
                    mb-3
                    font-display
                    text-[19px]
                    font-semibold
                    leading-[125%]
                    text-[#1A1A1A]
                    sm:text-[20px]
                  "
                >
                  {service.title}
                </h3>

                {/* Description */}
                <p
                  className="
                    font-sans
                    text-[14.5px]
                    font-normal
                    leading-[155%]
                    text-[#1A1A1A]/65
                    sm:text-[15px]
                  "
                >
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
