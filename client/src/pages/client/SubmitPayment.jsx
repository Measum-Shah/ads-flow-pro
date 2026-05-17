import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import PaymentForm from "../../components/forms/PaymentForm";
import ErrorMessage from "../../components/common/ErrorMessage";
import DashboardPageHeader from "../../components/dashboard/DashboardPageHeader";

import { submitPayment } from "../../api/client.api";
import { getApiError } from "../../utils/errorHandler";

const SubmitPayment = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    paymentMethod: "",
    transactionId: "",
    screenshotUrl: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const buildPayload = () => {
    return {
      adId: id,

      paymentMethod: formData.paymentMethod,

      transactionId: formData.transactionId,

      screenshot: formData.screenshotUrl,

      notes: formData.notes,
    };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    setLoading(true);

    try {
      await submitPayment(buildPayload());

      navigate("/client/ads");
    } catch (err) {
      setError(
        getApiError(err, "Failed to submit payment proof.")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <DashboardPageHeader
        badge="Payment Submission"
        title="Submit Payment Proof"
        description="Submit your payment screenshot and transaction details for verification."
      />

      {error && (
        <div className="mb-5">
          <ErrorMessage message={error} />
        </div>
      )}

      <PaymentForm
        formData={formData}
        setFormData={setFormData}
        loading={loading}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default SubmitPayment;