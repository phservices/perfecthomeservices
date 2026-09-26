"use client";

import Image from "next/image";
import Button from "../ui/Button";
import Link from "next/link";
// import SectionHeading from "../ui/SectionHeading";

export default function Introduction() {
  return (
    <section className="bg-[#FBF9F6]">
      <div className="py-16 sm:py-20 md:py-24 lg:py-28">
        <div className="container mx-auto px-5 sm:px-6 md:px-8">
          {/* Content */}
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
            {/* Text */}
            <div className="order-2 flex flex-col md:order-1">
              {/* <SectionHeading
                align="left"
                eyebrow="Brief Introduction"
                title="Building Beautiful Spaces Since 2017"
                className="mb-6"
              /> */}

              <p
                className="
                  mb-5
                  font-sans
                  text-[16px]
                  font-normal
                  leading-[160%]
                  text-[#1A1A1A]/75
                  sm:text-[17px]
                "
              >
                Perfect Home Services started in 2017 as a painting and
                wallpaper installation company. Through years of experience
                and professional training, the company has grown into a
                trusted interior design and construction finishing brand
                serving homes, offices, commercial buildings, and industrial
                facilities.
              </p>

              <p
                className="
                  mb-7
                  font-sans
                  text-[16px]
                  font-normal
                  leading-[160%]
                  text-[#1A1A1A]/75
                  sm:text-[17px]
                "
              >
                Today, we continue to deliver practical design solutions that
                improve how people live, work, and experience their spaces.
              </p>

              {/* Button */}
              <div className="flex w-full justify-start">
                <Link href="/Aboutus">
                  <Button
                    style="danger"
                    type="button"
                    text="text-[#1A1A1A]"
                    
                  >
                    Learn More About Us
                  </Button>
                </Link>
              </div>
            </div>

            {/* Image */}
            <div
              className="
                order-1
                h-[280px]
                w-full
                overflow-hidden
                rounded-[16px]
                shadow-[0_24px_48px_-24px_rgba(26,26,26,0.25)]
                sm:h-[340px]
                md:order-2
                md:h-[380px]
                lg:h-[440px]
              "
            >
              <Image
                src="/images/introduction.jpg"
                alt="Interior of a beautiful home"
                width={632}
                height={440}
                className="h-full w-full object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
