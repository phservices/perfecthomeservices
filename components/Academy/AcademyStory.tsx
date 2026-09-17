import { sections } from "@/utils/Content/HomePage.Content";
import Image from "next/image";

export default function AcademyStory() {
  return (
    <section className="bg-[#FDF8F3]">
      <div className="py-[48px] sm:py-[64px] lg:py-[80px]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-[40px] sm:gap-[56px] lg:gap-[72px]">
            {sections.map((section) => (
              <div
                key={section.id}
                className="grid grid-cols-1 lg:grid-cols-2 items-center gap-[24px] lg:gap-[48px]"
              >
                <div className={section.reverse ? "lg:order-2" : "lg:order-1"}>
                  <h2 className="text-[#1A1A1A] text-[22px] sm:text-[26px] lg:text-[36px] leading-[130%] font-bold font-sans mb-[12px] sm:mb-[16px]">
                    {section.title}
                  </h2>

                  {section.body.map((paragraph, i) => (
                    <p
                      key={i}
                      className="text-[16px] sm:text-[18px] lg:text-[20px] font-inter font-normal leading-[150%] text-[#1A1A1A] mb-[12px] last:mb-0 max-w-[60ch]"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div
                  className={`relative aspect-[4/3] w-full overflow-hidden rounded-[8px] bg-[#EFE7DE] ${
                    section.reverse ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <Image
                    src={section.image}
                    alt={section.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
