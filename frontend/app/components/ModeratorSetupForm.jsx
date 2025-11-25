"use client";

import { useState } from "react";
import { authAPI } from "../lib/api";
import { useAuth } from "../context/AuthContext";

export default function ModeratorSetupForm({ onComplete }) {
  const { user, checkAuth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    language: user?.language || "en",
    profile: {
      age: user?.profile?.age || "",
      city: user?.profile?.city || "",
      state: user?.profile?.state || "",
      gender: user?.profile?.gender || "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("profile.")) {
      const profileField = name.split(".")[1];
      setFormData({
        ...formData,
        profile: {
          ...formData.profile,
          [profileField]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validate required fields
    if (!formData.name || !formData.email) {
      setError("Name and Email are required fields");
      setLoading(false);
      return;
    }

    try {
      const result = await authAPI.updateProfile(formData);
      if (result.success) {
        await checkAuth();
        onComplete();
      }
    } catch (err) {
      setError(err.message || "Failed to save profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-2xl rounded-3xl bg-white p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="mb-6">
          <div className="mb-2 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-600 text-lg font-bold text-white">
              OD
            </div>
            <h2 className="text-2xl font-semibold text-slate-900">Welcome to Only Divorce!</h2>
          </div>
          <p className="text-slate-600">
            Let&apos;s set up your moderator profile. Please fill in the required information to get started.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="rounded-lg bg-red-50 border border-red-200 p-4">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <div className="grid gap-6 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/20"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your.email@example.com"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/20"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Preferred Language
              </label>
              <select
                name="language"
                value={formData.language}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/20"
              >
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                <option value="ta">Tamil</option>
                <option value="te">Telugu</option>
                <option value="kn">Kannada</option>
                <option value="ml">Malayalam</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Age</label>
              <input
                type="number"
                name="profile.age"
                value={formData.profile.age}
                onChange={handleChange}
                placeholder="Enter your age"
                min="18"
                max="100"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/20"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Gender</label>
              <select
                name="profile.gender"
                value={formData.profile.gender}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/20"
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">City</label>
              <input
                type="text"
                name="profile.city"
                value={formData.profile.city}
                onChange={handleChange}
                placeholder="Enter your city"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/20"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">State</label>
              <input
                type="text"
                name="profile.state"
                value={formData.profile.state}
                onChange={handleChange}
                placeholder="Enter your state"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/20"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 text-sm font-semibold text-white hover:shadow-lg disabled:opacity-50 transition-all"
            >
              {loading ? "Saving..." : "Complete Setup"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

