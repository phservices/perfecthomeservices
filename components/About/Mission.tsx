"use client";
import Image from "next/image";

export default function Mission() {
  return (
    <section className="bg-[#FFF9F1]">
      <div className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-[84px]">
        <div className="container mx-auto max-w-6xl">
          {/* Heading */}
          <h1 className="mb-8 text-center font-sans text-3xl font-semibold leading-[100%] text-[#000000] sm:text-[32px] lg:mb-10">
            Mission & Vision
          </h1>

          {/* Cards */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Vision */}
            <div className="flex flex-col rounded-lg border border-[#F89A0B29] bg-[#F89A0B29] px-4 pt-[113px] pb-[16px] sm:px-5 lg:h-full lg:px-6">
              <div className="mb-[10px] h-[48px] w-[48px]">
                <Image
                  src="/images/Vector(12).png"
                  width={500}
                  height={500}
                  alt="Vision icon"
                  className="h-full w-full object-contain"
                />
              </div>

              <h2 className="mb-[10px] font-sans text-xl font-semibold leading-[100%] text-[#000000] sm:text-2xl">
                Our Vision
              </h2>

              <p className="font-inter text-base font-normal leading-[120%] text-[#1A1A1A] sm:text-lg lg:text-xl">
                To become one of Africa&apos;s foremost interior design and
                construction finishing companies, setting the benchmark for
                excellence, innovation, integrity, and client satisfaction.
              </p>
            </div>

            {/* Mission */}
            <div className="flex flex-col items-end rounded-lg border border-[#F89A0B29] bg-[#F89A0B29] px-4 pt-[113px] pb-[16px] text-right sm:px-5 lg:h-full lg:px-6">
              <div className="mb-[10px] h-[48px] w-[48px]">
                <Image
                  src="/images/symbols.png"
                  width={500}
                  height={500}
                  alt="Mission icon"
                  className="h-full w-full object-cover"
                />
              </div>

              <h2 className="mb-[10px] font-sans text-xl font-semibold leading-[100%] text-[#000000] sm:text-2xl">
                Our Mission
              </h2>

              <p className="font-inter text-base font-normal leading-[120%] text-[#1A1A1A] sm:text-lg lg:text-xl">
                To create functional, beautiful, and healthy spaces by
                delivering quality interior design, construction finishing,
                cleaning, fumigation, and real estate solutions that exceed our
                clients&apos; expectations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
