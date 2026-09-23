import { notFound } from "next/navigation";
import ProjectEditor from "@/components/Admin/ProjectEditor";
import type { Project, ProjectBeforeAfter, ProjectGalleryImage } from "@/lib/projects";
import { createAuthClient } from "@/lib/supabase/server";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createAuthClient();

  const { data: project } = await supabase.from("projects").select("*").eq("id", id).maybeSingle();
  if (!project) notFound();

  const [{ data: gallery }, { data: beforeAfter }] = await Promise.all([
    supabase.from("project_gallery_images").select("*").eq("project_id", id).order("sort_order", { ascending: true }),
    supabase.from("project_before_after").select("*").eq("project_id", id).order("sort_order", { ascending: true }),
  ]);

  return (
    <ProjectEditor
      key={id}
      project={{
        ...(project as Project),
        gallery: (gallery ?? []) as ProjectGalleryImage[],
        beforeAfter: (beforeAfter ?? []) as ProjectBeforeAfter[],
      }}
    />
  );
}
