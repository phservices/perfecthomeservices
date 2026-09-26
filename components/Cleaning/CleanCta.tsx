"use client";
import Link from "next/link";
import Button from "../ui/Button";

export default function CleanCta() {
  return (
    <section className="bg-cta">
      <div className="container mx-auto">
        <div className="py-[70px] sm:py-[90px] md:py-[110px] lg:py-[127px]">
          <h1 className="text-[32px] sm:text-[38px] md:text-[44px] lg:text-[48px] font-bold leading-[110%] font-sans mb-[16px] text-white w-full max-w-[739px]">
            Let&apos;s help you maintain a clean, healthy, and pest-free
            environment.
          </h1>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <Link href="/Contact">
              <Button
                style="danger"
                type="button"
                css="text-white"
              >
                Book a Consultation
              </Button>
            </Link>

            <Link href="/Contact">
              <Button
                style="primary"
                type="button"
                css="text-[#1A1A1A]"
              >
                Call our Team
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
