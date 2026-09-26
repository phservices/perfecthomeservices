"use client";

import Link from "next/link";
import Header from "../Header";
import Button from "../ui/Button";

export default function ContactHero() {
  return (
    <section className="bg-about pt-5 sm:pt-7 md:pt-10 lg:pt-[50px]">
      <Header />

      <div className="container mx-auto px-5 sm:px-6 md:px-8">
        <div className="flex flex-col items-center py-16 text-center sm:py-20 md:py-24 lg:pb-[86px] lg:pt-[72px]">
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
            Let&apos;s Start Your Project
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
            Whether you need interior design, construction finishing,
            cleaning, fumigation, or real estate services, our team is ready
            to listen and recommend the right solution for your property.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Link href="#contact-form">
              <Button
                style="danger"
                type="button"
                text="text-[#F8FAFC]"
                
              >
                Send a Message
              </Button>
            </Link>

            <Link href="tel:+2348063744335">
              <Button
                style="primary"
                type="button"
                
              >
                Call Us Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
