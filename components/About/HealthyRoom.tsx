"use client";

import Image from "next/image";
import Button from "../ui/Button";
import Link from "next/link";

export default function HealthyRoom() {
  return (
    <section>
      <div className="py-12 sm:py-16 md:py-20 lg:py-[84px]">
        <div className="container mx-auto px-5 sm:px-6 md:px-8">
          {/* Heading */}
          <h3 className="mb-3 text-center font-sans text-[16px] font-semibold leading-[110%] text-[#000000B8] sm:text-[18px] md:text-[20px] lg:mb-4 lg:text-[24px]">
            About Our Academy
          </h3>

          <p className="mb-8 text-center font-sans text-[24px] font-semibold leading-[115%] text-[#000000] sm:text-[26px] md:text-[28px] lg:mb-[40px] lg:text-[32px] lg:leading-[100%]">
            Learn, Create, and Build a Career in Interior Design
          </p>

          {/* Content */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-x-8 lg:gap-x-[10px] lg:gap-y-[20px]">
            {/* Text */}
            <div className="flex flex-col items-start justify-center">
              <h1 className="mb-[26px] font-inter text-[16px] font-normal leading-[145%] text-[#1A1A1A] sm:text-[17px] md:text-[18px] lg:mb-[26px] lg:text-[20px] lg:leading-[120%]">
                The Perfect Home Services Interior Design Academy provides
                practical training and industry knowledge to aspiring interior
                designers, helping them develop the skills and confidence to
                create beautiful spaces and build successful careers.
              </h1>

              <div>
                <Link href="/Academy">
                  <Button
                    style="danger"
                    type="button"
                    text="text-[#1A1A1A]"
                    css="
                      w-full
                      max-w-[169px]
                      px-5
                      py-3
                      text-[16px]
                      font-bold
                    "
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>

            {/* Image */}
            <div className="h-[260px] w-full overflow-hidden rounded-[12px] sm:h-[320px] md:h-[350px] lg:h-[499px] lg:rounded-[16px]">
              <Image
                src="/images/story-3.jpg"
                width={500}
                height={500}
                className="h-full w-full object-cover object-top object-center"
                alt="Interior Design Academy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}