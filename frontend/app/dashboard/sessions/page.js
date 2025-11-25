"use client";

import { useState, useEffect } from "react";
import { sessionsAPI } from "../../lib/api";
import { useAuth } from "../../context/AuthContext";

export default function MySessionsPage() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const result = await sessionsAPI.getMySessions();
      if (result.success) {
        setSessions(result.sessions || []);
      }
    } catch (error) {
      console.error("Failed to fetch sessions:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "Not scheduled";
    return new Date(date).toLocaleDateString("en-IN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      scheduled: "bg-blue-100 text-blue-700",
      ongoing: "bg-green-100 text-green-700",
      completed: "bg-slate-100 text-slate-700",
      cancelled: "bg-red-100 text-red-700",
    };
    return (
      <span
        className={`rounded-full px-3 py-1 text-xs font-semibold ${
          statusStyles[status] || statusStyles.scheduled
        }`}
      >
        {status?.charAt(0).toUpperCase() + status?.slice(1) || "Scheduled"}
      </span>
    );
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

  return (
    <div className="min-h-screen bg-[#f4f5fb] px-4 py-12">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="rounded-3xl bg-white p-8 shadow-sm" data-aos="fade-up">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-lime-600">
                User Dashboard
              </p>
              <h1 className="mt-2 text-3xl font-semibold text-slate-900">My Sessions</h1>
              <p className="text-slate-600">View and manage your scheduled support sessions.</p>
            </div>
            <button className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-black">
              Schedule New Session
            </button>
          </div>
        </div>

        {sessions.length === 0 ? (
          <div className="rounded-3xl bg-white p-12 text-center shadow-sm">
            <p className="text-slate-600 mb-4">No sessions scheduled yet.</p>
            <button className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-black">
              Schedule Your First Session
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {sessions.map((session, idx) => (
              <div
                key={session._id}
                data-aos="fade-up"
                data-aos-delay={idx * 100}
                className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-slate-900">
                        {session.title || "Support Session"}
                      </h3>
                      {getStatusBadge(session.status)}
                    </div>
                    {session.description && (
                      <p className="text-sm text-slate-600 mb-3">{session.description}</p>
                    )}
                    <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                      <div className="flex items-center gap-2">
                        <span>📅</span>
                        <span>{formatDate(session.scheduledAt)}</span>
                      </div>
                      {session.moderator && (
                        <div className="flex items-center gap-2">
                          <span>👤</span>
                          <span>Moderator: {session.moderator.name || "TBA"}</span>
                        </div>
                      )}
                      {session.group && (
                        <div className="flex items-center gap-2">
                          <span>👥</span>
                          <span>Group: {session.group.name || "N/A"}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {session.meetingLink && (
                      <a
                        href={session.meetingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-900 transition-colors"
                      >
                        Join Meeting
                      </a>
                    )}
                    <button className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-black transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

