"use client";

import Link from "next/link";
import Button from "../ui/Button";
import Image from "next/image";

export default function Founder() {
  return (
    <section className="bg-[#FBF9F6]">
      <div className="container mx-auto px-5 sm:px-6 md:px-8">
        <div className="py-16 sm:py-20 md:py-24 lg:py-28">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center md:gap-12 lg:gap-16">
            {/* Founder Image */}
            <div className="h-[340px] w-full overflow-hidden rounded-2xl shadow-[0_24px_48px_-24px_rgba(26,26,26,0.3)] sm:h-[400px] md:h-[440px] lg:h-[480px]">
              <Image
                src="/images/founder-1.jpg"
                alt="Founder"
                width={500}
                height={500}
                className="h-full w-full object-cover object-top"
              />
            </div>

            {/* Founder Content */}
            <div className="flex flex-col items-start justify-center">
              <span className="mb-4 inline-flex items-center gap-2 font-sans text-[13px] font-semibold uppercase tracking-[0.14em] text-[#F89A0B] sm:text-[14px]">
                <span className="h-[6px] w-[6px] rounded-full bg-[#F89A0B]" />
                Meet the Founder
              </span>

              <h3 className="mb-5 font-display text-[28px] font-semibold leading-[112%] tracking-[-0.01em] text-[#1A1A1A] sm:text-[32px] md:text-[36px]">
                Somtochukwu Okafor
              </h3>
              <p className="-mt-3 mb-5 font-sans text-[15px] font-semibold uppercase tracking-[0.1em] text-[#6F4322]">
                Founder &amp; CEO
              </p>

              <p className="mb-4 font-sans text-[16px] font-normal leading-[160%] text-[#1A1A1A]/75 sm:text-[17px]">
                Founder and CEO of Perfect Home Services, Somtochukwu Okafor has led
                the company&apos;s growth from a painting business into a
                trusted interior design, construction finishing, cleaning,
                and real estate brand.
              </p>

              <p className="mb-7 font-sans text-[16px] font-normal leading-[160%] text-[#1A1A1A]/75 sm:text-[17px]">
                His vision is to build one of Africa&apos;s leading interior
                design companies by delivering excellence, innovation, and
                exceptional client service.
              </p>

              <div className="flex w-full items-center justify-start">
                <Link href="/Services">
                  <Button
                    style="danger"
                    type="button"
                    text="text-[#1A1A1A]"
                    
                  >
                    work with us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
