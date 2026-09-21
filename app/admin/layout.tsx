import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog Admin | Prefect Homes",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-[#FBF9F6]">{children}</div>;
}
