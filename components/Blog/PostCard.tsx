import Image from "next/image";
import Link from "next/link";
import { formatDate, readingTime, type Post } from "@/lib/blog";

export default function PostCard({ post }: { post: Post }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-lg">
      <Link href={`/blog/${post.slug}`} className="flex h-full flex-col">
        <div className="relative aspect-[16/10] overflow-hidden bg-[#1A1A1A]/5">
          {post.cover_image_url && (
            <Image
              src={post.cover_image_url}
              alt={post.cover_image_alt || post.title}
              fill
              sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
          )}
        </div>
        <div className="flex flex-1 flex-col p-6">
          <span className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[#F89A0B]">
            {post.category}
          </span>
          <h2 className="mt-2 font-display text-[22px] font-semibold leading-[125%] text-[#1A1A1A]">
            {post.title}
          </h2>
          {post.excerpt && (
            <p className="mt-3 line-clamp-3 text-[15px] leading-[155%] text-[#1A1A1A]/70">
              {post.excerpt}
            </p>
          )}
          <p className="mt-auto pt-5 text-[13px] text-[#1A1A1A]/55">
            {formatDate(post.published_at)} · {readingTime(post.content)} min read
          </p>
        </div>
      </Link>
    </article>
  );
}
