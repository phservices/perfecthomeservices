"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import Logo from "./ui/Logo";
import { navLinks } from "@/utils/Content/HomePage.Content";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="relative z-[100] mx-3 mt-4 rounded-full border border-white/10 bg-[#151515]/70 backdrop-blur-md sm:mx-5 md:mx-8 lg:mx-10">
        <div className="mx-auto flex h-[68px] items-center justify-between px-5 sm:px-6 lg:h-[76px] lg:px-8">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-7 lg:flex xl:gap-9">
            {navLinks.map((link) => (
              <div key={link.title} className="group relative">
                <Link
                  href={link.router}
                  className="flex items-center gap-1 font-sans text-[15px] font-medium text-white/85 transition-colors hover:text-white xl:text-[16px]"
                >
                  {link.title === "Aboutus" ? "About Us" : link.title}

                  {link.dropdown && (
                    <ChevronDown
                      size={13}
                      strokeWidth={1.75}
                      className="transition-transform duration-200 group-hover:rotate-180"
                    />
                  )}
                </Link>

                {link.dropdown && (
                  <>
                    <div className="absolute left-0 top-full h-5 min-w-[260px]" />

                    <div className="invisible absolute left-0 top-[calc(100%+16px)] z-[100] min-w-[260px] translate-y-1 rounded-2xl bg-white p-2 opacity-0 shadow-2xl shadow-black/20 ring-1 ring-black/5 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.title}
                          href={item.router}
                          className="block rounded-xl px-4 py-3 font-sans text-sm text-[#1A1A1A] transition hover:bg-[#F89A0B14] hover:text-[#F89A0B]"
                        >
                          {item.title}
                        </Link>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}

            <Link
              href="/Contact"
              className="font-sans text-[15px] font-medium text-white/85 transition-colors hover:text-white xl:text-[16px]"
            >
              Contact
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <Link
              href="/Contact"
              className="rounded-full bg-[#F89A0B] px-5 py-2.5 font-sans text-sm font-semibold text-[#1A1A1A] shadow-[0_8px_20px_-8px_rgba(248,154,11,0.6)] transition hover:bg-white xl:px-6 xl:py-3 xl:text-base"
            >
              Book a Consultation
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className="flex h-10 w-10 items-center justify-center text-white lg:hidden"
          >
            {isOpen ? (
              <X size={24} strokeWidth={1.75} />
            ) : (
              <Menu size={24} strokeWidth={1.75} />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[90] bg-[#151515] transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div
          className={`flex min-h-screen flex-col px-6 pb-10 pt-28 transition-transform duration-300 sm:px-10 ${
            isOpen ? "translate-y-0" : "-translate-y-4"
          }`}
        >
          <nav className="flex flex-col">
            {navLinks.map((link) => (
              <div key={link.title} className="border-b border-white/10">
                <Link
                  href={link.router}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between py-5 font-sans text-2xl font-semibold text-white"
                >
                  {link.title === "Aboutus" ? "About Us" : link.title}

                  {link.dropdown && <ChevronDown size={20} strokeWidth={1.75} />}
                </Link>

                {link.dropdown && (
                  <div className="mb-4 ml-2 flex flex-col border-l border-white/20 pl-5">
                    {link.dropdown.map((item) => (
                      <Link
                        key={item.title}
                        href={item.router}
                        onClick={() => setIsOpen(false)}
                        className="py-2.5 font-sans text-base text-white/60 transition hover:text-white"
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <Link
              href="/Contact"
              onClick={() => setIsOpen(false)}
              className="border-b border-white/10 py-5 font-sans text-2xl font-semibold text-white"
            >
              Contact
            </Link>
          </nav>

          {/* CTA */}
          <div className="mt-auto">
            <Link
              href="/Contact"
              onClick={() => setIsOpen(false)}
              className="block rounded-full bg-[#F89A0B] px-6 py-4 text-center font-sans text-base font-semibold text-[#1A1A1A] transition hover:bg-white"
            >
              Book a Consultation
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
