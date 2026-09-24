import { deleteCredential, saveCredential } from "@/app/admin/actions";
import DeleteButton from "@/components/Admin/DeleteButton";
import { CREDENTIAL_KINDS, type Credential } from "@/lib/credentials";
import { createAuthClient } from "@/lib/supabase/server";

const MESSAGES: Record<string, { text: string; ok: boolean }> = {
  added: { text: "Added. It now shows on the About page.", ok: true },
  updated: { text: "Changes saved.", ok: true },
  deleted: { text: "Removed from the About page.", ok: true },
  "missing-title": { text: "Please enter a name for the certificate or award.", ok: false },
  error: { text: "Couldn't save. Please try again.", ok: false },
};

const inputCls =
  "w-full rounded-xl border border-black/15 bg-white px-3.5 py-2.5 text-[15px] text-[#1A1A1A] outline-none transition focus:border-[#F89A0B] focus:ring-2 focus:ring-[#F89A0B]/25";
const labelCls = "mb-1 block text-[13px] font-semibold text-[#1A1A1A]/70";

function CredentialFields({ credential }: { credential?: Credential }) {
  return (
    <div className="grid gap-3 sm:grid-cols-[2fr_1.5fr_0.7fr_1fr_0.6fr]">
      <div>
        <label className={labelCls}>Name *</label>
        <input name="title" required defaultValue={credential?.title} placeholder="e.g. Certified Interior Decorator" className={inputCls} />
      </div>
      <div>
        <label className={labelCls}>Issued by</label>
        <input name="issuer" defaultValue={credential?.issuer} placeholder="e.g. NSID" className={inputCls} />
      </div>
      <div>
        <label className={labelCls}>Year</label>
        <input name="year" defaultValue={credential?.year} placeholder="2021" className={inputCls} />
      </div>
      <div>
        <label className={labelCls}>Type</label>
        <select name="kind" defaultValue={credential?.kind ?? "Certification"} className={inputCls}>
          {CREDENTIAL_KINDS.map((k) => <option key={k}>{k}</option>)}
        </select>
      </div>
      <div>
        <label className={labelCls}>Order</label>
        <input name="sort_order" type="number" defaultValue={credential?.sort_order ?? 0} className={inputCls} />
      </div>
    </div>
  );
}

export default async function CredentialsAdmin({
  searchParams,
}: {
  searchParams: Promise<{ msg?: string }>;
}) {
  const { msg } = await searchParams;
  const supabase = await createAuthClient();
  const { data } = await supabase
    .from("credentials")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });
  const credentials = (data ?? []) as Credential[];
  const message = msg ? MESSAGES[msg] : undefined;

  return (
    <>
      <h1 className="font-display text-3xl font-semibold text-[#1A1A1A]">Certifications &amp; awards</h1>
      <p className="mt-1 text-[15px] text-[#1A1A1A]/65">
        Everything listed here appears on the About page. The section stays hidden until you add at least one.
      </p>

      {message && (
        <div
          role="status"
          className={`mt-6 rounded-xl border px-4 py-3 text-[15px] font-medium ${
            message.ok ? "border-green-200 bg-green-50 text-green-800" : "border-red-200 bg-red-50 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      <form action={saveCredential} className="mt-6 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-6">
        <h2 className="mb-4 text-lg font-semibold text-[#1A1A1A]">Add new</h2>
        <CredentialFields />
        <button className="mt-4 rounded-full bg-[#F89A0B] px-6 py-2.5 text-[15px] font-bold text-[#1A1A1A] transition hover:bg-[#E38A05]">
          + Add to About page
        </button>
      </form>

      <h2 className="mb-3 mt-10 text-lg font-semibold text-[#1A1A1A]">Listed on the site ({credentials.length})</h2>
      {credentials.length === 0 ? (
        <div className="rounded-2xl bg-white px-6 py-12 text-center text-[#1A1A1A]/60 ring-1 ring-black/5">
          Nothing yet. Add your first certification, membership or award above.
        </div>
      ) : (
        <ul className="space-y-3">
          {credentials.map((c) => (
            <li key={c.id} className="rounded-2xl bg-white p-5 ring-1 ring-black/5">
              <form action={saveCredential}>
                <input type="hidden" name="id" value={c.id} />
                <CredentialFields credential={c} />
                <div className="mt-3 flex items-center gap-1">
                  <button className="rounded-full border border-black/15 px-4 py-1.5 text-sm font-semibold hover:bg-black/5">
                    Save changes
                  </button>
                  <DeleteButton confirmText="Remove this from the About page?" formAction={deleteCredential} />
                </div>
              </form>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
