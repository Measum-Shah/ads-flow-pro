import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import AdDetailsCard from "../../components/ads/AdDetailsCard";
import AdMediaGallery from "../../components/ads/AdMediaGallery";
import AdStatusTimeline from "../../components/ads/AdStatusTimeline";

import ErrorMessage from "../../components/common/ErrorMessage";
import EmptyState from "../../components/common/EmptyState";

import PageLoader from "../../components/loaders/PageLoader";

import { getPublicAdDetails } from "../../api/public.api";
import { getApiError } from "../../utils/errorHandler";

const extractAd = (response) => {
  if (response?.data) return response.data;
  if (response?.ad) return response.ad;
  return response;
};

const AdDetails = () => {
  const { slug } = useParams();

  const [ad, setAd] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAdDetails = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getPublicAdDetails(slug);

      const adData = extractAd(response);

      setAd(adData);
    } catch (err) {
      setError(getApiError(err, "Failed to load advertisement."));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdDetails();
  }, [slug]);

  if (loading) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
        <PageLoader text="Loading advertisement..." />
      </section>
    );
  }

  if (error) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
        <ErrorMessage message={error} />
      </section>
    );
  }

  if (!ad) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
        <EmptyState
          title="Advertisement not found"
          description="The advertisement you are looking for does not exist or was removed."
        />
      </section>
    );
  }

return (
  <section className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
    <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
      <AdMediaGallery media={ad?.media || []} />

      <AdDetailsCard ad={ad} />
    </div>

   
  </section>
);
};

export default AdDetails;