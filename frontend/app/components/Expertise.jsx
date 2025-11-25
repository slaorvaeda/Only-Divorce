const expertise = [
  {
    title: "Slip & Fall Injuries",
    description: "Support for accidents in apartments, malls, and public spaces.",
    image: "https://images.unsplash.com/photo-1504439468489-c8920d796a29?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Medical Negligence",
    description: "Holding hospitals and clinics accountable across Indian cities.",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Road & Highway Accidents",
    description: "Fighting for fair settlements after car, bike, or truck collisions.",
    image: "https://images.unsplash.com/photo-1517949908114-720226b864c1?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Catastrophic Injuries",
    description: "Long-term care plans for spinal or brain injuries.",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Workplace Mishaps",
    description: "Protecting factory workers, delivery partners, and office staff.",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "20+ More Areas",
    description: "Defamation, cyber harassment, consumer protection, and more.",
    image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=600&q=80",
  },
];

export default function Expertise() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-6xl px-4 lg:px-0">
        <div className="mb-10 space-y-4 text-center" data-aos="fade-up">
          <h2 className="text-4xl font-semibold text-slate-900">
            Our Expertise in Personal Injury Cases
          </h2>
          <p className="text-lg text-slate-600">
            From metro cities to tier-2 towns, our advocates specialize in personal injury cases,
            insurance appeals, and complex litigation across India.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {expertise.map((item, idx) => (
            <div
              key={item.title}
              data-aos="fade-up"
              data-aos-delay={idx * 100}
              className="flex items-center gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="h-16 w-16 overflow-hidden rounded-2xl bg-slate-100">
                <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
              </div>
              <div>
                <p className="text-lg font-semibold text-slate-900">{item.title}</p>
                <p className="text-sm text-slate-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

