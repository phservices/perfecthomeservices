"use client";

import { useState, type ChangeEvent, type SubmitEvent } from "react";
import Button from "../ui/Button";

type FormState = {
  name: string;
  phone: string;
  email: string;
  service: string;
  location: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialForm: FormState = {
  name: "",
  phone: "",
  email: "",
  service: "",
  location: "",
  message: "",
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneDigitsRegex = /^\+?\d{10,15}$/;

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};

  if (!form.name.trim()) {
    errors.name = "Full name is required";
  } else if (form.name.trim().length < 2) {
    errors.name = "Enter a valid name";
  }

  const phoneDigitsOnly = form.phone.trim().replace(/[\s-]/g, "");
  if (!form.phone.trim()) {
    errors.phone = "Phone number is required";
  } else if (!phoneDigitsRegex.test(phoneDigitsOnly)) {
    errors.phone = "Enter a valid phone number";
  }

  if (!form.email.trim()) {
    errors.email = "Email address is required";
  } else if (!emailRegex.test(form.email.trim())) {
    errors.email = "Enter a valid email address";
  }

  if (!form.service) {
    errors.service = "Please select a service";
  }

  if (!form.location.trim()) {
    errors.location = "Property location is required";
  }

  if (!form.message.trim()) {
    errors.message = "Please tell us about your project";
  } else if (form.message.trim().length < 10) {
    errors.message = "Message should be at least 10 characters";
  }

  return errors;
}

const baseInputClass =
  "w-full rounded-[8px] border bg-white px-4 py-3 font-inter text-[15px] text-[#1A1A1A] outline-none placeholder:text-[#1A1A1A80] transition-colors duration-150 sm:text-[16px]";

function getInputClass(hasError: boolean) {
  return `${baseInputClass} ${
    hasError
      ? "border-red-500 focus:border-red-500"
      : "border-[#1A1A1A33] focus:border-[#F89A0B]"
  }`;
}

const labelClass =
  "mb-2 block font-inter text-[14px] font-medium text-[#1A1A1A] sm:text-[15px]";

const errorClass = "mt-1.5 font-inter text-[13px] text-red-600";

const serviceOptions = [
  "Interior Design",
  "Construction Finishing",
  "Industrial Cleaning",
  "Fumigation",
  "Real Estate",
  "Interior Design Academy",
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://facebook.com",
    path: "M22 12.06C22 6.51 17.52 2 12 2S2 6.51 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.91h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94Z",
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    path: "M12 2c2.72 0 3.06.01 4.12.06 1.06.05 1.79.22 2.43.47.66.25 1.22.6 1.77 1.15.5.5.85 1.02 1.15 1.77.25.64.42 1.37.47 2.43.05 1.06.06 1.4.06 4.12s-.01 3.06-.06 4.12c-.05 1.06-.22 1.79-.47 2.43a4.9 4.9 0 0 1-1.15 1.77 4.9 4.9 0 0 1-1.77 1.15c-.64.25-1.37.42-2.43.47-1.06.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.06-.05-1.79-.22-2.43-.47a4.9 4.9 0 0 1-1.77-1.15 4.9 4.9 0 0 1-1.15-1.77c-.25-.64-.42-1.37-.47-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.06.22-1.79.47-2.43.25-.66.6-1.22 1.15-1.77a4.9 4.9 0 0 1 1.77-1.15c.64-.25 1.37-.42 2.43-.47C8.94 2.01 9.28 2 12 2Zm0 3.5A6.5 6.5 0 1 0 12 18.5 6.5 6.5 0 0 0 12 5.5Zm0 10.72a4.22 4.22 0 1 1 0-8.44 4.22 4.22 0 0 1 0 8.44Zm6.76-10.98a1.52 1.52 0 1 1-3.04 0 1.52 1.52 0 0 1 3.04 0Z",
  },
  {
    label: "X",
    href: "https://x.com",
    path: "M18.24 2h3.06l-6.69 7.64L22.5 22h-6.16l-4.83-6.32L5.98 22H2.92l7.16-8.18L2 2h6.32l4.36 5.77L18.24 2Zm-1.08 18.2h1.7L7.02 3.7H5.2l11.96 16.5Z",
  },
];

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setSubmitted(false);
  };

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();

    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setSubmitted(true);
    setForm(initialForm);
  };

  return (
    <section id="contact-form" className="scroll-mt-28">
      <div className="container mx-auto px-5 sm:px-6 md:px-8">
        <div className="py-12 sm:py-16 md:py-[50px] lg:py-[75px]">
          <p className="font-inter text-[24px] text-[#000000] leading-[36px] font-normal">Get Started</p>
          {/* Heading + Socials */}
          <div className="mb-10 flex flex-col gap-6 lg:mb-14 lg:flex-row lg:items-center lg:justify-between">
            <h1
              className="
                max-w-[900px]
                font-sans
                text-[32px]
                font-bold
                leading-[110%]
                text-[#1A1A1A]
                sm:text-[40px]
                md:text-[56px]
                lg:text-[90px]
              "
            >
              Get in touch with us. We&apos;re here to assist you.
            </h1>

            <div className="flex items-center flex-col gap-3 lg:shrink-0">
              {socialLinks.map(({ label, href, path }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-full
                    bg-[#F89A0B]
                    transition-all
                    duration-150
                    hover:scale-110
                    hover:opacity-80
                    sm:h-12
                    sm:w-12
                  "
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5 text-white"
                  >
                    <path d={path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="
              flex
              w-full
              flex-col
              gap-4
              rounded-[8px]
              border
              border-[#F89A0B]
              bg-[#F89A0B14]
              p-5
              sm:p-6
              md:p-8
            "
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className={labelClass}>
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  aria-invalid={!!errors.name}
                  className={getInputClass(!!errors.name)}
                />
                {errors.name && <p className={errorClass}>{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="phone" className={labelClass}>
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  aria-invalid={!!errors.phone}
                  className={getInputClass(!!errors.phone)}
                />
                {errors.phone && <p className={errorClass}>{errors.phone}</p>}
              </div>

              <div>
                <label htmlFor="email" className={labelClass}>
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  aria-invalid={!!errors.email}
                  className={getInputClass(!!errors.email)}
                />
                {errors.email && <p className={errorClass}>{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="service" className={labelClass}>
                  Service Required
                </label>
                <select
                  id="service"
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  aria-invalid={!!errors.service}
                  className={`${getInputClass(!!errors.service)} ${
                    form.service ? "text-[#1A1A1A]" : "text-[#1A1A1A80]"
                  }`}
                >
                  <option value="" disabled>
                    Select a service
                  </option>
                  {serviceOptions.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
                {errors.service && (
                  <p className={errorClass}>{errors.service}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="location" className={labelClass}>
                Property Location
              </label>
              <input
                id="location"
                name="location"
                type="text"
                value={form.location}
                onChange={handleChange}
                placeholder="Enter your property location"
                aria-invalid={!!errors.location}
                className={getInputClass(!!errors.location)}
              />
              {errors.location && (
                <p className={errorClass}>{errors.location}</p>
              )}
            </div>

            <div>
              <label htmlFor="message" className={labelClass}>
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder="Tell us about your project or anything else you want us to know"
                aria-invalid={!!errors.message}
                className={`${getInputClass(!!errors.message)} resize-none`}
              />
              {errors.message && (
                <p className={errorClass}>{errors.message}</p>
              )}
            </div>

            <Button
              style="danger"
              type="submit"
              css="w-full sm:w-[220px] text-[16px] font-bold text-[#1A1A1A] font-sans"
            >
              Send Message
            </Button>

            {submitted && (
              <p className="font-inter text-[14px] text-green-700">
                Thanks for reaching out! We&apos;ll get back to you shortly.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
