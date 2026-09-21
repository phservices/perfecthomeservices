"use client";

import Image from "next/image";

export default function ListingStory() {
  const images = [
    "/images/Listing-4.jpg",
    "/images/Listing-5.jpg",
    "/images/Listing-6.jpg",
  ];

  return (
    <section>
      <div className="py-[84px]">
        <div className="container mx-auto px-4">
          {/* Heading */}
          <h2 className="mb-[16px] text-center font-sans text-[24px] font-semibold leading-[100%] text-[#000000B8]">
            Our Story
          </h2>

          <p className="mb-[40px] text-center font-sans text-[32px] font-semibold leading-[100%] text-[#000000]">
            Complete Property Solutions Under One Roof
          </p>

          {/* Content */}
          <div className="flex flex-col items-center gap-[32px] lg:flex-row lg:items-center lg:gap-[40px]">
            {/* Text */}
            <div className="w-full lg:max-w-[415px] lg:shrink-0">
              <p className="font-inter text-[18px] font-normal leading-[120%] text-[#1A1A1A] sm:text-[20px]">
                From transforming interiors to managing properties, our services
                are designed to help you create, maintain, and improve every
                aspect of your space. We combine creativity, technical
                expertise, and attention to detail to deliver results that meet
                your expectations.
              </p>
            </div>

            {/* Scrollable Images */}
            <div className="w-full min-w-0 overflow-hidden ">
              <div className="flex flex-nowrap gap-4 overflow-x-auto pb-4 scrollbar-hide">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className="relative h-[399px] w-[85vw] max-w-[419px] shrink-0 overflow-hidden rounded-[16px] sm:w-[419px]"
                  >
                    <Image
                      src={image}
                      fill
                      alt={`Listing image ${index + 1}`}
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

