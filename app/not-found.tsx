import Link from "next/link";
import Header from "@/components/Header";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/Services" },
  { label: "Interior Design", href: "/Services/interior-design-enugu" },
  { label: "Cleaning & Pest Control", href: "/Services/cleaning-fumigation-pest-control-enugu" },
  { label: "Real Estate", href: "/Services/real-estate-enugu" },
  { label: "Academy", href: "/Interior-design-academy-enugu" },
  { label: "Contact", href: "/Contact" },
];

export default function NotFound() {
  return (
    <>
      <div className="bg-[#1A1A1A] pt-5 sm:pt-7 md:pt-10 lg:pt-[50px]">
        <Header />
      </div>

      <main className="flex min-h-[60vh] flex-col items-center justify-center bg-[#FDF8F3] px-4 py-24">
        <p className="mb-4 font-sans text-[13px] font-semibold uppercase tracking-widest text-[#D05A2B]">
          404
        </p>

        <h1 className="mb-4 text-center font-display text-[32px] font-bold leading-[115%] text-[#1A1A1A] sm:text-[40px]">
          Page Not Found
        </h1>

        <p className="mb-10 max-w-md text-center font-sans text-[16px] leading-[150%] text-[#1A1A1ACC]">
          The page you&apos;re looking for doesn&apos;t exist or may have been
          moved. Try one of the links below.
        </p>

        <nav aria-label="Return navigation">
          <ul className="flex flex-wrap justify-center gap-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-block rounded-full border border-[#D05A2B] px-5 py-2.5 font-sans text-[14px] font-medium text-[#D05A2B] transition-colors hover:bg-[#D05A2B] hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </main>


    </>
  );
}
