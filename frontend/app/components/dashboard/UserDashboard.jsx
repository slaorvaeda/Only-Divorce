"use client";

import { useState, useEffect } from "react";
import { userAPI, topicsAPI, sessionsAPI } from "../../lib/api";

const stats = [
  { label: "Active groups", value: "12", subtext: "Topics you follow" },
  { label: "Unread messages", value: "3", subtext: "Moderator updates" },
  { label: "Sessions this week", value: "4", subtext: "Booked support calls" },
];

const topics = [
  {
    title: "Women Support",
    description: "Safe, guided spaces hosted by expert moderators.",
    accent: "from-pink-100 via-rose-50 to-white",
  },
  {
    title: "Men Support",
    description: "Peer circles focused on emotional resilience.",
    accent: "from-blue-100 via-indigo-50 to-white",
  },
  {
    title: "Child Custody",
    description: "Legal and psychological support for parents.",
    accent: "from-teal-100 via-emerald-50 to-white",
  },
  {
    title: "Domestic Violence",
    description: "Immediate assistance with protection plans.",
    accent: "from-purple-100 via-fuchsia-50 to-white",
  },
  {
    title: "Alimony & Finance",
    description: "Financial planning with certified advisors.",
    accent: "from-amber-100 via-yellow-50 to-white",
  },
  {
    title: "NRI Assistance",
    description: "Cross-border legal strategies and guidance.",
    accent: "from-cyan-100 via-sky-50 to-white",
  },
  {
    title: "Mental Wellness",
    description: "Therapy-led circles for anxiety, burnout, and panic.",
    accent: "from-indigo-100 via-slate-50 to-white",
  },
  {
    title: "Legal Strategy",
    description: "One-on-one prep for hearings, mediation, and FIR filings.",
    accent: "from-green-100 via-lime-50 to-white",
  },
  {
    title: "Property & Asset",
    description: "Guidance on joint assets, gold, and real-estate division.",
    accent: "from-orange-100 via-amber-50 to-white",
  },
  {
    title: "Parenting Support",
    description: "Co-parenting playbooks and child therapy referrals.",
    accent: "from-rose-100 via-pink-50 to-white",
  },
  {
    title: "LGBTQIA+",
    description: "Supportive legal and emotional aid for queer partners.",
    accent: "from-purple-100 via-blue-50 to-white",
  },
  {
    title: "Safety Planning",
    description: "Rapid-response teams for relocation and protection orders.",
    accent: "from-red-100 via-orange-50 to-white",
  },
  {
    title: "Career & Restart",
    description: "Mentorship for financial independence and upskilling.",
    accent: "from-yellow-100 via-lime-50 to-white",
  },
];

const sessions = [
  { title: "Mindful Healing Circle", date: "Wed, 8:00 PM IST", moderator: "Ananya" },
  { title: "Legal Q&A Lounge", date: "Fri, 6:30 PM IST", moderator: "Adv. Krish" },
];

const resources = [
  "Step-by-step FIR checklist for harassment cases",
  "Guide: Preparing for a virtual mediation session",
  "Workbook: Emotional reset after high-conflict hearings",
];

export default function UserDashboard() {
  const [viewMode, setViewMode] = useState("grid");
  const [showAllTopics, setShowAllTopics] = useState(false);
  const [dashboardStats, setDashboardStats] = useState({ activeGroups: 0, unreadMessages: 0, upcomingSessions: 0 });
  const [apiTopics, setApiTopics] = useState([]);
  const [apiSessions, setApiSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsRes, topicsRes, sessionsRes] = await Promise.all([
        userAPI.getDashboard(),
        topicsAPI.getAll(),
        sessionsAPI.getUpcoming()
      ]);

      if (statsRes.success) setDashboardStats(statsRes.stats);
      if (topicsRes.success) {
        // Map API topics to our format
        const mappedTopics = topicsRes.topics.map(topic => {
          const localTopic = topics.find(t => t.title === topic.name);
          return {
            ...topic,
            title: topic.name,
            accent: localTopic?.accent || "from-slate-100 to-white"
          };
        });
        setApiTopics(mappedTopics);
      }
      if (sessionsRes.success) setApiSessions(sessionsRes.sessions || []);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const displayedTopics = showAllTopics ? (apiTopics.length > 0 ? apiTopics : topics) : (apiTopics.length > 0 ? apiTopics : topics).slice(0, 6);
  const displayStats = {
    activeGroups: dashboardStats.activeGroups || 0,
    unreadMessages: dashboardStats.unreadMessages || 0,
    upcomingSessions: dashboardStats.upcomingSessions || 0
  };

  return (
    <div className="space-y-12">
      <section className="rounded-3xl bg-white p-8 shadow-sm" data-aos="fade-up">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-lime-600">
              Welcome back
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900">User Dashboard</h1>
            <p className="mt-2 text-slate-600">
              Track your sessions, explore new support topics, and stay updated with moderator notes.
            </p>
          </div>
          <button className="self-start rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-black">
            Join live session
          </button>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6" data-aos="fade-up" data-aos-delay="100">
            <p className="text-sm uppercase tracking-wide text-slate-500">Active groups</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">{displayStats.activeGroups}</p>
            <p className="text-sm text-slate-600">Topics you follow</p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6" data-aos="fade-up" data-aos-delay="200">
            <p className="text-sm uppercase tracking-wide text-slate-500">Unread messages</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">{displayStats.unreadMessages}</p>
            <p className="text-sm text-slate-600">Moderator updates</p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6" data-aos="fade-up" data-aos-delay="300">
            <p className="text-sm uppercase tracking-wide text-slate-500">Sessions this week</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">{displayStats.upcomingSessions}</p>
            <p className="text-sm text-slate-600">Booked support calls</p>
          </div>
        </div>
      </section>

      <section className="rounded-3xl bg-white p-8 shadow-sm" data-aos="fade-up">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-lime-600">
              Support topics
            </p>
            <h2 className="text-2xl font-semibold text-slate-900">Choose your focus area</h2>
            <p className="text-slate-600">
              Connect with curated rooms moderated by legal, therapy, and finance experts.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-full border border-slate-200 p-1 text-sm font-semibold text-slate-500">
              {["grid", "card"].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`rounded-full px-4 py-1 capitalize transition ${
                    viewMode === mode ? "bg-slate-900 text-white" : "text-slate-600"
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
            <button 
              onClick={() => setShowAllTopics(!showAllTopics)}
              className="rounded-full border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-900 hover:border-slate-900"
            >
              {showAllTopics ? "Show less" : `View all ${topics.length} topics`}
            </button>
          </div>
        </div>
        {viewMode === "grid" ? (
          <div className="grid gap-6 md:grid-cols-2">
            {displayedTopics.map((topic, idx) => (
              <div
                key={topic.title}
                data-aos="fade-up"
                data-aos-delay={idx * 50}
                className={`rounded-3xl border border-slate-100 p-5 shadow-[0_15px_40px_rgba(15,23,42,0.05)] bg-gradient-to-br ${topic.accent}`}
              >
                <p className="text-lg font-semibold text-slate-900">{topic.title}</p>
                <p className="mt-2 text-sm text-slate-600">{topic.description}</p>
                <button className="mt-4 text-sm font-semibold text-lime-700 hover:text-lime-900">
                  Enter room →
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-5">
            {displayedTopics.map((topic, idx) => (
              <div
                key={topic.title}
                data-aos="fade-up"
                data-aos-delay={idx * 50}
                className="flex flex-col gap-4 rounded-3xl border border-slate-100 bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)] md:flex-row md:items-center md:justify-between"
              >
                <div className="flex flex-1 flex-col gap-2">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Focus area</p>
                  <h3 className="text-2xl font-semibold text-slate-900">{topic.title}</h3>
                  <p className="text-sm text-slate-600">{topic.description}</p>
                </div>
                <div className="flex flex-col gap-3 md:w-64">
                  <div className={`h-20 rounded-2xl bg-gradient-to-r ${topic.accent}`}></div>
                  <button className="rounded-full border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-900 hover:border-slate-900">
                    View moderators
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl bg-white p-8 shadow-sm" data-aos="fade-right">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-slate-900">Upcoming sessions</h3>
            <button className="text-sm font-semibold text-slate-500 hover:text-slate-900">See all</button>
          </div>
          <div className="mt-6 space-y-4">
            {loading ? (
              <p className="text-slate-500">Loading sessions...</p>
            ) : apiSessions.length > 0 ? (
              apiSessions.map((session, idx) => (
                <div
                  key={session._id}
                  data-aos="fade-up"
                  data-aos-delay={idx * 50}
                  className="rounded-2xl border border-slate-100 bg-slate-50 p-5"
                >
                  <p className="text-sm uppercase tracking-wide text-slate-500">
                    {new Date(session.scheduledAt).toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </p>
                  <p className="mt-1 text-lg font-semibold text-slate-900">{session.title}</p>
                  <p className="text-sm text-slate-600">Moderator • {session.moderator?.name || 'TBA'}</p>
                </div>
              ))
            ) : (
              <p className="text-slate-500">No upcoming sessions</p>
            )}
          </div>
        </div>
        <div className="rounded-3xl bg-slate-900 p-8 text-white shadow-sm" data-aos="fade-left">
          <h3 className="text-xl font-semibold">Resource locker</h3>
          <p className="mt-2 text-sm text-white/70">
            Access templates and guides frequently shared by moderators.
          </p>
          <ul className="mt-6 space-y-4">
            {resources.map((item, idx) => (
              <li key={item} data-aos="fade-up" data-aos-delay={idx * 50} className="rounded-2xl bg-white/10 p-4 text-sm leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
          <button className="mt-6 w-full rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900">
            Download all
          </button>
        </div>
      </section>
    </div>
  );
}

