import { BarChart3, CreditCard, Megaphone, ShieldCheck } from "lucide-react";
import DashboardPageHeader from "../../components/dashboard/DashboardPageHeader";
import StatCard from "../../components/dashboard/StatCard";
import StatusBadge from "../../components/ads/StatusBadge";

const AdminDashboard = () => {
  return (
    <div>
      <DashboardPageHeader
        badge="Admin Panel"
        title="Admin Dashboard"
        description="Manage payments, publishing, analytics, and overall ad workflow."
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Ads"
          value="120"
          description="All ads in system"
          icon={Megaphone}
        />

        <StatCard
          title="Pending Reviews"
          value="18"
          description="Waiting for moderation"
          icon={ShieldCheck}
        />

        <StatCard
          title="Payments"
          value="32"
          description="Submitted payments"
          icon={CreditCard}
        />

        <StatCard
          title="Published"
          value="74"
          description="Live ads"
          icon={BarChart3}
        />
      </div>

      <div
        className="mt-8 rounded-2xl border p-6"
        style={{
          backgroundColor: "var(--color-surface)",
          borderColor: "var(--color-border)",
        }}
      >
        <h2 className="mb-4 text-xl font-semibold">Status Badge Test</h2>

        <div className="flex flex-wrap gap-3">
          <StatusBadge status="draft" />
          <StatusBadge status="submitted" />
          <StatusBadge status="moderator_approved" />
          <StatusBadge status="payment_pending" />
          <StatusBadge status="payment_verified" />
          <StatusBadge status="published" />
          <StatusBadge status="moderator_rejected" />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;