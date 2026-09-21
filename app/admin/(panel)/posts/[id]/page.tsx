import { notFound } from "next/navigation";
import PostEditor from "@/components/Admin/PostEditor";
import type { Post } from "@/lib/blog";
import { createAuthClient } from "@/lib/supabase/server";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createAuthClient();
  const { data } = await supabase.from("posts").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();
  return <PostEditor key={id} post={data as Post} />;
}
