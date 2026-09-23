"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";

export default function BeforeAfterSlider({
  label,
  beforeSrc,
  beforeAlt,
  afterSrc,
  afterAlt,
}: {
  label?: string;
  beforeSrc: string;
  beforeAlt: string;
  afterSrc: string;
  afterAlt: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const [percent, setPercent] = useState(50);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPercent(Math.min(100, Math.max(0, pct)));
  }, []);

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    draggingRef.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    updateFromClientX(e.clientX);
  }
  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!draggingRef.current) return;
    updateFromClientX(e.clientX);
  }
  function onPointerUp() {
    draggingRef.current = false;
  }
  function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "ArrowLeft") setPercent((p) => Math.max(0, p - 5));
    if (e.key === "ArrowRight") setPercent((p) => Math.min(100, p + 5));
  }

  return (
    <div>
      {label && <p className="mb-3 text-[15px] font-semibold text-[#1A1A1A]">{label}</p>}
      <div
        ref={containerRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        onKeyDown={onKeyDown}
        role="slider"
        tabIndex={0}
        aria-label={label ? `${label} before and after` : "Before and after"}
        aria-valuenow={Math.round(percent)}
        aria-valuemin={0}
        aria-valuemax={100}
        className="relative aspect-[4/3] w-full touch-none select-none overflow-hidden rounded-xl bg-[#EFE7DE] outline-none focus-visible:ring-2 focus-visible:ring-[#F89A0B] sm:aspect-[16/10]"
      >
        {/* After photo sits underneath, full size */}
        <Image
          src={afterSrc}
          alt={afterAlt || "After"}
          fill
          sizes="(max-width: 768px) 100vw, 900px"
          className="pointer-events-none object-cover"
        />

        {/* Before photo, clipped to reveal only the left `percent` of the frame */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - percent}% 0 0)` }}
        >
          <Image
            src={beforeSrc}
            alt={beforeAlt || "Before"}
            fill
            sizes="(max-width: 768px) 100vw, 900px"
            className="object-cover"
          />
        </div>

        {/* Divider + drag handle */}
        <div className="pointer-events-none absolute inset-y-0" style={{ left: `${percent}%` }}>
          <div className="h-full w-[2px] -translate-x-1/2 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.15)]" />
          <div className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#1A1A1A] shadow-lg">
            ↔
          </div>
        </div>

        <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
          Before
        </span>
        <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-black/60 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
          After
        </span>
      </div>
    </div>
  );
}
