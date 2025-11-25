"use client";

import { useState, useEffect } from "react";
import { moderatorAPI } from "../../lib/api";
import { useAuth } from "../../context/AuthContext";

export default function PendingRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchPendingRequests();
  }, []);

  const fetchPendingRequests = async () => {
    try {
      const result = await moderatorAPI.getPendingRequests();
      if (result.success) {
        setRequests(result.requests || []);
      }
    } catch (error) {
      console.error("Failed to fetch pending requests:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatTimeAgo = (date) => {
    if (!date) return "Recently";
    const now = new Date();
    const requestDate = new Date(date);
    const diffInSeconds = Math.floor((now - requestDate) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} mins ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hrs ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    return requestDate.toLocaleDateString("en-IN");
  };

  const handleApprove = async (requestId) => {
    // TODO: Implement approve functionality
    console.log("Approve request:", requestId);
    alert("Approve functionality to be implemented");
  };

  const handleReject = async (requestId) => {
    // TODO: Implement reject functionality
    console.log("Reject request:", requestId);
    alert("Reject functionality to be implemented");
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
              <h1 className="mt-2 text-3xl font-semibold text-slate-900">Pending Requests</h1>
              <p className="text-slate-600">Review and approve member join requests for your groups.</p>
            </div>
            <div className="rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-700">
              {requests.length} Pending
            </div>
          </div>
        </div>

        {requests.length === 0 ? (
          <div className="rounded-3xl bg-white p-12 text-center shadow-sm">
            <p className="text-slate-600">No pending requests at the moment.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((request, idx) => (
              <div
                key={request.id}
                data-aos="fade-up"
                data-aos-delay={idx * 100}
                className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-lg font-semibold text-purple-700">
                        {request.userName?.charAt(0)?.toUpperCase() || "?"}
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900">
                          {request.userName || request.userPhone}
                        </h3>
                        <p className="text-sm text-slate-600">{request.userPhone}</p>
                      </div>
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-slate-500">Group:</span>
                        <span className="font-medium text-slate-900">{request.groupName}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-slate-500">Topic:</span>
                        <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
                          {request.groupTopic}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-3 lg:items-end">
                    <span className="text-sm text-slate-500">{formatTimeAgo(request.requestedAt)}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleReject(request.id)}
                        className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-red-300 hover:text-red-700 transition-colors"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => handleApprove(request.id)}
                        className="rounded-full bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 transition-colors"
                      >
                        Approve
                      </button>
                    </div>
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

