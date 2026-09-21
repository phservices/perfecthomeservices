"use client";

import Image from "next/image";

type Service = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  cta: string;
  href: string;
  image: string;
  imageAlt: string;
};

const services: Service[] = [
  {
    id: "interior-exterior-design",
    title: "Interior & Exterior Design",
    description:
      "We create functional and visually appealing spaces through thoughtful planning, quality finishing, and professional design solutions. Our team manages projects from concept development to final installation.",
    tags: [
      "Interior Design",
      "Space Planning",
      "3D Visualisation",
      "Home Renovation",
      "Construction Finishing",
      "Furniture Installation",
      "Lighting Design",
      "Painting & Wallpaper Installation",
      "Interior & Exterior Finishing",
    ],
    cta: "Explore Interior Design Services",
    href: "/Listing/interior-design",
    image: "/images/Listing-7.jpg",
    imageAlt: "Team installing a decorative interior ceiling feature",
  },
  {
    id: "industrial-cleaning",
    title: "Industrial Cleaning & Fumigation",
    description:
      "Our cleaning and fumigation services help maintain clean, healthy, and safe environments for homes, offices, commercial buildings, and industrial facilities.",
    tags: [
      "Post-Construction Cleaning",
      "Deep Cleaning",
      "Residential Cleaning",
      "Commercial Cleaning",
      "Industrial Cleaning",
      "Fumigation",
      "Pest Control",
      "Sofa Cleaning",
      "Rug & Carpet Cleaning",
    ],
    cta: "Book a Cleaning Service or Learn more",
    href: "/Listing/cleaning",
    image: "/images/industrial-cleaning.jpg",
    imageAlt: "Technician fumigating a wall surface in protective gear",
  },
  {
    id: "real-estate",
    title: "Real Estate Services in Enugu",
    description:
      "We help clients buy, sell, lease, and manage residential and commercial properties with professional guidance and reliable support.",
    tags: [
      "Property Sales",
      "Property Purchase",
      "Property Management",
      "Tenant Sourcing",
      "Property Leasing",
      "Property Advisory",
    ],
    cta: "Explore Real Estate Services",
    href: "/Listing/real-estate",
    image: "/images/real-estate.jpg",
    imageAlt: "Modern residential apartment block in Enugu",
  },
];

type ServiceBlockProps = {
  service: Service;
  flipped?: boolean;
};

function ServiceBlock({ service, flipped = false }: ServiceBlockProps) {
  return (
    <div className="grid items-center gap-8 md:grid-cols-2 md:gap-10 lg:gap-16">
      <div className={flipped ? "md:order-2" : "md:order-1"}>
        <h2 className="text-2xl font-bold tracking-tight text-[#0B1B33] sm:text-[28px] lg:text-[32px]">
          {service.title}
        </h2>

        <p className="mt-3 max-w-[52ch] text-[16px] leading-[150%] text-[#1A1A1A] sm:text-[20px]">
          {service.description}
        </p>

        {/* <ul className="mt-6 flex flex-wrap gap-2">
          {service.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-[#F89A0B] bg-[#F89A0B14] p-[16px] text-[14px] font-semibold text-[#000000] sm:text-[14px]"
            >
              {tag}
            </li>
          ))}
        </ul> */}

        <a
          href={service.href}
          className="mt-7 inline-flex items-center rounded-full bg-[#F89A0B] px-6 py-3 text-[16px] font-extrabold leading-none tracking-tight text-[#1A1A1A] shadow-sm transition-all duration-200 hover:bg-[#EE8B22] hover:text-white hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EE8B22] sm:px-7 sm:py-3.5 sm:text-[17px]"
        >
          {service.cta}
        </a>
      </div>

      <div className={flipped ? "md:order-1" : "md:order-2"}>
        <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate-200 sm:aspect-[16/11]">
          <Image
            src={service.image}
            alt={service.imageAlt}
            loading="lazy"
            className="h-full w-full object-cover"
            width={500}
            height={500}
          />
        </div>
      </div>
    </div>
  );
}

type InteriorProps = {
  items?: Service[];
};

export default function Interior({ items = services }: InteriorProps) {
  return (
    <section className="bg-[#FDF7EF]">
      <div className="mx-auto max-w-[1180px] px-5 py-14 sm:px-8 sm:py-[84px]">
        <div className="space-y-16 sm:space-y-24">
          {items.map((service, index) => (
            <ServiceBlock
              key={service.id}
              service={service}
              flipped={index % 2 === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export type { Service, ServiceBlockProps, InteriorProps };
