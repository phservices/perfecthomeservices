"use client";
import Button from "../ui/Button";

export default function ContactCta() {
  return (
    <section className="bg-cta">
      <div className="container mx-auto">
        <div className="py-[70px] sm:py-[90px] md:py-[110px] lg:py-[127px]">
         <h1 className="text-[32px] sm:text-[38px] md:text-[44px] lg:text-[48px] font-bold leading-[110%] font-sans mb-[16px] text-white w-full max-w-[739px]">
            Take the first step towards a career in interior design.
          </h1>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-start gap-[12px] sm:gap-[15px]">
            <Button
              style="danger"
              type="button"
              css="w-full sm:w-[225px] text-[16px] font-bold text-white font-sans"
            >
             Apply for the Academy
            </Button>

            <Button
              style="primary"
              type="button"
              css="w-full sm:w-[277px] text-[16px] font-bold text-[#1A1A1A] font-sans"
            >
             Enquire About the Next Batch
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
