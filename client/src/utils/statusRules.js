import { AD_STATUS } from "./constants";

export const STATUS_LABELS = {
  [AD_STATUS.DRAFT]: "Draft",
  [AD_STATUS.SUBMITTED]: "Submitted",
  [AD_STATUS.MODERATOR_APPROVED]: "Moderator Approved",
  [AD_STATUS.MODERATOR_REJECTED]: "Moderator Rejected",
  [AD_STATUS.PAYMENT_PENDING]: "Payment Pending",
  [AD_STATUS.PAYMENT_SUBMITTED]: "Payment Submitted",
  [AD_STATUS.PAYMENT_VERIFIED]: "Payment Verified",
  [AD_STATUS.PAYMENT_REJECTED]: "Payment Rejected",
  [AD_STATUS.SCHEDULED]: "Scheduled",
  [AD_STATUS.PUBLISHED]: "Published",
  [AD_STATUS.EXPIRED]: "Expired",
};

export const STATUS_VARIANTS = {
  [AD_STATUS.DRAFT]: "default",
  [AD_STATUS.SUBMITTED]: "info",
  [AD_STATUS.MODERATOR_APPROVED]: "success",
  [AD_STATUS.MODERATOR_REJECTED]: "danger",
  [AD_STATUS.PAYMENT_PENDING]: "warning",
  [AD_STATUS.PAYMENT_SUBMITTED]: "info",
  [AD_STATUS.PAYMENT_VERIFIED]: "success",
  [AD_STATUS.PAYMENT_REJECTED]: "danger",
  [AD_STATUS.SCHEDULED]: "primary",
  [AD_STATUS.PUBLISHED]: "success",
  [AD_STATUS.EXPIRED]: "default",
};

export const getStatusLabel = (status) => {
  return STATUS_LABELS[status] || "Unknown";
};

export const getStatusVariant = (status) => {
  return STATUS_VARIANTS[status] || "default";
};

export const canClientEditAd = (status) => {
  return status === AD_STATUS.DRAFT;
};

export const canClientSubmitAd = (status) => {
  return status === AD_STATUS.DRAFT;
};

export const canClientChoosePackage = (status) => {
  return status === AD_STATUS.MODERATOR_APPROVED;
};

export const canClientSubmitPayment = (status) => {
  return status === AD_STATUS.PAYMENT_PENDING;
};

export const canModeratorReviewAd = (status) => {
  return status === AD_STATUS.SUBMITTED;
};

export const canAdminVerifyPayment = (status) => {
  return status === AD_STATUS.PAYMENT_SUBMITTED;
};

export const canAdminPublishAd = (status) => {
  return status === AD_STATUS.PAYMENT_VERIFIED;
};