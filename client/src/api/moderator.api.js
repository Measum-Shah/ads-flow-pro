import axiosInstance from "./axiosInstance";

export const getReviewQueue = async () => {
  const response = await axiosInstance.get("/api/moderator/review-queue");
  return response.data;
};

export const getModeratorAdDetails = async (adId) => {
  const response = await axiosInstance.get(`/api/moderator/ads/${adId}`);
  return response.data;
};

export const reviewAd = async (adId, reviewData) => {
  const response = await axiosInstance.patch(
    `/api/moderator/ads/${adId}/review`,
    reviewData
  );

  return response.data;
};