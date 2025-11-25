"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ModeratorDashboard from "../components/dashboard/ModeratorDashboard";
import ModeratorSetupForm from "../components/ModeratorSetupForm";
import { useAuth } from "../context/AuthContext";
import { authAPI } from "../lib/api";

export default function ModeratorPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [profileLoading, setProfileLoading] = useState(true);
  const [showSetupForm, setShowSetupForm] = useState(false);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!authLoading) {
      checkProfile();
    }
  }, [user, authLoading]);

  const checkProfile = async () => {
    if (!user) {
      router.push("/");
      return;
    }

    // Check if user is a moderator
    if (user.role !== "moderator" && user.role !== "admin") {
      router.push("/dashboard");
      return;
    }

    try {
      const result = await authAPI.getProfile();
      if (result.success && result.user) {
        setProfile(result.user);
        // Check if profile is incomplete (first-time login)
        const isFirstTime = !result.user.name || !result.user.email;
        setShowSetupForm(isFirstTime);
      }
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    } finally {
      setProfileLoading(false);
    }
  };

  const handleSetupComplete = () => {
    setShowSetupForm(false);
    // Refresh profile
    checkProfile();
  };

  if (authLoading || profileLoading) {
    return (
      <div className="min-h-screen bg-[#f4f5fb] flex items-center justify-center">
        <div className="text-center">
          <div className="text-slate-600">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <>
      {showSetupForm && <ModeratorSetupForm onComplete={handleSetupComplete} />}
      {!showSetupForm && (
        <div className="min-h-screen bg-[#f4f5fb] px-4 py-12">
          <div className="mx-auto max-w-6xl space-y-12">
            <ModeratorDashboard />
          </div>
        </div>
      )}
    </>
  );
}

