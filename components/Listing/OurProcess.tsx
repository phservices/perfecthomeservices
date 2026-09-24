import SectionHeading from "../ui/SectionHeading";

const steps = [
  "Consultation",
  "Site Inspection",
  "Brief & Measurements",
  "Concept Development",
  "3D Design",
  "Costing/Quotation",
  "Client Approval",
  "Execution",
  "Installation",
  "Handover",
];

export default function OurProcess() {
  return (
    <section className="bg-white">
      <div className="py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="How We Work" title="Our Process" />

          <ol className="mx-auto mt-10 grid max-w-7xl grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 md:mt-14 lg:grid-cols-4 xl:grid-cols-5">
            {steps.map((step, index) => (
              <li
                key={step}
                className="flex min-h-[80px] items-center gap-3 rounded-2xl border border-[#F89A0B]/30 bg-[#FDF7EF] p-4 sm:p-5"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F89A0B] font-sans text-sm font-bold text-[#1A1A1A] sm:h-11 sm:w-11 sm:text-base">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="font-sans text-sm font-semibold leading-[125%] text-[#1A1A1A] sm:text-base">
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
