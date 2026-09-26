"use client";

import { services } from "@/utils/Content/HomePage.Content";
import Button from "../ui/Button";
import Link from "next/link";
import SectionHeading from "../ui/SectionHeading";

export default function TrustedSolution() {
  return (
    <section className="bg-white">
      <div className="container mx-auto px-5 sm:px-6 md:px-8">
        <div className="py-16 sm:py-20 md:py-24 lg:py-28">
          <SectionHeading
            eyebrow=""
            title="Complete Interior Design & Property Solutions"
            description="Perfect Home Services delivers professional solutions for residential, commercial, and industrial properties. Every project is handled with careful planning, quality workmanship, and attention to detail."
          />

          {/* Services */}
          <div className="mx-auto mt-9 flex max-w-[900px] flex-wrap items-center justify-center gap-2.5 sm:mt-10 sm:gap-3">
            {[...services, "Real Estate Services"].map((service) => (
              <span
                key={service}
                className="
                  rounded-full
                  border
                  border-[#1A1A1A]/10
                  bg-[#FBF9F6]
                  px-4
                  py-2.5
                  font-sans
                  text-[13px]
                  font-medium
                  text-[#1A1A1A]
                  transition-colors
                  hover:border-[#F89A0B]
                  hover:bg-[#F89A0B14]
                  sm:text-[14px]
                "
              >
                {service}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-10 flex justify-center sm:mt-12">
            <Link href="/Listing">
              <Button
                type="button"
                style="danger"
                text="text-[#1A1A1A]"
                
              >
                See All Services
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
