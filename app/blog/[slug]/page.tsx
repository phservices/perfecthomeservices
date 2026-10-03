import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import PostCard from "@/components/Blog/PostCard";
import { formatDate, readingTime, stripHtml } from "@/lib/blog";
import { getPublishedPost, getPublishedPosts } from "@/lib/blog-queries";
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from "@/lib/site";

export const revalidate = 300;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

function describe(post: { seo_description: string; excerpt: string; content: string }) {
  return (
    post.seo_description ||
    post.excerpt ||
    stripHtml(post.content).slice(0, 155).trim()
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPost(slug);
  if (!post) return { title: "Post not found", robots: { index: false } };

  const title = post.seo_title || post.title;
  const description = describe(post);
  const url = `${SITE_URL}/blog/${post.slug}`;
  const image = post.cover_image_url || `${SITE_URL}${DEFAULT_OG_IMAGE}`;

  return {
    title: { absolute: `${title} | ${SITE_NAME}` },
    description,
    alternates: { canonical: url },
    authors: [{ name: post.author }],
    openGraph: {
      type: "article",
      title,
      description,
      url,
      siteName: SITE_NAME,
      publishedTime: post.published_at ?? undefined,
      modifiedTime: post.updated_at,
      authors: [post.author],
      section: post.category,
      images: [{ url: image, alt: post.cover_image_alt || post.title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

const SERVICE_LINKS: Record<string, { label: string; href: string }> = {
  "Interior Design": {
    label: "Explore our interior design services in Enugu",
    href: "/Services/interior-design-enugu",
  },
  "Cleaning": {
    label: "View our cleaning and fumigation services",
    href: "/Services/cleaning-fumigation-pest-control-enugu",
  },
  "Fumigation": {
    label: "View our cleaning and fumigation services",
    href: "/Services/cleaning-fumigation-pest-control-enugu",
  },
  "Pest Control": {
    label: "View our cleaning and fumigation services",
    href: "/Services/cleaning-fumigation-pest-control-enugu",
  },
  "Real Estate": {
    label: "Explore our real estate services in Enugu",
    href: "/Services/real-estate-enugu",
  },
  "Academy": {
    label: "Learn about our Interior Design Academy in Enugu",
    href: "/Interior-design-academy-enugu",
  },
};

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPublishedPost(slug);
  if (!post) notFound();

  const related = (await getPublishedPosts()).filter((p) => p.id !== post.id).slice(0, 3);
  const url = `${SITE_URL}/blog/${post.slug}`;
  const serviceLink = post.category ? SERVICE_LINKS[post.category] : undefined;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: describe(post),
      image: post.cover_image_url ? [post.cover_image_url] : undefined,
      datePublished: post.published_at,
      dateModified: post.updated_at,
      author: { "@type": "Organization", name: post.author },
      publisher: {
        "@type": "Organization",
        name: SITE_NAME,
        logo: { "@type": "ImageObject", url: `${SITE_URL}/images/logo.png` },
      },
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
        { "@type": "ListItem", position: 3, name: post.title, item: url },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <div className="bg-[#151515] pb-5 pt-1">
        <Header />
      </div>

      <article className="mx-auto max-w-[780px] px-5 pb-16 pt-12 sm:px-6 lg:pt-16">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-[#1A1A1A]/55">
          <Link href="/blog" className="hover:text-[#F89A0B]">Blog</Link>
          <span className="mx-2">/</span>
          <span>{post.category}</span>
        </nav>

        <h1 className="font-display text-[32px] font-semibold leading-[115%] text-[#1A1A1A] sm:text-[42px] lg:text-[50px]">
          {post.title}
        </h1>
        <p className="mt-5 text-[15px] text-[#1A1A1A]/60">
          By {post.author} · <time dateTime={post.published_at ?? undefined}>{formatDate(post.published_at)}</time> · {readingTime(post.content)} min read
        </p>

        {post.cover_image_url && (
          <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl">
            <Image
              src={post.cover_image_url}
              alt={post.cover_image_alt || post.title}
              fill
              priority
              sizes="(min-width: 800px) 780px, 100vw"
              className="object-cover"
            />
          </div>
        )}

        <div className="blog-content mt-10" dangerouslySetInnerHTML={{ __html: post.content }} />

        <div className="mt-14 rounded-2xl bg-[#151515] p-8 text-center">
          <p className="font-display text-2xl font-semibold text-white">Ready to get started?</p>
          <p className="mx-auto mt-2 max-w-[460px] text-white/70">
            Talk to the Perfect Home Services team about your interior design, cleaning or real estate needs.
          </p>
          <Link
            href="/Contact"
            className="mt-6 inline-block rounded-full bg-[#F89A0B] whitespace-nowrap px-5 py-2.5 font-sans text-[14px] font-semibold sm:px-6 sm:py-3 sm:text-[15px] text-[#1A1A1A] transition hover:bg-white"
          >
            Book a Consultation
          </Link>
          {serviceLink && (
            <p className="mt-4">
              <Link
                href={serviceLink.href}
                className="font-sans text-[13px] text-white/55 underline underline-offset-2 hover:text-white/90 transition-colors"
              >
                {serviceLink.label}
              </Link>
            </p>
          )}
        </div>
      </article>

      {related.length > 0 && (
        <section className="container mx-auto px-5 pb-20 sm:px-6 md:px-8">
          <h2 className="mb-8 font-display text-3xl font-semibold text-[#1A1A1A]">Keep reading</h2>
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        </section>
      )}

    </>
  );
}
