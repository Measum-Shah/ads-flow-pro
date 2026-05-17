import { useEffect, useState } from "react";
import { CheckCircle, Clock3, ShieldAlert } from "lucide-react";

import DashboardPageHeader from "../../components/dashboard/DashboardPageHeader";
import StatCard from "../../components/dashboard/StatCard";
import { getReviewQueue } from "../../api/moderator.api";

const ModeratorDashboard = () => {
  const [pendingCount, setPendingCount] = useState(0);
  const [approvedCount, setApprovedCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        setLoading(true);
        const response = await getReviewQueue();
        
        if (response) {
          // data.length contains total current submitted ads 
          setPendingCount(response.data?.length || 0);
          // Map to real database document aggregations
          setApprovedCount(response.approvedCount || 0);
          setRejectedCount(response.rejectedCount || 0);
        }
      } catch (err) {
        console.error("Failed to load backend metrics for dashboard:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  return (
    <div>
      <DashboardPageHeader
        badge="Moderator Panel"
        title="Moderator Dashboard"
        description="Review advertisements submitted by clients and maintain platform quality."
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <StatCard
          title="Pending Reviews"
          value={loading ? "..." : pendingCount.toString()}
          description="Ads awaiting moderation"
          icon={Clock3}
        />

        <StatCard
          title="Approved Ads"
          value={loading ? "..." : approvedCount.toString()}
          description="Successfully approved ads"
          icon={CheckCircle}
        />

        <StatCard
          title="Rejected Ads"
          value={loading ? "..." : rejectedCount.toString()}
          description="Rejected advertisements"
          icon={ShieldAlert}
        />
      </div>
    </div>
  );
};

export default ModeratorDashboard;