const adminStats = [
  { label: "Total users", value: "9,842", change: "+8% vs last month" },
  { label: "Active moderators", value: "36", change: "4 onboarding" },
  { label: "Running groups", value: "128", change: "Across 13 topics" },
  { label: "Monthly revenue", value: "₹1.8 Cr", change: "MRR (subscriptions)" },
];

const moderators = [
  { name: "Adv. Kavya Shah", expertise: "Child Custody, Domestic Violence", groups: 4 },
  { name: "Dr. Sameer Iyer", expertise: "Emotional Wellbeing", groups: 3 },
  { name: "Neha Pillai", expertise: "NRI Support, Alimony", groups: 5 },
];

const audits = [
  { title: "Data privacy compliance", status: "Clear", updated: "Yesterday" },
  { title: "Session recording policy", status: "Action needed", updated: "2 days ago" },
  { title: "Moderator verification", status: "In review", updated: "This week" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-12">
      <section className="rounded-3xl bg-white p-8 shadow-sm" data-aos="fade-up">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600">
              Executive overview
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">Admin Dashboard</h1>
            <p className="text-slate-600">
              Monitor platform health, manage moderators, and stay compliant across regions.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="rounded-full border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-900 hover:border-slate-900">
              Download metrics
            </button>
            <button className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-black">
              Create announcement
            </button>
          </div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {adminStats.map((stat, idx) => (
            <div key={stat.label} data-aos="fade-up" data-aos-delay={idx * 100} className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
              <p className="text-sm uppercase tracking-wide text-slate-500">{stat.label}</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">{stat.value}</p>
              <p className="text-sm text-slate-600">{stat.change}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl bg-white p-8 shadow-sm" data-aos="fade-right">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900">Moderator roster</h2>
            <button className="text-sm font-semibold text-slate-500 hover:text-slate-900">
              View all 36
            </button>
          </div>
          <div className="mt-6 space-y-4">
            {moderators.map((moderator, idx) => (
              <div
                key={moderator.name}
                data-aos="fade-up"
                data-aos-delay={idx * 100}
                className="rounded-2xl border border-slate-100 bg-slate-50 p-5"
              >
                <p className="text-lg font-semibold text-slate-900">{moderator.name}</p>
                <p className="text-sm text-slate-600">{moderator.expertise}</p>
                <div className="mt-3 flex items-center justify-between text-sm">
                  <span>{moderator.groups} groups</span>
                  <button className="rounded-full border border-slate-200 px-3 py-1 text-slate-900 hover:border-slate-900">
                    Manage
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl bg-white p-8 shadow-sm" data-aos="fade-left">
          <h2 className="text-xl font-semibold text-slate-900">Compliance tracker</h2>
          <div className="mt-6 space-y-4">
            {audits.map((item, idx) => (
              <div key={item.title} data-aos="fade-up" data-aos-delay={idx * 100} className="rounded-2xl border border-slate-100 p-4">
                <p className="font-semibold text-slate-900">{item.title}</p>
                <p className="text-sm text-slate-600">Updated {item.updated}</p>
                <span
                  className={`mt-3 inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                    item.status === "Clear"
                      ? "bg-green-100 text-green-800"
                      : item.status === "Action needed"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl bg-slate-900 p-5 text-white">
            <p className="text-sm uppercase tracking-[0.3em] text-white/70">Reminder</p>
            <p className="mt-2 text-lg font-semibold">
              PAN-based verification for new moderators goes live on Monday.
            </p>
            <button className="mt-4 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900">
              View rollout plan
            </button>
          </div>
        </div>
      </section>

      <section className="rounded-3xl bg-[#020617] p-8 text-white shadow-sm" data-aos="fade-up">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h3 className="text-2xl font-semibold">Platform signals</h3>
            <p className="text-white/70">Anomaly detection monitored every 15 minutes.</p>
          </div>
          <div className="flex gap-3">
            <button className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white">
              Export CSV
            </button>
            <button className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900">
              Trigger audit
            </button>
          </div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-white/10 p-4" data-aos="fade-up" data-aos-delay="100">
            <p className="text-sm text-white/70">Incident response time</p>
            <p className="mt-2 text-3xl font-semibold">11m</p>
            <p className="text-xs text-white/60">Average last 24 hrs</p>
          </div>
          <div className="rounded-2xl bg-white/10 p-4" data-aos="fade-up" data-aos-delay="200">
            <p className="text-sm text-white/70">Complaint resolution</p>
            <p className="mt-2 text-3xl font-semibold">94%</p>
            <p className="text-xs text-white/60">SLA within 72 hrs</p>
          </div>
          <div className="rounded-2xl bg-white/10 p-4" data-aos="fade-up" data-aos-delay="300">
            <p className="text-sm text-white/70">System uptime</p>
            <p className="mt-2 text-3xl font-semibold">99.95%</p>
            <p className="text-xs text-white/60">Rolling 30 days</p>
          </div>
        </div>
      </section>
    </div>
  );
}

