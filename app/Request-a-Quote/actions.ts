"use server";

import { headers } from "next/headers";
import { after } from "next/server";
import { sendQuoteAlert } from "@/lib/email";
import {
  MAX_QUOTE_PHOTOS,
  QUOTE_BUDGETS,
  QUOTE_PHOTO_BUCKET,
  QUOTE_PHOTO_IP_LIMIT_PER_HOUR,
  QUOTE_PHOTO_PATH,
  QUOTE_PHOTO_SITE_LIMIT_PER_DAY,
  QUOTE_PHOTO_UPLOAD_TYPES,
  QUOTE_PROPERTY_TYPES,
  QUOTE_SERVICES,
} from "@/lib/quotes";
import { createAdminClient, isSupabaseAdminConfigured } from "@/lib/supabase/admin";
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

export type PhotoUploadSlot = { path: string; token: string };
export type PhotoUploadResult =
  | { ok: true; slots: PhotoUploadSlot[] }
  | { ok: false; error: string };

const PHOTO_EXT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

const PHOTO_ERROR = "We couldn't upload your photos right now. Send your request without them, or share them with us on WhatsApp.";

async function clientIp() {
  const h = await headers();
  return h.get("x-forwarded-for")?.split(",")[0].trim() || h.get("x-real-ip") || "unknown";
}

/**
 * Visitors can't write to the photo bucket themselves. They ask here first and
 * get one signed, single-use upload URL per photo, within per-IP and site-wide limits.
 */
export async function requestPhotoUploads(types: string[]): Promise<PhotoUploadResult> {
  if (!isSupabaseAdminConfigured) {
    console.error("requestPhotoUploads: SUPABASE_SERVICE_ROLE_KEY is not set.");
    return { ok: false, error: PHOTO_ERROR };
  }
  if (
    !Array.isArray(types) ||
    types.length < 1 ||
    types.length > MAX_QUOTE_PHOTOS ||
    !types.every((t) => QUOTE_PHOTO_UPLOAD_TYPES.includes(t))
  ) {
    return { ok: false, error: "Please attach up to 5 JPG, PNG or WebP photos." };
  }

  const supabase = createAdminClient();
  const ip = await clientIp();
  const hourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  const [byIp, bySite] = await Promise.all([
    supabase.from("quote_photo_uploads").select("path", { count: "exact", head: true }).eq("ip", ip).gte("created_at", hourAgo),
    supabase.from("quote_photo_uploads").select("path", { count: "exact", head: true }).gte("created_at", dayAgo),
  ]);
  if (byIp.error || bySite.error) {
    console.error("requestPhotoUploads:", byIp.error?.message ?? bySite.error?.message);
    return { ok: false, error: PHOTO_ERROR };
  }
  if ((byIp.count ?? 0) + types.length > QUOTE_PHOTO_IP_LIMIT_PER_HOUR) {
    return { ok: false, error: "You've uploaded a lot of photos recently. Please try again in an hour, or send them to us on WhatsApp." };
  }
  if ((bySite.count ?? 0) + types.length > QUOTE_PHOTO_SITE_LIMIT_PER_DAY) {
    console.warn("requestPhotoUploads: site-wide daily photo limit reached.");
    return { ok: false, error: PHOTO_ERROR };
  }

  const month = new Date().toISOString().slice(0, 7);
  const paths = types.map((t) => `${month}/${crypto.randomUUID()}.${PHOTO_EXT[t]}`);

  // Record the slots before signing so they count against the limits even if signing fails.
  const { error: insertError } = await supabase
    .from("quote_photo_uploads")
    .insert(paths.map((path) => ({ path, ip })));
  if (insertError) {
    console.error("requestPhotoUploads:", insertError.message);
    return { ok: false, error: PHOTO_ERROR };
  }

  const slots: PhotoUploadSlot[] = [];
  for (const path of paths) {
    const { data, error } = await supabase.storage.from(QUOTE_PHOTO_BUCKET).createSignedUploadUrl(path);
    if (error || !data) {
      console.error("requestPhotoUploads:", error?.message);
      return { ok: false, error: PHOTO_ERROR };
    }
    slots.push({ path: data.path, token: data.token });
  }
  return { ok: true, slots };
}

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
  if (photoPaths.length) {
    // Only accept paths this server actually handed out.
    if (!isSupabaseAdminConfigured) return { ok: false, error: PHOTO_ERROR };
    const { count, error } = await createAdminClient()
      .from("quote_photo_uploads")
      .select("path", { count: "exact", head: true })
      .in("path", photoPaths);
    if (error || new Set(photoPaths).size !== photoPaths.length || count !== photoPaths.length) {
      return { ok: false, error: "Something went wrong with your photos. Please try again." };
    }
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
