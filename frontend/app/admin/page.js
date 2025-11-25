import AdminDashboard from "../components/dashboard/AdminDashboard";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-[#f4f5fb] px-4 py-12">
      <div className="mx-auto max-w-6xl space-y-12">
        <AdminDashboard />
      </div>
    </div>
  );
}

