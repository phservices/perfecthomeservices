"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { slugify } from "@/lib/blog";
import { createAuthClient } from "@/lib/supabase/server";

export type FormState = { error?: string } | undefined;

function refreshPublicPages() {
  revalidatePath("/blog");
  revalidatePath("/blog/[slug]", "page");
  revalidatePath("/sitemap.xml");
}

function refreshProjectPages() {
  revalidatePath("/Listing/Our-Projects");
  revalidatePath("/Listing/Our-Projects/[slug]", "page");
  revalidatePath("/Listing/Our-Projects/[slug]/gallery", "page");
  revalidatePath("/sitemap.xml");
}

export async function login(_: FormState, formData: FormData): Promise<FormState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) return { error: "Enter your email and password." };

  const supabase = await createAuthClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: "Wrong email or password. Please try again." };

  redirect("/admin");
}

export async function logout() {
  const supabase = await createAuthClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function savePost(_: FormState, formData: FormData): Promise<FormState> {
  const supabase = await createAuthClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) redirect("/admin/login");

  const id = String(formData.get("id") ?? "");
  const intent = String(formData.get("intent") ?? "draft");
  const title = String(formData.get("title") ?? "").trim();
  const slug = slugify(String(formData.get("slug") ?? "") || title);
  const content = String(formData.get("content") ?? "");

  if (!title) return { error: "Please give your post a title." };
  if (!slug) return { error: "The web address (slug) can't be empty." };
  if (intent === "publish" && !content.replace(/<[^>]*>/g, "").trim()) {
    return { error: "Write something in the post before publishing." };
  }

  const row: Record<string, unknown> = {
    title,
    slug,
    excerpt: String(formData.get("excerpt") ?? "").trim(),
    content,
    cover_image_url: String(formData.get("cover_image_url") ?? "") || null,
    cover_image_alt: String(formData.get("cover_image_alt") ?? "").trim(),
    category: String(formData.get("category") ?? "").trim() || "General",
    author: String(formData.get("author") ?? "").trim() || "Prefect Homes",
    seo_title: String(formData.get("seo_title") ?? "").trim(),
    seo_description: String(formData.get("seo_description") ?? "").trim(),
    status: intent === "publish" ? "published" : "draft",
    updated_at: new Date().toISOString(),
  };

  let existingPublishedAt: string | null = null;
  if (id) {
    const { data } = await supabase
      .from("posts")
      .select("published_at")
      .eq("id", id)
      .maybeSingle();
    existingPublishedAt = data?.published_at ?? null;
  }
  if (intent === "publish") {
    row.published_at = existingPublishedAt ?? new Date().toISOString();
  }

  const { error } = id
    ? await supabase.from("posts").update(row).eq("id", id)
    : await supabase.from("posts").insert(row);

  if (error) {
    if (error.code === "23505") {
      return { error: "Another post already uses that web address. Change the slug." };
    }
    return { error: `Couldn't save: ${error.message}` };
  }

  refreshPublicPages();
  redirect(`/admin?msg=${intent === "publish" ? "published" : "saved"}`);
}

export async function setPostStatus(formData: FormData) {
  const supabase = await createAuthClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) redirect("/admin/login");

  const id = String(formData.get("id"));
  const publish = formData.get("status") === "published";

  const { data: post } = await supabase
    .from("posts")
    .select("published_at")
    .eq("id", id)
    .maybeSingle();

  await supabase
    .from("posts")
    .update({
      status: publish ? "published" : "draft",
      published_at: publish ? (post?.published_at ?? new Date().toISOString()) : post?.published_at,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  refreshPublicPages();
  redirect(`/admin?msg=${publish ? "published" : "unpublished"}`);
}

export async function deletePost(formData: FormData) {
  const supabase = await createAuthClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) redirect("/admin/login");

  await supabase.from("posts").delete().eq("id", String(formData.get("id")));

  refreshPublicPages();
  redirect("/admin?msg=deleted");
}

type GalleryImageInput = { image_url: string; image_alt?: string };
type BeforeAfterInput = {
  label?: string;
  before_image_url: string;
  before_alt?: string;
  after_image_url: string;
  after_alt?: string;
};

function parseJsonArray<T>(raw: FormDataEntryValue | null): T[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(String(raw));
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch {
    return [];
  }
}

export async function saveProject(_: FormState, formData: FormData): Promise<FormState> {
  const supabase = await createAuthClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) redirect("/admin/login");

  const id = String(formData.get("id") ?? "");
  const intent = String(formData.get("intent") ?? "draft");
  const title = String(formData.get("title") ?? "").trim();
  const slug = slugify(String(formData.get("slug") ?? "") || title);
  const description = String(formData.get("description") ?? "").trim();

  if (!title) return { error: "Please give the project a title." };
  if (!slug) return { error: "The web address (slug) can't be empty." };

  const galleryImages = parseJsonArray<GalleryImageInput>(formData.get("gallery_images")).filter(
    (g) => g.image_url
  );
  const beforeAfter = parseJsonArray<BeforeAfterInput>(formData.get("before_after")).filter(
    (b) => b.before_image_url && b.after_image_url
  );

  const row: Record<string, unknown> = {
    title,
    slug,
    category: String(formData.get("category") ?? "").trim() || "General",
    description,
    cover_image_url: String(formData.get("cover_image_url") ?? "") || null,
    cover_image_alt: String(formData.get("cover_image_alt") ?? "").trim(),
    sort_order: Number(formData.get("sort_order") ?? 0) || 0,
    status: intent === "publish" ? "published" : "draft",
    updated_at: new Date().toISOString(),
  };

  let existingPublishedAt: string | null = null;
  if (id) {
    const { data } = await supabase
      .from("projects")
      .select("published_at")
      .eq("id", id)
      .maybeSingle();
    existingPublishedAt = data?.published_at ?? null;
  }
  if (intent === "publish") {
    row.published_at = existingPublishedAt ?? new Date().toISOString();
  }

  let projectId = id;
  if (id) {
    const { error } = await supabase.from("projects").update(row).eq("id", id);
    if (error) {
      if (error.code === "23505") {
        return { error: "Another project already uses that web address. Change the slug." };
      }
      return { error: `Couldn't save: ${error.message}` };
    }
  } else {
    const { data, error } = await supabase.from("projects").insert(row).select("id").single();
    if (error) {
      if (error.code === "23505") {
        return { error: "Another project already uses that web address. Change the slug." };
      }
      return { error: `Couldn't save: ${error.message}` };
    }
    projectId = data.id as string;
  }

  await supabase.from("project_gallery_images").delete().eq("project_id", projectId);
  if (galleryImages.length) {
    const { error } = await supabase.from("project_gallery_images").insert(
      galleryImages.map((g, i) => ({
        project_id: projectId,
        image_url: g.image_url,
        image_alt: g.image_alt?.trim() ?? "",
        sort_order: i,
      }))
    );
    if (error) return { error: `Couldn't save gallery photos: ${error.message}` };
  }

  await supabase.from("project_before_after").delete().eq("project_id", projectId);
  if (beforeAfter.length) {
    const { error } = await supabase.from("project_before_after").insert(
      beforeAfter.map((b, i) => ({
        project_id: projectId,
        label: b.label?.trim() ?? "",
        before_image_url: b.before_image_url,
        before_alt: b.before_alt?.trim() ?? "",
        after_image_url: b.after_image_url,
        after_alt: b.after_alt?.trim() ?? "",
        sort_order: i,
      }))
    );
    if (error) return { error: `Couldn't save before/after photos: ${error.message}` };
  }

  refreshProjectPages();
  redirect(`/admin/projects?msg=${intent === "publish" ? "published" : "saved"}`);
}

export async function setProjectStatus(formData: FormData) {
  const supabase = await createAuthClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) redirect("/admin/login");

  const id = String(formData.get("id"));
  const publish = formData.get("status") === "published";

  const { data: project } = await supabase
    .from("projects")
    .select("published_at")
    .eq("id", id)
    .maybeSingle();

  await supabase
    .from("projects")
    .update({
      status: publish ? "published" : "draft",
      published_at: publish ? (project?.published_at ?? new Date().toISOString()) : project?.published_at,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  refreshProjectPages();
  redirect(`/admin/projects?msg=${publish ? "published" : "unpublished"}`);
}

export async function deleteProject(formData: FormData) {
  const supabase = await createAuthClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) redirect("/admin/login");

  await supabase.from("projects").delete().eq("id", String(formData.get("id")));

  refreshProjectPages();
  redirect("/admin/projects?msg=deleted");
}
