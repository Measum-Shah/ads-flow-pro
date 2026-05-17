export const formatCurrency = (amount = 0) => {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(Number(amount) || 0);
};

export const formatDate = (date) => {
  if (!date) return "N/A";

  return new Intl.DateTimeFormat("en-PK", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
};

export const formatDateTime = (date) => {
  if (!date) return "N/A";

  return new Intl.DateTimeFormat("en-PK", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
};

export const truncateText = (text = "", limit = 120) => {
  if (!text) return "";

  if (text.length <= limit) {
    return text;
  }

  return `${text.slice(0, limit)}...`;
};

export const getImageUrl = (media = []) => {
  if (!Array.isArray(media) || media.length === 0) {
    return null;
  }

  const firstMedia = media[0];

  return (
    firstMedia?.url ||
    firstMedia?.secureUrl ||
    firstMedia?.imageUrl ||
    firstMedia
  );
};

export const getEntityName = (entity) => {
  if (!entity) return "N/A";

  if (typeof entity === "string") return entity;

  return entity.name || entity.title || entity.fullName || "N/A";
};