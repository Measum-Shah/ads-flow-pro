import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AdForm from "../../components/forms/AdForm";
import ErrorMessage from "../../components/common/ErrorMessage";
import DashboardPageHeader from "../../components/dashboard/DashboardPageHeader";

import { createAd } from "../../api/client.api";
import { usePublicData } from "../../hooks/usePublicData";
import { getApiError } from "../../utils/errorHandler";

const CreateAd = () => {
  const navigate = useNavigate();
  const { categories, cities } = usePublicData();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    categoryId: "",
    cityId: "",
    contactPhone: "",
    imageUrl: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const buildPayload = () => {
    const media = formData.imageUrl ? [{ url: formData.imageUrl }] : [];

    return {
      title: formData.title,
      description: formData.description,

      // Backend expects these exact names
      category: formData.categoryId,
      city: formData.cityId,

      contactPhone: formData.contactPhone,
      media,
    };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!formData.categoryId) {
      setError("Please select a category.");
      return;
    }

    if (!formData.cityId) {
      setError("Please select a city.");
      return;
    }

    setLoading(true);

    try {
      await createAd(buildPayload());
      navigate("/client/ads");
    } catch (err) {
      setError(getApiError(err, "Failed to create ad."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <DashboardPageHeader
        badge="Create Advertisement"
        title="Create New Ad"
        description="Fill in the advertisement details. Your ad will be saved as draft first."
      />

      {error && (
        <div className="mb-5">
          <ErrorMessage message={error} />
        </div>
      )}

      <AdForm
        formData={formData}
        setFormData={setFormData}
        categories={categories}
        cities={cities}
        loading={loading}
        submitText="Create Draft Ad"
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default CreateAd;