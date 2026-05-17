export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export const TOKEN_KEY = "ads-flow-token";
export const USER_KEY = "ads-flow-user";

export const USER_ROLES = {
  CLIENT: "client",
  MODERATOR: "moderator",
  ADMIN: "admin",
  SUPER_ADMIN: "super_admin",
};

export const AD_STATUS = {
  DRAFT: "draft",
  SUBMITTED: "submitted",
  MODERATOR_APPROVED: "moderator_approved",
  MODERATOR_REJECTED: "moderator_rejected",
  PAYMENT_PENDING: "payment_pending",
  PAYMENT_SUBMITTED: "payment_submitted",
  PAYMENT_VERIFIED: "payment_verified",
  PAYMENT_REJECTED: "payment_rejected",
  SCHEDULED: "scheduled",
  PUBLISHED: "published",
  EXPIRED: "expired",
};

export const PAYMENT_METHODS = [
  { label: "Bank Transfer", value: "bank_transfer" },
  { label: "Easypaisa", value: "easypaisa" },
  { label: "JazzCash", value: "jazzcash" },
  { label: "Other", value: "other" },
];