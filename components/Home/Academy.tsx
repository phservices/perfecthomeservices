"use client";

import Button from "../ui/Button";
import Image from "next/image";
import { Play } from "lucide-react";
import Link from "next/link";

export default function Academy() {
  return (
    <section className="bg-[#F8FAFC]">
      <div className="container mx-auto px-5 sm:px-6 md:px-8">
        <div className="py-12 sm:py-14 md:py-16 lg:py-[66px]">
          <h1 className="mb-2 text-center font-sans text-[16px] font-semibold leading-[110%] text-[#000000B8] sm:text-[18px] lg:text-[24px]">
            Interior Design Academy
          </h1>

          <p className="mb-8 text-center font-sans text-[24px] font-semibold leading-[115%] text-[#000000] sm:text-[26px] md:text-[28px] lg:mb-[40px] lg:text-[32px] lg:leading-[100%]">
            Start Your Career in Interior Design
          </p>

          {/* Academy Video/Image */}
          <div className="relative mb-5 h-[240px] w-full overflow-hidden rounded-[12px] sm:h-[300px] md:h-[380px] lg:h-[479px] lg:rounded-[16px]">
            <Image
              src="/images/academy-1.jpg"
              alt="Interior Design Academy"
              width={500}
              height={500}
              className="h-full w-full object-cover"
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/20" />

            {/* Play Button */}
            <button
              type="button"
              aria-label="Play academy video"
              className="absolute left-1/2 top-1/2 flex h-[64px] w-[64px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg transition-transform duration-200 hover:scale-110 sm:h-[72px] sm:w-[72px]"
            >
              <Play
                size={28}
                strokeWidth={2}
                className="ml-1 fill-[#F89A0B] text-[#F89A0B] sm:h-[32px] sm:w-[32px]"
              />
            </button>
          </div>

          <p className="mb-7 font-inter text-[16px] font-normal leading-[145%] text-[#1A1A1A] sm:text-[17px] md:text-[18px] lg:mb-[26px] lg:text-[20px] lg:leading-[120%]">
            Our 3-month Interior Design Academy combines classroom learning,
            practical training, and site visits to prepare aspiring interior
            designers with the skills needed to build successful careers.
            Students receive a Certificate of Completion after graduation.
          </p>

          <div className="flex items-center justify-center">
            <Link href="/Contact">
              <Button
                style="danger"
                type="button"
                css="w-full max-w-[300px] sm:w-[220px] lg:w-[165px] px-[24.29px] py-[15.55px] text-[12px] font-bold text-[#1A1A1A] font-sans"
              >
                Join the Academy
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
