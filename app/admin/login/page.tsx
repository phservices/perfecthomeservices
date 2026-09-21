"use client";

import { useActionState } from "react";
import { login } from "@/app/admin/actions";
import Logo from "@/components/ui/Logo";

export default function LoginPage() {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <form action={action} className="w-full max-w-[400px] rounded-2xl bg-white p-7 shadow-sm ring-1 ring-black/5">
        <div className="mb-6 flex justify-center rounded-xl bg-[#151515] py-4">
          <Logo />
        </div>
        <h1 className="font-display text-2xl font-semibold text-[#1A1A1A]">Blog admin</h1>
        <p className="mb-6 mt-1 text-[15px] text-[#1A1A1A]/60">Log in to write and manage posts.</p>

        {state?.error && (
          <p role="alert" className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {state.error}
          </p>
        )}

        <label className="mb-1.5 block text-sm font-semibold" htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required autoComplete="email"
          className="mb-4 w-full rounded-xl border border-black/15 px-4 py-3 outline-none focus:border-[#F89A0B] focus:ring-2 focus:ring-[#F89A0B]/25" />
        <label className="mb-1.5 block text-sm font-semibold" htmlFor="password">Password</label>
        <input id="password" name="password" type="password" required autoComplete="current-password"
          className="mb-6 w-full rounded-xl border border-black/15 px-4 py-3 outline-none focus:border-[#F89A0B] focus:ring-2 focus:ring-[#F89A0B]/25" />

        <button type="submit" disabled={pending}
          className="w-full rounded-full bg-[#F89A0B] py-3 font-bold text-[#1A1A1A] transition hover:bg-[#E38A05] disabled:opacity-50">
          {pending ? "Logging in…" : "Log in"}
        </button>
      </form>
    </main>
  );
}
