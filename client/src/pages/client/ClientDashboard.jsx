import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FileText, Megaphone, PlusCircle, WalletCards } from "lucide-react";

import Button from "../../components/common/Button";
import DashboardPageHeader from "../../components/dashboard/DashboardPageHeader";
import StatCard from "../../components/dashboard/StatCard";
import CardSkeleton from "../../components/loaders/CardSkeleton";
import ErrorMessage from "../../components/common/ErrorMessage";

import { getClientDashboard } from "../../api/client.api"; // FIXED: Corrected named method import
import { getApiError } from "../../utils/errorHandler";

const ClientDashboard = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await getClientDashboard();
        // Backend returns standard wrap response shape: { success: true, data: [ ...ads ] }
        if (response?.data && Array.isArray(response.data)) {
          setAds(response.data);
        } else if (Array.isArray(response)) {
          setAds(response);
        }
      } catch (err) {
        setError(getApiError(err, "Failed to load dashboard statistics."));
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Compute live values dynamically using your status constants lifecycle keys [cite: 20]
  const totalAds = ads.length;
  
  const draftAds = ads.filter(
    (ad) => ad.status === "draft"
  ).length;
  
  const pendingPayments = ads.filter(
    (ad) => ad.status === "payment_pending"
  ).length;
  
  const publishedAds = ads.filter(
    (ad) => ad.status === "published"
  ).length;

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

      {error && (
        <div className="mb-5">
          <ErrorMessage message={error} />
        </div>
      )}

      {loading ? (
        <div className="mt-5">
          <CardSkeleton count={4} layout="grid" />
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="My Ads"
            value={totalAds.toString()}
            description="Total ads created"
            icon={Megaphone}
          />

          <StatCard
            title="Draft Ads"
            value={draftAds.toString()}
            description="Ads not submitted yet"
            icon={FileText}
          />

          <StatCard
            title="Pending Payments"
            value={pendingPayments.toString()}
            description="Payments required"
            icon={WalletCards}
          />

          <StatCard
            title="Published Ads"
            value={publishedAds.toString()}
            description="Live advertisements"
            icon={Megaphone}
          />
        </div>
      )}

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