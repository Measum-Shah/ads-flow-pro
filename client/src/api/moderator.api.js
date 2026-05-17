import axiosInstance from "./axiosInstance";

export const getReviewQueue = async () => {
  const response = await axiosInstance.get(
    "/api/moderator/review-queue"
  );

  return response.data;
};

export const getAdForReview = async (adId) => {
  const response = await axiosInstance.get(
    `/api/moderator/ads/${adId}`
  );

  return response.data;
};

export const reviewAd = async (adId, payload) => {
  const response = await axiosInstance.patch(
    `/api/moderator/ads/${adId}/review`,
    payload
  );

  return response.data;
};