"use client";
import Image from "next/image";

export default function Mission() {
  return (
    <section className="bg-[#FFF9F1]">
      <div className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-[84px]">
        <div className="container mx-auto max-w-6xl">
          {/* Heading */}
          {/* <h1 className="mb-8 text-center font-sans text-3xl font-semibold leading-[100%] text-[#000000] sm:text-[32px] lg:mb-10">
            Mission & Vision
          </h1> */}

          {/* Cards */}
          <div className="flex flex-col items-center text-center">
            {/* Vision */}
            <div className="flex max-w-[750px] flex-col items-center">
              <h2 className="mb-[24px] font-sans text-3xl font-semibold leading-[100%] text-black sm:text-4xl lg:text-[40px]">
                Our Vision
              </h2>

              <p className="font-inter text-base font-normal leading-[150%] text-[#1A1A1A] sm:text-lg lg:text-[18px]">
                To be a global brand known for creating personalized interior
                environments that increase productivity and overall quality of
                life.
              </p>
            </div>

            {/* Space between Vision and Mission */}
            <div className="h-[90px] sm:h-[100px] lg:h-[105px]" />

            {/* Mission */}
            <div className="flex max-w-[750px] flex-col items-center">
              <h2 className="mb-[24px] font-sans text-3xl font-semibold leading-[100%] text-black sm:text-4xl lg:text-[40px]">
                Our Mission
              </h2>

              <p className="font-inter text-base font-normal leading-[150%] text-[#1A1A1A] sm:text-lg lg:text-[18px]">
                To create and implement personalized designs using materials
                that will give the best user experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
