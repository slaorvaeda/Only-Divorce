const highlights = [
  { label: "₹3.5 Cr+", description: "Compensation secured in 2023" },
  { label: "230+ five-stars", description: "Clients who rated our service" },
  { label: "100+ years", description: "Combined legal experience" },
];

export default function AboutSection() {
  return (
    <section className="bg-[#e9edff] py-16">
      <div className="mx-auto grid max-w-6xl gap-8 rounded-3xl bg-white/70 px-8 py-10 shadow-sm sm:grid-cols-[1fr_1.2fr]">
        <div className="space-y-4" data-aos="fade-right">
          <p className="text-sm font-semibold uppercase tracking-widest text-lime-600">About us</p>
          <h2 className="text-3xl font-semibold text-slate-900">
            Learn about our dedication to helping personal injury victims.
          </h2>
          <p className="text-lg text-slate-600">
            Our experienced team is committed to seeking justice and holding the responsible parties
            accountable.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {highlights.map((item, idx) => (
            <div key={item.label} data-aos="fade-left" data-aos-delay={idx * 100} className="rounded-2xl bg-[#f6f8ff] p-6 text-center shadow-inner">
              <p className="text-2xl font-semibold text-slate-900">{item.label}</p>
              <p className="mt-2 text-sm text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

