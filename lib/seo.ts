import type { Metadata } from "next";
import { DEFAULT_OG_IMAGE, SITE_NAME } from "@/lib/site";

type PageSeo = {
  title: string;
  description: string;
  path: string;
  image?: string;
  keywords?: string[];
};

/** One place to build complete metadata (title, canonical, Open Graph, Twitter) for a page. */
export function pageMetadata({ title, description, path, image, keywords }: PageSeo): Metadata {
  const img = image ?? DEFAULT_OG_IMAGE;
  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: "en_NG",
      type: "website",
      images: [{ url: img, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [img],
    },
  };
}

/** Safe <script type="application/ld+json"> payload. */
export function jsonLdString(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
