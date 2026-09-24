import Footer from "@/components/Footer";
import Header from "@/components/Header";
import QuoteForm from "@/components/Quote/QuoteForm";
import SectionHeading from "@/components/ui/SectionHeading";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Request a Quote",
  description:
    "Request a free quote from Perfect Home Services for interior design, construction finishing, cleaning, fumigation or real estate in Enugu, Nigeria.",
  path: "/Request-a-Quote",
});

export default function Page() {
  return (
    <>
      <div className="bg-[#151515] pb-5 pt-1">
        <Header />
      </div>

      <main className="bg-white">
        <div className="container mx-auto max-w-[900px] px-5 py-14 sm:px-6 sm:py-20">
          <SectionHeading
            eyebrow="Request a Quote"
            title="Tell Us About Your Project"
            description="Share a few details and photos of your space, and we'll get back to you with a quote."
            className="mb-10"
          />
          <QuoteForm />
        </div>
      </main>

      <Footer />
    </>
  );
}
