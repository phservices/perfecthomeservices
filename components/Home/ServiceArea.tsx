"use client";

import Image from "next/image";
import Button from "../ui/Button";
import Link from "next/link";

export default function ServiceArea() {
  return (
    <section>
      <div className="py-12 sm:py-16 md:py-20 lg:py-[84px]">
        <div className="container mx-auto px-5 sm:px-6 md:px-8">
          {/* Heading */}
          <h3 className="mb-3 text-center font-sans text-[16px] font-semibold leading-[110%] text-[#000000B8] sm:text-[18px] md:text-[20px] lg:mb-4 lg:text-[24px]">
            Service Area
          </h3>

          <p className="mb-8 text-center font-sans text-[24px] font-semibold leading-[115%] text-[#000000] sm:text-[26px] md:text-[28px] lg:mb-[40px] lg:text-[32px] lg:leading-[100%]">
            Serving Enugu and Beyond
          </p>

          {/* Content */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-x-8 lg:gap-x-[10px] lg:gap-y-[20px]">
            {/* Text */}
            <div className="flex flex-col items-start justify-center">
              <h1 className="mb-6 font-inter text-[16px] font-normal leading-[145%] text-[#1A1A1A] sm:text-[17px] md:text-[18px] lg:mb-[26px] lg:text-[20px] lg:leading-[120%]">
                Perfect Home Services proudly serves clients across{" "}
                <strong>Enugu State</strong> and other parts of Nigeria,
                delivering interior design, construction finishing, industrial
                cleaning, fumigation, and real estate services for residential,
                commercial, and industrial properties.
              </h1>

              <div className="w-full md:w-auto">
                <Link href="/Contact">
                  <Button
                    style="danger"
                    type="button"
                    css="w-full max-w-full sm:max-w-full md:w-[165px] px-[24.29px] py-[15.55px] text-[12px] font-bold text-[#1A1A1A] font-sans"
                  >
                    Book a Consultation
                  </Button>
                </Link>
              </div>
            </div>

            {/* Image */}
            <div className="h-[260px] w-full overflow-hidden rounded-[12px] sm:h-[320px] md:h-[350px] lg:h-[399px] lg:rounded-[16px]">
              <Image
                src="/images/service-1.jpg"
                width={500}
                height={500}
                className="h-full w-full object-cover"
                alt="Service Area"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
