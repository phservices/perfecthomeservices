import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Server-only: the service role key bypasses RLS. Never import this from a
// "use client" file. The key has no NEXT_PUBLIC_ prefix, so Next.js won't
// bundle it for the browser even by accident.

export const isSupabaseAdminConfigured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
);

export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  );
}
