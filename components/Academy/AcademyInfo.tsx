import { CalendarDays, Check, Clock, Wallet } from "lucide-react";
import { formatBatchDate, type AcademySettings } from "@/lib/academy";
import { PHONE_DISPLAY, BUSINESS, whatsappLink } from "@/lib/site";
import SectionHeading from "../ui/SectionHeading";

function Stat({
  icon: Icon,
  label,
  value,
  note,
}: {
  icon: typeof Clock;
  label: string;
  value: string;
  note?: string;
}) {
  return (
    <div className="rounded-2xl border border-[#F89A0B]/30 bg-white p-6">
      <div className="flex items-center gap-2 text-[#6F4322]">
        <Icon className="h-5 w-5" aria-hidden />
        <span className="text-[12px] font-bold uppercase tracking-[0.1em]">{label}</span>
      </div>
      <p className="mt-3 font-display text-[24px] font-semibold leading-[120%] text-[#1A1A1A] sm:text-[28px]">
        {value}
      </p>
      {note && <p className="mt-1.5 text-[14px] leading-[150%] text-[#1A1A1A]/65">{note}</p>}
    </div>
  );
}

function CheckList({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <div className="rounded-2xl bg-white p-6 ring-1 ring-black/5">
      <h3 className="font-display text-[20px] font-semibold text-[#1A1A1A]">{title}</h3>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-[15px] leading-[150%] text-[#1A1A1A]/80 sm:text-[16px]">
            <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#F89A0B]" aria-hidden />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function AcademyInfo({ settings }: { settings: AcademySettings }) {
  const batchDate = formatBatchDate(settings.next_batch_date);
  const hasBankDetails = Boolean(settings.account_number);
  const applyLink = whatsappLink(
    "Hello, I'd like to register for the Perfect Home Services Interior Design Academy."
  );

  return (
    <section id="apply" className="scroll-mt-28 bg-[#FBF9F6]">
      <div className="py-16 sm:py-20 md:py-24">
        <div className="container mx-auto px-5 sm:px-6 md:px-8">
          <SectionHeading eyebrow="Course Details" title="Everything You Need to Know" />

          <div className="mx-auto mt-12 grid max-w-[1080px] grid-cols-1 gap-4 sm:grid-cols-3 md:mt-14">
            <Stat
              icon={Wallet}
              label="Course fee"
              value={settings.course_fee || "Contact us"}
              note={settings.course_fee ? settings.fee_note : "Reach out for the current fee."}
            />
            <Stat icon={Clock} label="Duration" value={settings.duration || "3 months"} />
            <Stat
              icon={CalendarDays}
              label="Next batch starts"
              value={batchDate || "To be announced"}
              note={settings.next_batch_note || (batchDate ? undefined : "Contact us to join the waiting list.")}
            />
          </div>

          <div className="mx-auto mt-6 grid max-w-[1080px] grid-cols-1 gap-4 lg:grid-cols-3">
            <CheckList title="Who can apply" items={settings.who_can_apply} />
            <CheckList title="What you'll learn" items={settings.curriculum} />
            <CheckList title="What you'll receive" items={settings.what_you_receive} />
          </div>

          <div className="mx-auto mt-6 grid max-w-[1080px] grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-white p-6 ring-1 ring-black/5">
              <h3 className="font-display text-[20px] font-semibold text-[#1A1A1A]">Payment options</h3>
              {hasBankDetails ? (
                <dl className="mt-4 space-y-2 text-[15px] sm:text-[16px]">
                  {settings.bank_name && (
                    <div className="flex justify-between gap-4">
                      <dt className="text-[#1A1A1A]/60">Bank</dt>
                      <dd className="text-right font-semibold text-[#1A1A1A]">{settings.bank_name}</dd>
                    </div>
                  )}
                  {settings.account_name && (
                    <div className="flex justify-between gap-4">
                      <dt className="text-[#1A1A1A]/60">Account name</dt>
                      <dd className="text-right font-semibold text-[#1A1A1A]">{settings.account_name}</dd>
                    </div>
                  )}
                  <div className="flex justify-between gap-4">
                    <dt className="text-[#1A1A1A]/60">Account number</dt>
                    <dd className="text-right font-mono text-[17px] font-semibold tracking-wider text-[#1A1A1A]">
                      {settings.account_number}
                    </dd>
                  </div>
                </dl>
              ) : null}
              <p className="mt-4 whitespace-pre-line text-[15px] leading-[155%] text-[#1A1A1A]/70">
                {settings.payment_note ||
                  (hasBankDetails
                    ? "After paying, send your proof of payment to us on WhatsApp to confirm your place."
                    : "Contact us directly and we'll share payment details and any available payment plans.")}
              </p>
            </div>

            <div className="flex flex-col justify-center rounded-2xl bg-[#151515] p-6 text-white sm:p-8">
              <h3 className="font-display text-[24px] font-semibold leading-[120%] sm:text-[28px]">
                Ready to start your design career?
              </h3>
              <p className="mt-2 text-[15px] leading-[155%] text-white/70">
                Register on WhatsApp and our team will guide you through the next steps.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href={applyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-[#F89A0B] px-7 py-3.5 text-[16px] font-bold text-[#1A1A1A] shadow-[0_8px_20px_-8px_rgba(248,154,11,0.6)] transition hover:bg-[#E38A05]"
                >
                  Apply / Register Now
                </a>
                <a
                  href={`tel:${BUSINESS.phone}`}
                  className="inline-flex items-center justify-center rounded-full border border-white/40 px-7 py-3.5 text-[16px] font-bold text-white transition hover:bg-white hover:text-[#1A1A1A]"
                >
                  Call {PHONE_DISPLAY}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
