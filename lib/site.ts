export const SITE_NAME = "Perfect Home Services";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
).replace(/\/$/, "");

export const DEFAULT_OG_IMAGE = "/images/Hero-bg.jpg";

export const BUSINESS = {
  phone: "+2348063744335",
  email: "perfecthomeservices2017@gmail.com",
  city: "Enugu",
  region: "Enugu State",
  country: "NG",
};

export const ADDRESS =
  "Block A2 Suite B4 Foretold Plaza, Beside New Kenyetta Market, Enugu";

export const PHONE_DISPLAY = "+234 806 374 4335";

export function whatsappLink(message: string) {
  return `https://wa.me/${BUSINESS.phone.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
}

// TODO: confirm the real opening hours with the client.
export const BUSINESS_HOURS = [
  { days: "Monday – Friday", hours: "8:00am – 6:00pm" },
  { days: "Saturday", hours: "9:00am – 4:00pm" },
  { days: "Sunday", hours: "Closed" },
];

// TODO: replace with the business's real profile links.
export const SOCIALS = {
  instagram: "https://instagram.com",
  facebook: "https://facebook.com",
  tiktok: "https://tiktok.com",
};

export const MAP_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(
  `Foretold Plaza, New Kenyetta Market, Enugu, Nigeria`
)}&output=embed`;

export const MAP_DIRECTIONS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `Foretold Plaza, New Kenyetta Market, Enugu, Nigeria`
)}`;
