"use client";

import { trustPoints } from "@/utils/Content/HomePage.Content";


export default function WhyTrust() {
  return (
    <section className="bg-[#FFFCF7] py-[40px] sm:py-[48px] lg:py-[56px]">
      <div className="container mx-auto">
        {/* Heading */}
        <h2 className="text-center font-sans text-[24px] font-semibold leading-[100%] text-[#000000] sm:text-[28px] lg:text-[32px]">
          Why Clients Trust Perfect Home Services
        </h2>

        {/* Trust Points */}
        <div className="mx-auto mt-6 flex max-w-[1200px] flex-wrap justify-center gap-2 sm:mt-8 sm:gap-3">
          {trustPoints.map((point) => (
            <div
              key={point.title}
              className="
                flex
                min-h-[38px]
                items-center
                justify-center
                gap-2
                rounded-full
                border
                border-[#F89A0B]
                bg-[#FFF8ED]
                px-3
                py-2
                text-center
                sm:min-h-[42px]
                sm:px-4
                sm:py-2.5
              "
            >
              {/* Text */}
              <span className="font-inter text-[10px] font-medium leading-[120%] text-[#000000] sm:text-xs lg:text-sm">
                {point.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
