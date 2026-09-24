import Link from "next/link";
import { whatsappLink } from "@/lib/site";
import Button from "../ui/Button";

export default function ContactCta() {
  return (
    <section className="bg-cta">
      <div className="container mx-auto">
        <div className="py-[70px] sm:py-[90px] md:py-[110px] lg:py-[127px]">
          <h2 className="text-[32px] sm:text-[38px] md:text-[44px] lg:text-[48px] font-bold leading-[110%] font-sans mb-[16px] text-white w-full max-w-[739px]">
            Ready to transform your space?
          </h2>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-start gap-[12px] sm:gap-[15px]">
            <Link href="/Request-a-Quote">
              <Button
                style="danger"
                type="button"
                css="w-full sm:w-[225px] text-[16px] font-bold text-[#1A1A1A] font-sans"
              >
                Request a Quote
              </Button>
            </Link>

            <a
              href={whatsappLink("Hi, I'd like to discuss a project with Perfect Home Services.")}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                style="primary"
                type="button"
                css="w-full sm:w-[245px] text-[16px] font-bold font-sans"
              >
                Chat on WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
