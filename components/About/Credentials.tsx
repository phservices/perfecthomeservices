import { BadgeCheck } from "lucide-react";
import type { Credential } from "@/lib/credentials";
import SectionHeading from "../ui/SectionHeading";

export default function Credentials({ credentials }: { credentials: Credential[] }) {
  if (credentials.length === 0) return null;

  return (
    <section className="bg-white">
      <div className="py-16 sm:py-20 md:py-24">
        <div className="container mx-auto px-5 sm:px-6 md:px-8">
          <SectionHeading
            eyebrow="Credentials"
            title="Certifications, Memberships & Awards"
            description="The training, qualifications and recognition behind our work."
          />

          <ul className="mx-auto mt-12 grid max-w-[1080px] grid-cols-1 gap-4 sm:grid-cols-2 md:mt-14 lg:grid-cols-3">
            {credentials.map((c) => (
              <li
                key={c.id}
                className="flex gap-4 rounded-2xl border border-[#F89A0B]/30 bg-[#FDF7EF] p-5"
              >
                <BadgeCheck className="mt-0.5 h-6 w-6 shrink-0 text-[#F89A0B]" aria-hidden />
                <div className="min-w-0">
                  <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#6F4322]">
                    {c.kind}
                  </span>
                  <p className="mt-1 font-sans text-[16px] font-semibold leading-[130%] text-[#1A1A1A] sm:text-[17px]">
                    {c.title}
                  </p>
                  {(c.issuer || c.year) && (
                    <p className="mt-1 font-sans text-[14px] text-[#1A1A1A]/60">
                      {[c.issuer, c.year].filter(Boolean).join(" · ")}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
