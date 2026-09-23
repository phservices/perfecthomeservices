export type Project = {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  cover_image_url: string | null;
  cover_image_alt: string;
  status: "draft" | "published";
  sort_order: number;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export type ProjectGalleryImage = {
  id: string;
  project_id: string;
  image_url: string;
  image_alt: string;
  sort_order: number;
};

export type ProjectBeforeAfter = {
  id: string;
  project_id: string;
  label: string;
  before_image_url: string;
  before_alt: string;
  after_image_url: string;
  after_alt: string;
  sort_order: number;
};

export type ProjectWithMedia = Project & {
  gallery: ProjectGalleryImage[];
  beforeAfter: ProjectBeforeAfter[];
};

export const ALL_CATEGORY = "All";

export { slugify } from "@/lib/slug";
