"use client";

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
            <a
              href={link.href}
              className="text-sm text-white transition-colors hover:text-white focus-visible:text-white focus-visible:outline-none focus-visible:underline"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_2fr] md:gap-8 lg:gap-16">
          {/* Left: Logo + Navigation */}
          <div className="flex flex-col gap-8">
            <Logo />

            <div className="grid grid-cols-2 gap-6 sm:gap-10">
              <LinkColumn title="Quick Links" links={quickLinks} />
              <LinkColumn title="Services" links={services} />
            </div>
          </div>

          {/* Right: Contact Card */}
          <div className=" p-5 sm:p-6 md:p-8">
            <h2 className="text-xl font-semibold text-white leading-[120%] md:text-2xl lg:text-[32px] ">
              We&apos;d Love to Hear From You
            </h2>

            <p className="mt-[16px] max-w-[52ch] text-sm leading-[120%] text-[#FFFFFFCC] font-normal">
              Have questions or want to discuss your project? Reach out today,
              and let&apos;s explore how we can help.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Phone + Email */}
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <PhoneIcon />

                  <a
                    href="tel:+2348063744335"
                    className="text-sm leading-[120%] text-[#FFFFFFCC] font-normal transition-colors hover:text-white"
                  >
                    +234 8063744335
                  </a>
                </li>

                <li className="flex items-center gap-3">
                  <MailIcon />

                  <a
                    href="mailto:perfecthomeservices2017@gmail.com"
                    className="break-all leading-[120%] text-[#FFFFFFCC] font-normal transition-colors hover:text-white"
                  >
                    perfecthomeservices2017@gmail.com
                  </a>
                </li>
              </ul>

              {/* Address */}
              <div className="flex items-start gap-3">
                <span className="mt-[2px]">
                  <PinIcon />
                </span>

                <address className="not-italic leading-[120%] text-[#FFFFFFCC] font-normal">
                  Block A2 Suite B4 Foretold Plaza, Beside New Kenyetta Market,
                  Enugu
                </address>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
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
