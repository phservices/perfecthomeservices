"use client";

import Link from "next/link";
import Header from "../Header";
import Button from "../ui/Button";

export default function AcademyHero() {
  return (
    <section className="bg-academy pt-5 sm:pt-7 md:pt-10 lg:pt-[50px]">
      <Header />

      <div className="container mx-auto px-5 sm:px-6 md:px-8">
        <div className="flex flex-col items-center py-16 text-center sm:py-20 md:py-24 lg:pb-[86px] lg:pt-[72px]">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-5 w-full">
            <ol className="flex flex-wrap items-center justify-center gap-1.5 font-sans text-[13px] text-white/70">
              <li>
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-white font-medium">Interior Design Academy in Enugu</li>
            </ol>
          </nav>

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
            Interior Design Academy
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
            Our 3-month Interior Design Academy combines classroom learning,
            practical training, and site visits to prepare aspiring interior
            designers with the skills needed to build successful careers.
            Students receive a Certificate of Completion after graduation.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Link href="#apply">
              <Button
                style="danger"
                type="button"
                text="text-[#F8FAFC]"
                
              >
                Join the Academy
              </Button>
            </Link>

            <Link href="/Contact">
              <Button
                style="primary"
                type="button"
                
              >
                Talk to an Advisor
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
