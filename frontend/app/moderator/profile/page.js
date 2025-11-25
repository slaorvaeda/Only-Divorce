"use client";

import { useState, useEffect } from "react";
import { authAPI } from "../../lib/api";
import { useAuth } from "../../context/AuthContext";

export default function ModeratorProfilePage() {
  const { user, checkAuth } = useAuth();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    language: "en",
    profile: {
      age: "",
      city: "",
      state: "",
      gender: "",
    },
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const result = await authAPI.getProfile();
      if (result.success && result.user) {
        setProfile(result.user);
        setFormData({
          name: result.user.name || "",
          email: result.user.email || "",
          phone: result.user.phone || "",
          language: result.user.language || "en",
          profile: {
            age: result.user.profile?.age || "",
            city: result.user.profile?.city || "",
            state: result.user.profile?.state || "",
            gender: result.user.profile?.gender || "",
          },
        });
      }
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await authAPI.updateProfile(formData);
      if (result.success) {
        setProfile(result.user);
        setIsEditing(false);
        await checkAuth();
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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

  if (loading && !profile) {
    return (
      <div className="min-h-screen bg-[#f4f5fb] px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f5fb] px-4 py-12">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="rounded-3xl bg-white p-8 shadow-sm" data-aos="fade-up">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-purple-600">
                Moderator hub
              </p>
              <h1 className="mt-2 text-3xl font-semibold text-slate-900">Profile</h1>
              <p className="text-slate-600">Manage your moderator profile and preferences.</p>
            </div>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-black"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-sm" data-aos="fade-up" data-aos-delay="100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/20 disabled:bg-slate-50 disabled:text-slate-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/20 disabled:bg-slate-50 disabled:text-slate-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  disabled
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 bg-slate-50 text-slate-500"
                />
                <p className="mt-1 text-xs text-slate-500">Phone number cannot be changed</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Preferred Language
                </label>
                <select
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/20 disabled:bg-slate-50 disabled:text-slate-500"
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
                  disabled={!isEditing}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/20 disabled:bg-slate-50 disabled:text-slate-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Gender</label>
                <select
                  name="profile.gender"
                  value={formData.profile.gender}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/20 disabled:bg-slate-50 disabled:text-slate-500"
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
                  disabled={!isEditing}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/20 disabled:bg-slate-50 disabled:text-slate-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">State</label>
                <input
                  type="text"
                  name="profile.state"
                  value={formData.profile.state}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/20 disabled:bg-slate-50 disabled:text-slate-500"
                />
              </div>
            </div>

            {isEditing && (
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    fetchProfile(); // Reset form
                  }}
                  className="flex-1 rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 hover:border-slate-900 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 rounded-full bg-purple-600 px-6 py-3 text-sm font-semibold text-white hover:bg-purple-700 disabled:opacity-50 transition-colors"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            )}
          </form>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-sm" data-aos="fade-up" data-aos-delay="200">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Account Information</h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Role</span>
              <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
                {profile?.role || "Moderator"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Account Status</span>
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                {profile?.status || "Active"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Member Since</span>
              <span className="font-medium text-slate-900">
                {profile?.createdAt
                  ? new Date(profile.createdAt).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "N/A"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

