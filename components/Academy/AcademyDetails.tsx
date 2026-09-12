"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AcademyDetails() {
  const router = useRouter();

  return (
    <section>
      <div className="py-[40px] sm:py-[56px] lg:py-[75px]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => router.back()}
            className="mb-[20px] sm:mb-[24px] flex items-center gap-2 font-inter text-[14px] sm:text-[15px] font-semibold text-[#1A1A1A] transition-opacity hover:opacity-70"
          >
            <ArrowLeft size={18} />
            Go back
          </button>

          <h1 className="text-[#1A1A1A] text-[28px] sm:text-[36px] md:text-[42px] lg:text-[48px] leading-[120%] sm:leading-[110%] lg:leading-[100%] font-bold font-sans mb-[12px] sm:mb-[16px]">
            Interior &amp; Exterior Design Services in Enugu, Nigeria
          </h1>

          <p className="text-[16px] sm:text-[18px] lg:text-[20px] font-inter font-normal leading-[140%] sm:leading-[130%] lg:leading-[120%] text-[#1A1A1ACC] mb-[8px] max-w-full">
            The Perfect Home Services Interior Design Academy offers a
            comprehensive three-month training programme designed to equip
            aspiring interior designers with the practical skills and industry
            knowledge needed to build successful careers.
          </p>

          <p className="text-[16px] sm:text-[18px] lg:text-[20px] font-inter font-normal leading-[140%] sm:leading-[130%] lg:leading-[120%] text-[#1A1A1ACC] mb-[20px] sm:mb-[24px] max-w-full">
            The programme combines classroom learning, practical sessions, and
            site visits, giving students real-world exposure to interior design
            projects while developing the confidence to start and grow their own
            interior design businesses.
          </p>

          <p className="font-inter font-bold text-[18px] sm:text-[20px] leading-[120%] text-[#1A1A1ACC] mb-[16px]">
            What&apos;s Included
          </p>

          <ul className="flex flex-wrap gap-[8px] sm:gap-[12px]">
            {services.map((service) => (
              <li
                key={service}
                className="rounded-full border border-[#F0A500] bg-[#FFF8EC] px-[14px] sm:px-[18px] py-[8px] sm:py-[10px] text-[13px] sm:text-[15px] font-inter text-[#1A1A1A] whitespace-nowrap"
              >
                {service}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

const services = [
  "Introduction to Interior Design",
  "Principles of Interior Design",
  "Colour Consultation",
  "Space Planning",
  "Furniture Selection",
  "Lighting Design",
  "Window Treatments",
  "Interior Design Materials",
  "Client Consultation",
  "Branding an Interior Design Business",
  "Starting an Interior Design Company"
]
