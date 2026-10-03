import type { Metadata } from "next";
import Header from "@/components/Header";
import PostCard from "@/components/Blog/PostCard";
import { getPublishedPosts } from "@/lib/blog-queries";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const revalidate = 300;

const title = "Blog: Interior Design, Real Estate & Cleaning Tips";
const description =
  "Expert advice, ideas and guides on interior design, real estate and professional cleaning from the Prefect Homes team.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: { title, description, url: `${SITE_URL}/blog`, siteName: SITE_NAME, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${SITE_NAME} Blog`,
    url: `${SITE_URL}/blog`,
    description,
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: `${SITE_URL}/blog/${p.slug}`,
      datePublished: p.published_at,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <section className="bg-blog pt-5 sm:pt-7 md:pt-10 lg:pt-[50px]">
        <Header />
        <div className="container mx-auto px-5 sm:px-6 md:px-8">
          <div className="flex flex-col items-center py-16 text-center sm:py-20 lg:pb-[86px] lg:pt-[72px]">
            <h1 className="mb-4 max-w-[881px] text-[28px] font-bold leading-[105%] text-white sm:text-[32px] md:text-[40px] lg:text-[48px]">
              The Prefect Homes Blog
            </h1>
            <p className="max-w-[720px] font-inter text-[16px] leading-[150%] text-white/85 sm:text-[18px]">
              Ideas, guides and expert advice on interior design, real estate and professional cleaning.
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-5 py-14 sm:px-6 md:px-8 lg:py-20">
        {posts.length === 0 ? (
          <p className="py-16 text-center text-lg text-[#1A1A1A]/60">
            New articles are coming soon. Check back shortly!
          </p>
        ) : (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>

    </>
  );
}
