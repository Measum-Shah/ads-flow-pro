import { CalendarDays, MapPin, Tag } from "lucide-react";
import { Link } from "react-router-dom";

import Button from "../common/Button";
import StatusBadge from "./StatusBadge";

import {
  formatDate,
  getEntityName,
  getImageUrl,
  truncateText,
} from "../../utils/formatters";

// ... keeping your existing imports and logic ...

const AdCard = ({
  ad,
  showStatus = false,
  showActions = false,
  primaryAction,
  secondaryAction,
}) => {
  const title = ad?.title || "Untitled Ad";
  const description = ad?.description || "No advertisement description is available.";
  const imageUrl = getImageUrl(ad?.media);
  const categoryName = getEntityName(ad?.categoryId || ad?.category);
  const cityName = getEntityName(ad?.cityId || ad?.city);
  const createdDate = formatDate(ad?.createdAt);
  const adSlug = ad?.slug || ad?._id;

  // Check if the ad is fully live and public
  const isPublished = ad?.status === "published";

  return (
    <article
      className="overflow-hidden rounded-2xl border transition hover:-translate-y-1"
      style={{
        backgroundColor: "var(--color-surface)",
        borderColor: "var(--color-border)",
        boxShadow: "var(--shadow-soft)",
      }}
    >
      {/* Media Section */}
      <div className="relative h-56 w-full overflow-hidden" style={{ backgroundColor: "var(--color-surface-soft)" }}>
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-sm font-medium" style={{ color: "var(--color-muted)" }}>
            No Image Available
          </div>
        )}

        {showStatus && ad?.status && (
          <div className="absolute left-4 top-4">
            <StatusBadge status={ad.status} />
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-5">
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium" style={{ backgroundColor: "var(--color-surface-soft)", color: "var(--color-muted)" }}>
            <Tag size={14} />
            {categoryName}
          </div>

          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium" style={{ backgroundColor: "var(--color-surface-soft)", color: "var(--color-muted)" }}>
            <MapPin size={14} />
            {cityName}
          </div>
        </div>

        {/* ONLY Link the title if the ad is published */}
        {isPublished ? (
          <Link to={`/ads/${ad.slug}`}>
            <h2 className="mt-4 text-2xl font-bold transition hover:text-[var(--color-primary)]">
              {title}
            </h2>
          </Link>
        ) : (
          <h2 className="mt-4 text-2xl font-bold text-gray-700 cursor-default">
            {title}
          </h2>
        )}

        <p className="mt-3 text-sm leading-6" style={{ color: "var(--color-muted)" }}>
          {truncateText(description, 140)}
        </p>

        <div className="mt-5 flex items-center gap-2 text-sm" style={{ color: "var(--color-muted)" }}>
          <CalendarDays size={16} />
          <span>{createdDate}</span>
        </div>

        {/* Actions Row */}
        <div className="mt-6 flex flex-wrap gap-3">
          {/* ONLY show "View Details" button if published. Otherwise, hide it or change it */}
          {isPublished ? (
            <Link to={`/ads/${adSlug}`}>
              <Button variant="outline">View Details</Button>
            </Link>
          ) : (
            <Button variant="outline" disabled title="This ad is not published yet">
              Under Review
            </Button>
          )}

          {showActions && primaryAction && (
            <Button onClick={() => primaryAction.onClick(ad)}>
              {primaryAction.label}
            </Button>
          )}

          {showActions && secondaryAction && (
            <Button variant="secondary" onClick={() => secondaryAction.onClick(ad)}>
              {secondaryAction.label}
            </Button>
          )}
        </div>
      </div>
    </article>
  );
};

export default AdCard;