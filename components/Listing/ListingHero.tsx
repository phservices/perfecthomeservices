"use client";
import Header from "../Header";
import Button from "../ui/Button";

export default function ListingHero() {
  return (
    <section className="bg-listing pt-5 sm:pt-7 md:pt-10 lg:pt-[50px]">
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
            Our Services
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
            At Perfect Home Services, we provide professional interior and
            exterior design, construction finishing, industrial cleaning,
            fumigation, real estate, and interior design training services.
            Every solution is tailored to deliver quality, functionality, and
            lasting value for residential, commercial, and industrial
            properties.
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
              Request a Quote
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
