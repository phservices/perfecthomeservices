"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { ImagePlus, X } from "lucide-react";
import { submitQuote, type QuoteInput } from "@/app/Request-a-Quote/actions";
import {
  MAX_QUOTE_PHOTOS,
  MAX_QUOTE_PHOTO_BYTES,
  QUOTE_BUDGETS,
  QUOTE_PHOTO_BUCKET,
  QUOTE_PROPERTY_TYPES,
  QUOTE_SERVICES,
} from "@/lib/quotes";
import { whatsappLink } from "@/lib/site";
import { createClient } from "@/lib/supabase/client";

type Fields = Omit<QuoteInput, "photoPaths">;

const emptyFields: Fields = {
  name: "",
  phone: "",
  email: "",
  location: "",
  service: "",
  propertyType: "",
  budget: "",
  description: "",
  preferredStartDate: "",
  website: "",
};

const inputCls =
  "w-full rounded-[8px] border border-[#1A1A1A33] bg-white px-4 py-3 font-inter text-[15px] text-[#1A1A1A] outline-none transition-colors placeholder:text-[#1A1A1A80] focus:border-[#F89A0B] sm:text-[16px]";
const labelCls = "mb-2 block font-inter text-[14px] font-medium text-[#1A1A1A] sm:text-[15px]";

async function uploadPhoto(file: File): Promise<string> {
  const supabase = createClient();
  const ext = file.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
  const month = new Date().toISOString().slice(0, 7);
  const path = `${month}/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage
    .from(QUOTE_PHOTO_BUCKET)
    .upload(path, file, { contentType: file.type });
  if (error) throw new Error(`Couldn't upload ${file.name}. Please try a smaller photo.`);
  return path;
}

export default function QuoteForm() {
  const [fields, setFields] = useState<Fields>(emptyFields);
  const [photos, setPhotos] = useState<{ file: File; preview: string }[]>([]);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState("");

  function onChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function addPhotos(files: FileList | null) {
    if (!files) return;
    setError("");
    const picked = Array.from(files);
    const tooBig = picked.find((f) => f.size > MAX_QUOTE_PHOTO_BYTES);
    if (tooBig) {
      setError(`${tooBig.name} is larger than 10 MB. Please choose a smaller photo.`);
      return;
    }
    const images = picked.filter((f) => f.type.startsWith("image/"));
    const room = MAX_QUOTE_PHOTOS - photos.length;
    if (images.length > room) setError(`You can attach up to ${MAX_QUOTE_PHOTOS} photos.`);
    setPhotos((prev) => [
      ...prev,
      ...images.slice(0, room).map((file) => ({ file, preview: URL.createObjectURL(file) })),
    ]);
  }

  function removePhoto(index: number) {
    URL.revokeObjectURL(photos[index].preview);
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setStatus("sending");
    try {
      const photoPaths = await Promise.all(photos.map((p) => uploadPhoto(p.file)));
      const result = await submitQuote({ ...fields, photoPaths });
      if (!result.ok) throw new Error(result.error);
      setStatus("sent");
      setFields(emptyFields);
      photos.forEach((p) => URL.revokeObjectURL(p.preview));
      setPhotos([]);
    } catch (err) {
      setStatus("idle");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
        <p className="font-display text-[24px] font-semibold text-[#1A1A1A]">Thank you! Your request is in.</p>
        <p className="mx-auto mt-2 max-w-[48ch] text-[16px] text-[#1A1A1A]/70">
          Our team will review your project and get back to you shortly, usually on WhatsApp or by phone.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 rounded-full border border-black/15 px-6 py-3 text-[15px] font-semibold hover:bg-white"
        >
          Send another request
        </button>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form
      onSubmit={onSubmit}
      className="grid grid-cols-1 gap-5 rounded-2xl border border-[#F89A0B] bg-[#F89A0B0D] p-5 sm:grid-cols-2 sm:p-8"
    >
      {/* Honeypot for bots — hidden from people and screen readers. */}
      <input
        type="text"
        name="website"
        value={fields.website}
        onChange={onChange}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <div>
        <label htmlFor="name" className={labelCls}>Full name *</label>
        <input id="name" name="name" required value={fields.name} onChange={onChange} placeholder="Your full name" autoComplete="name" className={inputCls} />
      </div>

      <div>
        <label htmlFor="phone" className={labelCls}>Phone / WhatsApp *</label>
        <input id="phone" name="phone" type="tel" required value={fields.phone} onChange={onChange} placeholder="e.g. 0806 374 4335" autoComplete="tel" className={inputCls} />
      </div>

      <div>
        <label htmlFor="email" className={labelCls}>Email</label>
        <input id="email" name="email" type="email" value={fields.email} onChange={onChange} placeholder="you@example.com" autoComplete="email" className={inputCls} />
      </div>

      <div>
        <label htmlFor="location" className={labelCls}>Property location *</label>
        <input id="location" name="location" required value={fields.location} onChange={onChange} placeholder="e.g. Independence Layout, Enugu" className={inputCls} />
      </div>

      <div>
        <label htmlFor="service" className={labelCls}>Service required *</label>
        <select id="service" name="service" required value={fields.service} onChange={onChange} className={inputCls}>
          <option value="" disabled>Choose a service</option>
          {QUOTE_SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div>
        <label htmlFor="propertyType" className={labelCls}>Property type *</label>
        <select id="propertyType" name="propertyType" required value={fields.propertyType} onChange={onChange} className={inputCls}>
          <option value="" disabled>Choose a property type</option>
          {QUOTE_PROPERTY_TYPES.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>

      <div>
        <label htmlFor="budget" className={labelCls}>Estimated budget</label>
        <select id="budget" name="budget" value={fields.budget} onChange={onChange} className={inputCls}>
          <option value="">Choose a range</option>
          {QUOTE_BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
        </select>
      </div>

      <div>
        <label htmlFor="preferredStartDate" className={labelCls}>Preferred start date</label>
        <input id="preferredStartDate" name="preferredStartDate" type="date" value={fields.preferredStartDate} onChange={onChange} className={inputCls} />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="description" className={labelCls}>Project description *</label>
        <textarea
          id="description"
          name="description"
          required
          minLength={10}
          rows={5}
          value={fields.description}
          onChange={onChange}
          placeholder="Tell us what you'd like done: rooms involved, style you like, sizes, anything important."
          className={`${inputCls} resize-y`}
        />
      </div>

      <div className="sm:col-span-2">
        <span className={labelCls}>Photos of the space (optional)</span>
        <div className="flex flex-wrap gap-3">
          {photos.map((p, i) => (
            <div key={p.preview} className="relative h-24 w-24 overflow-hidden rounded-lg ring-1 ring-black/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.preview} alt="" className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => removePhoto(i)}
                aria-label={`Remove ${p.file.name}`}
                className="absolute right-1 top-1 rounded-full bg-black/70 p-1 text-white hover:bg-black"
              >
                <X size={14} />
              </button>
            </div>
          ))}
          {photos.length < MAX_QUOTE_PHOTOS && (
            <label className="flex h-24 w-24 cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-[#1A1A1A33] bg-white text-[12px] font-semibold text-[#1A1A1A]/70 transition hover:border-[#F89A0B]">
              <ImagePlus size={22} aria-hidden />
              Add photos
              <input
                type="file"
                accept="image/*"
                multiple
                className="sr-only"
                onChange={(e) => {
                  addPhotos(e.target.files);
                  e.target.value = "";
                }}
              />
            </label>
          )}
        </div>
        <p className="mt-2 text-[13px] text-[#1A1A1A]/55">Up to {MAX_QUOTE_PHOTOS} photos, 10 MB each. Only our team can see them.</p>
      </div>

      {error && (
        <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-[15px] font-medium text-red-700 sm:col-span-2">
          {error}
        </p>
      )}

      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <a
          href={whatsappLink("Hi, I'd like to request a quote.")}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[15px] font-semibold text-[#1A1A1A] underline underline-offset-4 hover:text-[#F89A0B]"
        >
          Prefer WhatsApp? Chat with us instead
        </a>
        <button
          type="submit"
          disabled={sending}
          className="rounded-full bg-[#F89A0B] px-8 py-3.5 text-[16px] font-bold text-[#1A1A1A] shadow-[0_8px_20px_-8px_rgba(248,154,11,0.6)] transition hover:bg-[#E38A05] disabled:opacity-60"
        >
          {sending ? (photos.length ? "Uploading photos…" : "Sending…") : "Request My Quote"}
        </button>
      </div>
    </form>
  );
}
