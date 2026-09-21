import Link from "next/link";
import { deletePost, setPostStatus } from "@/app/admin/actions";
import DeleteButton from "@/components/Admin/DeleteButton";
import { formatDate, type Post } from "@/lib/blog";
import { createAuthClient } from "@/lib/supabase/server";

const MESSAGES: Record<string, string> = {
  saved: "Draft saved.",
  published: "Your post is live on the blog.",
  unpublished: "Post moved back to drafts.",
  deleted: "Post deleted.",
};

export default async function Dashboard({
  searchParams,
}: {
  searchParams: Promise<{ msg?: string }>;
}) {
  const { msg } = await searchParams;
  const supabase = await createAuthClient();
  const { data } = await supabase
    .from("posts")
    .select("id,title,slug,status,category,published_at,updated_at")
    .order("updated_at", { ascending: false });
  const posts = (data ?? []) as Pick<Post, "id" | "title" | "slug" | "status" | "category" | "published_at" | "updated_at">[];

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-3xl font-semibold text-[#1A1A1A]">Your posts</h1>
        <Link
          href="/admin/posts/new"
          className="rounded-full bg-[#F89A0B] px-6 py-3 text-[15px] font-bold text-[#1A1A1A] transition hover:bg-[#E38A05]"
        >
          + Write new post
        </Link>
      </div>

      {msg && MESSAGES[msg] && (
        <div role="status" className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-[15px] font-medium text-green-800">
          {MESSAGES[msg]}
        </div>
      )}

      {posts.length === 0 ? (
        <div className="rounded-2xl bg-white px-6 py-16 text-center ring-1 ring-black/5">
          <p className="font-display text-xl font-semibold">No posts yet</p>
          <p className="mt-2 text-[#1A1A1A]/60">Click “Write new post” to create your first article.</p>
        </div>
      ) : (
        <ul className="divide-y divide-black/8 overflow-hidden rounded-2xl bg-white ring-1 ring-black/5">
          {posts.map((p) => (
            <li key={p.id} className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <Link href={`/admin/posts/${p.id}`} className="block truncate text-[17px] font-semibold text-[#1A1A1A] hover:text-[#F89A0B]">
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
                <Link href={`/admin/posts/${p.id}`} className="rounded-full px-3 py-1.5 text-sm font-semibold hover:bg-black/5">
                  Edit
                </Link>
                {p.status === "published" && (
                  <Link href={`/blog/${p.slug}`} target="_blank" className="rounded-full px-3 py-1.5 text-sm font-semibold hover:bg-black/5">
                    View ↗
                  </Link>
                )}
                <form action={setPostStatus}>
                  <input type="hidden" name="id" value={p.id} />
                  <input type="hidden" name="status" value={p.status === "published" ? "draft" : "published"} />
                  <button className="rounded-full px-3 py-1.5 text-sm font-semibold hover:bg-black/5">
                    {p.status === "published" ? "Unpublish" : "Publish"}
                  </button>
                </form>
                <form action={deletePost}>
                  <input type="hidden" name="id" value={p.id} />
                  <DeleteButton />
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
