const testimonials = [
  {
    name: "Rahul K.",
    case: "Highway collision",
    quote:
      "EliteGuard India took care of the FIR, hospital paperwork, and insurance negotiations while my family focused on recovery.",
    amount: "₹32,00,000",
    date: "Dec 2023",
  },
  {
    name: "Meera S.",
    case: "Workplace injury",
    quote:
      "Their team coordinated with my employer and ESIC officials, ensuring I received every rupee of my entitled compensation.",
    amount: "₹48,50,000",
    date: "Sep 2023",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-6xl px-4 lg:px-0">
        <div className="mb-10 text-center" data-aos="fade-up">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-lime-600">Results</p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900">Client Success Stories</h2>
          <p className="mt-4 text-lg text-slate-600">
            Proof-of-record delivering standout experiences, real restitution, and success stories
            we&apos;re proud to share.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((item, idx) => (
            <div
              key={item.name}
              data-aos="fade-up"
              data-aos-delay={idx * 100}
              className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <p className="text-slate-700">{item.quote}</p>
              <div className="flex items-center justify-between border-t border-slate-100 pt-4 text-sm text-slate-600">
                <div>
                  <p className="font-semibold text-slate-900">{item.name}</p>
                  <p>{item.case}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-slate-900">{item.amount}</p>
                  <p>{item.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

