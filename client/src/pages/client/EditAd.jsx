import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AdForm from "../../components/forms/AdForm";
import Button from "../../components/common/Button";
import ErrorMessage from "../../components/common/ErrorMessage";
import DashboardPageHeader from "../../components/dashboard/DashboardPageHeader";
import PageLoader from "../../components/loaders/PageLoader";

import {
  getClientAdDetails,
  submitAdForReview,
  updateDraftAd,
} from "../../api/client.api";

import { usePublicData } from "../../hooks/usePublicData";
import { getApiError } from "../../utils/errorHandler";

const extractAd = (response) => {
  if (response?.data) return response.data;
  if (response?.ad) return response.ad;
  return response;
};

const EditAd = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { categories, cities } = usePublicData();

  // Unified naming with backend schema (category, city, imageUrl)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    city: "",
    contactPhone: "",
    imageUrl: "",
  });

  const [ad, setAd] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchAd = async () => {
    setPageLoading(true);
    setError("");

    try {
      const response = await getClientAdDetails(id);
      const adData = extractAd(response);

      setAd(adData);

      // Extract details aligned with backend structure
      setFormData({
        title: adData?.title || "",
        description: adData?.description || "",
        category: adData?.category?._id || adData?.category || "",
        city: adData?.city?._id || adData?.city || "",
        contactPhone: adData?.contactPhone || "",
        // Backend uses 'originalUrl' inside media objects
        imageUrl: adData?.media?.[0]?.originalUrl || adData?.media?.[0] || "", 
      });
    } catch (err) {
      setError(getApiError(err, "Failed to load ad details."));
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchAd();
  }, [id]);

  const buildPayload = () => {
    // Backend expects 'mediaUrls' as an array of plain strings
    const mediaUrls = formData.imageUrl ? [formData.imageUrl] : [];

    return {
      title: formData.title,
      description: formData.description,
      category: formData.category, // Corrected from categoryId
      city: formData.city,         // Corrected from cityId
      contactPhone: formData.contactPhone,
      mediaUrls,                   // Corrected from media
    };
  };

  const handleSave = async (event) => {
    event.preventDefault();
    setError("");
    setSaveLoading(true);

    try {
      await updateDraftAd(id, buildPayload());
      navigate("/client/ads");
    } catch (err) {
      setError(getApiError(err, "Failed to update ad."));
    } finally {
      setSaveLoading(false);
    }
  };

  const handleSubmitForReview = async () => {
    setError("");
    setSubmitLoading(true);

    try {
      await submitAdForReview(id);
      navigate("/client/ads");
    } catch (err) {
      setError(getApiError(err, "Failed to submit ad for review."));
    } finally {
      setSubmitLoading(false);
    }
  };

  if (pageLoading) {
    return <PageLoader text="Loading ad for editing..." />;
  }

  return (
    <div>
      <DashboardPageHeader
        badge="Edit Advertisement"
        title="Edit Draft Ad"
        description="Update your draft advertisement and submit it for moderator review."
        action={
          <Button
            variant="success"
            loading={submitLoading}
            disabled={ad?.status !== "draft"}
            onClick={handleSubmitForReview}
          >
            Submit For Review
          </Button>
        }
      />

      {error && (
        <div className="mb-5">
          <ErrorMessage message={error} />
        </div>
      )}

      {ad?.status !== "draft" && (
        <div className="mb-5">
          <ErrorMessage message="Only draft ads can be edited or submitted." />
        </div>
      )}

      <AdForm
        formData={formData}
        setFormData={setFormData}
        categories={categories}
        cities={cities}
        loading={saveLoading}
        submitText="Save Changes"
        onSubmit={handleSave}
      />
    </div>
  );
};

export default EditAd;