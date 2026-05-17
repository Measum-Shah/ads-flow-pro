import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import PaymentForm from "../../components/forms/PaymentForm";
import ErrorMessage from "../../components/common/ErrorMessage";
import DashboardPageHeader from "../../components/dashboard/DashboardPageHeader";

import { submitPayment } from "../../api/client.api";
import { getApiError } from "../../utils/errorHandler";

const SubmitPayment = () => {
  const { id } = useParams(); // This is the adId coming from the URL router
  const navigate = useNavigate();

  // 1. FIXED: Initialized state with the exact keys your backend validation expects
  const [formData, setFormData] = useState({
    method: "",         // lower-case enum: bank_transfer, easypaisa, jazzcash, other
    senderName: "",     // string (Required)
    amount: "",         // number (Required)
    transactionRef: "", // string (Required, unique)
    screenshotUrl: "",  // string (Optional URL string)
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 2. FIXED: Constructed payload fields to map perfectly with POST /api/client/payments
  const buildPayload = () => {
    return {
      adId: id,                              // Extracted from router useParams()
      method: formData.method,               // Maps to 'method'
      senderName: formData.senderName.trim(),// Maps to 'senderName'
      amount: Number(formData.amount),       // Maps to 'amount' (Parsed explicitly as a number)
      transactionRef: formData.transactionRef.trim(), // Maps to 'transactionRef'
      screenshotUrl: formData.screenshotUrl.trim() || undefined, // Maps to 'screenshotUrl'
    };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Sends clean data payload directly to the API endpoint
      await submitPayment(buildPayload());

      // 3. FIXED: Redirects cleanly back to the client dashboard tracking view
      navigate("/client/dashboard");
    } catch (err) {
      setError(
        getApiError(err, "Failed to submit payment proof. Please verify all fields.")
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