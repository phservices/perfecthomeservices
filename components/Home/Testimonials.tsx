"use client";

import { testimonials } from "@/utils/Content/HomePage.Content";
import SectionHeading from "../ui/SectionHeading";

export default function Testimonials() {
  return (
    <section className="bg-white">
      <div className="container mx-auto px-5 sm:px-6 md:px-8">
        <div className="py-16 sm:py-20 md:py-24 lg:py-28">
          <SectionHeading
            eyebrow="Testimonials"
            title="Trusted by Homeowners & Businesses"
            description="We believe our work speaks for itself — but our clients say it even better."
            className="mb-12 md:mb-14"
          />

          {/* Testimonials */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="flex min-h-[220px] flex-col rounded-2xl border border-[#1A1A1A]/8 bg-[#FBF9F6] p-6 sm:p-7"
              >
                {/* Stars */}
                <div className="mb-4 flex items-center gap-[2px]">
                  {[...Array(5)].map((_, starIndex) => (
                    <span
                      key={starIndex}
                      className="text-[16px] leading-none text-[#F89A0B]"
                    >
                      ★
                    </span>
                  ))}
                </div>

                {/* Quote */}
                <p className="font-display text-[17px] font-normal italic leading-[145%] text-[#1A1A1A] sm:text-[18px]">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                {/* Client */}
                <p className="mt-auto pt-6 font-sans text-[13px] font-semibold uppercase tracking-[0.06em] text-[#1A1A1A]/50">
                  {testimonial.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
