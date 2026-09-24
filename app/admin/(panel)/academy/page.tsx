import AcademyEditor from "@/components/Admin/AcademyEditor";
import { DEFAULT_ACADEMY, type AcademySettings } from "@/lib/academy";
import { createAuthClient } from "@/lib/supabase/server";

export default async function AcademyAdmin({
  searchParams,
}: {
  searchParams: Promise<{ msg?: string }>;
}) {
  const { msg } = await searchParams;
  const supabase = await createAuthClient();
  const { data } = await supabase.from("academy_settings").select("*").eq("id", 1).maybeSingle();

  return <AcademyEditor settings={(data as AcademySettings | null) ?? DEFAULT_ACADEMY} saved={msg === "saved"} />;
}
