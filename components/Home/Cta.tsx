"use client";

import Link from "next/link";
import Button from "../ui/Button";

export default function Cta() {
  return (
    <section className="bg-white px-5 py-16 sm:px-6 sm:py-20 md:px-8 md:py-24">
      <div className="container mx-auto">
        <div className="bg-cta overflow-hidden rounded-[28px] px-6 py-16 sm:rounded-[36px] sm:px-10 sm:py-20 md:px-16 md:py-24 lg:px-20 lg:py-28">
          <span className="mb-4 inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-[#F89A0B] sm:text-sm">
            <span className="h-[6px] w-[6px] rounded-full bg-[#F89A0B]" />
            Let&apos;s Get Started
          </span>

          <h2 className="mb-5 max-w-[640px] font-display text-[32px] font-semibold leading-[112%] tracking-[-0.01em] text-white sm:text-[40px] md:text-[46px]">
            Let&apos;s Bring Your Space to Life
          </h2>

          <p className="mb-3 w-full font-sans text-[16px] font-normal leading-[160%] text-white/80 sm:text-[17px] lg:max-w-[560px]">
            Planning a renovation, building a new home, redesigning your
            office, or looking for reliable property services?
          </p>

          <p className="mb-8 w-full font-sans text-[16px] font-normal leading-[160%] text-white/80 sm:text-[17px] lg:max-w-[560px]">
            Our team is ready to help you create a space that is functional,
            beautiful, and built to last.
          </p>

          <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-start sm:gap-4">
            <Link href="/Contact">
              <Button
                style="danger"
                type="button"
                text="text-[#1A1A1A]"
                css="w-full sm:w-auto sm:min-w-[190px] px-7 py-4 text-[14px] font-sans font-semibold"
              >
                Book a Consultation
              </Button>
            </Link>

            <Link href="/Contact">
              <Button
                style="primary"
                type="button"
                css="w-full sm:w-auto sm:min-w-[190px] px-7 py-4 text-[14px] font-sans font-semibold"
              >
                Call Our Team
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
