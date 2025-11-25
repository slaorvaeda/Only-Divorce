export default function AboutMission() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16" data-aos="fade-up">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-lime-600 mb-4">
            Our Mission
          </p>
          <h2 className="text-3xl font-semibold text-slate-900 mb-6 md:text-4xl">
            Empowering Lives Through Compassionate Support
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
            At Only Divorce, we believe that ending a marriage doesn't mean ending your life. 
            We're here to help you navigate this challenging transition with dignity, support, and hope.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 rounded-2xl bg-slate-50 border border-slate-100" data-aos="fade-up" data-aos-delay="100">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
              🤝
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">Peer Support</h3>
            <p className="text-slate-600">
              Connect with others who truly understand your journey and share similar experiences.
            </p>
          </div>

          <div className="text-center p-6 rounded-2xl bg-slate-50 border border-slate-100" data-aos="fade-up" data-aos-delay="200">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
              🛡️
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">Expert Guidance</h3>
            <p className="text-slate-600">
              Access professional moderators, legal advisors, and mental health experts.
            </p>
          </div>

          <div className="text-center p-6 rounded-2xl bg-slate-50 border border-slate-100" data-aos="fade-up" data-aos-delay="300">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
              🔒
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">Safe Space</h3>
            <p className="text-slate-600">
              Complete anonymity and privacy in a judgment-free environment.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

