import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AdCard from "../../components/ads/AdCard";
import Button from "../../components/common/Button";
import EmptyState from "../../components/common/EmptyState";
import ErrorMessage from "../../components/common/ErrorMessage";
import DashboardPageHeader from "../../components/dashboard/DashboardPageHeader";
import CardSkeleton from "../../components/loaders/CardSkeleton";

import { getClientDashboard } from "../../api/client.api";
import { getApiError } from "../../utils/errorHandler";

import {
  canClientChoosePackage,
  canClientEditAd,
  canClientSubmitPayment,
} from "../../utils/statusRules";

const extractAds = (response) => {
  console.log("Client dashboard response:", response);

  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.ads)) return response.ads;
  if (Array.isArray(response?.myAds)) return response.myAds;
  if (Array.isArray(response?.recentAds)) return response.recentAds;

  if (Array.isArray(response?.data)) return response.data;
  if (Array.isArray(response?.data?.ads)) return response.data.ads;
  if (Array.isArray(response?.data?.myAds)) return response.data.myAds;
  if (Array.isArray(response?.data?.recentAds)) return response.data.recentAds;
  if (Array.isArray(response?.data?.draftAds)) return response.data.draftAds;

  return [];
};

const MyAds = () => {
  const navigate = useNavigate();

  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMyAds = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getClientDashboard();
      const extractedAds = extractAds(response);
      setAds(extractedAds);
    } catch (err) {
      setError(getApiError(err, "Failed to load your ads."));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyAds();
  }, []);

  const getPrimaryAction = (ad) => {
    const adId = ad?._id || ad?.id;

    if (canClientEditAd(ad?.status)) {
      return {
        label: "Edit Ad",
        onClick: () => navigate(`/client/ads/${adId}/edit`),
      };
    }

    if (canClientChoosePackage(ad?.status)) {
      return {
        label: "Choose Package",
        onClick: () => navigate(`/client/ads/${adId}/package`),
      };
    }

    if (canClientSubmitPayment(ad?.status)) {
      return {
        label: "Submit Payment",
        onClick: () => navigate(`/client/ads/${adId}/payment`),
      };
    }

    return null;
  };

  const getSecondaryAction = (ad) => {
    const adId = ad?._id || ad?.id;

    return {
      label: "View History",
      onClick: () => navigate(`/client/ads/${adId}/history`),
    };
  };

  return (
    <div>
      <DashboardPageHeader
        badge="Advertisements"
        title="My Ads"
        description="Manage your created advertisements and track their workflow progress."
        action={
          <Link to="/client/ads/create">
            <Button>Create Ad</Button>
          </Link>
        }
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
          {ads.map((ad) => (
            <AdCard
              key={ad._id || ad.id}
              ad={ad}
              showStatus
              showActions
              primaryAction={getPrimaryAction(ad)}
              secondaryAction={getSecondaryAction(ad)}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No ads created yet"
          description="You have not created any advertisements yet."
          actionText="Create First Ad"
          onAction={() => navigate("/client/ads/create")}
        />
      )}
    </div>
  );
};

export default MyAds;