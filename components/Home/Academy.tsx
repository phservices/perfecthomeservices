"use client";

import { useEffect, useRef, useState } from "react";
import Button from "../ui/Button";
import { Play } from "lucide-react";
import Link from "next/link";
import SectionHeading from "../ui/SectionHeading";

const ACADEMY_VIDEO_URL =
  "https://res.cloudinary.com/dqqeeocay/video/upload/f_auto,q_auto/v1789525590/document_5859328757550031075_ghqzxp.mp4";

export default function Academy() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
    videoRef.current?.play();
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting && !video.paused) {
          video.pause();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-white">
      <div className="container mx-auto px-5 sm:px-6 md:px-8">
        <div className="py-16 sm:py-20 md:py-24 lg:py-28">
          <SectionHeading
            eyebrow="Interior Design Academy"
            title="Start Your Career in Interior Design"
            className="mb-10 md:mb-12"
          />

          {/* Academy Video */}
          <div className="relative mb-8 h-[260px] w-full overflow-hidden rounded-[20px] shadow-[0_28px_56px_-28px_rgba(26,26,26,0.35)] sm:h-[320px] md:h-[400px] lg:h-[480px]">
            <video
              ref={videoRef}
              src={ACADEMY_VIDEO_URL}
              poster="/images/academy-1.jpg"
              controls={isPlaying}
              playsInline
              preload="metadata"
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
              className="h-full w-full object-cover"
            />

            {!isPlaying && (
              <>
                {/* Dark overlay */}
                <div className="pointer-events-none absolute inset-0 bg-black/25" />

                {/* Play Button */}
                <button
                  type="button"
                  onClick={handlePlay}
                  aria-label="Play academy video"
                  className="absolute left-1/2 top-1/2 flex h-[64px] w-[64px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg transition-transform duration-200 hover:scale-110 sm:h-[76px] sm:w-[76px]"
                >
                  <Play
                    size={28}
                    strokeWidth={2}
                    className="ml-1 fill-[#F89A0B] text-[#F89A0B] sm:h-[32px] sm:w-[32px]"
                  />
                </button>
              </>
            )}
          </div>

          <p className="mx-auto mb-8 max-w-[720px] text-center font-sans text-[16px] font-normal leading-[160%] text-[#1A1A1A]/70 sm:text-[17px] md:text-[18px]">
            Our 3-month Interior Design Academy combines classroom learning,
            practical training, and site visits to prepare aspiring interior
            designers with the skills needed to build successful careers.
            Students receive a Certificate of Completion after graduation.
          </p>

          <div className="flex items-center justify-center">
            <Link href="/Contact">
              <Button
                style="danger"
                type="button"
                text="text-[#1A1A1A]"
                css="w-full max-w-[280px] sm:w-auto sm:min-w-[200px] px-7 py-4 text-[14px] font-sans font-semibold"
              >
                Join the Academy
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
