import Link from "next/link";
import { deleteProject, setProjectStatus } from "@/app/admin/actions";
import DeleteButton from "@/components/Admin/DeleteButton";
import { formatDate } from "@/lib/blog";
import type { Project } from "@/lib/projects";
import { createAuthClient } from "@/lib/supabase/server";

const MESSAGES: Record<string, string> = {
  saved: "Draft saved.",
  published: "The project is live on the projects page.",
  unpublished: "Project moved back to drafts.",
  deleted: "Project deleted.",
};

export default async function ProjectsDashboard({
  searchParams,
}: {
  searchParams: Promise<{ msg?: string }>;
}) {
  const { msg } = await searchParams;
  const supabase = await createAuthClient();
  const { data } = await supabase
    .from("projects")
    .select("id,title,slug,status,category,sort_order,published_at,updated_at")
    .order("sort_order", { ascending: true })
    .order("updated_at", { ascending: false });
  const projects = (data ?? []) as Pick<
    Project,
    "id" | "title" | "slug" | "status" | "category" | "sort_order" | "published_at" | "updated_at"
  >[];

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-3xl font-semibold text-[#1A1A1A]">Your projects</h1>
        <Link
          href="/admin/projects/new"
          className="rounded-full bg-[#F89A0B] px-6 py-3 text-[15px] font-bold text-[#1A1A1A] transition hover:bg-[#E38A05]"
        >
          + Add new project
        </Link>
      </div>

      {msg && MESSAGES[msg] && (
        <div role="status" className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-[15px] font-medium text-green-800">
          {MESSAGES[msg]}
        </div>
      )}

      {projects.length === 0 ? (
        <div className="rounded-2xl bg-white px-6 py-16 text-center ring-1 ring-black/5">
          <p className="font-display text-xl font-semibold">No projects yet</p>
          <p className="mt-2 text-[#1A1A1A]/60">Click “Add new project” to showcase your first piece of work.</p>
        </div>
      ) : (
        <ul className="divide-y divide-black/8 overflow-hidden rounded-2xl bg-white ring-1 ring-black/5">
          {projects.map((p) => (
            <li key={p.id} className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <Link href={`/admin/projects/${p.id}`} className="block truncate text-[17px] font-semibold text-[#1A1A1A] hover:text-[#F89A0B]">
                  {p.title}
                </Link>
                <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-[#1A1A1A]/55">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                      p.status === "published" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {p.status === "published" ? "Live" : "Draft"}
                  </span>
                  <span>{p.category}</span>
                  <span>{p.status === "published" ? `Published ${formatDate(p.published_at)}` : `Edited ${formatDate(p.updated_at)}`}</span>
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap items-center gap-1">
                <Link href={`/admin/projects/${p.id}`} className="rounded-full px-3 py-1.5 text-sm font-semibold hover:bg-black/5">
                  Edit
                </Link>
                {p.status === "published" && (
                  <Link href={`/Listing/Our-Projects/${p.slug}`} target="_blank" className="rounded-full px-3 py-1.5 text-sm font-semibold hover:bg-black/5">
                    View ↗
                  </Link>
                )}
                <form action={setProjectStatus}>
                  <input type="hidden" name="id" value={p.id} />
                  <input type="hidden" name="status" value={p.status === "published" ? "draft" : "published"} />
                  <button className="rounded-full px-3 py-1.5 text-sm font-semibold hover:bg-black/5">
                    {p.status === "published" ? "Unpublish" : "Publish"}
                  </button>
                </form>
                <form action={deleteProject}>
                  <input type="hidden" name="id" value={p.id} />
                  <DeleteButton confirmText="Delete this project for good? This can't be undone." />
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
