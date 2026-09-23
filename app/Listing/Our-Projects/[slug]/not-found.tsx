import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-5 text-center">
      <h1 className="font-display text-4xl font-semibold">Project not found</h1>
      <p className="mt-3 text-[#1A1A1A]/65">That project may have moved or been unpublished.</p>
      <Link href="/Listing/Our-Projects" className="mt-6 rounded-full bg-[#F89A0B] px-6 py-3 font-semibold">
        Back to Our Projects
      </Link>
    </main>
  );
}
