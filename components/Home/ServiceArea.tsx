"use client";

import Image from "next/image";
import Button from "../ui/Button";
import Link from "next/link";
import SectionHeading from "../ui/SectionHeading";

export default function ServiceArea() {
  return (
    <section className="bg-[#FBF9F6]">
      <div className="py-16 sm:py-20 md:py-24 lg:py-28">
        <div className="container mx-auto px-5 sm:px-6 md:px-8">
          {/* Content */}
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center md:gap-12 lg:gap-16">
            {/* Text */}
            <div className="flex flex-col items-start justify-center">
              <SectionHeading
                align="left"
                eyebrow="Service Area"
                title="Serving Enugu and Beyond"
                className="mb-6"
              />

              <p className="mb-7 font-sans text-[16px] font-normal leading-[160%] text-[#1A1A1A]/75 sm:text-[17px]">
                Perfect Home Services proudly serves clients across{" "}
                <strong className="text-[#1A1A1A]">Enugu State</strong> and
                other parts of Nigeria, delivering interior design,
                construction finishing, industrial cleaning, fumigation, and
                real estate services for residential, commercial, and
                industrial properties.
              </p>

              <Link href="/Contact">
                <Button
                  style="danger"
                  type="button"
                  text="text-[#1A1A1A]"
                  css="w-full sm:w-auto px-7 py-3.5 text-[14px] font-sans font-semibold"
                >
                  Book a Consultation
                </Button>
              </Link>
            </div>

            {/* Image */}
            <div className="h-[280px] w-full overflow-hidden rounded-2xl shadow-[0_24px_48px_-24px_rgba(26,26,26,0.3)] sm:h-[340px] md:h-[380px] lg:h-[440px]">
              <Image
                src="/images/service-2.jpg"
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
