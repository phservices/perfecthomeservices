type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  tone?: "dark" | "light";
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "dark",
  className = "",
}: SectionHeadingProps) {
  const isCenter = align === "center";
  const isLight = tone === "light";

  return (
    <div
      className={`${isCenter ? "mx-auto text-center" : "text-start"} max-w-[720px] ${
        isCenter ? "" : "mx-0"
      } ${className}`}
    >
      <span
        className={`mb-3 inline-flex items-center gap-2 font-sans text-[13px] font-semibold uppercase tracking-[0.14em] sm:text-[14px] ${
          isLight ? "text-[#F89A0B]" : "text-[#F89A0B]"
        } ${isCenter ? "justify-center" : ""}`}
      >
        <span className="h-[6px] w-[6px] rounded-full bg-[#F89A0B]" />
        {eyebrow}
      </span>

      <h2
        className={`font-display text-[28px] font-semibold leading-[118%] tracking-[-0.01em] sm:text-[34px] md:text-[40px] lg:text-[46px] ${
          isLight ? "text-white" : "text-[#1A1A1A]"
        }`}
      >
        {title}
      </h2>

      {description && (
        <p
          className={`mt-4 font-sans text-[16px] font-normal leading-[155%] sm:text-[17px] lg:text-[18px] ${
            isLight ? "text-white/75" : "text-[#1A1A1A]/70"
          } ${isCenter ? "mx-auto" : ""}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
