"use client";

import Image from "next/image";
import Button from "../ui/Button";
import { perfectHomeServices } from "@/utils/Content/HomePage.Content";

export default function WhyChooseUs() {
  return (
    <section>
      <div className="container mx-auto px-5 sm:px-6 md:px-8">
        <div className="py-12 sm:py-16 md:py-[50px] lg:py-[75px]">
          {/* Small Heading */}
          <h3
            className="
              mb-2
              text-center
              font-sans
              text-[16px]
              font-semibold
              leading-[110%]
              text-[#000000B8]
              sm:text-[18px]
              md:text-[20px]
              lg:text-[24px]
            "
          >
            Why Choose Perfect Home Services
          </h3>

          {/* Main Heading */}
          <h1
            className="
              mx-auto
              mb-6
              max-w-[700px]
              text-center
              font-sans
              text-[24px]
              font-bold
              leading-[115%]
              text-[#1A1A1A]
              sm:text-[28px]
              md:mb-4
              md:text-[32px]
            "
          >
            Why Clients Choose Perfect Home Services
          </h1>

          {/* CTA */}
          <div className="flex justify-center">
            <Button
              style="danger"
              type="button"
              css="
                h-[48px]
                w-full
                max-w-[300px]
                px-5
                text-[14px]
                font-sans
                font-semibold
                leading-[100%]
                text-[#1A1A1A]
                sm:h-[50px]
                sm:text-[16px]
              "
            >
              Let&apos;s Discuss your project
            </Button>
          </div>

          {/* Service Cards */}
          <div
            className="
              mt-10
              grid
              grid-cols-1
              gap-4
              sm:grid-cols-2
              md:mt-[43px]
              lg:grid-cols-4
            "
          >
            {perfectHomeServices.map((service, index) => (
              <div
                key={index}
                className="
                  flex
                  w-full
                  flex-col
                  rounded-[8px]
                  border
                  border-[#F89A0B]
                  bg-[#F89A0B14]
                "
              >
                <div
                  className="
                    flex
                    h-full
                    flex-col
                    px-4
                    py-7
                    sm:px-5
                    sm:py-8
                    lg:px-4
                    lg:pt-[41px]
                    lg:pb-6
                  "
                >
                  {/* Icon */}
                  <div className="mb-4 h-11 w-11 sm:h-12 sm:w-12">
                    <Image
                      src={service.icon}
                      alt={service.title}
                      width={48}
                      height={48}
                      className="h-full w-full object-contain"
                    />
                  </div>

                  {/* Title */}
                  <h3
                    className="
                      mb-3
                      font-sans
                      text-[18px]
                      font-semibold
                      leading-[120%]
                      text-[#000000]
                      sm:text-[20px]
                    "
                  >
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="
                      font-inter
                      text-[15px]
                      font-normal
                      leading-[145%]
                      text-[#1A1A1A]
                      sm:text-[16px]
                      sm:leading-[140%]
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
