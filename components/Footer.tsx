"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import Logo from "./ui/Logo";

const quickLinks = [
  { label: "About", href: "/Aboutus" },
  { label: "Services", href: "/Listing" },
  { label: "Academy", href: "/Academy" },
  { label: "Contact", href: "/Contact" },
];

const services = [
  { label: "Interior & Exterior Design", href: "/Listing/interior-design" },
  { label: "Industrial Cleaning & Fumigation", href: "/Listing/cleaning" },
  { label: "Real Estate", href: "/Listing/real-estate" },
];

type LinkItem = {
  label: string;
  href: string;
};

function LinkColumn({ title, links }: { title: string; links: LinkItem[] }) {
  return (
    <div>
      <p className="mb-4 text-sm font-bold text-white">{title}</p>

      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="font-sans text-sm text-white/70 transition-colors hover:text-[#F89A0B] focus-visible:text-[#F89A0B] focus-visible:outline-none focus-visible:underline"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-[#F89A0B] hover:text-[#F89A0B]"
    >
      <InstagramIcon />
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="rounded-t-[32px] bg-[#151515] text-white sm:rounded-t-[40px]">
      <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8 sm:py-16 md:px-10 md:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_1.4fr] md:gap-10 lg:gap-20">
          {/* Left: Logo + Navigation */}
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-5">
              <Logo />
              <p className="max-w-[32ch] font-sans text-sm leading-[150%] text-white/60">
                Interior design, construction finishing, cleaning, and real
                estate services built around your space.
              </p>
              <SocialLink href="https://instagram.com" label="Instagram" />
            </div>

            <div className="grid grid-cols-2 gap-6 sm:gap-10">
              <LinkColumn title="Quick Links" links={quickLinks} />
              <LinkColumn title="Services" links={services} />
            </div>
          </div>

          {/* Right: Contact Card */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 md:p-10">
            <h2 className="font-display text-xl font-semibold leading-[120%] text-white md:text-2xl lg:text-[32px]">
              We&apos;d Love to Hear From You
            </h2>

            <p className="mt-4 max-w-[52ch] font-sans text-sm font-normal leading-[150%] text-white/70">
              Have questions or want to discuss your project? Reach out today,
              and let&apos;s explore how we can help.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Phone + Email */}
              <ul className="flex flex-col gap-4">
                <li className="flex items-center gap-3">
                  <IconBadge>
                    <PhoneIcon />
                  </IconBadge>

                  <a
                    href="tel:+2348063744335"
                    className="whitespace-nowrap font-sans text-sm leading-[120%] font-normal text-white/80 transition-colors hover:text-white"
                  >
                    +234 8063744335
                  </a>
                </li>

                <li className="flex items-center gap-3">
                  <IconBadge>
                    <MailIcon />
                  </IconBadge>

                  <a
                    href="mailto:perfecthomeservices2017@gmail.com"
                    className="break-all font-sans text-sm leading-[120%] font-normal text-white/80 transition-colors hover:text-white"
                  >
                    perfecthomeservices2017@gmail.com
                  </a>
                </li>
              </ul>

              {/* Address */}
              <div className="flex items-start gap-3">
                <IconBadge>
                  <PinIcon />
                </IconBadge>

                <address className="font-sans text-sm not-italic leading-[145%] font-normal text-white/80">
                  Block A2 Suite B4 Foretold Plaza, Beside New Kenyetta Market,
                  Enugu
                </address>
              </div>
            </div>

            <Link
              href="/Contact"
              className="mt-8 inline-flex rounded-full bg-[#F89A0B] px-6 py-3 font-sans text-sm font-semibold text-[#1A1A1A] transition hover:bg-white"
            >
              Book a Consultation
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 font-sans text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Perfect Home Services. All rights reserved.</p>
          <p>Enugu, Nigeria</p>
        </div>
      </div>
    </footer>
  );
}

function IconBadge({ children }: { children: ReactNode }) {
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/[0.06]">
      {children}
    </span>
  );
}

const iconProps = {
  width: 16,
  height: 16,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "shrink-0 text-white",
  "aria-hidden": true,
};

function PhoneIcon() {
  return (
    <svg {...iconProps}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg {...iconProps}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 7 10 6 10-6" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg {...iconProps}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg {...iconProps} className="shrink-0" width={18} height={18}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}
