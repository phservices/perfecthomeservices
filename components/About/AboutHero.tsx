"use client";

import { ChevronDown } from "lucide-react";
import Header from "../Header";

export default function AboutHero() {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-about min-h-screen pt-5 sm:pt-7 md:pt-10 lg:pt-[50px]">
      <Header />

      <div className="container mx-auto flex min-h-[calc(100vh-100px)] flex-col items-center justify-center px-5 text-center">
        {/* Heading */}
        <div>
          <p className="mb-2 font-inter text-[30px] font-medium text-white sm:text-[40px] md:text-[52px]">
            Who We  Are
          </p>

          {/* <h1 className="font-sans text-[52px] font-bold uppercase leading-[90%] text-white sm:text-[70px] md:text-[90px] lg:text-[110px]">
           
          </h1> */}
        </div>

        {/* Scroll indicator */}
        <button
          type="button"
          onClick={scrollToContent}
          aria-label="Scroll down"
          className="absolute bottom-8 flex h-12 w-12 items-center justify-center rounded-full border border-white/70 text-white transition-all duration-300 hover:scale-110 hover:bg-white hover:text-[#1A1A1A] sm:bottom-10 sm:h-14 sm:w-14"
        >
          <ChevronDown
            size={26}
            strokeWidth={1.8}
            className="animate-bounce"
          />
        </button>
      </div>
    </section>
  );
}