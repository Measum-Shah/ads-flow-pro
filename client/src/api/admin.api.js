import axiosInstance from "./axiosInstance";

export const getPaymentQueue = async () => {
  const response = await axiosInstance.get("/api/admin/payment-queue");
  return response.data;
};

export const verifyPayment = async (paymentId, verificationData) => {
  const response = await axiosInstance.patch(
    `/api/admin/payments/${paymentId}/verify`,
    verificationData
  );

  return response.data;
};

export const publishAd = async (adId, publishData) => {
  const response = await axiosInstance.patch(
    `/api/admin/ads/${adId}/publish`,
    publishData
  );

  return response.data;
};

export const getAdminAnalyticsSummary = async () => {
  const response = await axiosInstance.get("/api/admin/analytics/summary");
  return response.data;
};