"use client";

import { useState, useEffect } from "react";
import { adminAPI } from "../../lib/api";
import { useAuth } from "../../context/AuthContext";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const result = await adminAPI.getUsers();
      if (result.success) {
        setUsers(result.users || []);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (userId, newStatus) => {
    try {
      const result = await adminAPI.updateUserStatus(userId, newStatus);
      if (result.success) {
        fetchUsers();
      }
    } catch (error) {
      console.error("Failed to update user status:", error);
      alert("Failed to update user status");
    }
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      active: "bg-green-100 text-green-700",
      inactive: "bg-slate-100 text-slate-700",
      suspended: "bg-red-100 text-red-700",
    };
    return (
      <span
        className={`rounded-full px-3 py-1 text-xs font-semibold ${
          statusStyles[status] || statusStyles.active
        }`}
      >
        {status?.charAt(0).toUpperCase() + status?.slice(1) || "Active"}
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
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-600">
                Admin Dashboard
              </p>
              <h1 className="mt-2 text-3xl font-semibold text-slate-900">Users</h1>
              <p className="text-slate-600">Manage all user accounts and their status.</p>
            </div>
            <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
              Total: {users.length} users
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-sm" data-aos="fade-up" data-aos-delay="100">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Name</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Phone</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Email</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Role</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Joined</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="py-8 text-center text-slate-500">
                      No users found
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user._id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="py-4 px-4">
                        <div className="font-medium text-slate-900">
                          {user.name || "N/A"}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm text-slate-600">{user.phone}</td>
                      <td className="py-4 px-4 text-sm text-slate-600">
                        {user.email || "N/A"}
                      </td>
                      <td className="py-4 px-4">
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                          {user.role || "user"}
                        </span>
                      </td>
                      <td className="py-4 px-4">{getStatusBadge(user.status)}</td>
                      <td className="py-4 px-4 text-sm text-slate-600">
                        {user.createdAt
                          ? new Date(user.createdAt).toLocaleDateString("en-IN")
                          : "N/A"}
                      </td>
                      <td className="py-4 px-4">
                        <select
                          value={user.status || "active"}
                          onChange={(e) => handleStatusChange(user._id, e.target.value)}
                          className="rounded-lg border border-slate-300 px-3 py-1 text-sm focus:border-slate-900 focus:outline-none"
                        >
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                          <option value="suspended">Suspended</option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

