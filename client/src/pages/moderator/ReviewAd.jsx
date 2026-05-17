import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AdDetailsCard from "../../components/ads/AdDetailsCard";
import AdMediaGallery from "../../components/ads/AdMediaGallery";
import Button from "../../components/common/Button";
import ErrorMessage from "../../components/common/ErrorMessage";
import DashboardPageHeader from "../../components/dashboard/DashboardPageHeader";
import PageLoader from "../../components/loaders/PageLoader";

import { getAdForReview, reviewAd } from "../../api/moderator.api";
import { getApiError } from "../../utils/errorHandler";

const extractAd = (response) => {
  if (response?.data) return response.data;
  if (response?.ad) return response.ad;
  return response;
};

const ReviewAd = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ad, setAd] = useState(null);
  const [note, setNote] = useState(""); // Captures mandatory moderation logic
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchAd = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getAdForReview(id);
      setAd(extractAd(response));
    } catch (err) {
      setError(getApiError(err, "Failed to load ad details."));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAd();
  }, [id]);

  const handleReview = async (action) => {
    // Backend validation rule alignment: block empty notes on rejections
    if (action === "reject" && !note.trim()) {
      setError("A rejection reason note is required to reject this advertisement.");
      return;
    }

    setActionLoading(true);
    setError("");

    try {
      // Sending note parameter to backend along with action
      await reviewAd(id, {
        action,
        note: note.trim() || undefined
      });

      navigate("/moderator/review-queue");
    } catch (err) {
      setError(getApiError(err, `Failed to ${action} ad.`));
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return <PageLoader text="Loading ad..." />;
  }

  return (
    <div>
      <DashboardPageHeader
        badge="Advertisement Review"
        title="Review Advertisement"
        description="Review advertisement details before approval or rejection."
        action={
          <div className="flex gap-3">
            <Button
              variant="outline"
              loading={actionLoading}
              onClick={() => handleReview("reject")}
            >
              Reject
            </Button>

            <Button
              variant="success"
              loading={actionLoading}
              onClick={() => handleReview("approve")}
            >
              Approve
            </Button>
          </div>
        }
      />

      {error && (
        <div className="mb-5">
          <ErrorMessage message={error} />
        </div>
      )}

      {/* Moderation note workspace box */}
      <div className="mb-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Moderation Action Note
        </label>
        <textarea
          className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          rows={3}
          placeholder="Type feedback here... (Mandatory if clicking Reject)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <AdMediaGallery media={ad?.media || []} />
        <AdDetailsCard ad={ad} />
      </div>
    </div>
  );
};

export default ReviewAd;