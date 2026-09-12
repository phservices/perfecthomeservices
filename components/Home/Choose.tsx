"use client";

import ChooseBox from "./ChooseBox";
import Image from "next/image";

export default function Choose() {
  return (
    <section className="bg-[#E5E7EB]">
      <div className="container mx-auto">
        <div className="py-[68px] md:py-[60px] lg:py-[56px]">
          <h3 className="text-[16px] md:text-[20px] lg:text-[24px] leading-[100%] text-start md:text-center lg:text-center font-sans font-semibold text-[#000000B8] mb-[16px]">
            Why Choose Us
          </h3>
          <h1 className="text-[#000000] text-[20px] md:text-[24px] lg:text-[32px] leading-[100%] font-semibold font-sans text-start md:text-center lg:text-center mb-[8px]">
            More Than a Service Provider-Your Long-term Partner.
          </h1>
          <p className="text-[#1A1A1A] text-[16px] md:text-[16px] lg:text-[20px] font-normal leading-[120%] text-start md:text-center lg:text-center  max-w-full md:max-w-full lg:max-w-[872px] mx-auto mb-[24px]">
            Every project we undertake is built on quality craftsmanship,
            attention to detail, and a genuine commitment to our client&apos;s
            satisfaction.
          </p>
          <div className="w-full grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-[16px]">
            <ChooseBox
              title="Designed Around Your Needs"
              description="Every project begins by understanding your vision before recommending solutions that fit your goals."
              icon={
                <Image
                  src="/images/Vector-1.png"
                  alt="Designed around your needs"
                  className="w-full h-full object-contain"
                  width={500}
                  height={500}
                />
              }
            />

            <ChooseBox
              title="Experienced Professionals"
              description="Our multidisciplinary team brings industry expertise, creativity, and technical excellence to every project."
              icon={
                <Image
                  src="/images/Vector-2.png"
                  alt="Designed around your needs"
                  className="w-full h-full object-contain"
                  width={500}
                  height={500}
                />
              }
            />

            <ChooseBox
              title="Quality Without Compromise"
              description="From planning to execution, we maintain high standards to ensure lasting results."
              icon={
                <Image
                  src="/images/Vector-3.png"
                  alt="Designed around your needs"
                  className="w-full h-full object-contain"
                  width={500}
                  height={500}
                />
              }
            />

            <ChooseBox
              title="End-to-End Solutions"
              description="Design, development, integration, and training—all under one trusted company."
              icon={
                <Image
                  src="/images/Vector-3i.png"
                  alt="Designed around your needs"
                  className="w-full h-full object-contain"
                  width={500}
                  height={500}
                />
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}
