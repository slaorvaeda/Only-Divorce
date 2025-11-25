"use client";

import { useState, useEffect } from "react";
import { adminAPI } from "../../lib/api";

export default function AdminAnalyticsPage() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const result = await adminAPI.getDashboard();
      if (result.success) {
        setAnalytics(result.stats || {});
      }
    } catch (error) {
      console.error("Failed to fetch analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f4f5fb] px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  const stats = [
    {
      title: "Total Users",
      value: analytics?.totalUsers || 0,
      icon: "👥",
      color: "bg-blue-100 text-blue-700",
    },
    {
      title: "Active Moderators",
      value: analytics?.totalModerators || 0,
      icon: "👤",
      color: "bg-purple-100 text-purple-700",
    },
    {
      title: "Support Groups",
      value: analytics?.totalGroups || 0,
      icon: "👨‍👩‍👧‍👦",
      color: "bg-green-100 text-green-700",
    },
    {
      title: "Active Sessions",
      value: analytics?.activeSessions || 0,
      icon: "💬",
      color: "bg-orange-100 text-orange-700",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f4f5fb] px-4 py-12">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="rounded-3xl bg-white p-8 shadow-sm" data-aos="fade-up">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-600">
              Admin Dashboard
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">Analytics</h1>
            <p className="text-slate-600">Overview of platform statistics and metrics.</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              data-aos="fade-up"
              data-aos-delay={idx * 100}
              className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center text-2xl`}>
                  {stat.icon}
                </div>
              </div>
              <p className="text-sm uppercase tracking-wide text-slate-500 mb-2">
                {stat.title}
              </p>
              <p className="text-3xl font-semibold text-slate-900">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl bg-white p-8 shadow-sm" data-aos="fade-right">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl" data-aos="fade-up" data-aos-delay="100">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  👤
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">New user registered</p>
                  <p className="text-xs text-slate-500">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl" data-aos="fade-up" data-aos-delay="200">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  ✅
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">Session completed</p>
                  <p className="text-xs text-slate-500">5 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl" data-aos="fade-up" data-aos-delay="300">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  👥
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">New group created</p>
                  <p className="text-xs text-slate-500">1 day ago</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-sm" data-aos="fade-left">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Platform Health</h2>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-600">User Engagement</span>
                  <span className="text-sm font-semibold text-slate-900">85%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: "85%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-600">Session Completion</span>
                  <span className="text-sm font-semibold text-slate-900">72%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: "72%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-600">Moderator Activity</span>
                  <span className="text-sm font-semibold text-slate-900">91%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: "91%" }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

