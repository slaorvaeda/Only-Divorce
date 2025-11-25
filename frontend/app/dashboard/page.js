import UserDashboard from "../components/dashboard/UserDashboard";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#f4f5fb] px-4 py-12">
      <div className="mx-auto max-w-6xl space-y-12">
        <UserDashboard />
      </div>
    </div>
  );
}

