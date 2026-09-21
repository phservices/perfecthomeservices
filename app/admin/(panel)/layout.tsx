import Link from "next/link";
import { redirect } from "next/navigation";
import { logout } from "@/app/admin/actions";
import { createAuthClient, isSupabaseConfigured } from "@/lib/supabase/server";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  if (!isSupabaseConfigured) {
    return (
      <main className="mx-auto max-w-[560px] px-4 py-24 text-center">
        <h1 className="font-display text-2xl font-semibold">Supabase isn&apos;t connected yet</h1>
        <p className="mt-3 text-[#1A1A1A]/70">
          Add <code>NEXT_PUBLIC_SUPABASE_URL</code> and <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> to
          <code> .env.local</code>, run <code>supabase/schema.sql</code> in the Supabase SQL editor, then restart the server.
        </p>
      </main>
    );
  }

  const supabase = await createAuthClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) redirect("/admin/login");

  return (
    <>
      <header className="border-b border-black/10 bg-white">
        <div className="mx-auto flex max-w-[1000px] items-center justify-between px-4 py-3.5">
          <Link href="/admin" className="font-display text-xl font-semibold text-[#1A1A1A]">
            Prefect Homes <span className="text-[#F89A0B]">Blog</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/blog" target="_blank" className="rounded-full px-3 py-1.5 text-sm font-semibold hover:bg-black/5">
              View blog ↗
            </Link>
            <form action={logout}>
              <button className="rounded-full px-3 py-1.5 text-sm font-semibold text-[#1A1A1A]/70 hover:bg-black/5">
                Log out
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-[1000px] px-4 py-8">{children}</main>
    </>
  );
}
