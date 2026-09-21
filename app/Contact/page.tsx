import ContactCta from "@/components/Contact/ContactCta";
import ContactDetails from "@/components/Contact/ContactDetails";
import ContactForm from "@/components/Contact/ContactForm";
import ContactHero from "@/components/Contact/ContactHero";
import ContactInfo from "@/components/Contact/ContactInfo";
import Footer from "@/components/Footer";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact Us & Book a Consultation",
  description:
    "Get in touch with Perfect Home Services in Enugu. Tell us about your interior design, cleaning or real estate project and book a free consultation.",
  path: "/Contact",
});


export default function Page() {
  return (
    <>
      <ContactHero />
      <ContactDetails />
      <ContactInfo />
      <ContactForm />
      <ContactCta />
      <Footer />
    </>
  );
}
