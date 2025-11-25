"use client";

import { useState, useEffect } from "react";
import { adminAPI } from "../../lib/api";

export default function AdminModeratorsPage() {
  const [moderators, setModerators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    fetchModerators();
  }, []);

  const fetchModerators = async () => {
    try {
      const result = await adminAPI.getModerators();
      if (result.success) {
        setModerators(result.moderators || []);
      }
    } catch (error) {
      console.error("Failed to fetch moderators:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateModerator = async (e) => {
    e.preventDefault();
    try {
      const result = await adminAPI.createModerator(formData);
      if (result.success) {
        setShowCreateModal(false);
        setFormData({ name: "", phone: "", email: "" });
        fetchModerators();
      }
    } catch (error) {
      console.error("Failed to create moderator:", error);
      alert("Failed to create moderator");
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

  return (
    <div className="min-h-screen bg-[#f4f5fb] px-4 py-12">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="rounded-3xl bg-white p-8 shadow-sm" data-aos="fade-up">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-600">
                Admin Dashboard
              </p>
              <h1 className="mt-2 text-3xl font-semibold text-slate-900">Moderators</h1>
              <p className="text-slate-600">Manage moderator accounts and permissions.</p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-black"
            >
              Add Moderator
            </button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {moderators.length === 0 ? (
            <div className="col-span-full rounded-3xl bg-white p-12 text-center shadow-sm" data-aos="fade-up">
              <p className="text-slate-600">No moderators found.</p>
            </div>
          ) : (
            moderators.map((moderator, idx) => (
              <div
                key={moderator._id}
                data-aos="fade-up"
                data-aos-delay={idx * 100}
                className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-lg font-semibold text-purple-700">
                    {moderator.name?.charAt(0)?.toUpperCase() || "M"}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900">
                      {moderator.name || "N/A"}
                    </h3>
                    <p className="text-sm text-slate-500">{moderator.phone}</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Email</span>
                    <span className="text-slate-900">{moderator.email || "N/A"}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Status</span>
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                      {moderator.status || "Active"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Joined</span>
                    <span className="text-slate-900">
                      {moderator.createdAt
                        ? new Date(moderator.createdAt).toLocaleDateString("en-IN")
                        : "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {showCreateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
              <button
                onClick={() => setShowCreateModal(false)}
                className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
              <h2 className="mb-6 text-2xl font-semibold text-slate-900">Add New Moderator</h2>
              <form onSubmit={handleCreateModerator} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/20"
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 hover:border-slate-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-black"
                  >
                    Create Moderator
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

