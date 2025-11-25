import AboutMission from "../components/pages/AboutMission";
import AboutStory from "../components/pages/AboutStory";

const stats = [
  { number: "15,000+", label: "Active Members", color: "from-purple-500 to-pink-500" },
  { number: "200+", label: "Expert Moderators", color: "from-blue-500 to-indigo-500" },
  { number: "50+", label: "Cities Covered", color: "from-green-500 to-emerald-500" },
  { number: "98%", label: "Satisfaction Rate", color: "from-orange-500 to-red-500" }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-4 text-center lg:px-0">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-lime-600 mb-4" data-aos="fade-up">
            About Us
          </p>
          <h1 className="text-4xl font-semibold leading-tight text-slate-900 md:text-5xl md:leading-[1.1] mb-6" data-aos="fade-up" data-aos-delay="100">
            About Only Divorce
          </h1>
          <p className="text-lg leading-relaxed text-slate-600 md:text-xl max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="200">
            A compassionate community dedicated to supporting individuals through one of life's 
            most challenging transitions with dignity, respect, and hope.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                data-aos="fade-up"
                data-aos-delay={idx * 100}
                className="text-center p-6 rounded-2xl bg-white border border-slate-200 shadow-sm"
              >
                <div className="text-4xl font-semibold text-slate-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-sm font-medium text-slate-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AboutMission />
      <AboutStory />

      {/* Team Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-3xl font-semibold text-slate-900 mb-4">Our Commitment to You</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We're committed to providing a safe, supportive, and empowering environment for everyone 
              on their divorce journey.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl border border-slate-200 bg-white shadow-sm" data-aos="fade-up" data-aos-delay="100">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Clear Purpose</h3>
              <p className="text-slate-600">
                We focus exclusively on supporting those navigating divorce, ensuring specialized 
                and relevant guidance.
              </p>
            </div>

            <div className="p-8 rounded-2xl border border-slate-200 bg-white shadow-sm" data-aos="fade-up" data-aos-delay="200">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Community First</h3>
              <p className="text-slate-600">
                Our strength lies in our community - real people sharing real experiences and 
                supporting each other.
              </p>
            </div>

            <div className="p-8 rounded-2xl border border-slate-200 bg-white shadow-sm" data-aos="fade-up" data-aos-delay="300">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Continuous Growth</h3>
              <p className="text-slate-600">
                We're constantly evolving, adding new resources, and improving our platform 
                based on member feedback.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

