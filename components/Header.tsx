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
      <header className="relative z-[100] mx-3 mt-3 rounded-[99px] bg-[#1A1A1A80] sm:mx-5 md:mx-8 lg:mx-10">
        <div className="mx-auto flex h-[70px] items-center justify-between px-5 sm:px-6 lg:h-[84.85px] lg:px-8">
          {/* Desktop Left Navigation */}
          <nav className="hidden items-center gap-5 lg:flex xl:gap-8">
            {navLinks.slice(0, 2).map((link) => (
              <div key={link.title} className="group relative">
                <Link
                  href={link.router}
                  className="flex items-center gap-1 font-sans text-base font-semibold text-white xl:text-[18px]"
                >
                  {link.title}

                  {link.dropdown && (
                    <ChevronDown
                      size={12}
                      strokeWidth={1.5}
                      className="transition-transform duration-200 group-hover:rotate-180"
                    />
                  )}
                </Link>

                {link.dropdown && (
                  <>
                    {/* Invisible bridge so the pointer stays over the group
                        while it crosses the gap to reach the dropdown */}
                    <div className="absolute left-0 top-full h-5 min-w-[240px]" />

                    <div className="invisible absolute left-0 top-[calc(100%+20px)] z-[100] min-w-[240px] rounded-lg bg-white p-2 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:opacity-100">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.title}
                          href={item.router}
                          className="block rounded-md px-4 py-3 text-sm text-[#1A1A1A] transition hover:bg-gray-100 xl:text-base"
                        >
                          {item.title}
                        </Link>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
          </nav>

          {/* Logo */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <Logo />
          </div>

          {/* Desktop Right Navigation */}
          <nav className="hidden items-center gap-5 lg:flex xl:gap-8">
            <Link
              href="/Aboutus"
              className="font-sans text-base font-semibold text-white transition-opacity hover:opacity-70 xl:text-[18px]"
            >
              About Us
            </Link>

            <Link
              href="/Contact"
              className="font-sans text-base font-semibold text-white transition-opacity hover:opacity-70 xl:text-[18px]"
            >
              Contact
            </Link>

            <Link
              href="/Contact"
              className="rounded-full border border-white/40 bg-[#F89A0B52] px-4 py-2.5 text-sm text-[#F8FAFC] transition hover:bg-[#a77a3e] xl:px-5 xl:py-3 xl:text-base"
            >
              Book a Consultation
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className="ml-auto flex h-10 w-10 items-center justify-center text-white lg:hidden"
          >
            {isOpen ? (
              <X size={25} strokeWidth={1.5} />
            ) : (
              <Menu size={25} strokeWidth={1.5} />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[90] bg-[#0A0A0A] transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div
          className={`flex min-h-screen flex-col px-6 pb-10 pt-28 transition-transform duration-300 sm:px-10 ${
            isOpen ? "translate-y-0" : "-translate-y-4"
          }`}
        >
          <nav className="flex flex-col">
            {navLinks.slice(0, 2).map((link) => (
              <div key={link.title} className="border-b border-white/10">
                <Link
                  href={link.router}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between py-5 font-sans text-2xl font-semibold text-white"
                >
                  {link.title}

                  {link.dropdown && <ChevronDown size={20} strokeWidth={1.5} />}
                </Link>

                {link.dropdown && (
                  <div className="mb-4 ml-2 flex flex-col border-l border-white/20 pl-5">
                    {link.dropdown.map((item) => (
                      <Link
                        key={item.title}
                        href={item.router}
                        onClick={() => setIsOpen(false)}
                        className="py-2.5 text-base text-white/60 transition hover:text-white"
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <Link
              href="/Aboutus"
              onClick={() => setIsOpen(false)}
              className="border-b border-white/10 py-5 font-sans text-2xl font-semibold text-white"
            >
              About Us
            </Link>

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
              className="block rounded-full border border-white/30 bg-[#F89A0B52] px-6 py-4 text-center font-sans text-base font-semibold text-white transition hover:bg-[#a77a3e]"
            >
              Book a Consultation
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
