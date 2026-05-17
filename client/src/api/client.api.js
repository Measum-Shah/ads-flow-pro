import axiosInstance from "./axiosInstance";

export const getClientDashboard = async () => {
  const response = await axiosInstance.get("/api/client/dashboard"); // GET /api/client/dashboard 
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
    "/api/client/ads", // POST /api/client/ads 
    payload
  );
  return response.data;
};

export const updateDraftAd = async (adId, payload) => {
  const response = await axiosInstance.patch(
    `/api/client/ads/${adId}`, // PATCH /api/client/ads/:id 
    payload
  );
  return response.data;
};

export const submitAdForReview = async (adId) => {
  const response = await axiosInstance.patch(
    `/api/client/ads/${adId}/submit` // PATCH /api/client/ads/:id/submit 
  );
  return response.data;
};

export const selectAdPackage = async (adId, packageId) => {
  // FIXED: Adjusted body to pass packageId directly, matching req.body.packageId on backend 
  const response = await axiosInstance.patch(
    `/api/client/ads/${adId}/package`, // PATCH /api/client/ads/:id/package 
    {
      packageId: packageId,
    }
  );
  return response.data;
};

export const submitPayment = async (payload) => {
  const response = await axiosInstance.post(
    "/api/client/payments", // POST /api/client/payments 
    payload
  );
  return response.data;
};

export const getAdStatusHistory = async (adId) => {
  const response = await axiosInstance.get(
    `/api/client/ads/${adId}/history` // GET /api/client/ads/:id/history 
  );
  return response.data;
};