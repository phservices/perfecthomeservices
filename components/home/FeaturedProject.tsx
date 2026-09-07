"use client";

import Image from "next/image";

export default function FeaturedProject() {
  return (
    <section className="bg-[#FFF9F1]">
      <div className="py-[56px] md:py-[40px] lg:py-[84px]">
        <div className="container mx-auto">
          <h3 className="text-[16px] md:text-[20px] lg:text-[24px] leading-[100%] text-[#000000B8] font-semibold mb-[16px] text-start md:text-center lg:text-center font-sans">
            Featured Projects
          </h3>
          <h2 className="text-[20px] md:text-[24px] lg:text-[32px] text-[#000000] leading-[100%] text-[20px] font-semibold text-start md:text-center lg:text-center mb-[8px] font-sans">
            Turning Ideas Into Spaces People Love.
          </h2>
          <p className="text-[16px] md:text-[16px] lg:text-[20px] text-start md:text-center lg:text-center font-inter leading-[120%] text-[#1A1A1A] w-full max-w-full md:max-w-full lg:max-w-[996px] mx-auto mb-[20px]">
            Every project tells a story. Explore some of the homes, offices, and
            commercial environments we&apos;ve transformed through thoughtful
            design and professional execution.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-[9px]">
            {/* Box 1 */}
            <div className="relative w-full h-[234px] md:h-[227px] lg:h-[399px] mx-auto rounded-[4.69px] overflow-hidden  bg-green-600">
              <Image
                src="/images/office-1.png"
                alt="Interior and Exterior Design"
                className="w-full h-full object-cover"
                width={500}
                height={500}
              />

              <div className="absolute bottom-0 left-0 w-full p-[12px] md:p-[14px] lg:p-[18px]">
                <h3 className="text-white text-[12px] md:text-[13px] lg:text-[16px] font-medium leading-tight">
                  Interior & Exterior Design
                </h3>

                <p className="text-[#F89A0B] text-[9px] md:text-[10px] lg:text-[12px] mt-[2px]">
                  Office Table Section
                </p>
              </div>
            </div>

            {/* Box 2 */}
            <div className="relative w-full  h-[234px] md:h-[227px] bg-green-600 lg:h-[399px] mx-auto rounded-[4.69px] overflow-hidden">
              <Image
                src="/images/office-2.png"
                alt="Interior and Exterior Design"
                className="w-full h-full object-cover"
                width={500}
                height={500}
              />

              <div className="absolute bottom-0 left-0 w-full p-[12px] md:p-[14px] lg:p-[18px]">
                <h3 className="text-white text-[12px] md:text-[13px] lg:text-[16px] font-medium leading-tight">
                  Interior & Exterior Design
                </h3>

                <p className="text-[#F89A0B] text-[9px] md:text-[10px] lg:text-[12px] mt-[2px]">
                  Minimalist Chandelier
                </p>
              </div>
            </div>

            {/* Box 3 */}
            <div className="relative w-full  bg-green-600 h-[234px] md:h-[227px] lg:h-[399px] mx-auto rounded-[4.69px] overflow-hidden">
              <Image
                src="/images/office-3.png"
                alt="Interior and Exterior Design"
                className="w-full h-full object-cover"
                width={500}
                height={500}
              />

              <div className="absolute bottom-0 left-0 w-full p-[12px] md:p-[14px] lg:p-[18px]">
                <h3 className="text-white text-[12px] md:text-[13px] lg:text-[16px] font-medium leading-tight">
                  Interior & Exterior Design
                </h3>

                <p className="text-[#F89A0B] text-[9px] md:text-[10px] lg:text-[12px] mt-[2px]">
                  Luxurious Office Space
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
