"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import { faqs } from "@/utils/Content/faqs";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section className="bg-white">
      <div className="container mx-auto px-5 sm:px-6 md:px-8">
        <div className="py-16 sm:py-20 md:py-24 lg:py-28">
          <SectionHeading
            eyebrow="FAQ"
            title="Frequently Asked Questions"
            description="Get answers to common questions about our services."
            className="mb-10 md:mb-12"
          />

          <div className="mx-auto flex max-w-[820px] flex-col gap-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={faq.question}
                  className="rounded-2xl border border-[#1A1A1A]/8 bg-white shadow-[0_16px_36px_-28px_rgba(26,26,26,0.35)] transition-colors duration-200 hover:border-[#F89A0B]/40"
                >
                  <button
                    type="button"
                    onClick={() => toggle(index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left sm:px-7"
                  >
                    <span className="font-display text-[16px] font-semibold leading-[135%] text-[#1A1A1A] sm:text-[18px]">
                      {faq.question}
                    </span>
                    <span
                      className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#F89A0B14] transition-transform duration-200 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      <Plus size={16} className="text-[#F89A0B]" />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 sm:px-7">
                      <p className="font-sans text-[14.5px] font-normal leading-[160%] text-[#1A1A1A]/65 sm:text-[15px]">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
