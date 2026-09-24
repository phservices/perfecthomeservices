import { BUSINESS, SITE_URL } from "@/lib/site";

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

type QuoteAlert = {
  name: string;
  phone: string;
  email: string;
  location: string;
  service: string;
  propertyType: string;
  budget: string;
  description: string;
  preferredStartDate: string;
  photoCount: number;
};

/**
 * Emails the business about a new quote request via Resend (https://resend.com).
 * Needs RESEND_API_KEY; without it this logs and does nothing, so the form keeps working.
 */
export async function sendQuoteAlert(q: QuoteAlert) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("sendQuoteAlert: RESEND_API_KEY is not set; skipping email alert.");
    return;
  }

  const to = (process.env.QUOTE_ALERT_EMAIL || BUSINESS.email).split(",").map((e) => e.trim());
  const from = process.env.RESEND_FROM || "Perfect Home Services <onboarding@resend.dev>";

  const rows: [string, string][] = [
    ["Name", q.name],
    ["Phone / WhatsApp", q.phone],
    ["Email", q.email],
    ["Location", q.location],
    ["Service", q.service],
    ["Property type", q.propertyType],
    ["Budget", q.budget],
    ["Preferred start", q.preferredStartDate],
    ["Photos", q.photoCount ? `${q.photoCount} attached (view in admin)` : ""],
  ];

  const html = `
    <div style="font-family:Arial,sans-serif;color:#1A1A1A;max-width:600px">
      <h2 style="margin:0 0 16px">New quote request</h2>
      <table style="border-collapse:collapse;width:100%">
        ${rows
          .filter(([, v]) => v)
          .map(
            ([k, v]) =>
              `<tr><td style="padding:6px 12px 6px 0;color:#666;white-space:nowrap;vertical-align:top">${k}</td><td style="padding:6px 0;font-weight:bold">${escape(v)}</td></tr>`
          )
          .join("")}
      </table>
      <p style="margin:16px 0 4px;color:#666">Project description</p>
      <p style="margin:0;padding:12px;background:#FBF9F6;border-radius:8px;white-space:pre-line">${escape(q.description)}</p>
      <p style="margin:24px 0 0">
        <a href="${SITE_URL}/admin/quotes" style="background:#F89A0B;color:#1A1A1A;padding:12px 20px;border-radius:999px;text-decoration:none;font-weight:bold">Open in admin</a>
      </p>
    </div>`;

  const text = [
    "New quote request",
    "",
    ...rows.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`),
    "",
    q.description,
    "",
    `Open in admin: ${SITE_URL}/admin/quotes`,
  ].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to,
        subject: `New quote request: ${q.service} (${q.name})`,
        html,
        text,
        ...(q.email ? { reply_to: q.email } : {}),
      }),
    });
    if (!res.ok) console.error("sendQuoteAlert:", res.status, await res.text().catch(() => ""));
  } catch (error) {
    console.error("sendQuoteAlert:", error);
  }
}
