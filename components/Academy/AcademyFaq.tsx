import { ChevronDown } from "lucide-react";
import type { AcademyFaq as Faq } from "@/lib/academy";
import SectionHeading from "../ui/SectionHeading";

export default function AcademyFaq({ faqs }: { faqs: Faq[] }) {
  if (faqs.length === 0) return null;

  return (
    <section className="bg-white">
      <div className="py-16 sm:py-20 md:py-24">
        <div className="container mx-auto px-5 sm:px-6 md:px-8">
          <SectionHeading eyebrow="FAQ" title="Academy Questions, Answered" />

          <div className="mx-auto mt-10 max-w-[800px] divide-y divide-black/10 border-y border-black/10 md:mt-12">
            {faqs.map((faq) => (
              <details key={faq.question} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-sans text-[17px] font-semibold text-[#1A1A1A] sm:text-[18px] [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <ChevronDown className="h-5 w-5 shrink-0 text-[#F89A0B] transition-transform group-open:rotate-180" aria-hidden />
                </summary>
                <p className="mt-3 whitespace-pre-line font-sans text-[15px] leading-[165%] text-[#1A1A1A]/70 sm:text-[16px]">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
