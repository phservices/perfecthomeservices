"use client";

type ChooseBoxProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

export default function ChooseBox({
  title,
  description,
  icon,
}: ChooseBoxProps) {
  return (
    <div
      className="
        w-full
        max-w-full
        h-[152px]
        md:max-w-[177px]
        md:h-[152px]
        lg:max-w-[307px]
        lg:h-[257px]

        border-[0.59px]
        border-[#F89A0B]

        bg-[#F89A0B29]

        px-[10px]
        py-[45px]

        md:px-[9px]
        md:py-[9px]

        lg:px-[16px]
        lg:pt-[41px] lg:mb-[24px]

        flex
        flex-col
        gap-[10px]
        rounded-[8px]
      "
    >
      {/* Icon */}
      <div className="w-6 h-6 md:w-[28.32px] md:h-[28.32px] text-black">
        {icon}
      </div>

      {/* Content */}
      <div className="space-y-2">
        <h2 className="text-[20px] md:text-[16px] lg:text-[20px] font-semibold leading-[100%] text-[#000000] font-sans">
          {title}
        </h2>

        <p className="text-[12px] leading-[120%] md:text-[9px] lg:text-[16px]  text-[#1A1A1A] font-inter">
          {description}
        </p>
      </div>
    </div>
  );
}