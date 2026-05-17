import axiosInstance from "./axiosInstance";

export const registerUser = async (userData) => {
  const response = await axiosInstance.post("/api/auth/register", userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await axiosInstance.post("/api/auth/login", credentials);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await axiosInstance.get("/api/auth/me");
  return response.data;
};