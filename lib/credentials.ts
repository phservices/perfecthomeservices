import { createPublicClient, isSupabaseConfigured } from "@/lib/supabase/server";

export const CREDENTIAL_KINDS = ["Certification", "Membership", "Award", "Qualification"] as const;

export type Credential = {
  id: string;
  title: string;
  issuer: string;
  year: string;
  kind: (typeof CREDENTIAL_KINDS)[number];
  sort_order: number;
  created_at: string;
};

export async function getCredentials(): Promise<Credential[]> {
  if (!isSupabaseConfigured) return [];
  const { data, error } = await createPublicClient()
    .from("credentials")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });
  if (error) {
    console.error("getCredentials:", error.message);
    return [];
  }
  return data as Credential[];
}
