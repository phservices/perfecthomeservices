"use client";

import Button from "../ui/Button";

export default function Cta() {
  return (
    <section className="bg-cta">
      <div className="container mx-auto px-[20px] sm:px-[24px] lg:px-0">
        <div className="py-[70px] sm:py-[90px] md:py-[110px] lg:py-[127px]">
          <p className="text-[18px] sm:text-[20px] md:text-[24px] font-semibold font-sans text-[#F8FAFC] leading-[100%] mb-[12px]">
            Final Call-to-Action
          </p>

          <h1 className="text-[32px] sm:text-[38px] md:text-[44px] lg:text-[48px] font-bold leading-[110%] font-sans mb-[16px] text-white">
            Let&apos;s Bring Your Space to Life
          </h1>

          <p className="text-[16px] sm:text-[18px] md:text-[20px] leading-[130%] text-[#FFFFFFCC] font-normal mb-[20px] w-full lg:max-w-[739px]">
            Planning a renovation, building a new home, redesigning your office,
            or looking for reliable property services?
          </p>

          <p className="text-[16px] sm:text-[18px] md:text-[20px] leading-[130%] text-[#FFFFFFCC] font-normal w-full lg:max-w-[739px] mb-[24px]">
            Our team is ready to help you create a space that is functional,
            beautiful, and built to last.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-start gap-[12px] sm:gap-[15px]">
            <Button
              style="danger"
              type="button"
              css="w-full sm:w-[165px] px-[24.29px] py-[15.55px] text-[12px] font-bold text-white font-sans"
            >
              Book a Consultation
            </Button>

            <Button
              style="primary"
              type="button"
              css="w-full sm:w-[165px] px-[24.29px] py-[15.55px] text-[12px] font-bold text-[#1A1A1A] font-sans"
            >
              Call our Team
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}