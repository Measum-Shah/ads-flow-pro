import { createContext, useState } from "react";

export const LoaderContext = createContext(null);

export const LoaderProvider = ({ children }) => {
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const startPageLoading = () => {
    setIsPageLoading(true);
  };

  const stopPageLoading = () => {
    setIsPageLoading(false);
  };

  const startSubmitting = () => {
    setIsSubmitting(true);
  };

  const stopSubmitting = () => {
    setIsSubmitting(false);
  };

  return (
    <LoaderContext.Provider
      value={{
        isPageLoading,
        isSubmitting,
        startPageLoading,
        stopPageLoading,
        startSubmitting,
        stopSubmitting,
      }}
    >
      {children}
    </LoaderContext.Provider>
  );
};