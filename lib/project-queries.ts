import { createPublicClient, isSupabaseConfigured } from "@/lib/supabase/server";
import type {
  Project,
  ProjectBeforeAfter,
  ProjectGalleryImage,
  ProjectWithMedia,
} from "@/lib/projects";

export async function getPublishedProjects(): Promise<Project[]> {
  if (!isSupabaseConfigured) return [];
  const { data, error } = await createPublicClient()
    .from("projects")
    .select("*")
    .eq("status", "published")
    .order("sort_order", { ascending: true })
    .order("published_at", { ascending: false });
  if (error) {
    console.error("getPublishedProjects:", error.message);
    return [];
  }
  return data as Project[];
}

/** Distinct categories among published projects, in a stable order (first seen). */
export async function getProjectCategories(): Promise<string[]> {
  const projects = await getPublishedProjects();
  const seen: string[] = [];
  for (const p of projects) {
    if (!seen.includes(p.category)) seen.push(p.category);
  }
  return seen;
}

export async function getPublishedProject(slug: string): Promise<ProjectWithMedia | null> {
  if (!isSupabaseConfigured) return null;
  const supabase = createPublicClient();

  const { data: project, error } = await supabase
    .from("projects")
    .select("*")
    .eq("status", "published")
    .eq("slug", slug)
    .maybeSingle();
  if (error) {
    console.error("getPublishedProject:", error.message);
    return null;
  }
  if (!project) return null;

  const [{ data: gallery }, { data: beforeAfter }] = await Promise.all([
    supabase
      .from("project_gallery_images")
      .select("*")
      .eq("project_id", project.id)
      .order("sort_order", { ascending: true }),
    supabase
      .from("project_before_after")
      .select("*")
      .eq("project_id", project.id)
      .order("sort_order", { ascending: true }),
  ]);

  return {
    ...(project as Project),
    gallery: (gallery ?? []) as ProjectGalleryImage[],
    beforeAfter: (beforeAfter ?? []) as ProjectBeforeAfter[],
  };
}
