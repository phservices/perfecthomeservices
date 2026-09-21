"use client";

import { useActionState, useRef, useState } from "react";
import Link from "next/link";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import { savePost } from "@/app/admin/actions";
import { slugify, type Post } from "@/lib/blog";
import { createClient } from "@/lib/supabase/client";
import { SITE_URL } from "@/lib/site";

const CATEGORIES = ["Interior Design", "Real Estate", "Cleaning", "Academy", "Tips & Guides", "News"];

const inputCls =
  "w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-[16px] text-[#1A1A1A] outline-none transition focus:border-[#F89A0B] focus:ring-2 focus:ring-[#F89A0B]/25";
const labelCls = "mb-1.5 block text-sm font-semibold text-[#1A1A1A]";
const hintCls = "mt-1.5 text-[13px] text-[#1A1A1A]/55";

async function uploadImage(file: File): Promise<string> {
  const supabase = createClient();
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `${new Date().getFullYear()}/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from("blog-images").upload(path, file, {
    contentType: file.type,
    cacheControl: "31536000",
  });
  if (error) throw new Error(error.message);
  return supabase.storage.from("blog-images").getPublicUrl(path).data.publicUrl;
}

function ToolbarButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition ${
        active ? "bg-[#1A1A1A] text-white" : "text-[#1A1A1A] hover:bg-black/8"
      }`}
    >
      {label}
    </button>
  );
}

function Counter({ value, min, max }: { value: number; min: number; max: number }) {
  const ok = value >= min && value <= max;
  return (
    <span className={`text-[13px] font-medium ${ok ? "text-green-700" : "text-[#1A1A1A]/55"}`}>
      {value} characters · best {min}–{max}
    </span>
  );
}

export default function PostEditor({ post }: { post?: Post }) {
  const [state, action, pending] = useActionState(savePost, undefined);

  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(post));
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [category, setCategory] = useState(post?.category ?? CATEGORIES[0]);
  const [author, setAuthor] = useState(post?.author ?? "Prefect Homes");
  const [content, setContent] = useState(post?.content ?? "");
  const [coverUrl, setCoverUrl] = useState(post?.cover_image_url ?? "");
  const [coverAlt, setCoverAlt] = useState(post?.cover_image_alt ?? "");
  const [seoTitle, setSeoTitle] = useState(post?.seo_title ?? "");
  const [seoDesc, setSeoDesc] = useState(post?.seo_description ?? "");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const inlineImageRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    immediatelyRender: false,
    shouldRerenderOnTransaction: true,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        link: { openOnClick: false, autolink: true },
      }),
      Image,
      Placeholder.configure({ placeholder: "Start writing your post here…" }),
    ],
    content,
    editorProps: {
      attributes: { class: "blog-content min-h-[380px] px-5 py-4" },
    },
    onUpdate: ({ editor }) => setContent(editor.getHTML()),
  });

  function onTitleChange(v: string) {
    setTitle(v);
    if (!slugTouched) setSlug(slugify(v));
  }

  async function handleCover(file?: File) {
    if (!file) return;
    setUploading(true);
    setUploadError("");
    try {
      setCoverUrl(await uploadImage(file));
    } catch (e) {
      setUploadError(e instanceof Error ? e.message : "Upload failed");
    }
    setUploading(false);
  }

  async function handleInlineImage(file?: File) {
    if (!file || !editor) return;
    setUploading(true);
    setUploadError("");
    try {
      const url = await uploadImage(file);
      editor.chain().focus().setImage({ src: url, alt: file.name.replace(/\.[^.]+$/, "") }).run();
    } catch (e) {
      setUploadError(e instanceof Error ? e.message : "Upload failed");
    }
    setUploading(false);
    if (inlineImageRef.current) inlineImageRef.current.value = "";
  }

  function addLink() {
    if (!editor) return;
    const previous = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Paste the link address (leave empty to remove the link):", previous ?? "https://");
    if (url === null) return;
    if (url === "") editor.chain().focus().unsetLink().run();
    else editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }

  const previewTitle = seoTitle || title || "Your post title";
  const previewDesc = seoDesc || excerpt || "Your description will show here. Write 1–2 sentences that make people want to click.";

  return (
    <form action={action} className="mx-auto max-w-[860px] pb-24">
      <input type="hidden" name="id" value={post?.id ?? ""} />
      <input type="hidden" name="content" value={content} />
      <input type="hidden" name="cover_image_url" value={coverUrl} />

      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <Link href="/admin" className="text-sm font-medium text-[#1A1A1A]/60 hover:text-[#F89A0B]">
            ← All posts
          </Link>
          <h1 className="mt-1 font-display text-3xl font-semibold text-[#1A1A1A]">
            {post ? "Edit post" : "Write a new post"}
          </h1>
        </div>
        {post?.status === "published" && (
          <Link
            href={`/blog/${post.slug}`}
            target="_blank"
            className="rounded-full border border-black/15 px-4 py-2 text-sm font-semibold hover:bg-white"
          >
            View live ↗
          </Link>
        )}
      </div>

      {state?.error && (
        <div role="alert" className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[15px] font-medium text-red-700">
          {state.error}
        </div>
      )}

      <div className="space-y-6 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-7">
        <div>
          <label className={labelCls} htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            required
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="e.g. 5 Interior Design Ideas for Small Apartments"
            className={`${inputCls} text-xl font-semibold`}
          />
        </div>

        <div>
          <span className={labelCls}>Post</span>
          <div className="overflow-hidden rounded-xl border border-black/15 focus-within:border-[#F89A0B] focus-within:ring-2 focus-within:ring-[#F89A0B]/25">
            <div className="flex flex-wrap items-center gap-1 border-b border-black/10 bg-[#FBF9F6] p-2">
              <ToolbarButton label="Big heading" active={editor?.isActive("heading", { level: 2 })} onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()} />
              <ToolbarButton label="Small heading" active={editor?.isActive("heading", { level: 3 })} onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()} />
              <ToolbarButton label="Bold" active={editor?.isActive("bold")} onClick={() => editor?.chain().focus().toggleBold().run()} />
              <ToolbarButton label="Italic" active={editor?.isActive("italic")} onClick={() => editor?.chain().focus().toggleItalic().run()} />
              <ToolbarButton label="• List" active={editor?.isActive("bulletList")} onClick={() => editor?.chain().focus().toggleBulletList().run()} />
              <ToolbarButton label="1. List" active={editor?.isActive("orderedList")} onClick={() => editor?.chain().focus().toggleOrderedList().run()} />
              <ToolbarButton label="Quote" active={editor?.isActive("blockquote")} onClick={() => editor?.chain().focus().toggleBlockquote().run()} />
              <ToolbarButton label="Link" active={editor?.isActive("link")} onClick={addLink} />
              <ToolbarButton label={uploading ? "Uploading…" : "Add image"} onClick={() => inlineImageRef.current?.click()} />
              <ToolbarButton label="Undo" onClick={() => editor?.chain().focus().undo().run()} />
            </div>
            <EditorContent editor={editor} />
          </div>
          <input
            ref={inlineImageRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleInlineImage(e.target.files?.[0])}
          />
          <p className={hintCls}>Tip: use “Big heading” for section titles. Search engines love clear headings.</p>
        </div>

        <div>
          <span className={labelCls}>Cover image</span>
          {coverUrl ? (
            <div className="relative overflow-hidden rounded-xl ring-1 ring-black/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={coverUrl} alt="" className="aspect-[16/9] w-full object-cover" />
              <button
                type="button"
                onClick={() => setCoverUrl("")}
                className="absolute right-3 top-3 rounded-full bg-black/70 px-3 py-1.5 text-sm font-semibold text-white hover:bg-black"
              >
                Remove
              </button>
            </div>
          ) : (
            <label className="flex cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-black/20 bg-[#FBF9F6] px-4 py-10 text-center transition hover:border-[#F89A0B]">
              <span className="text-base font-semibold text-[#1A1A1A]">
                {uploading ? "Uploading…" : "Click to choose a picture"}
              </span>
              <span className="text-[13px] text-[#1A1A1A]/55">Wide photos work best (JPG or PNG)</span>
              <input type="file" accept="image/*" className="hidden" onChange={(e) => handleCover(e.target.files?.[0])} />
            </label>
          )}
          {uploadError && <p className="mt-2 text-sm font-medium text-red-600">{uploadError}</p>}
          <input
            name="cover_image_alt"
            value={coverAlt}
            onChange={(e) => setCoverAlt(e.target.value)}
            placeholder="Describe the picture in a few words (helps Google & screen readers)"
            className={`${inputCls} mt-3`}
          />
        </div>

        <div>
          <label className={labelCls} htmlFor="excerpt">Short summary</label>
          <textarea
            id="excerpt"
            name="excerpt"
            rows={3}
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="1–2 sentences shown on the blog page"
            className={inputCls}
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className={labelCls} htmlFor="category">Category</label>
            <input id="category" name="category" list="cats" value={category} onChange={(e) => setCategory(e.target.value)} className={inputCls} />
            <datalist id="cats">{CATEGORIES.map((c) => <option key={c} value={c} />)}</datalist>
          </div>
          <div>
            <label className={labelCls} htmlFor="author">Author</label>
            <input id="author" name="author" value={author} onChange={(e) => setAuthor(e.target.value)} className={inputCls} />
          </div>
        </div>
      </div>

      {/* SEO */}
      <details className="mt-6 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-7" open>
        <summary className="cursor-pointer text-lg font-semibold text-[#1A1A1A]">
          Google search settings (SEO)
        </summary>
        <p className="mt-2 text-[15px] text-[#1A1A1A]/65">
          This is how your post can look on Google. Everything here is optional — we fill in sensible defaults from your title and summary.
        </p>

        <div className="mt-5 rounded-xl border border-black/10 bg-[#FBF9F6] p-4">
          <p className="truncate text-[13px] text-[#1A1A1A]/60">
            {SITE_URL.replace(/^https?:\/\//, "")} › blog › {slug || "your-post"}
          </p>
          <p className="mt-1 truncate text-[20px] text-[#1a0dab]">{previewTitle}</p>
          <p className="mt-1 line-clamp-2 text-[14px] text-[#1A1A1A]/70">{previewDesc}</p>
        </div>

        <div className="mt-5 space-y-5">
          <div>
            <label className={labelCls} htmlFor="seo_title">Google title</label>
            <input id="seo_title" name="seo_title" value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} placeholder={title} className={inputCls} />
            <div className="mt-1.5"><Counter value={(seoTitle || title).length} min={30} max={60} /></div>
          </div>
          <div>
            <label className={labelCls} htmlFor="seo_description">Google description</label>
            <textarea id="seo_description" name="seo_description" rows={3} value={seoDesc} onChange={(e) => setSeoDesc(e.target.value)} placeholder={excerpt} className={inputCls} />
            <div className="mt-1.5"><Counter value={(seoDesc || excerpt).length} min={80} max={160} /></div>
          </div>
          <div>
            <label className={labelCls} htmlFor="slug">Web address</label>
            <div className="flex items-center gap-2">
              <span className="hidden text-sm text-[#1A1A1A]/55 sm:inline">/blog/</span>
              <input
                id="slug"
                name="slug"
                value={slug}
                onChange={(e) => { setSlugTouched(true); setSlug(slugify(e.target.value)); }}
                className={inputCls}
              />
            </div>
            <p className={hintCls}>Made from your title automatically. Short and simple is best.</p>
          </div>
        </div>
      </details>

      {/* Sticky action bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-black/10 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-[860px] items-center justify-between gap-3 px-4 py-3">
          <span className="hidden text-sm text-[#1A1A1A]/60 sm:block">
            {post?.status === "published" ? "This post is live." : "Not published yet."}
          </span>
          <div className="ml-auto flex gap-3">
            <button
              type="submit"
              name="intent"
              value="draft"
              disabled={pending || uploading}
              className="rounded-full border border-black/20 px-5 py-2.5 text-sm font-semibold text-[#1A1A1A] transition hover:bg-black/5 disabled:opacity-50"
            >
              {post?.status === "published" ? "Switch to draft" : "Save draft"}
            </button>
            <button
              type="submit"
              name="intent"
              value="publish"
              disabled={pending || uploading}
              className="rounded-full bg-[#F89A0B] px-6 py-2.5 text-sm font-bold text-[#1A1A1A] transition hover:bg-[#E38A05] disabled:opacity-50"
            >
              {pending ? "Saving…" : post?.status === "published" ? "Update post" : "Publish"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
