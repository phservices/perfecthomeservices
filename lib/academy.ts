import { createPublicClient, isSupabaseConfigured } from "@/lib/supabase/server";

export type AcademyFaq = { question: string; answer: string };

export type AcademySettings = {
  course_fee: string;
  fee_note: string;
  duration: string;
  next_batch_date: string | null;
  next_batch_note: string;
  who_can_apply: string[];
  curriculum: string[];
  what_you_receive: string[];
  bank_name: string;
  account_name: string;
  account_number: string;
  payment_note: string;
  faqs: AcademyFaq[];
};

/** Shown until the admin saves the Academy page for the first time. */
export const DEFAULT_ACADEMY: AcademySettings = {
  course_fee: "",
  fee_note: "",
  duration: "3 months",
  next_batch_date: null,
  next_batch_note: "",
  who_can_apply: [
    "Aspiring interior designers with no prior experience",
    "Painters, decorators and artisans who want to upskill",
    "Anyone planning to start their own interior design business",
  ],
  curriculum: [
    "Introduction to Interior Design",
    "Principles of Interior Design",
    "Colour Consultation",
    "Space Planning",
    "Furniture Selection",
    "Lighting Design",
    "Window Treatments",
    "Interior Design Materials",
    "Client Consultation",
    "Branding an Interior Design Business",
    "Starting an Interior Design Company",
  ],
  what_you_receive: [
    "Classroom lessons and hands-on practical sessions",
    "Site visits to ongoing and completed projects",
    "Graduation ceremony",
    "Certificate of Completion",
  ],
  bank_name: "",
  account_name: "",
  account_number: "",
  payment_note: "",
  faqs: [
    {
      question: "How long is the training?",
      answer: "The programme runs for three months and combines classroom learning, practical sessions and site visits.",
    },
    {
      question: "Do I need any experience before joining?",
      answer: "No. The programme starts from the fundamentals, so beginners are welcome.",
    },
    {
      question: "Is accommodation provided?",
      answer:
        "Accommodation is not included in the training, but we can help you find suitable accommodation if you ask with prior notice.",
    },
    {
      question: "Will I receive a certificate?",
      answer:
        "Yes. Students who complete both the theory and practical parts of the programme receive a Certificate of Completion at graduation.",
    },
  ],
};

export async function getAcademySettings(): Promise<AcademySettings> {
  if (!isSupabaseConfigured) return DEFAULT_ACADEMY;
  const { data, error } = await createPublicClient()
    .from("academy_settings")
    .select("*")
    .eq("id", 1)
    .maybeSingle();
  if (error) console.error("getAcademySettings:", error.message);
  return (data as AcademySettings | null) ?? DEFAULT_ACADEMY;
}

/** "2026-10-06" → "6 October 2026" (date-only, so no timezone shift). */
export function formatBatchDate(date: string | null) {
  if (!date) return "";
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
