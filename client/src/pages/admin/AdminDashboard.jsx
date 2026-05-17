import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  BarChart3,
  Clock3,
  DollarSign,
  FileText,
  Megaphone,
  Users,
} from "lucide-react";

import Button from "../../components/common/Button";
import DashboardPageHeader from "../../components/dashboard/DashboardPageHeader";
import StatCard from "../../components/dashboard/StatCard";
import ErrorMessage from "../../components/common/ErrorMessage";
import PageLoader from "../../components/loaders/PageLoader";

import { getAdminAnalyticsSummary } from "../../api/admin.api";
import { getApiError } from "../../utils/errorHandler";

const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAnalytics = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getAdminAnalyticsSummary();
      setAnalytics(response?.data || response);
    } catch (err) {
      setError(getApiError(err, "Failed to load analytics summary."));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  if (loading) {
    return <PageLoader text="Loading admin analytics..." />;
  }

  return (
    <div>
      <DashboardPageHeader
        badge="Admin Panel"
        title="Admin Dashboard"
        description="Monitor platform performance, payments, publishing, and advertisements."
        action={
          <Link to="/admin/publish-ads">
            <Button>
              <Megaphone size={18} />
              Publish Ads
            </Button>
          </Link>
        }
      />

      {error && (
        <div className="mb-5">
          <ErrorMessage message={error} />
        </div>
      )}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Ads"
          value={analytics?.listings?.total || 0}
          description="All advertisements"
          icon={FileText}
        />

        <StatCard
          title="Active Ads"
          value={analytics?.listings?.active || 0}
          description="Currently live ads"
          icon={BarChart3}
        />

        <StatCard
          title="Pending Review"
          value={analytics?.listings?.pendingReview || 0}
          description="Waiting moderation"
          icon={Clock3}
        />

        <StatCard
          title="Revenue"
          value={`Rs. ${analytics?.revenue?.total || 0}`}
          description="Verified payments"
          icon={DollarSign}
        />
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <div
          className="rounded-2xl border p-6"
          style={{
            backgroundColor: "var(--color-surface)",
            borderColor: "var(--color-border)",
          }}
        >
          <h2 className="text-xl font-semibold">Moderation Statistics</h2>

          <div className="mt-5 grid gap-4">
            <div className="flex items-center justify-between">
              <span>Total Reviewed</span>
              <strong>{analytics?.moderation?.totalReviewed || 0}</strong>
            </div>

            <div className="flex items-center justify-between">
              <span>Total Rejected</span>
              <strong>{analytics?.moderation?.totalRejected || 0}</strong>
            </div>

            <div className="flex items-center justify-between">
              <span>Approval Rate</span>
              <strong>{analytics?.moderation?.approvalRate || "0%"}</strong>
            </div>
          </div>
        </div>

        <div
          className="rounded-2xl border p-6"
          style={{
            backgroundColor: "var(--color-surface)",
            borderColor: "var(--color-border)",
          }}
        >
          <h2 className="text-xl font-semibold">Admin Actions</h2>

          <div className="mt-5 grid gap-3">
            <Link to="/admin/payment-queue">
              <Button variant="outline" fullWidth>
                Verify Payments
              </Button>
            </Link>

            <Link to="/admin/publish-ads">
              <Button fullWidth>Publish Verified Ads</Button>
            </Link>

            <Link to="/admin/analytics">
              <Button variant="secondary" fullWidth>
                View Full Analytics
              </Button>
            </Link>
          </div>
        </div>

        <div
          className="rounded-2xl border p-6 lg:col-span-2"
          style={{
            backgroundColor: "var(--color-surface)",
            borderColor: "var(--color-border)",
          }}
        >
          <h2 className="text-xl font-semibold">Users</h2>

          <div className="mt-5">
            <StatCard
              title="Total Clients"
              value={analytics?.users?.totalClients || 0}
              description="Registered clients"
              icon={Users}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;