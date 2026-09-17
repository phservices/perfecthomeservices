import { NextRequest, NextResponse } from "next/server";

type ContactPayload = {
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

const requiredFields: (keyof ContactPayload)[] = [
  "service",
  "propertyType",
  "budget",
  "timeline",
  "location",
  "message",
  "name",
  "phone",
  "email",
];

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  let body: Partial<ContactPayload>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  for (const field of requiredFields) {
    if (!body[field] || !String(body[field]).trim()) {
      return NextResponse.json(
        { error: `Missing required field: ${field}` },
        { status: 400 }
      );
    }
  }

  if (!emailRegex.test(String(body.email).trim())) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  if (!webhookUrl) {
    console.error("GOOGLE_SHEETS_WEBHOOK_URL is not configured");
    return NextResponse.json(
      { error: "Contact form is not configured. Please try again later." },
      { status: 500 }
    );
  }

  const payload = {
    submittedAt: new Date().toISOString(),
    service: String(body.service).trim(),
    propertyType: String(body.propertyType).trim(),
    budget: String(body.budget).trim(),
    timeline: String(body.timeline).trim(),
    location: String(body.location).trim(),
    message: String(body.message).trim(),
    name: String(body.name).trim(),
    phone: String(body.phone).trim(),
    email: String(body.email).trim(),
  };

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      redirect: "follow",
    });

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      console.error("Google Sheets webhook error:", response.status, text);
      return NextResponse.json(
        { error: "Failed to save your submission. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to reach Google Sheets webhook:", error);
    return NextResponse.json(
      { error: "Failed to save your submission. Please try again." },
      { status: 502 }
    );
  }
}
