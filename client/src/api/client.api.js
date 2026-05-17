import axiosInstance from "./axiosInstance";

export const getClientDashboard = async () => {
  const response = await axiosInstance.get("/api/client/dashboard");
  return response.data;
};

export const getClientAdDetails = async (adId) => {
  const response = await axiosInstance.get(
    `/api/client/ads/${adId}`
  );

  return response.data;
};

export const createAd = async (payload) => {
  const response = await axiosInstance.post(
    "/api/client/ads",
    payload
  );

  return response.data;
};

export const updateDraftAd = async (adId, payload) => {
  const response = await axiosInstance.patch(
    `/api/client/ads/${adId}`,
    payload
  );

  return response.data;
};

export const submitAdForReview = async (adId) => {
  const response = await axiosInstance.patch(
    `/api/client/ads/${adId}/submit`
  );

  return response.data;
};

export const selectAdPackage = async (adId, packageId) => {
  const response = await axiosInstance.patch(
    `/api/client/ads/${adId}/package`,
    {
      package: packageId,
    }
  );

  return response.data;
};

export const submitPayment = async (payload) => {
  const response = await axiosInstance.post(
    "/api/client/payments",
    payload
  );

  return response.data;
};

export const getAdStatusHistory = async (adId) => {
  const response = await axiosInstance.get(
    `/api/client/ads/${adId}/history`
  );

  return response.data;
};