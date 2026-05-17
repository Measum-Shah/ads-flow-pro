import axiosInstance from "./axiosInstance";

export const getClientDashboard = async () => {
  const response = await axiosInstance.get("/api/client/dashboard");
  return response.data;
};

export const createAd = async (adData) => {
  const response = await axiosInstance.post("/api/client/ads", adData);
  return response.data;
};

export const updateDraftAd = async (adId, adData) => {
  const response = await axiosInstance.patch(`/api/client/ads/${adId}`, adData);
  return response.data;
};

export const submitAdForReview = async (adId) => {
  const response = await axiosInstance.patch(`/api/client/ads/${adId}/submit`);
  return response.data;
};

export const selectAdPackage = async (adId, packageId) => {
  const response = await axiosInstance.patch(`/api/client/ads/${adId}/package`, {
    packageId,
  });

  return response.data;
};

export const submitPaymentProof = async (paymentData) => {
  const response = await axiosInstance.post("/api/client/payments", paymentData);
  return response.data;
};

export const getAdStatusHistory = async (adId) => {
  const response = await axiosInstance.get(`/api/client/ads/${adId}/history`);
  return response.data;
};