import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-5 text-center">
      <h1 className="font-display text-4xl font-semibold">Project not found</h1>
      <p className="mt-3 text-[#1A1A1A]/65">That project may have moved or been unpublished.</p>
      <Link href="/Services/Our-Projects" className="mt-6 rounded-full bg-[#F89A0B] whitespace-nowrap px-5 py-2.5 font-sans text-[14px] font-semibold sm:px-6 sm:py-3 sm:text-[15px]">
        Back to Our Projects
      </Link>
    </main>
  );
}
