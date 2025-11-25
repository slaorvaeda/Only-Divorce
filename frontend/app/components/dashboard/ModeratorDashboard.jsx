const assignedGroups = [
  {
    title: "Women Support • Evening",
    participants: 42,
    status: "Live",
    nextSession: "Today, 8:30 PM",
  },
  {
    title: "Child Custody Circle",
    participants: 28,
    status: "Prep",
    nextSession: "Fri, 7:00 PM",
  },
];

const pendingRequests = [
  { name: "Nisha B.", topic: "Domestic Violence", submitted: "2 hrs ago" },
  { name: "Arjun R.", topic: "Alimony", submitted: "5 hrs ago" },
  { name: "Suhan P.", topic: "Men Support", submitted: "Yesterday" },
];

const wellbeingChecks = [
  {
    member: "Deepika",
    insight: "Shared recurring panic attacks. Needs therapist call.",
    priority: "High",
  },
  {
    member: "Rohit",
    insight: "Requested legal document checklist.",
    priority: "Medium",
  },
];

export default function ModeratorDashboard() {
  return (
    <div className="space-y-12">
      <section className="rounded-3xl bg-white p-8 shadow-sm" data-aos="fade-up">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-purple-600">
              Moderator hub
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">Moderator Dashboard</h1>
            <p className="text-slate-600">
              Review group health, approve new members, and schedule upcoming sessions.
            </p>
          </div>
          <button className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-black">
            Start live room
          </button>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5" data-aos="fade-up" data-aos-delay="100">
            <p className="text-sm uppercase tracking-wide text-slate-500">Active members</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">124</p>
            <p className="text-sm text-slate-600">Across assigned groups</p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5" data-aos="fade-up" data-aos-delay="200">
            <p className="text-sm uppercase tracking-wide text-slate-500">Pending approvals</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">9</p>
            <p className="text-sm text-slate-600">Awaiting verification</p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5" data-aos="fade-up" data-aos-delay="300">
            <p className="text-sm uppercase tracking-wide text-slate-500">Check-ins today</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">15</p>
            <p className="text-sm text-slate-600">Members received follow-ups</p>
          </div>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl bg-white p-8 shadow-sm" data-aos="fade-right">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900">Assigned groups</h2>
            <button className="text-sm font-semibold text-slate-500 hover:text-slate-900">
              Manage schedule
            </button>
          </div>
          <div className="mt-6 space-y-4">
            {assignedGroups.map((group, idx) => (
              <div
                key={group.title}
                data-aos="fade-up"
                data-aos-delay={idx * 100}
                className="rounded-2xl border border-slate-100 bg-slate-50 p-5"
              >
                <p className="text-lg font-semibold text-slate-900">{group.title}</p>
                <p className="text-sm text-slate-600">{group.participants} participants</p>
                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="rounded-full bg-green-100 px-3 py-1 text-green-700">
                    {group.status}
                  </span>
                  <span className="text-slate-500">{group.nextSession}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl bg-white p-8 shadow-sm" data-aos="fade-left">
          <h2 className="text-xl font-semibold text-slate-900">Pending approvals</h2>
          <div className="mt-6 space-y-4">
            {pendingRequests.map((request, idx) => (
              <div
                key={request.name}
                data-aos="fade-up"
                data-aos-delay={idx * 100}
                className="flex items-center justify-between rounded-2xl border border-slate-100 p-4"
              >
                <div>
                  <p className="font-semibold text-slate-900">{request.name}</p>
                  <p className="text-sm text-slate-600">{request.topic}</p>
                </div>
                <div className="text-right text-sm text-slate-500">
                  <p>{request.submitted}</p>
                  <button className="mt-2 rounded-full border border-slate-200 px-3 py-1 text-slate-900 hover:border-slate-900">
                    Review
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-3xl bg-[#111827] p-8 text-white shadow-sm" data-aos="fade-up">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h3 className="text-2xl font-semibold">Member wellbeing alerts</h3>
            <p className="text-white/70">Insights automatically flagged by the support AI.</p>
          </div>
          <button className="rounded-full bg-white px-6 py-2 text-sm font-semibold text-slate-900">
            Download report
          </button>
        </div>
        <div className="mt-6 space-y-4">
          {wellbeingChecks.map((item, idx) => (
            <div key={item.member} data-aos="fade-up" data-aos-delay={idx * 100} className="rounded-2xl bg-white/10 p-5">
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">{item.member}</p>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    item.priority === "High" ? "bg-red-100/80 text-red-900" : "bg-yellow-100/80 text-yellow-900"
                  }`}
                >
                  {item.priority} priority
                </span>
              </div>
              <p className="mt-2 text-sm text-white/80">{item.insight}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

