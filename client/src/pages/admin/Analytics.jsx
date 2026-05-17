import { useEffect, useState } from "react";

import {
  BarChart3,
  DollarSign,
  MapPin,
  ShieldCheck,
  Tag,
  Users,
} from "lucide-react";

import DashboardPageHeader from "../../components/dashboard/DashboardPageHeader";

import ErrorMessage from "../../components/common/ErrorMessage";

import PageLoader from "../../components/loaders/PageLoader";

import { getAdminAnalyticsSummary } from "../../api/admin.api";

import { getApiError } from "../../utils/errorHandler";

const AnalyticsCard = ({
  title,
  value,
  icon: Icon,
}) => {
  return (
    <div
      className="rounded-2xl border p-5"
      style={{
        backgroundColor: "var(--color-surface)",
        borderColor: "var(--color-border)",
      }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p
            className="text-sm"
            style={{
              color: "var(--color-muted)",
            }}
          >
            {title}
          </p>

          <h3 className="mt-2 text-3xl font-bold">
            {value}
          </h3>
        </div>

        <div
          className="flex h-14 w-14 items-center justify-center rounded-2xl"
          style={{
            backgroundColor:
              "var(--color-surface-soft)",
          }}
        >
          <Icon size={28} />
        </div>
      </div>
    </div>
  );
};

const AnalyticsSection = ({
  title,
  children,
}) => {
  return (
    <div
      className="rounded-2xl border p-6"
      style={{
        backgroundColor: "var(--color-surface)",
        borderColor: "var(--color-border)",
      }}
    >
      <h2 className="text-xl font-semibold">
        {title}
      </h2>

      <div className="mt-5">
        {children}
      </div>
    </div>
  );
};

const AnalyticsList = ({ data = [] }) => {
  if (!data.length) {
    return (
      <p
        style={{
          color: "var(--color-muted)",
        }}
      >
        No analytics data available.
      </p>
    );
  }

  return (
    <div className="grid gap-4">
      {data.map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-between rounded-xl border p-4"
          style={{
            borderColor: "var(--color-border)",
          }}
        >
          <span>{item.name}</span>

          <strong>{item.count}</strong>
        </div>
      ))}
    </div>
  );
};

const Analytics = () => {
  const [analytics, setAnalytics] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] = useState("");

  const fetchAnalytics = async () => {
    setLoading(true);

    setError("");

    try {
      const response =
        await getAdminAnalyticsSummary();

      setAnalytics(response?.data || response);
    } catch (err) {
      setError(
        getApiError(
          err,
          "Failed to load analytics."
        )
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <PageLoader text="Loading analytics..." />
    );
  }

  return (
    <div>
      <DashboardPageHeader
        badge="Analytics"
        title="Platform Analytics"
        description="Detailed insights about advertisements, moderation, revenue, and users."
      />

      {error && (
        <div className="mb-5">
          <ErrorMessage message={error} />
        </div>
      )}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <AnalyticsCard
          title="Total Ads"
          value={
            analytics?.listings?.total || 0
          }
          icon={BarChart3}
        />

        <AnalyticsCard
          title="Revenue"
          value={`Rs. ${
            analytics?.revenue?.total || 0
          }`}
          icon={DollarSign}
        />

        <AnalyticsCard
          title="Approval Rate"
          value={
            analytics?.moderation
              ?.approvalRate || "0%"
          }
          icon={ShieldCheck}
        />

        <AnalyticsCard
          title="Clients"
          value={
            analytics?.users?.totalClients ||
            0
          }
          icon={Users}
        />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <AnalyticsSection title="Listings">
          <div className="grid gap-4">
            <div className="flex justify-between">
              <span>Active Ads</span>

              <strong>
                {
                  analytics?.listings
                    ?.active
                }
              </strong>
            </div>

            <div className="flex justify-between">
              <span>Draft Ads</span>

              <strong>
                {
                  analytics?.listings
                    ?.draft
                }
              </strong>
            </div>

            <div className="flex justify-between">
              <span>Scheduled Ads</span>

              <strong>
                {
                  analytics?.listings
                    ?.scheduled
                }
              </strong>
            </div>

            <div className="flex justify-between">
              <span>Expired Ads</span>

              <strong>
                {
                  analytics?.listings
                    ?.expired
                }
              </strong>
            </div>
          </div>
        </AnalyticsSection>

        <AnalyticsSection title="Moderation">
          <div className="grid gap-4">
            <div className="flex justify-between">
              <span>Total Reviewed</span>

              <strong>
                {
                  analytics?.moderation
                    ?.totalReviewed
                }
              </strong>
            </div>

            <div className="flex justify-between">
              <span>Total Rejected</span>

              <strong>
                {
                  analytics?.moderation
                    ?.totalRejected
                }
              </strong>
            </div>

            <div className="flex justify-between">
              <span>Approval Rate</span>

              <strong>
                {
                  analytics?.moderation
                    ?.approvalRate
                }
              </strong>
            </div>
          </div>
        </AnalyticsSection>

        <AnalyticsSection title="Ads By Category">
          <div className="mb-5 flex items-center gap-2">
            <Tag size={18} />

            <span>Published ads by category</span>
          </div>

          <AnalyticsList
            data={
              analytics?.taxonomy
                ?.adsByCategory || []
            }
          />
        </AnalyticsSection>

        <AnalyticsSection title="Ads By City">
          <div className="mb-5 flex items-center gap-2">
            <MapPin size={18} />

            <span>Published ads by city</span>
          </div>

          <AnalyticsList
            data={
              analytics?.taxonomy
                ?.adsByCity || []
            }
          />
        </AnalyticsSection>
      </div>
    </div>
  );
};

export default Analytics;