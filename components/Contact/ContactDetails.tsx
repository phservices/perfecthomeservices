"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Button from "../ui/Button";

export default function ContactDetails() {
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
            Get in Touch with Perfect Home Services
          </h1>

          <p className="text-[16px] sm:text-[18px] lg:text-[20px] font-inter font-normal leading-[140%] sm:leading-[130%] lg:leading-[120%] text-[#1A1A1ACC] mb-[8px] max-w-full">
            Looking for professional interior design, construction finishing,
            industrial cleaning, fumigation, real estate, or interior design
            training?
          </p>

          <p className="text-[16px] sm:text-[18px] lg:text-[20px] font-inter font-normal leading-[140%] sm:leading-[130%] lg:leading-[120%] text-[#1A1A1ACC] mb-[20px] sm:mb-[24px] max-w-full">
            Our team is ready to answer your questions, discuss your project,
            and recommend the right solution for your home, office, commercial,
            or industrial property.
          </p>

          <p className="font-inter font-normal text-[16px] sm:text-[20px] leading-[120%] text-[#1A1A1ACC] mb-[16px]">
            We&apos;d love to hear from you.
          </p>

          <Button
              style="danger"
              type="button"
              css="w-full sm:w-[255px] text-[16px] font-bold text-[#1A1A1A] font-sans"
            >
            Book a Consultation
            </Button>
        </div>
      </div>
    </section>
  );
}
