import { deleteQuote, setQuoteStatus } from "@/app/admin/actions";
import DeleteButton from "@/components/Admin/DeleteButton";
import { formatBatchDate } from "@/lib/academy";
import { QUOTE_PHOTO_BUCKET, type QuoteRequest } from "@/lib/quotes";
import { createAuthClient } from "@/lib/supabase/server";

function whatsappNumber(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return digits.startsWith("0") ? `234${digits.slice(1)}` : digits;
}

export default async function QuotesAdmin({
  searchParams,
}: {
  searchParams: Promise<{ msg?: string }>;
}) {
  const { msg } = await searchParams;
  const supabase = await createAuthClient();
  const { data } = await supabase
    .from("quote_requests")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200);
  const quotes = (data ?? []) as QuoteRequest[];

  // Photos live in a private bucket, so hand the browser short-lived links.
  const allPaths = quotes.flatMap((q) => q.photo_paths);
  const signed = new Map<string, string>();
  if (allPaths.length) {
    const { data: urls } = await supabase.storage.from(QUOTE_PHOTO_BUCKET).createSignedUrls(allPaths, 60 * 60);
    urls?.forEach((u) => u.path && u.signedUrl && signed.set(u.path, u.signedUrl));
  }

  const newCount = quotes.filter((q) => q.status === "new").length;

  return (
    <>
      <h1 className="font-display text-3xl font-semibold text-[#1A1A1A]">Quote requests</h1>
      <p className="mt-1 text-[15px] text-[#1A1A1A]/65">
        {newCount > 0 ? `${newCount} new request${newCount === 1 ? "" : "s"} waiting for a reply.` : "You're all caught up."}
      </p>

      {msg === "deleted" && (
        <div role="status" className="mt-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-[15px] font-medium text-green-800">
          Request deleted.
        </div>
      )}

      {quotes.length === 0 ? (
        <div className="mt-6 rounded-2xl bg-white px-6 py-16 text-center ring-1 ring-black/5">
          <p className="font-display text-xl font-semibold">No requests yet</p>
          <p className="mt-2 text-[#1A1A1A]/60">Requests from the “Request a Quote” page will appear here.</p>
        </div>
      ) : (
        <ul className="mt-6 space-y-4">
          {quotes.map((q) => (
            <li key={q.id} className={`rounded-2xl bg-white p-5 ring-1 sm:p-6 ${q.status === "new" ? "ring-[#F89A0B]" : "ring-black/5"}`}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="flex flex-wrap items-center gap-2 text-[17px] font-semibold text-[#1A1A1A]">
                    {q.name}
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${q.status === "new" ? "bg-amber-100 text-amber-800" : "bg-green-100 text-green-800"}`}>
                      {q.status === "new" ? "New" : "Handled"}
                    </span>
                  </p>
                  <p className="mt-0.5 text-[13px] text-[#1A1A1A]/55">
                    {new Date(q.created_at).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short", timeZone: "Africa/Lagos" })}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-1">
                  <a href={`https://wa.me/${whatsappNumber(q.phone)}`} target="_blank" rel="noopener noreferrer" className="rounded-full bg-[#25D366] px-3 py-1.5 text-sm font-semibold text-white hover:bg-[#1EBE5A]">
                    WhatsApp
                  </a>
                  <a href={`tel:${q.phone}`} className="rounded-full px-3 py-1.5 text-sm font-semibold hover:bg-black/5">Call</a>
                  {q.email && <a href={`mailto:${q.email}`} className="rounded-full px-3 py-1.5 text-sm font-semibold hover:bg-black/5">Email</a>}
                  <form action={setQuoteStatus}>
                    <input type="hidden" name="id" value={q.id} />
                    <input type="hidden" name="status" value={q.status === "new" ? "handled" : "new"} />
                    <button className="rounded-full px-3 py-1.5 text-sm font-semibold hover:bg-black/5">
                      {q.status === "new" ? "Mark handled" : "Mark as new"}
                    </button>
                  </form>
                  <form action={deleteQuote}>
                    <input type="hidden" name="id" value={q.id} />
                    <DeleteButton confirmText="Delete this request and its photos for good?" />
                  </form>
                </div>
              </div>

              <dl className="mt-4 grid gap-x-6 gap-y-2 text-[15px] sm:grid-cols-2">
                {(
                  [
                    ["Phone / WhatsApp", q.phone],
                    ["Email", q.email],
                    ["Location", q.location],
                    ["Service", q.service],
                    ["Property type", q.property_type],
                    ["Budget", q.budget],
                    ["Preferred start", formatBatchDate(q.preferred_start_date)],
                  ] as const
                ).map(([label, value]) =>
                  value ? (
                    <div key={label}>
                      <dt className="text-[13px] text-[#1A1A1A]/55">{label}</dt>
                      <dd className="font-medium text-[#1A1A1A]">{value}</dd>
                    </div>
                  ) : null
                )}
              </dl>

              <p className="mt-4 whitespace-pre-line rounded-xl bg-[#FBF9F6] p-4 text-[15px] leading-[160%] text-[#1A1A1A]/85">
                {q.description}
              </p>

              {q.photo_paths.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {q.photo_paths.map((path) =>
                    signed.get(path) ? (
                      <a key={path} href={signed.get(path)} target="_blank" rel="noopener noreferrer">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={signed.get(path)} alt="Photo sent with the request" className="h-24 w-24 rounded-lg object-cover ring-1 ring-black/10 hover:opacity-85" />
                      </a>
                    ) : null
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
