import { useEffect, useState } from "react";
import AdCard from "../../components/ads/AdCard";
import AdFilters from "../../components/ads/AdFilters";
import EmptyState from "../../components/common/EmptyState";
import ErrorMessage from "../../components/common/ErrorMessage";
import CardSkeleton from "../../components/loaders/CardSkeleton";
import { getPublishedAds } from "../../api/public.api";
import { usePublicData } from "../../hooks/usePublicData";
import { getApiError } from "../../utils/errorHandler";

const extractAds = (response) => {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.data)) return response.data;
  if (Array.isArray(response?.ads)) return response.ads;
  if (Array.isArray(response?.data?.ads)) return response.data.ads;
  return [];
};

const BrowseAds = () => {
  const { categories, cities } = usePublicData();

  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [filters, setFilters] = useState({
    search: "",
    category: "",
    city: "",
    sort: "newest",
  });

  const fetchAds = async (filterValues = filters) => {
    setLoading(true);
    setError("");

    try {
      const response = await getPublishedAds(filterValues);
      setAds(extractAds(response));
    } catch (err) {
      setError(getApiError(err, "Failed to load ads."));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  const handleApplyFilters = () => {
    fetchAds(filters);
  };

  const handleResetFilters = () => {
    const resetFilters = {
      search: "",
      category: "",
      city: "",
      sort: "newest",
    };

    setFilters(resetFilters);
    fetchAds(resetFilters);
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
      <div className="mb-10">
        <p
          className="mb-3 text-sm font-semibold uppercase tracking-wide"
          style={{ color: "var(--color-primary)" }}
        >
          Public Ads
        </p>

        <h1 className="text-4xl font-bold">
          Discover professional advertisements
        </h1>

        <p
          className="mt-3 max-w-2xl leading-7"
          style={{ color: "var(--color-muted)" }}
        >
          Browse verified and moderated ads published through Ads Flow.
        </p>
      </div>

      <AdFilters
        filters={filters}
        onChange={setFilters}
        onApply={handleApplyFilters}
        onReset={handleResetFilters}
        categories={categories}
        cities={cities}
        loading={loading}
      />

      <div className="mt-8">
        {error && <ErrorMessage message={error} />}

        {loading ? (
          <CardSkeleton count={6} />
        ) : ads.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {ads.map((ad) => (
              <AdCard key={ad._id || ad.id} ad={ad} showStatus />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No ads found"
            description="No published ads matched your current filters."
            actionText="Reset Filters"
            onAction={handleResetFilters}
          />
        )}
      </div>
    </section>
  );
};

export default BrowseAds;