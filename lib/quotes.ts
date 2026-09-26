export const QUOTE_SERVICES = [
  "Interior Design",
  "Exterior Design",
  "Construction Finishing",
  "Cleaning",
  "Fumigation & Pest Control",
  "Real Estate",
  "Other",
];

export const QUOTE_PROPERTY_TYPES = [
  "Residential Home",
  "Office",
  "Commercial Space (Shop, Hotel, Spa, Restaurant)",
  "Industrial Facility",
  "Land / Other",
];

export const QUOTE_BUDGETS = [
  "Under ₦1,000,000",
  "₦1,000,000 – ₦5,000,000",
  "₦5,000,000 – ₦15,000,000",
  "Above ₦15,000,000",
  "Not sure yet",
];

export const MAX_QUOTE_PHOTOS = 5;
/** Largest photo a visitor can pick; it's shrunk in the browser before upload. */
export const MAX_QUOTE_PHOTO_INPUT_BYTES = 25 * 1024 * 1024;
/** Largest file the bucket accepts (matches file_size_limit in the schema). */
export const MAX_QUOTE_PHOTO_BYTES = 2 * 1024 * 1024;
export const QUOTE_PHOTO_UPLOAD_TYPES = ["image/jpeg", "image/png", "image/webp"];
export const QUOTE_PHOTO_BUCKET = "quote-photos";

/** Upload slots one IP address can get per hour (3 full quotes' worth). */
export const QUOTE_PHOTO_IP_LIMIT_PER_HOUR = 15;
/** Upload slots for the whole site per day; caps storage growth at ~400 MB/day even from many IPs. */
export const QUOTE_PHOTO_SITE_LIMIT_PER_DAY = 200;

/** Paths the server hands out: "2026-09/<uuid>.<jpg|png|webp>". */
export const QUOTE_PHOTO_PATH = /^\d{4}-\d{2}\/[0-9a-f-]{36}\.(jpg|png|webp)$/;

export type QuoteRequest = {
  id: string;
  name: string;
  phone: string;
  email: string;
  location: string;
  service: string;
  property_type: string;
  budget: string;
  description: string;
  preferred_start_date: string | null;
  photo_paths: string[];
  status: "new" | "handled";
  created_at: string;
};
