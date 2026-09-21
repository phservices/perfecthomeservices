import { createPublicClient, isSupabaseConfigured } from "@/lib/supabase/server";
import type { Post } from "@/lib/blog";

export async function getPublishedPosts(): Promise<Post[]> {
  if (!isSupabaseConfigured) return [];
  const { data, error } = await createPublicClient()
    .from("posts")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });
  if (error) {
    console.error("getPublishedPosts:", error.message);
    return [];
  }
  return data as Post[];
}

export async function getPublishedPost(slug: string): Promise<Post | null> {
  if (!isSupabaseConfigured) return null;
  const { data, error } = await createPublicClient()
    .from("posts")
    .select("*")
    .eq("status", "published")
    .eq("slug", slug)
    .maybeSingle();
  if (error) {
    console.error("getPublishedPost:", error.message);
    return null;
  }
  return data as Post | null;
}
