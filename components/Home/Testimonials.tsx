"use client";

import { testimonials } from "@/utils/Content/HomePage.Content";

export default function Testimonials() {
  return (
    <section className="bg-[#FFF9F1]">
      <div className="container mx-auto px-5 sm:px-6 md:px-8">
        <div className="py-12 sm:py-14 md:py-16 lg:py-[61px]">
          {/* Header */}
          <div className="mx-auto mb-10 max-w-[1000px] text-center sm:mb-12 lg:mb-[50px]">
            <h3 className="mb-3 font-sans text-[16px] font-semibold leading-[110%] text-[#000000B8] sm:text-[18px] md:text-[20px] lg:mb-4 lg:text-[24px]">
              Testimonials
            </h3>

            <h2 className="mb-3 font-sans text-[23px] font-semibold leading-[120%] text-[#000000] sm:text-[26px] md:text-[30px] lg:mb-2 lg:text-[32px] lg:leading-[110%]">
              Trusted by Homeowners, Businesses & Future Professionals.
            </h2>

            <p className="font-inter text-[16px] font-normal leading-[145%] text-[#1A1A1A] sm:text-[17px] md:text-[18px] lg:text-[20px] lg:leading-[120%]">
              We believe our work speaks for itself—but our clients say it even
              better
            </p>
          </div>

          {/* Testimonials */}
          <div className="grid grid-cols-1 gap-8 sm:gap-6 md:grid-cols-3 md:gap-4">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="flex min-h-[180px] flex-col border-l-[4px] border-[#F89A0B] px-4 py-2 sm:px-5 md:min-h-[200px] lg:min-h-[220px] lg:px-4"
              >
                {/* Quote */}
                <p className="font-inter text-[16px] font-normal italic leading-[145%] text-[#1A1A1A] sm:text-[17px] md:text-[18px] lg:text-[24px] lg:leading-[120%]">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                {/* Stars */}
                <div className="mt-auto flex items-center gap-[2px] pt-5">
                  {[...Array(5)].map((_, starIndex) => (
                    <span
                      key={starIndex}
                      className="text-[18px] leading-none text-[#F89A0B] sm:text-[20px] lg:text-[24px]"
                    >
                      ★
                    </span>
                  ))}
                </div>

                {/* Client */}
                <p className="mt-3 font-sans text-[12px] font-medium leading-[120%] text-[#000000] sm:text-[13px] md:text-[14px] lg:text-[16px]">
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

