import axiosInstance from "./axiosInstance";

export const getPackages = async () => {
  const response = await axiosInstance.get("/api/packages");
  return response.data;
};

export const getCategories = async () => {
  const response = await axiosInstance.get("/api/categories");
  return response.data;
};

export const getCities = async () => {
  const response = await axiosInstance.get("/api/cities");
  return response.data;
};

export const getPublishedAds = async (params = {}) => {
  const response = await axiosInstance.get("/api/ads", { params });
  return response.data;
};

export const getPublicAdDetails = async (slug) => {
  const response = await axiosInstance.get(`/api/ads/${slug}`);
  return response.data;
};

export const getRandomQuestion = async () => {
  const response = await axiosInstance.get("/api/questions/random");
  return response.data;
};