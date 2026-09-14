"use client";
import ContactCta from "@/components/Contact/ContactCta";
import ContactDetails from "@/components/Contact/ContactDetails";
import ContactForm from "@/components/Contact/ContactForm";
import ContactHero from "@/components/Contact/ContactHero";
import ContactInfo from "@/components/Contact/ContactInfo";
import Footer from "@/components/Footer";


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
