"use client";

import Button from "../ui/Button";
import Image from "next/image";

export default function Founder() {
  return (
    <section className="bg-[#FFF9F1]">
      <div className="container mx-auto px-5 sm:px-6 md:px-8">
        <div className="py-12 sm:py-16 md:py-20 lg:py-[96px]">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-x-8 lg:gap-x-[36px]">
            
            {/* Mobile Heading */}
            <h5 className="mb-0 block text-center font-sans text-[16px] font-semibold leading-[110%] text-[#000000B8] sm:text-[18px] md:hidden">
              Meet the Founder
            </h5>

            {/* Founder Image */}
            <div className="h-[320px] w-full overflow-hidden rounded-[8px] sm:h-[380px] md:h-[420px] lg:h-[456px]">
              <Image
                src="/images/founder.jpg"
                alt="Founder"
                width={500}
                height={500}
                className="h-full w-full object-cover object-top grayscale"
              />
            </div>

            {/* Founder Content */}
            <div className="flex flex-col items-start justify-center">
              
              {/* Desktop Heading */}
              <h5 className="mb-3 hidden font-sans text-[18px] font-semibold leading-[110%] text-[#000000B8] md:block md:text-[20px] lg:text-[24px]">
                Meet the Founder
              </h5>

              <h3 className="mb-4 mt-0 font-sans text-[24px] font-bold leading-[115%] text-[#000000] sm:text-[28px] md:text-[30px] lg:text-[32px] lg:leading-[100%]">
                Meet Somto Okafor
              </h3>

              <p className="mb-4 font-inter text-[16px] font-normal leading-[145%] text-[#1A1A1A] sm:text-[17px] md:text-[18px] lg:text-[20px] lg:leading-[120%]">
                Founder and CEO of Perfect Home Services, Somto Okafor has led
                the company&apos;s growth from a painting business into a
                trusted interior design, construction finishing, cleaning, and
                real estate brand.
              </p>

              <p className="mb-6 font-inter text-[16px] font-normal leading-[145%] text-[#1A1A1A] sm:text-[17px] md:text-[18px] lg:text-[20px] lg:leading-[120%]">
                His vision is to build one of Africa&apos;s leading interior
                design companies by delivering excellence, innovation, and
                exceptional client service.
              </p>

              <div className="flex w-full items-center justify-center md:justify-start">
                <Button
                  style="danger"
                  type="button"
                  css="w-full max-w-[300px] sm:w-[220px] md:w-[165px] px-[24.29px] py-[15.55px] text-[12px] font-bold text-[#1A1A1A] font-sans"
                >
                  Read his story
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

