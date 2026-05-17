import { useEffect, useState } from "react";

import AdCard from "../../components/ads/AdCard";
import DashboardPageHeader from "../../components/dashboard/DashboardPageHeader";
import EmptyState from "../../components/common/EmptyState";
import ErrorMessage from "../../components/common/ErrorMessage";
import CardSkeleton from "../../components/loaders/CardSkeleton";

import { getPublishAds, publishAd } from "../../api/admin.api";
import { getApiError } from "../../utils/errorHandler";

const extractAds = (response) => {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.data)) return response.data;
  if (Array.isArray(response?.ads)) return response.ads;
  return [];
};

const Publishad = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState("");
  const [error, setError] = useState("");

  const fetchAds = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getPublishAds();
      setAds(extractAds(response));
    } catch (err) {
      setError(getApiError(err, "Failed to load ads ready for publishing."));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  const handlePublish = async (ad) => {
    const adId = ad?._id || ad?.id;

    if (!adId) {
      setError("Invalid ad selected.");
      return;
    }

    setActionLoadingId(adId);
    setError("");

    try {
      await publishAd(adId, {
        publishNow: true,
      });

      fetchAds();
    } catch (err) {
      setError(getApiError(err, "Failed to publish ad."));
    } finally {
      setActionLoadingId("");
    }
  };

  return (
    <div>
      <DashboardPageHeader
        badge="Publishing Queue"
        title="Publish Verified Ads"
        description="Publish advertisements whose payments have been verified."
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
                  label: "Publish Now",
                  onClick: () => handlePublish(ad),
                }}
                loading={actionLoadingId === adId}
              />
            );
          })}
        </div>
      ) : (
        <EmptyState
          title="No ads ready for publishing"
          description="No payment-verified ads are currently waiting for publishing."
        />
      )}
    </div>
  );
};

export default Publishad;