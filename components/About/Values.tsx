"use client";

import { values } from "@/utils/Content/HomePage.Content";
import Image from "next/image";

export default function Values() {
  return (
    <section className="py-[56px]">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <h1 className="text-center font-sans text-[28px] font-semibold leading-[100%] text-[#000000] sm:text-[32px]">
          The Values That Guide Our Work
        </h1>

        {/* Values */}
        <div className="mx-auto mt-[40px] grid  grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-12 lg:gap-4">
          {values.map((value, index) => (
            <div
              key={value.title}
              className={`
                rounded-lg
                border border-[#F89A0B]
                bg-[#F89A0B29]
                px-4
                pb-6
                pt-[70px]
                sm:pt-[80px]
                lg:col-span-3
                lg:pt-[80px]
                ${index === 4 ? "lg:col-start-3" : ""}
                ${index === 5 ? "lg:col-start-6" : ""}
                ${index === 6 ? "lg:col-start-9" : ""}
              `}
            >
              {/* Icon */}
              <div className="mb-4 flex h-6 w-6 items-center justify-center">
                <Image
                  src={value.image}
                  width={24}
                  height={24}
                  alt=""
                  className="h-full w-full object-contain"
                />
              </div>

              {/* Text */}
              <div>
                <h2 className="mb-2 font-sans text-lg font-semibold leading-[100%] text-[#000000] sm:text-xl">
                  {value.title}
                </h2>

                <p className="font-inter text-sm font-normal leading-[120%] text-[#1A1A1A] sm:text-base">
                  {value.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}