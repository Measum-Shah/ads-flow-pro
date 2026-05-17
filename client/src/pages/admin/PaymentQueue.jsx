import { useEffect, useState } from "react";

import AdCard from "../../components/ads/AdCard";

import DashboardPageHeader from "../../components/dashboard/DashboardPageHeader";

import EmptyState from "../../components/common/EmptyState";
import ErrorMessage from "../../components/common/ErrorMessage";

import CardSkeleton from "../../components/loaders/CardSkeleton";

import {
  getPaymentQueue,
  verifyPayment,
} from "../../api/admin.api";

import { getApiError } from "../../utils/errorHandler";

const extractPayments = (response) => {
  if (Array.isArray(response)) return response;

  if (Array.isArray(response?.data)) {
    return response.data;
  }

  return [];
};

const PaymentQueue = () => {
  const [payments, setPayments] = useState([]);

  const [loading, setLoading] = useState(true);

  const [actionLoadingId, setActionLoadingId] =
    useState("");

  const [error, setError] = useState("");

  const fetchPayments = async () => {
    setLoading(true);

    setError("");

    try {
      const response = await getPaymentQueue();

      setPayments(extractPayments(response));
    } catch (err) {
      setError(
        getApiError(
          err,
          "Failed to load payment queue."
        )
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const handlePaymentAction = async (
    payment,
    action
  ) => {
    const paymentId =
      payment?._id || payment?.id;

    setActionLoadingId(paymentId);

    try {
      await verifyPayment(paymentId, {
        action,
        note:
          action === "reject"
            ? "Payment proof rejected."
            : "Payment verified.",
      });

      fetchPayments();
    } catch (err) {
      setError(
        getApiError(
          err,
          `Failed to ${action} payment.`
        )
      );
    } finally {
      setActionLoadingId("");
    }
  };

  return (
    <div>
      <DashboardPageHeader
        badge="Payment Queue"
        title="Verify Payments"
        description="Review submitted payments and verify or reject them."
      />

      {error && (
        <div className="mb-5">
          <ErrorMessage message={error} />
        </div>
      )}

      {loading ? (
        <CardSkeleton count={6} />
      ) : payments.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {payments.map((payment) => {
            const ad = payment?.ad;

            return (
              <AdCard
                key={payment._id}
                ad={ad}
                showStatus
                showActions
                loading={
                  actionLoadingId ===
                  payment._id
                }
                primaryAction={{
                  label: "Verify",
                  onClick: () =>
                    handlePaymentAction(
                      payment,
                      "verify"
                    ),
                }}
                secondaryAction={{
                  label: "Reject",
                  onClick: () =>
                    handlePaymentAction(
                      payment,
                      "reject"
                    ),
                }}
              />
            );
          })}
        </div>
      ) : (
        <EmptyState
          title="No pending payments"
          description="All payment submissions have already been processed."
        />
      )}
    </div>
  );
};

export default PaymentQueue;