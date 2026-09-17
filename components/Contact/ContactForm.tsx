"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { Check } from "lucide-react";
import Button from "../ui/Button";

type FormState = {
  service: string;
  propertyType: string;
  budget: string;
  timeline: string;
  location: string;
  message: string;
  name: string;
  phone: string;
  email: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialForm: FormState = {
  service: "",
  propertyType: "",
  budget: "",
  timeline: "",
  location: "",
  message: "",
  name: "",
  phone: "",
  email: "",
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneDigitsRegex = /^\+?\d{10,15}$/;

const serviceOptions = [
  "Interior Design",
  "Construction Finishing",
  "Industrial Cleaning",
  "Fumigation",
  "Real Estate",
  "Interior Design Academy",
];

const propertyTypeOptions = [
  "Residential Home",
  "Corporate Office",
  "Commercial Space (Spa, Hospitality, Retail)",
  "Real Estate / Land",
];

const budgetOptions = [
  "Under ₦1,000,000",
  "₦1,000,000 - ₦5,000,000",
  "₦5,000,000 - ₦15,000,000",
  "Above ₦15,000,000",
  "Not sure yet",
];

const timelineOptions = [
  "As soon as possible",
  "Within 1-3 months",
  "Within 3-6 months",
  "Just exploring options",
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

const steps = [
  { key: "service", title: "What service do you need?" },
  { key: "propertyType", title: "What type of space is this for?" },
  { key: "budget", title: "What's your budget & timeline?" },
  { key: "details", title: "Tell us about your project" },
  { key: "contact", title: "How can we reach you?" },
] as const;

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

function validateStep(step: number, form: FormState): FormErrors {
  const errors: FormErrors = {};

  if (step === 0 && !form.service) {
    errors.service = "Please select a service";
  }

  if (step === 1 && !form.propertyType) {
    errors.propertyType = "Please select a property type";
  }

  if (step === 2) {
    if (!form.budget) errors.budget = "Please select a budget range";
    if (!form.timeline) errors.timeline = "Please select a timeline";
  }

  if (step === 3) {
    if (!form.location.trim()) {
      errors.location = "Property location is required";
    }
    if (!form.message.trim()) {
      errors.message = "Please tell us about your project";
    } else if (form.message.trim().length < 10) {
      errors.message = "Message should be at least 10 characters";
    }
  }

  if (step === 4) {
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
  }

  return errors;
}

function OptionCard({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center justify-between gap-3 rounded-[8px] border px-4 py-4 text-left font-inter text-[15px] font-medium transition-colors duration-150 sm:text-[16px] ${
        selected
          ? "border-[#F89A0B] bg-[#F89A0B14] text-[#1A1A1A]"
          : "border-[#1A1A1A33] bg-white text-[#1A1A1A] hover:border-[#F89A0B]"
      }`}
    >
      {label}
      <span
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
          selected
            ? "border-[#F89A0B] bg-[#F89A0B] text-white"
            : "border-[#1A1A1A33] text-transparent"
        }`}
      >
        <Check size={13} strokeWidth={3} />
      </span>
    </button>
  );
}

export default function ContactForm() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");

  const isLastStep = step === steps.length - 1;

  const setField = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setField(name as keyof FormState, value);
  };

  const goNext = () => {
    const stepErrors = validateStep(step, form);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setErrors({});
    setStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const goBack = () => {
    setErrors({});
    setStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const stepErrors = validateStep(step, form);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }

    setErrors({});
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data?.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      setForm(initialForm);
      setStep(0);
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    }
  };

  return (
    <section id="contact-form" className="scroll-mt-28">
      <div className="container mx-auto px-5 sm:px-6 md:px-8">
        <div className="py-12 sm:py-16 md:py-[50px] lg:py-[75px]">
          <p className="font-inter text-[24px] text-[#000000] leading-[36px] font-normal">
            Get Started
          </p>
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

            <div className="flex flex-row items-center gap-3 lg:shrink-0">
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

          {/* Multistep Form */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="
              flex
              w-full
              flex-col
              gap-6
              rounded-[8px]
              border
              border-[#F89A0B]
              bg-[#F89A0B14]
              p-5
              sm:p-6
              md:p-8
            "
          >
            {/* Step Progress */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <p className="font-inter text-[13px] font-semibold text-[#1A1A1A] sm:text-[14px]">
                  Step {step + 1} of {steps.length}
                </p>
                <p className="font-inter text-[13px] text-[#1A1A1A80] sm:text-[14px]">
                  {Math.round(((step + 1) / steps.length) * 100)}%
                </p>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#1A1A1A1A]">
                <div
                  className="h-full rounded-full bg-[#F89A0B] transition-all duration-300"
                  style={{ width: `${((step + 1) / steps.length) * 100}%` }}
                />
              </div>
            </div>

            <h2 className="font-sans text-[20px] font-bold leading-[120%] text-[#1A1A1A] sm:text-[24px] md:text-[28px]">
              {steps[step].title}
            </h2>

            {/* Step 1: Service */}
            {step === 0 && (
              <div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {serviceOptions.map((option) => (
                    <OptionCard
                      key={option}
                      label={option}
                      selected={form.service === option}
                      onClick={() => setField("service", option)}
                    />
                  ))}
                </div>
                {errors.service && (
                  <p className={errorClass}>{errors.service}</p>
                )}
              </div>
            )}

            {/* Step 2: Property Type */}
            {step === 1 && (
              <div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {propertyTypeOptions.map((option) => (
                    <OptionCard
                      key={option}
                      label={option}
                      selected={form.propertyType === option}
                      onClick={() => setField("propertyType", option)}
                    />
                  ))}
                </div>
                {errors.propertyType && (
                  <p className={errorClass}>{errors.propertyType}</p>
                )}
              </div>
            )}

            {/* Step 3: Budget & Timeline */}
            {step === 2 && (
              <div className="flex flex-col gap-5">
                <div>
                  <label className={labelClass}>Estimated Budget</label>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {budgetOptions.map((option) => (
                      <OptionCard
                        key={option}
                        label={option}
                        selected={form.budget === option}
                        onClick={() => setField("budget", option)}
                      />
                    ))}
                  </div>
                  {errors.budget && <p className={errorClass}>{errors.budget}</p>}
                </div>

                <div>
                  <label className={labelClass}>Timeline</label>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {timelineOptions.map((option) => (
                      <OptionCard
                        key={option}
                        label={option}
                        selected={form.timeline === option}
                        onClick={() => setField("timeline", option)}
                      />
                    ))}
                  </div>
                  {errors.timeline && (
                    <p className={errorClass}>{errors.timeline}</p>
                  )}
                </div>
              </div>
            )}

            {/* Step 4: Project Details */}
            {step === 3 && (
              <div className="flex flex-col gap-4">
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
                    Project Details
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
              </div>
            )}

            {/* Step 5: Contact Info */}
            {step === 4 && (
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

                <div className="sm:col-span-2">
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
              </div>
            )}

            {/* Navigation */}
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Button
                style="reverseLight"
                type="button"
                fn={goBack}
                disabled={step === 0 || status === "submitting"}
                css={`w-full sm:w-[140px] text-[16px] font-bold text-[#1A1A1A] font-sans ${
                  step === 0 ? "opacity-40 pointer-events-none" : ""
                }`}
              >
                Previous
              </Button>

              {!isLastStep ? (
                <Button
                  style="danger"
                  type="button"
                  fn={goNext}
                  css="w-full sm:w-[140px] text-[16px] font-bold text-[#1A1A1A] font-sans"
                >
                  Next
                </Button>
              ) : (
                <Button
                  style="danger"
                  type="submit"
                  loading={status === "submitting"}
                  css="w-full sm:w-[220px] text-[16px] font-bold text-[#1A1A1A] font-sans"
                >
                  {status === "submitting" ? "Sending..." : "Send Message"}
                </Button>
              )}
            </div>

            {status === "success" && (
              <p className="font-inter text-[14px] text-green-700">
                Thanks for reaching out! We&apos;ll get back to you shortly.
              </p>
            )}
            {status === "error" && (
              <p className="font-inter text-[14px] text-red-600">
                {errorMessage}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
