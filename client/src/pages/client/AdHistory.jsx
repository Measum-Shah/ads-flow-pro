import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import AdStatusTimeline from "../../components/ads/AdStatusTimeline";
import Button from "../../components/common/Button";
import EmptyState from "../../components/common/EmptyState";
import ErrorMessage from "../../components/common/ErrorMessage";
import DashboardPageHeader from "../../components/dashboard/DashboardPageHeader";
import PageLoader from "../../components/loaders/PageLoader";

import { getAdStatusHistory } from "../../api/client.api";
import { getApiError } from "../../utils/errorHandler";

const extractHistory = (response) => {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.data)) return response.data;
  if (Array.isArray(response?.history)) return response.history;
  if (Array.isArray(response?.statusHistory)) return response.statusHistory;
  if (Array.isArray(response?.data?.history)) return response.data.history;
  if (Array.isArray(response?.data?.statusHistory)) return response.data.statusHistory;
  return [];
};

const AdHistory = () => {
  const { id } = useParams();

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchHistory = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getAdStatusHistory(id);
      setHistory(extractHistory(response));
    } catch (err) {
      setError(getApiError(err, "Failed to load ad history."));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [id]);

  return (
    <div>
      <DashboardPageHeader
        badge="Ad Tracking"
        title="Ad Status History"
        description="Track every important step your advertisement has passed through."
        action={
          <Link to="/client/ads">
            <Button variant="outline">Back to My Ads</Button>
          </Link>
        }
      />

      {loading ? (
        <PageLoader text="Loading ad history..." />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : history.length > 0 ? (
        <AdStatusTimeline history={history} />
      ) : (
        <EmptyState
          title="No status history found"
          description="This ad does not have any recorded status changes yet."
        />
      )}
    </div>
  );
};

export default AdHistory;