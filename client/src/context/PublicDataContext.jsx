import { createContext, useEffect, useState } from "react";
import {
  getCategories,
  getCities,
  getPackages,
  getRandomQuestion,
} from "../api/public.api";

export const PublicDataContext = createContext(null);

const extractArray = (response) => {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.data)) return response.data;
  if (Array.isArray(response?.categories)) return response.categories;
  if (Array.isArray(response?.cities)) return response.cities;
  if (Array.isArray(response?.packages)) return response.packages;
  return [];
};

const extractSingle = (response) => {
  if (response?.data) return response.data;
  return response || null;
};

export const PublicDataProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [packages, setPackages] = useState([]);
  const [randomQuestion, setRandomQuestion] = useState(null);

  const [publicDataLoading, setPublicDataLoading] = useState(false);
  const [publicDataError, setPublicDataError] = useState("");

  const fetchPublicData = async () => {
    setPublicDataLoading(true);
    setPublicDataError("");

    try {
      const [categoriesRes, citiesRes, packagesRes, questionRes] =
        await Promise.allSettled([
          getCategories(),
          getCities(),
          getPackages(),
          getRandomQuestion(),
        ]);

      if (categoriesRes.status === "fulfilled") {
        setCategories(extractArray(categoriesRes.value));
      }

      if (citiesRes.status === "fulfilled") {
        setCities(extractArray(citiesRes.value));
      }

      if (packagesRes.status === "fulfilled") {
        setPackages(extractArray(packagesRes.value));
      }

      if (questionRes.status === "fulfilled") {
        setRandomQuestion(extractSingle(questionRes.value));
      }
    } catch {
      setPublicDataError("Failed to load public data.");
    } finally {
      setPublicDataLoading(false);
    }
  };

  const refreshPublicData = () => {
    fetchPublicData();
  };

  useEffect(() => {
    fetchPublicData();
  }, []);

  return (
    <PublicDataContext.Provider
      value={{
        categories,
        cities,
        packages,
        randomQuestion,
        publicDataLoading,
        publicDataError,
        refreshPublicData,
      }}
    >
      {children}
    </PublicDataContext.Provider>
  );
};