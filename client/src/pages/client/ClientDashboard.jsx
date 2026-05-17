import { Link } from "react-router-dom";
import { FileText, Megaphone, PlusCircle, WalletCards } from "lucide-react";

import Button from "../../components/common/Button";
import DashboardPageHeader from "../../components/dashboard/DashboardPageHeader";
import StatCard from "../../components/dashboard/StatCard";

const ClientDashboard = () => {
  return (
    <div>
      <DashboardPageHeader
        badge="Client Panel"
        title="Client Dashboard"
        description="Create ads, track approvals, select packages, and submit payments from one place."
        action={
          <Link to="/client/ads/create">
            <Button>
              <PlusCircle size={18} />
              Create Ad
            </Button>
          </Link>
        }
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="My Ads"
          value="0"
          description="Total ads created"
          icon={Megaphone}
        />

        <StatCard
          title="Draft Ads"
          value="0"
          description="Ads not submitted yet"
          icon={FileText}
        />

        <StatCard
          title="Pending Payments"
          value="0"
          description="Payments required"
          icon={WalletCards}
        />

        <StatCard
          title="Published Ads"
          value="0"
          description="Live advertisements"
          icon={Megaphone}
        />
      </div>

      <div
        className="mt-8 rounded-2xl border p-6"
        style={{
          backgroundColor: "var(--color-surface)",
          borderColor: "var(--color-border)",
        }}
      >
        <h2 className="text-xl font-semibold">Quick Actions</h2>

        <div className="mt-5 flex flex-wrap gap-3">
          <Link to="/client/ads/create">
            <Button>Create New Ad</Button>
          </Link>

          <Link to="/client/ads">
            <Button variant="outline">View My Ads</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;