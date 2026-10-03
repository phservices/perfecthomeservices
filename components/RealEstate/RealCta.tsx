"use client";

import Link from "next/link";
import Button from "../ui/Button";

export default function RealCta() {
  return (
    <section className="bg-cta">
      <div className="container mx-auto">
        <div className="py-[70px] sm:py-[90px] md:py-[110px] lg:py-[127px]">
          <h2 className="text-[32px] sm:text-[38px] md:text-[44px] lg:text-[48px] font-bold leading-[110%] font-sans mb-[16px] text-white w-full max-w-[739px]">
            Looking to buy, sell, lease, or manage a property?
          </h2>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8">
            <Link href="/Contact">
              <Button style="danger" type="button" css="text-white">
                Speak With a Property Consultant
              </Button>
            </Link>

            <Link href="tel:+2348063744335">
              <Button style="primary" type="button" css="text-[#1A1A1A]">
                Contact Our Team
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link
              href="/Services/Our-Projects"
              className="font-sans text-[14px] text-white/75 underline underline-offset-2 hover:text-white transition-colors"
            >
              View our property portfolio
            </Link>
            <Link
              href="/blog"
              className="font-sans text-[14px] text-white/75 underline underline-offset-2 hover:text-white transition-colors"
            >
              Read our real estate articles
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
