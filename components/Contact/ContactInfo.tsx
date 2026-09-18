"use client";

import { Mail, MapPin, Phone } from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Our Office",
    detail: "Block A2 Suite B4 Foretold Plaza, Beside New Kenyetta Market, Enugu",
  },
  {
    icon: Phone,
    title: "Call Us",
    detail: "+234 8063744335",
  },
  {
    icon: Mail,
    title: "Email Us",
    detail: "perfecthomeservices2017@gmail.com",
  },
];

export default function ContactInfo() {
  return (
    <section>
      <div className="container mx-auto px-5 sm:px-6 md:px-8">
        <div className="py-12 sm:py-16 md:py-[50px] lg:py-[75px]">
          {/* Small Heading */}
          <h3
            className="
              mb-2
              text-center
              font-sans
              text-[16px]
              font-semibold
              leading-[110%]
              text-[#000000B8]
              sm:text-[18px]
              md:text-[20px]
              lg:text-[24px]
            "
          >
            Contact Info
          </h3>

          {/* Main Heading */}
          <h1
            className="
              mx-auto
              mb-10
              max-w-[700px]
              text-center
              font-sans
              text-[24px]
              font-bold
              leading-[115%]
              text-[#1A1A1A]
              sm:text-[28px]
              md:mb-[43px]
              md:text-[32px]
            "
          >
            We are always happy to assist you
          </h1>

          {/* Info Cards */}
          <div
            className="
              grid
              grid-cols-1
              gap-4
              sm:grid-cols-2
              lg:grid-cols-3
            "
          >
            {contactInfo.map(({ icon: Icon, title, detail }) => (
              <div
                key={title}
                className="
                  flex
                  w-full
                  flex-col
                  items-center
                  rounded-[8px]
                  border
                  border-[#F89A0B]
                  bg-[#F89A0B14]
                  px-4
                  py-7
                  text-center
                  sm:px-5
                  sm:py-8
                "
              >
                {/* Icon */}
                <div
                  className="
                    mb-4
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-full
                    bg-[#F89A0B]
                    sm:h-12
                    sm:w-12
                  "
                >
                  <Icon size={20} className="text-white" />
                </div>

                {/* Title */}
                <h3
                  className="
                    mb-3
                    font-sans
                    text-[18px]
                    font-semibold
                    leading-[120%]
                    text-[#000000]
                    sm:text-[20px]
                  "
                >
                  {title}
                </h3>

                {/* Detail */}
                <p
                  className="
                    font-inter
                    text-[15px]
                    font-normal
                    leading-[145%]
                    text-[#1A1A1A]
                    sm:text-[16px]
                    sm:leading-[140%]
                  "
                >
                  {detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
