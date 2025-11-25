const offices = [
  {
    city: "New York Office",
    address: "230 W 35th Street\n5th Floor, New York City",
  },
  {
    city: "New Jersey Office",
    address: "80 Park Place\nSuite 200, Newark",
  },
];

export default function Locations() {
  return (
    <section className="bg-[#e9edff] py-12">
      <div className="mx-auto max-w-6xl rounded-3xl bg-white px-8 py-10 text-center shadow-sm">
        <div data-aos="fade-up">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-lime-600">
            Our headquarters
          </p>
          <h3 className="mt-3 text-2xl font-semibold text-slate-900">Our headquarter locations</h3>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {offices.map((office, idx) => (
            <div key={office.city} data-aos="fade-up" data-aos-delay={idx * 100} className="rounded-3xl border border-slate-200 bg-[#f6f8ff] p-6">
              <p className="text-lg font-semibold text-slate-900">{office.city}</p>
              <p className="mt-2 text-slate-600 whitespace-pre-line">{office.address}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

