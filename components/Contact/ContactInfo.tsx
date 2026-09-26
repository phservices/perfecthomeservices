import type { ReactNode } from "react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import {
  ADDRESS,
  BUSINESS,
  BUSINESS_HOURS,
  MAP_DIRECTIONS_URL,
  MAP_EMBED_URL,
  PHONE_DISPLAY,
  SOCIALS,
  whatsappLink,
} from "@/lib/site";

const socialLinks = [
  {
    label: "Instagram",
    href: SOCIALS.instagram,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5" aria-hidden>
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: SOCIALS.facebook,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
        <path d="M14 8h3V4h-3c-3.314 0-5 1.686-5 5v3H6v4h3v8h4v-8h3.2l.8-4H13V9c0-.552.448-1 1-1Z" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: SOCIALS.tiktok,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
        <path d="M16.5 3c.3 1.7 1.3 3.2 3 4.1.6.3 1.3.5 2 .6v3.4c-1.7 0-3.4-.5-4.8-1.4v6.5c0 4-3.2 6.8-7.1 6.8-3.8 0-6.6-2.8-6.6-6.3 0-3.6 2.8-6.4 6.5-6.4.4 0 .8 0 1.2.1v3.5c-.4-.1-.8-.2-1.2-.2-1.6 0-2.9 1.1-2.9 2.8 0 1.5 1.2 2.7 2.8 2.7 1.8 0 3.1-1.1 3.1-3.5V3h4Z" />
      </svg>
    ),
  },
];

function InfoCard({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <div className="flex gap-4 rounded-2xl border border-[#F89A0B]/40 bg-[#F89A0B0D] p-5">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F89A0B] text-white">
        {icon}
      </span>
      <div className="min-w-0">
        <h3 className="font-sans text-[17px] font-semibold text-[#1A1A1A]">{title}</h3>
        <div className="mt-1 font-inter text-[15px] leading-[150%] text-[#1A1A1A]/80">{children}</div>
      </div>
    </div>
  );
}

export default function ContactInfo() {
  return (
    <section>
      <div className="container mx-auto px-5 sm:px-6 md:px-8">
        <div className="py-12 sm:py-16 md:py-[50px] lg:py-[75px]">
          <h3 className="mb-2 text-center font-sans text-[16px] font-semibold leading-[110%] text-[#000000B8] sm:text-[18px] md:text-[20px] lg:text-[24px]">
            Contact Info
          </h3>
          <h2 className="mx-auto mb-8 max-w-[700px] text-center font-sans text-[24px] font-bold leading-[115%] text-[#1A1A1A] sm:text-[28px] md:text-[32px]">
            We are always happy to assist you
          </h2>

          {/* WhatsApp first: it's how most clients reach us */}
          <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href={whatsappLink("Hi, I'd like to know more about Perfect Home Services.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#25D366] px-5 py-2.5 font-sans text-[14px] font-semibold text-white shadow-[0_10px_24px_-10px_rgba(37,211,102,0.8)] transition hover:bg-[#1EBE5A] sm:px-6 sm:py-3 sm:text-[15px]"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
                <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.48 1.34 5L2 22l5.2-1.36a9.94 9.94 0 0 0 4.84 1.23h.01c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2Zm5.83 14.24c-.24.68-1.4 1.32-1.94 1.4-.5.08-1.11.11-1.79-.11-.41-.13-.94-.3-1.6-.6-2.83-1.22-4.67-4.06-4.81-4.25-.14-.19-1.16-1.54-1.16-2.94 0-1.4.73-2.09.99-2.37.26-.28.57-.35.76-.35h.55c.18 0 .41-.07.64.49.24.57.81 1.97.88 2.11.07.14.11.3.02.49-.09.19-.14.3-.28.46-.14.16-.29.36-.42.48-.14.14-.28.29-.12.56.16.28.71 1.18 1.53 1.91 1.05.94 1.94 1.24 2.21 1.38.28.14.44.12.6-.07.16-.19.7-.82.89-1.1.19-.28.37-.23.63-.14.26.09 1.64.77 1.92.91.28.14.47.21.53.33.07.12.07.68-.17 1.36Z" />
              </svg>
              Chat with us on WhatsApp
            </a>
            <a
              href={`tel:${BUSINESS.phone}`}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-[#1A1A1A]/20 px-5 py-2.5 font-sans text-[14px] font-semibold text-[#1A1A1A] transition hover:border-[#F89A0B] hover:text-[#F89A0B] sm:px-6 sm:py-3 sm:text-[15px]"
            >
              <Phone className="h-4 w-4" aria-hidden />
              Call {PHONE_DISPLAY}
            </a>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <InfoCard icon={<MapPin size={20} />} title="Office address">
                <address className="not-italic">{ADDRESS}</address>
                <a
                  href={MAP_DIRECTIONS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block font-semibold text-[#6F4322] underline underline-offset-4 hover:text-[#F89A0B]"
                >
                  Get directions
                </a>
              </InfoCard>

              <InfoCard icon={<Phone size={20} />} title="Phone">
                <a href={`tel:${BUSINESS.phone}`} className="hover:text-[#F89A0B]">
                  {PHONE_DISPLAY}
                </a>
              </InfoCard>

              <InfoCard icon={<Mail size={20} />} title="Email">
                <a href={`mailto:${BUSINESS.email}`} className="break-all hover:text-[#F89A0B]">
                  {BUSINESS.email}
                </a>
              </InfoCard>

              <InfoCard icon={<Clock size={20} />} title="Business hours">
                <dl className="space-y-0.5">
                  {BUSINESS_HOURS.map((row) => (
                    <div key={row.days} className="flex justify-between gap-4">
                      <dt>{row.days}</dt>
                      <dd className="font-semibold text-[#1A1A1A]">{row.hours}</dd>
                    </div>
                  ))}
                </dl>
              </InfoCard>

              <div className="flex items-center gap-3 sm:col-span-2 lg:col-span-1">
                <span className="font-sans text-[15px] font-semibold text-[#1A1A1A]">Follow us</span>
                {socialLinks.map(({ label, href, icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F89A0B] text-white transition hover:scale-110 hover:opacity-85"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            <div className="relative min-h-[360px] overflow-hidden rounded-2xl bg-[#EFE7DE] ring-1 ring-black/10 lg:min-h-full">
              <iframe
                src={MAP_EMBED_URL}
                title="Map showing the Perfect Home Services office in Enugu"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
