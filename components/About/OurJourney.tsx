import SectionHeading from "../ui/SectionHeading";

// TODO: swap the milestone labels for real years once the client confirms them.
const milestones = [
  {
    label: "2017",
    title: "Where it began",
    text: "Perfect Home Services is founded in Enugu as a painting and wallpaper installation company.",
  },
  {
    label: "Growth",
    title: "Training & certification",
    text: "The team invests in professional training and industry certifications to meet growing demand for complete interior solutions.",
  },
  {
    label: "Expansion",
    title: "Full-service interior design",
    text: "PHS grows into a full-service interior design and construction finishing company, taking projects from concept to installation.",
  },
  {
    label: "Diversification",
    title: "Cleaning, fumigation & real estate",
    text: "Industrial cleaning, fumigation and real estate services are added so clients can rely on one trusted company.",
  },
  {
    label: "Academy",
    title: "Training the next generation",
    text: "The Interior Design Academy opens, training students from across Nigeria through classes, practical sessions and site visits.",
  },
  {
    label: "Today",
    title: "Serving Enugu & beyond",
    text: "PHS delivers residential, commercial and industrial projects in Enugu and across Nigeria.",
  },
];

export default function OurJourney() {
  return (
    <section className="bg-[#FBF9F6]">
      <div className="py-16 sm:py-20 md:py-24">
        <div className="container mx-auto px-5 sm:px-6 md:px-8">
          <SectionHeading eyebrow="Our Journey" title="How PHS Has Grown Since 2017" />

          <ol className="relative mx-auto mt-12 max-w-[1040px] md:mt-16">
            {/* The line: left rail on phones, centred on wider screens */}
            <span
              aria-hidden
              className="absolute bottom-2 left-[19px] top-2 w-0.5 bg-[#F89A0B]/30 md:left-1/2 md:-translate-x-1/2"
            />

            {milestones.map((m, i) => {
              const right = i % 2 === 1;
              return (
                <li
                  key={m.title}
                  className="relative mb-8 grid grid-cols-[40px_1fr] gap-4 last:mb-0 md:mb-4 md:grid-cols-[1fr_56px_1fr] md:gap-0"
                >
                  {/* Dot */}
                  <span className="relative z-10 row-start-1 flex h-10 w-10 items-center justify-center self-start rounded-full bg-[#F89A0B] font-sans text-[14px] font-bold text-[#1A1A1A] ring-4 ring-[#FBF9F6] md:col-start-2 md:mx-auto md:mt-5">
                    {i + 1}
                  </span>

                  {/* Card: always right of the rail on phones, alternating from md up */}
                  <div
                    className={`row-start-1 rounded-2xl bg-white p-5 shadow-[0_16px_36px_-24px_rgba(26,26,26,0.35)] ring-1 ring-black/5 sm:p-6 ${
                      right ? "md:col-start-3 md:ml-4" : "md:col-start-1 md:mr-4 md:text-right"
                    }`}
                  >
                    <span className="inline-block rounded-full bg-[#F89A0B]/15 px-3 py-1 font-sans text-[12px] font-bold uppercase tracking-[0.12em] text-[#6F4322]">
                      {m.label}
                    </span>
                    <h3 className="mt-3 font-display text-[20px] font-semibold leading-[125%] text-[#1A1A1A] sm:text-[22px]">
                      {m.title}
                    </h3>
                    <p className="mt-2 font-sans text-[15px] leading-[160%] text-[#1A1A1A]/70 sm:text-[16px]">
                      {m.text}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
