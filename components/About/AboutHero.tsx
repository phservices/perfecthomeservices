"use client";
import Header from "../Header";
import Button from "../ui/Button";

export default function AboutHero() {
  return (
    <section className="bg-about pt-5 sm:pt-7 md:pt-10 lg:pt-[50px]">
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
            About Perfect Home Services
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
            Perfect Home Services is an interior design and construction
            finishing company based in Enugu, Nigeria. Since 2017, we have
            helped homeowners, businesses, and property owners transform
            ordinary spaces into beautiful, functional, and healthy environments
            through professional interior design, construction finishing,
            industrial cleaning, fumigation, and real estate services.
          </p>

          {/* Buttons */}
          <div className="">
            <Button
              style="danger"
              type="button"
              text="text-[#F8FAFC]"
              css="
                       w-full
                      max-w-[206px]
                       text-[16px]
                       font-bold
                     "
            >
              Book a Consultation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
