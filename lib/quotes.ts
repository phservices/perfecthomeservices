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
export const MAX_QUOTE_PHOTO_BYTES = 10 * 1024 * 1024;
export const QUOTE_PHOTO_BUCKET = "quote-photos";

/** Paths the browser is allowed to hand the server: "2026-09/<uuid>.<ext>". */
export const QUOTE_PHOTO_PATH = /^\d{4}-\d{2}\/[0-9a-f-]{36}\.[a-z0-9]{2,5}$/;

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
