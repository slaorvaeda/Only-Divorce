"use client";

import { useState, useEffect } from "react";
import { moderatorAPI } from "../../lib/api";
import { useAuth } from "../../context/AuthContext";

export default function MyGroupsPage() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const result = await moderatorAPI.getGroups();
      if (result.success) {
        setGroups(result.groups || []);
      }
    } catch (error) {
      console.error("Failed to fetch groups:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "Not scheduled";
    return new Date(date).toLocaleDateString("en-IN", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
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
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-purple-600">
                Moderator hub
              </p>
              <h1 className="mt-2 text-3xl font-semibold text-slate-900">My Groups</h1>
              <p className="text-slate-600">Manage and monitor your assigned support groups.</p>
            </div>
            <button className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-black">
              Create New Group
            </button>
          </div>
        </div>

        {groups.length === 0 ? (
          <div className="rounded-3xl bg-white p-12 text-center shadow-sm">
            <p className="text-slate-600">No groups assigned yet.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {groups.map((group, idx) => (
              <div
                key={group._id}
                data-aos="fade-up"
                data-aos-delay={idx * 100}
                className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-slate-900">{group.name}</h3>
                  <p className="mt-1 text-sm text-purple-600">{group.topic}</p>
                </div>
                {group.description && (
                  <p className="mb-4 text-sm text-slate-600 line-clamp-2">{group.description}</p>
                )}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Members</span>
                    <span className="font-semibold text-slate-900">
                      {group.members?.length || 0} / {group.maxMembers || 20}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Status</span>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        group.status === "active"
                          ? "bg-green-100 text-green-700"
                          : group.status === "full"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {group.status}
                    </span>
                  </div>
                  {group.meetingTime && (
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Next Meeting</span>
                      <span className="font-medium text-slate-900">{formatDate(group.meetingTime)}</span>
                    </div>
                  )}
                </div>
                <div className="mt-4 flex gap-2">
                  <button className="flex-1 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-900 transition-colors">
                    View Details
                  </button>
                  <button className="flex-1 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-black transition-colors">
                    Manage
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

