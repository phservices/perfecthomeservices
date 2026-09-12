import Image from "next/image";

export default function AcademyGallery() {
  return (
    <section className="bg-[#FDF8F3]">
      <div className="py-[48px] sm:py-[64px] lg:py-[80px]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-[#1A1A1A] text-[20px] sm:text-[24px] lg:text-[28px] leading-[130%] font-bold font-sans mb-[10px] sm:mb-[12px]">
            Student Gallery
          </h2>

          <p className="mx-auto max-w-[440px] text-center text-[13px] sm:text-[14px] lg:text-[15px] font-inter font-normal leading-[150%] text-[#1A1A1ACC] mb-[28px] sm:mb-[36px]">
            View highlights from our training sessions, practical classes,
            graduation ceremonies, and site visits.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[10px] sm:gap-[12px]">
            {gallery.map((item) => (
              <div
                key={item.id}
                className="relative h-[280px] sm:h-[340px] lg:h-[399px] w-full overflow-hidden rounded-[8px] bg-[#EFE7DE]"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-top"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const gallery = [
  {
    id: 1,
    src: "/images/our-story.jpg",
    alt: "Two students working together during a classroom session",
  },
  {
    id: 2,
    src: "/images/our-story-2.jpg",
    alt: "Student working on a design project on a laptop",
  },
  {
    id: 3,
    src: "/images/our-story-3.jpg",
    alt: "Students in safety vests during a site visit",
  },
  {
    id: 4,
    src: "/images/our-story-4.jpg",
    alt: "Instructor presenting at a whiteboard during a training session",
  },
  {
    id: 5,
    src: "/images/our-story-5.jpg",
    alt: "Students taking notes during a practical class",
  },
  {
    id: 6,
    src: "/images/our-story-6.jpg",
    alt: "Students touring a lighting showroom on a site visit",
  },
];
