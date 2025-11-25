export default function ConsultationForm() {
  return (
    <section className="bg-[#f6f7fb] py-16">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-2 lg:px-0">
        <div className="space-y-4" data-aos="fade-right">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-lime-600">
            Schedule a free consultation
          </p>
          <h2 className="text-3xl font-semibold text-slate-900">
            Share a few details, we&apos;ll reply within 24 hours.
          </h2>
          <ul className="space-y-2 text-slate-700">
            <li>📧 support@eliteguard.com</li>
            <li>📞 +1 (929) 420-9010</li>
            <li>📍 230 W 35th Street, New York, NY</li>
          </ul>
        </div>
        <form className="space-y-4 rounded-3xl bg-white p-6 shadow-lg" data-aos="fade-left">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-600">First name</label>
              <input
                type="text"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-slate-900 focus:outline-none"
                placeholder="Jane"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-600">Last name</label>
              <input
                type="text"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-slate-900 focus:outline-none"
                placeholder="Cooper"
              />
            </div>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600">Email address</label>
            <input
              type="email"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-slate-900 focus:outline-none"
              placeholder="you@email.com"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600">Phone number</label>
            <input
              type="tel"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-slate-900 focus:outline-none"
              placeholder="(000) 000-0000"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600">Message</label>
            <textarea
              className="h-32 w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-slate-900 focus:outline-none"
              placeholder="Share details about your case"
            ></textarea>
          </div>
          <button className="w-full rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-black">
            Send message
          </button>
        </form>
      </div>
    </section>
  );
}

