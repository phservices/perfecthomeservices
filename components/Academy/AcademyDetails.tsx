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

          <h2 className="text-[#1A1A1A] text-[28px] sm:text-[36px] md:text-[42px] lg:text-[48px] leading-[120%] sm:leading-[110%] lg:leading-[100%] font-bold font-sans mb-[12px] sm:mb-[16px]">
            Learn Interior Design in Enugu, Nigeria
          </h2>

          <p className="text-[16px] sm:text-[18px] lg:text-[20px] font-inter font-normal leading-[140%] sm:leading-[130%] lg:leading-[120%] text-[#1A1A1ACC] mb-[8px] max-w-full">
            The Perfect Home Services Interior Design Academy offers a
            comprehensive three-month training programme designed to equip
            aspiring interior designers with the practical skills and industry
            knowledge needed to build successful careers.
          </p>

          <p className="text-[16px] sm:text-[18px] lg:text-[20px] font-inter font-normal leading-[140%] sm:leading-[130%] lg:leading-[120%] text-[#1A1A1ACC] mb-0 max-w-full">
            The programme combines classroom learning, practical sessions, and
            site visits, giving students real-world exposure to interior design
            projects while developing the confidence to start and grow their own
            interior design businesses.
          </p>
        </div>
      </div>
    </section>
  );
}
