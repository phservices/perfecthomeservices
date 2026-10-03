"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { saveProject } from "@/app/admin/actions";
import { slugify, type ProjectWithMedia } from "@/lib/projects";
import { createClient } from "@/lib/supabase/client";

const CATEGORIES = ["Residential", "Commercial", "Corporate", "Hospitality", "Renovation"];

const inputCls =
  "w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-[16px] text-[#1A1A1A] outline-none transition focus:border-[#F89A0B] focus:ring-2 focus:ring-[#F89A0B]/25";
const labelCls = "mb-1.5 block text-sm font-semibold text-[#1A1A1A]";
const hintCls = "mt-1.5 text-[13px] text-[#1A1A1A]/55";

async function uploadImage(file: File): Promise<string> {
  const supabase = createClient();
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `${new Date().getFullYear()}/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from("project-images").upload(path, file, {
    contentType: file.type,
    cacheControl: "31536000",
  });
  if (error) throw new Error(error.message);
  return supabase.storage.from("project-images").getPublicUrl(path).data.publicUrl;
}

type GalleryItem = { image_url: string; image_alt: string };
type BeforeAfterItem = {
  label: string;
  before_image_url: string;
  before_alt: string;
  after_image_url: string;
  after_alt: string;
};

function ImageSlot({
  url,
  alt,
  placeholder,
  uploading,
  onPick,
  onRemove,
  onAltChange,
}: {
  url: string;
  alt: string;
  placeholder: string;
  uploading: boolean;
  onPick: (file: File) => void;
  onRemove: () => void;
  onAltChange: (v: string) => void;
}) {
  return (
    <div>
      {url ? (
        <div className="relative overflow-hidden rounded-xl ring-1 ring-black/10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={url} alt="" className="aspect-[4/3] w-full object-cover" />
          <button
            type="button"
            onClick={onRemove}
            className="absolute right-2 top-2 rounded-full bg-black/70 px-2.5 py-1 text-xs font-semibold text-white hover:bg-black"
          >
            Remove
          </button>
        </div>
      ) : (
        <label className="flex aspect-[4/3] cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-black/20 bg-[#FBF9F6] px-3 text-center transition hover:border-[#F89A0B]">
          <span className="text-sm font-semibold text-[#1A1A1A]">
            {uploading ? "Uploading…" : placeholder}
          </span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && onPick(e.target.files[0])}
          />
        </label>
      )}
      {url && (
        <input
          value={alt}
          onChange={(e) => onAltChange(e.target.value)}
          placeholder="Describe this photo (for screen readers & Google)"
          className={`${inputCls} mt-2 text-sm`}
        />
      )}
    </div>
  );
}

export default function ProjectEditor({ project }: { project?: ProjectWithMedia }) {
  const [state, action, pending] = useActionState(saveProject, undefined);

  const [title, setTitle] = useState(project?.title ?? "");
  const [slug, setSlug] = useState(project?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(project));
  const [category, setCategory] = useState(project?.category ?? CATEGORIES[0]);
  const [description, setDescription] = useState(project?.description ?? "");
  const [sortOrder, setSortOrder] = useState(project?.sort_order ?? 0);
  const [coverUrl, setCoverUrl] = useState(project?.cover_image_url ?? "");
  const [coverAlt, setCoverAlt] = useState(project?.cover_image_alt ?? "");
  const [youtubeUrl, setYoutubeUrl] = useState(project?.youtube_url ?? "");
  const [coverUploading, setCoverUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const [gallery, setGallery] = useState<GalleryItem[]>(
    project?.gallery.map((g) => ({ image_url: g.image_url, image_alt: g.image_alt })) ?? []
  );
  const [galleryUploading, setGalleryUploading] = useState(false);

  const [beforeAfter, setBeforeAfter] = useState<BeforeAfterItem[]>(
    project?.beforeAfter.map((b) => ({
      label: b.label,
      before_image_url: b.before_image_url,
      before_alt: b.before_alt,
      after_image_url: b.after_image_url,
      after_alt: b.after_alt,
    })) ?? []
  );
  const [baUploading, setBaUploading] = useState<Record<number, "before" | "after" | undefined>>({});

  function onTitleChange(v: string) {
    setTitle(v);
    if (!slugTouched) setSlug(slugify(v));
  }

  async function handleCover(file: File) {
    setCoverUploading(true);
    setUploadError("");
    try {
      setCoverUrl(await uploadImage(file));
    } catch (e) {
      setUploadError(e instanceof Error ? e.message : "Upload failed");
    }
    setCoverUploading(false);
  }

  async function handleGalleryFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setGalleryUploading(true);
    setUploadError("");
    try {
      const uploaded = await Promise.all(
        Array.from(files).map(async (file) => ({
          image_url: await uploadImage(file),
          image_alt: "",
        }))
      );
      setGallery((prev) => [...prev, ...uploaded]);
    } catch (e) {
      setUploadError(e instanceof Error ? e.message : "Upload failed");
    }
    setGalleryUploading(false);
  }

  function updateGalleryAlt(index: number, alt: string) {
    setGallery((prev) => prev.map((g, i) => (i === index ? { ...g, image_alt: alt } : g)));
  }

  function removeGalleryImage(index: number) {
    setGallery((prev) => prev.filter((_, i) => i !== index));
  }

  function addBeforeAfterPair() {
    setBeforeAfter((prev) => [
      ...prev,
      { label: "", before_image_url: "", before_alt: "", after_image_url: "", after_alt: "" },
    ]);
  }

  function removeBeforeAfterPair(index: number) {
    setBeforeAfter((prev) => prev.filter((_, i) => i !== index));
  }

  function updateBeforeAfter(index: number, patch: Partial<BeforeAfterItem>) {
    setBeforeAfter((prev) => prev.map((b, i) => (i === index ? { ...b, ...patch } : b)));
  }

  async function handleBeforeAfterUpload(index: number, side: "before" | "after", file: File) {
    setBaUploading((prev) => ({ ...prev, [index]: side }));
    setUploadError("");
    try {
      const url = await uploadImage(file);
      updateBeforeAfter(index, side === "before" ? { before_image_url: url } : { after_image_url: url });
    } catch (e) {
      setUploadError(e instanceof Error ? e.message : "Upload failed");
    }
    setBaUploading((prev) => ({ ...prev, [index]: undefined }));
  }

  const busy = pending || coverUploading || galleryUploading || Object.values(baUploading).some(Boolean);

  return (
    <form action={action} className="mx-auto max-w-[860px] pb-24">
      <input type="hidden" name="id" value={project?.id ?? ""} />
      <input type="hidden" name="cover_image_url" value={coverUrl} />
      <input type="hidden" name="gallery_images" value={JSON.stringify(gallery)} />
      <input type="hidden" name="before_after" value={JSON.stringify(beforeAfter)} />

      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <Link href="/admin/projects" className="text-sm font-medium text-[#1A1A1A]/60 hover:text-[#F89A0B]">
            ← All projects
          </Link>
          <h1 className="mt-1 font-display text-3xl font-semibold text-[#1A1A1A]">
            {project ? "Edit project" : "Add a new project"}
          </h1>
        </div>
        {project?.status === "published" && (
          <Link
            href={`/Services/Our-Projects/${project.slug}`}
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
      {uploadError && (
        <div role="alert" className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[15px] font-medium text-red-700">
          {uploadError}
        </div>
      )}

      <div className="space-y-6 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-7">
        <div>
          <label className={labelCls} htmlFor="title">Project title</label>
          <input
            id="title"
            name="title"
            required
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="e.g. The Holloway Residence"
            className={`${inputCls} text-xl font-semibold`}
          />
        </div>

        <div>
          <label className={labelCls} htmlFor="slug">Web address</label>
          <div className="flex items-center gap-2">
            <span className="hidden text-sm text-[#1A1A1A]/55 sm:inline">/Services/Our-Projects/</span>
            <input
              id="slug"
              name="slug"
              value={slug}
              onChange={(e) => { setSlugTouched(true); setSlug(slugify(e.target.value)); }}
              className={inputCls}
            />
          </div>
          <p className={hintCls}>Made from the title automatically. Short and simple is best.</p>
        </div>

        <div>
          <label className={labelCls} htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What was this project about, and what did we deliver?"
            className={inputCls}
          />
          <p className={hintCls}>Shown on the project&apos;s page under the title.</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className={labelCls} htmlFor="category">Category</label>
            <input id="category" name="category" list="project-cats" value={category} onChange={(e) => setCategory(e.target.value)} className={inputCls} />
            <datalist id="project-cats">{CATEGORIES.map((c) => <option key={c} value={c} />)}</datalist>
            <p className={hintCls}>Visitors can filter the projects page by category. Reuse an existing one, or type a new one.</p>
          </div>
          <div>
            <label className={labelCls} htmlFor="sort_order">Display order</label>
            <input
              id="sort_order"
              name="sort_order"
              type="number"
              value={sortOrder}
              onChange={(e) => setSortOrder(Number(e.target.value))}
              className={inputCls}
            />
            <p className={hintCls}>Lower numbers show first in the grid. Leave at 0 if you don&apos;t mind the order.</p>
          </div>
        </div>

        <div>
          <span className={labelCls}>Cover photo</span>
          <p className={`${hintCls} mb-2 mt-0`}>Shown in the projects grid and at the top of the project&apos;s page.</p>
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
                {coverUploading ? "Uploading…" : "Click to choose a picture"}
              </span>
              <span className="text-[13px] text-[#1A1A1A]/55">Wide photos work best (JPG or PNG)</span>
              <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleCover(e.target.files[0])} />
            </label>
          )}
          <input
            name="cover_image_alt"
            value={coverAlt}
            onChange={(e) => setCoverAlt(e.target.value)}
            placeholder="Describe the picture in a few words (helps Google & screen readers)"
            className={`${inputCls} mt-3`}
          />
        </div>

        <div>
          <label className={labelCls} htmlFor="youtube_url">YouTube video (optional)</label>
          <input
            id="youtube_url"
            name="youtube_url"
            type="url"
            inputMode="url"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            placeholder="e.g. https://youtu.be/abc123XYZ00"
            className={inputCls}
          />
          <p className={hintCls}>
            Paste the link from the video&apos;s Share button. It plays on the project&apos;s page, below the description. Leave empty if there&apos;s no video.
          </p>
        </div>
      </div>

      {/* Full gallery photos */}
      <div className="mt-6 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-7">
        <h2 className="text-lg font-semibold text-[#1A1A1A]">Full gallery photos</h2>
        <p className="mt-1 text-[15px] text-[#1A1A1A]/65">
          Extra photos shown on the project&apos;s &quot;View Full Gallery&quot; page, in addition to the cover photo.
        </p>

        {gallery.length > 0 && (
          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {gallery.map((g, i) => (
              <ImageSlot
                key={i}
                url={g.image_url}
                alt={g.image_alt}
                placeholder="Add photo"
                uploading={false}
                onPick={() => {}}
                onRemove={() => removeGalleryImage(i)}
                onAltChange={(v) => updateGalleryAlt(i, v)}
              />
            ))}
          </div>
        )}

        <label className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-full border border-black/15 px-4 py-2 text-sm font-semibold text-[#1A1A1A] transition hover:bg-black/5">
          {galleryUploading ? "Uploading…" : "+ Add photos"}
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => handleGalleryFiles(e.target.files)}
          />
        </label>
      </div>

      {/* Before & after pairs */}
      <div className="mt-6 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-7">
        <h2 className="text-lg font-semibold text-[#1A1A1A]">Before &amp; after (optional)</h2>
        <p className="mt-1 text-[15px] text-[#1A1A1A]/65">
          Add a pair of photos to show a transformation on the full gallery page. Leave this empty if it doesn&apos;t apply.
        </p>

        <div className="mt-5 space-y-6">
          {beforeAfter.map((pair, i) => (
            <div key={i} className="rounded-xl border border-black/10 p-4">
              <div className="mb-3 flex items-center justify-between gap-3">
                <input
                  value={pair.label}
                  onChange={(e) => updateBeforeAfter(i, { label: e.target.value })}
                  placeholder="Label, e.g. Living Room"
                  className={`${inputCls} max-w-[280px]`}
                />
                <button
                  type="button"
                  onClick={() => removeBeforeAfterPair(i)}
                  className="shrink-0 rounded-full px-3 py-1.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                >
                  Remove pair
                </button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="mb-1.5 text-sm font-semibold text-[#1A1A1A]/70">Before</p>
                  <ImageSlot
                    url={pair.before_image_url}
                    alt={pair.before_alt}
                    placeholder="Add before photo"
                    uploading={baUploading[i] === "before"}
                    onPick={(file) => handleBeforeAfterUpload(i, "before", file)}
                    onRemove={() => updateBeforeAfter(i, { before_image_url: "" })}
                    onAltChange={(v) => updateBeforeAfter(i, { before_alt: v })}
                  />
                </div>
                <div>
                  <p className="mb-1.5 text-sm font-semibold text-[#1A1A1A]/70">After</p>
                  <ImageSlot
                    url={pair.after_image_url}
                    alt={pair.after_alt}
                    placeholder="Add after photo"
                    uploading={baUploading[i] === "after"}
                    onPick={(file) => handleBeforeAfterUpload(i, "after", file)}
                    onRemove={() => updateBeforeAfter(i, { after_image_url: "" })}
                    onAltChange={(v) => updateBeforeAfter(i, { after_alt: v })}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addBeforeAfterPair}
          className="mt-4 inline-flex items-center gap-2 rounded-full border border-black/15 px-4 py-2 text-sm font-semibold text-[#1A1A1A] transition hover:bg-black/5"
        >
          + Add before &amp; after pair
        </button>
      </div>

      {/* Sticky action bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-black/10 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-[860px] items-center justify-between gap-3 px-4 py-3">
          <span className="hidden text-sm text-[#1A1A1A]/60 sm:block">
            {project?.status === "published" ? "This project is live." : "Not published yet."}
          </span>
          <div className="ml-auto flex gap-3">
            <button
              type="submit"
              name="intent"
              value="draft"
              disabled={busy}
              className="rounded-full border border-black/20 px-5 py-2.5 text-sm font-semibold text-[#1A1A1A] transition hover:bg-black/5 disabled:opacity-50"
            >
              {project?.status === "published" ? "Switch to draft" : "Save draft"}
            </button>
            <button
              type="submit"
              name="intent"
              value="publish"
              disabled={busy}
              className="rounded-full bg-[#F89A0B] px-6 py-2.5 text-sm font-bold text-[#1A1A1A] transition hover:bg-[#E38A05] disabled:opacity-50"
            >
              {pending ? "Saving…" : project?.status === "published" ? "Update project" : "Publish"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
