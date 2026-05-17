import {
  CalendarDays,
  MapPin,
  Tag,
  UserCircle,
} from "lucide-react";

import StatusBadge from "./StatusBadge";

import {
  formatDate,
  getEntityName,
} from "../../utils/formatters";

const AdDetailsCard = ({
  ad,
  showStatus = true,
}) => {
  const title = ad?.title || "Untitled Advertisement";

  const description =
    ad?.description ||
    "No description available for this advertisement.";

  const categoryName = getEntityName(
    ad?.categoryId || ad?.category
  );

  const cityName = getEntityName(
    ad?.cityId || ad?.city
  );

  const ownerName = getEntityName(
    ad?.createdBy || ad?.owner
  );

  return (
    <div
      className="rounded-3xl border p-6 lg:p-8"
      style={{
        backgroundColor: "var(--color-surface)",
        borderColor: "var(--color-border)",
        boxShadow: "var(--shadow-soft)",
      }}
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium"
              style={{
                backgroundColor: "var(--color-surface-soft)",
                color: "var(--color-muted)",
              }}
            >
              <Tag size={14} />
              {categoryName}
            </div>

            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium"
              style={{
                backgroundColor: "var(--color-surface-soft)",
                color: "var(--color-muted)",
              }}
            >
              <MapPin size={14} />
              {cityName}
            </div>
          </div>

          <h1 className="mt-5 text-4xl font-bold leading-tight">
            {title}
          </h1>
        </div>

        {showStatus && ad?.status && (
          <StatusBadge status={ad.status} />
        )}
      </div>

      <div
        className="mt-6 flex flex-wrap gap-5 text-sm"
        style={{ color: "var(--color-muted)" }}
      >
        <div className="flex items-center gap-2">
          <CalendarDays size={16} />
          <span>{formatDate(ad?.createdAt)}</span>
        </div>

        <div className="flex items-center gap-2">
          <UserCircle size={16} />
          <span>{ownerName}</span>
        </div>
      </div>

      <div
        className="mt-8 rounded-2xl p-6"
        style={{
          backgroundColor: "var(--color-surface-soft)",
        }}
      >
        <h2 className="text-xl font-semibold">
          Advertisement Description
        </h2>

        <p
          className="mt-4 whitespace-pre-line leading-8"
          style={{ color: "var(--color-muted)" }}
        >
          {description}
        </p>
      </div>
    </div>
  );
};

export default AdDetailsCard;