"use client";

import { useState } from "react";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    siteName: "Only Divorce",
    siteDescription: "Your trusted partner through life's most challenging transition",
    maintenanceMode: false,
    allowNewRegistrations: true,
    requireEmailVerification: false,
    maxGroupSize: 20,
    sessionDuration: 60,
  });

  const handleSave = (e) => {
    e.preventDefault();
    // TODO: Implement save functionality
    alert("Settings saved successfully!");
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <div className="min-h-screen bg-[#f4f5fb] px-4 py-12">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="rounded-3xl bg-white p-8 shadow-sm" data-aos="fade-up">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-600">
              Admin Dashboard
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">Settings</h1>
            <p className="text-slate-600">Manage platform settings and configurations.</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          <div className="rounded-3xl bg-white p-8 shadow-sm" data-aos="fade-up" data-aos-delay="100">
            <h2 className="text-xl font-semibold text-slate-900 mb-6">General Settings</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Site Name
                </label>
                <input
                  type="text"
                  name="siteName"
                  value={settings.siteName}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Site Description
                </label>
                <textarea
                  name="siteDescription"
                  value={settings.siteDescription}
                  onChange={handleChange}
                  rows={3}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/20"
                />
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-sm" data-aos="fade-up" data-aos-delay="200">
            <h2 className="text-xl font-semibold text-slate-900 mb-6">Platform Settings</h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Maintenance Mode
                  </label>
                  <p className="text-xs text-slate-500 mt-1">
                    Temporarily disable the platform for maintenance
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="maintenanceMode"
                    checked={settings.maintenanceMode}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-slate-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-slate-900"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Allow New Registrations
                  </label>
                  <p className="text-xs text-slate-500 mt-1">
                    Enable or disable new user registrations
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="allowNewRegistrations"
                    checked={settings.allowNewRegistrations}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-slate-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-slate-900"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Require Email Verification
                  </label>
                  <p className="text-xs text-slate-500 mt-1">
                    Require users to verify their email address
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="requireEmailVerification"
                    checked={settings.requireEmailVerification}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-slate-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-slate-900"></div>
                </label>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-sm" data-aos="fade-up" data-aos-delay="300">
            <h2 className="text-xl font-semibold text-slate-900 mb-6">Group Settings</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Maximum Group Size
                </label>
                <input
                  type="number"
                  name="maxGroupSize"
                  value={settings.maxGroupSize}
                  onChange={handleChange}
                  min="5"
                  max="50"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Default Session Duration (minutes)
                </label>
                <input
                  type="number"
                  name="sessionDuration"
                  value={settings.sessionDuration}
                  onChange={handleChange}
                  min="30"
                  max="180"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/20"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-black"
            >
              Save Settings
            </button>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="flex-1 rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 hover:border-slate-900"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

