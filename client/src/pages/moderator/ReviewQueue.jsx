import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AdCard from "../../components/ads/AdCard";
import EmptyState from "../../components/common/EmptyState";
import ErrorMessage from "../../components/common/ErrorMessage";
import DashboardPageHeader from "../../components/dashboard/DashboardPageHeader";
import CardSkeleton from "../../components/loaders/CardSkeleton";

import { getReviewQueue, reviewAd } from "../../api/moderator.api";
import { getApiError } from "../../utils/errorHandler";

const extractAds = (response) => {
  // Aligned with controller response payload: res.json({ success: true, data: result })
  if (response?.data && Array.isArray(response.data)) return response.data;
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.ads)) return response.ads;
  if (Array.isArray(response?.queue)) return response.queue;

  return [];
};

const ReviewQueue = () => {
  const navigate = useNavigate();
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState("");
  const [error, setError] = useState("");

  const fetchQueue = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getReviewQueue();
      setAds(extractAds(response));
    } catch (err) {
      setError(getApiError(err, "Failed to load review queue."));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueue();
  }, []);

  const handleReview = async (ad, action) => {
    const adId = ad?._id || ad?.id;
    let note = "";

    // Backend requires a note string on reject actions
    if (action === "reject") {
      const inputNote = window.prompt("Please provide a rejection reason (Required):");
      if (inputNote === null) return; // User canceled the prompt box
      if (!inputNote.trim()) {
        setError("A rejection reason is mandatory to reject an ad.");
        return;
      }
      note = inputNote.trim();
    }

    setActionLoadingId(adId);
    setError("");

    try {
      await reviewAd(adId, { action, note: note || undefined });
      fetchQueue();
    } catch (err) {
      setError(getApiError(err, `Failed to ${action} ad.`));
    } finally {
      setActionLoadingId("");
    }
  };

  return (
    <div>
      <DashboardPageHeader
        badge="Moderation Queue"
        title="Review Submitted Ads"
        description="Approve or reject advertisements submitted by clients."
      />

      {error && (
        <div className="mb-5">
          <ErrorMessage message={error} />
        </div>
      )}

      {loading ? (
        <CardSkeleton count={6} />
      ) : ads.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {ads.map((ad) => {
            const adId = ad?._id || ad?.id;

            return (
              <AdCard
                key={adId}
                ad={ad}
                showStatus
                showActions
                primaryAction={{
                  label: "Approve",
                  onClick: () => handleReview(ad, "approve"),
                }}
                secondaryAction={{
                  label: "Reject",
                  onClick: () => handleReview(ad, "reject"),
                }}
                loading={actionLoadingId === adId}
              />
            );
          })}
        </div>
      ) : (
        <EmptyState
          title="No ads pending review"
          description="All submitted advertisements have already been reviewed."
        />
      )}
    </div>
  );
};

export default ReviewQueue;