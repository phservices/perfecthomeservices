import Image from "next/image";

export default function AcademyGallery() {
  return (
    <section className="bg-[#FDF8F3]">
      <div className="py-[48px] sm:py-[64px] lg:py-[80px]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-[#1A1A1A] text-[20px] sm:text-[24px] lg:text-[28px] leading-[130%] font-bold font-sans mb-[10px] sm:mb-[12px]">
            Student Gallery
          </h2>

          <p className="mx-auto max-w-[440px] text-center text-[16px] sm:text-[16px] lg:text-[15px] font-inter font-normal leading-[150%] text-[#1A1A1ACC] mb-[28px] sm:mb-[36px]">
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
    src: "/images/Interior-design-academy-enugu-1.jpg",
    alt: "Interior design students collaborating during a classroom training session at Prefect Home Academy Enugu",
  },
  {
    id: 2,
    src: "/images/Interior-design-academy-enugu-2.jpg",
    alt: "Interior design student creating a digital design project on a laptop at Prefect Home Academy Enugu",
  },
  {
    id: 3,
    src: "/images/Interior-design-academy-enugu-3.jpg",
    alt: "Interior design academy students in safety vests during a construction site visit in Enugu",
  },
  {
    id: 4,
    src: "/images/Interior-design-academy-enugu-4.jpg",
    alt: "Interior design instructor teaching students at a whiteboard during a professional training session in Enugu",
  },
  {
    id: 5,
    src: "/images/Interior-design-academy-enugu-5.jpg",
    alt: "Interior design students taking notes during a hands-on practical class at Prefect Home Academy Enugu",
  },
  {
    id: 6,
    src: "/images/Interior-design-academy-enugu-6.jpg",
    alt: "Interior design students exploring a lighting showroom during an industry site visit in Enugu",
  },
];
