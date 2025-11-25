export default function Assistance() {
  return (
    <section className="bg-[#f6f7fb] py-16">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-2 lg:px-0">
        <div className="space-y-5" data-aos="fade-right">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-lime-600">
            How we help
          </p>
          <h2 className="text-3xl font-semibold text-slate-900">
            How Our Legal Team Can Assist You
          </h2>
          <p className="text-lg text-slate-600">
            Learn about our personalised approach for every Indian case. We coordinate FIR filings,
            liaise with insurers and hospitals, and represent you across District Courts, High
            Courts, and consumer forums—all while keeping communication in the language you prefer.
          </p>
          <button className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-black">
            Schedule now
          </button>
        </div>
        <div className="flex items-center justify-center" data-aos="fade-left">
          <img
            src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=900&q=80"
            alt="Indian legal consultation"
            className="h-64 w-full max-w-md rounded-3xl object-cover shadow-lg md:h-80"
          />
        </div>
      </div>
    </section>
  );
}

