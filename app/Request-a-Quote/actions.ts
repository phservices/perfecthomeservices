"use server";

import { after } from "next/server";
import { sendQuoteAlert } from "@/lib/email";
import {
  MAX_QUOTE_PHOTOS,
  QUOTE_BUDGETS,
  QUOTE_PHOTO_PATH,
  QUOTE_PROPERTY_TYPES,
  QUOTE_SERVICES,
} from "@/lib/quotes";
import { createPublicClient, isSupabaseConfigured } from "@/lib/supabase/server";

export type QuoteInput = {
  name: string;
  phone: string;
  email: string;
  location: string;
  service: string;
  propertyType: string;
  budget: string;
  description: string;
  preferredStartDate: string;
  photoPaths: string[];
  /** Honeypot: real visitors never see or fill this. */
  website: string;
};

export type QuoteResult = { ok: true } | { ok: false; error: string };

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\+?\d{10,15}$/;
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

const clean = (v: unknown, max = 200) => String(v ?? "").trim().slice(0, max);

export async function submitQuote(input: QuoteInput): Promise<QuoteResult> {
  if (clean(input.website)) return { ok: true };

  if (!isSupabaseConfigured) {
    return { ok: false, error: "Quote requests aren't available right now. Please contact us on WhatsApp." };
  }

  const name = clean(input.name);
  const phone = clean(input.phone, 30);
  const email = clean(input.email);
  const location = clean(input.location);
  const service = clean(input.service);
  const propertyType = clean(input.propertyType);
  const budget = clean(input.budget);
  const description = clean(input.description, 5000);
  const preferredStartDate = clean(input.preferredStartDate, 10);
  const photoPaths = Array.isArray(input.photoPaths) ? input.photoPaths.map((p) => clean(p)) : [];

  if (name.length < 2) return { ok: false, error: "Please enter your name." };
  if (!phoneRegex.test(phone.replace(/[\s()-]/g, ""))) {
    return { ok: false, error: "Please enter a valid phone or WhatsApp number." };
  }
  if (email && !emailRegex.test(email)) return { ok: false, error: "Please enter a valid email address." };
  if (!location) return { ok: false, error: "Please tell us where the property is." };
  if (!QUOTE_SERVICES.includes(service)) return { ok: false, error: "Please choose the service you need." };
  if (!QUOTE_PROPERTY_TYPES.includes(propertyType)) return { ok: false, error: "Please choose a property type." };
  if (budget && !QUOTE_BUDGETS.includes(budget)) return { ok: false, error: "Please choose a budget range." };
  if (description.length < 10) return { ok: false, error: "Please describe your project in a few words." };
  if (preferredStartDate && !dateRegex.test(preferredStartDate)) {
    return { ok: false, error: "Please choose a valid start date." };
  }
  if (photoPaths.length > MAX_QUOTE_PHOTOS || !photoPaths.every((p) => QUOTE_PHOTO_PATH.test(p))) {
    return { ok: false, error: "Something went wrong with your photos. Please try again." };
  }

  const { error } = await createPublicClient().from("quote_requests").insert({
    name,
    phone,
    email,
    location,
    service,
    property_type: propertyType,
    budget,
    description,
    preferred_start_date: preferredStartDate || null,
    photo_paths: photoPaths,
  });

  if (error) {
    console.error("submitQuote:", error.message);
    return { ok: false, error: "We couldn't send your request. Please try again or contact us on WhatsApp." };
  }

  // Email the team once the visitor already has their confirmation.
  after(() =>
    sendQuoteAlert({
      name,
      phone,
      email,
      location,
      service,
      propertyType,
      budget,
      description,
      preferredStartDate,
      photoCount: photoPaths.length,
    })
  );

  return { ok: true };
}
