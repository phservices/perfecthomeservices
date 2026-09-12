"use client";

import Header from "../Header";
import Button from "../ui/Button";

export default function Hero() {
  return (
    <section className="bg-mobile-hero pt-5 sm:pt-7 md:pt-10 lg:pt-[50px]">
      <Header />

      <div className="container mx-auto px-5 sm:px-6 md:px-8">
        <div className="py-16 sm:py-20 md:py-24 lg:pt-[72px] lg:pb-[86px]">
          {/* Heading */}
          <h1
            className="
              mb-4
              w-full
              max-w-[881px]
              font-bold
              leading-[105%]
              text-[28px]
              text-white
              sm:text-[32px]
              md:text-[40px]
              lg:text-[48px]
            "
          >
            Creating Healthy Rooms for Perfect Living.
          </h1>

          {/* Description */}
          <p
            className="
              mb-8
              w-full
              max-w-[881px]
              font-inter
              text-[16px]
              leading-[150%]
              text-white
              sm:text-[17px]
              md:mb-9
              md:text-[18px]
              md:leading-[145%]
              lg:text-[20px]
              lg:leading-[120%]
            "
          >
            Perfect Home Services is an interior and exterior design company
            based in Enugu State, Nigeria, providing professional home
            improvement, construction finishing, industrial cleaning,
            fumigation, real estate, and interior design training services. From
            concept development and space planning to construction finishing and
            final styling, we create functional, comfortable, and visually
            appealing spaces tailored to the needs of homes, offices, commercial
            properties, and industrial facilities.
          </p>

          {/* Buttons */}
          <div className="flex w-full flex-col gap-3 sm:flex-row sm:gap-4">
            <Button
              style="danger"
              type="button"
              text="text-[#F8FAFC]"
              css="
                w-full
                sm:w-auto
                sm:min-w-[165px]
                px-[24.29px]
                py-[15.55px]
                text-[12px]
                font-bold
              "
            >
              Book a Consultation
            </Button>

            <Button
              style="primary"
              type="button"
              css="
                w-full
                sm:w-auto
                sm:min-w-[165px]
                px-[24.29px]
                py-[15.55px]
                text-[12px]
                font-bold
              "
            >
              Explore Our Services
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
