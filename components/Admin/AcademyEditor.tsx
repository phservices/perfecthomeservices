"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { saveAcademy } from "@/app/admin/actions";
import type { AcademyFaq, AcademySettings } from "@/lib/academy";

const inputCls =
  "w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-[16px] text-[#1A1A1A] outline-none transition focus:border-[#F89A0B] focus:ring-2 focus:ring-[#F89A0B]/25";
const labelCls = "mb-1.5 block text-sm font-semibold text-[#1A1A1A]";
const hintCls = "mt-1.5 text-[13px] text-[#1A1A1A]/55";
const cardCls = "mt-6 space-y-6 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-7";

export default function AcademyEditor({ settings, saved }: { settings: AcademySettings; saved: boolean }) {
  const [state, action, pending] = useActionState(saveAcademy, undefined);
  const [faqs, setFaqs] = useState<AcademyFaq[]>(settings.faqs);

  function updateFaq(index: number, patch: Partial<AcademyFaq>) {
    setFaqs((prev) => prev.map((f, i) => (i === index ? { ...f, ...patch } : f)));
  }

  return (
    <form action={action} className="mx-auto max-w-[860px] pb-24">
      <input type="hidden" name="faqs" value={JSON.stringify(faqs)} />

      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold text-[#1A1A1A]">Academy details</h1>
          <p className="mt-1 text-[15px] text-[#1A1A1A]/65">
            Update the fee, next start date and payment details whenever they change.
          </p>
        </div>
        <Link href="/Academy#apply" target="_blank" className="shrink-0 rounded-full border border-black/15 px-4 py-2 text-sm font-semibold hover:bg-white">
          View live ↗
        </Link>
      </div>

      {saved && !state?.error && (
        <div role="status" className="mt-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-[15px] font-medium text-green-800">
          Saved. The Academy page is updated.
        </div>
      )}
      {state?.error && (
        <div role="alert" className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[15px] font-medium text-red-700">
          {state.error}
        </div>
      )}

      <div className={cardCls}>
        <h2 className="text-lg font-semibold text-[#1A1A1A]">Fee &amp; next batch</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className={labelCls} htmlFor="course_fee">Course fee</label>
            <input id="course_fee" name="course_fee" defaultValue={settings.course_fee} placeholder="e.g. ₦350,000" className={inputCls} />
            <p className={hintCls}>Leave empty to show &quot;Contact us&quot; instead of a price.</p>
          </div>
          <div>
            <label className={labelCls} htmlFor="fee_note">Fee note</label>
            <input id="fee_note" name="fee_note" defaultValue={settings.fee_note} placeholder="e.g. Pay in two instalments" className={inputCls} />
          </div>
          <div>
            <label className={labelCls} htmlFor="next_batch_date">Next batch start date</label>
            <input id="next_batch_date" name="next_batch_date" type="date" defaultValue={settings.next_batch_date ?? ""} className={inputCls} />
            <p className={hintCls}>Leave empty to show &quot;To be announced&quot;.</p>
          </div>
          <div>
            <label className={labelCls} htmlFor="next_batch_note">Next batch note</label>
            <input id="next_batch_note" name="next_batch_note" defaultValue={settings.next_batch_note} placeholder="e.g. Registration closes 30 September" className={inputCls} />
          </div>
          <div>
            <label className={labelCls} htmlFor="duration">Duration</label>
            <input id="duration" name="duration" defaultValue={settings.duration} placeholder="e.g. 3 months" className={inputCls} />
          </div>
        </div>
      </div>

      <div className={cardCls}>
        <h2 className="text-lg font-semibold text-[#1A1A1A]">Course content</h2>
        <p className="-mt-4 text-[15px] text-[#1A1A1A]/65">Write one item per line.</p>
        {(
          [
            ["who_can_apply", "Who can apply", settings.who_can_apply],
            ["curriculum", "What students will learn", settings.curriculum],
            ["what_you_receive", "What students receive", settings.what_you_receive],
          ] as const
        ).map(([name, label, value]) => (
          <div key={name}>
            <label className={labelCls} htmlFor={name}>{label}</label>
            <textarea id={name} name={name} rows={Math.max(4, value.length + 1)} defaultValue={value.join("\n")} className={inputCls} />
          </div>
        ))}
      </div>

      <div className={cardCls}>
        <h2 className="text-lg font-semibold text-[#1A1A1A]">Payment details</h2>
        <p className="-mt-4 text-[15px] text-[#1A1A1A]/65">
          Leave the account number empty to hide bank details and ask students to contact you instead.
        </p>
        <div className="grid gap-6 sm:grid-cols-3">
          <div>
            <label className={labelCls} htmlFor="bank_name">Bank</label>
            <input id="bank_name" name="bank_name" defaultValue={settings.bank_name} placeholder="e.g. GTBank" className={inputCls} />
          </div>
          <div>
            <label className={labelCls} htmlFor="account_name">Account name</label>
            <input id="account_name" name="account_name" defaultValue={settings.account_name} className={inputCls} />
          </div>
          <div>
            <label className={labelCls} htmlFor="account_number">Account number</label>
            <input id="account_number" name="account_number" inputMode="numeric" defaultValue={settings.account_number} className={inputCls} />
          </div>
        </div>
        <div>
          <label className={labelCls} htmlFor="payment_note">Payment instructions</label>
          <textarea
            id="payment_note"
            name="payment_note"
            rows={3}
            defaultValue={settings.payment_note}
            placeholder="e.g. After paying, send your proof of payment on WhatsApp to confirm your place."
            className={inputCls}
          />
        </div>
      </div>

      <div className={cardCls}>
        <h2 className="text-lg font-semibold text-[#1A1A1A]">Frequently asked questions</h2>
        {faqs.map((faq, i) => (
          <div key={i} className="space-y-2 rounded-xl border border-black/10 p-4">
            <div className="flex items-center gap-3">
              <input
                value={faq.question}
                onChange={(e) => updateFaq(i, { question: e.target.value })}
                placeholder="Question"
                className={`${inputCls} font-semibold`}
              />
              <button
                type="button"
                onClick={() => setFaqs((prev) => prev.filter((_, j) => j !== i))}
                className="shrink-0 rounded-full px-3 py-1.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
              >
                Remove
              </button>
            </div>
            <textarea
              value={faq.answer}
              onChange={(e) => updateFaq(i, { answer: e.target.value })}
              placeholder="Answer"
              rows={2}
              className={inputCls}
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => setFaqs((prev) => [...prev, { question: "", answer: "" }])}
          className="inline-flex items-center gap-2 rounded-full border border-black/15 px-4 py-2 text-sm font-semibold text-[#1A1A1A] transition hover:bg-black/5"
        >
          + Add question
        </button>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-black/10 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-[860px] justify-end px-4 py-3">
          <button
            type="submit"
            disabled={pending}
            className="rounded-full bg-[#F89A0B] px-6 py-2.5 text-sm font-bold text-[#1A1A1A] transition hover:bg-[#E38A05] disabled:opacity-50"
          >
            {pending ? "Saving…" : "Save changes"}
          </button>
        </div>
      </div>
    </form>
  );
}
