import { CreditCard } from "lucide-react";
import Badge from "../common/Badge";
import Button from "../common/Button";
import { formatCurrency, formatDate } from "../../utils/formatters";

const PaymentCard = ({
  payment,
  onVerify,
  onReject,
  loading = false,
}) => {
  const amount = payment?.amount || payment?.packageId?.price || 0;
  const method = payment?.method || payment?.paymentMethod || "N/A";
  const status = payment?.status || "pending";

  return (
    <div
      className="rounded-2xl border p-5"
      style={{
        backgroundColor: "var(--color-surface)",
        borderColor: "var(--color-border)",
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-xl"
            style={{
              backgroundColor: "var(--color-surface-soft)",
              color: "var(--color-primary)",
            }}
          >
            <CreditCard size={22} />
          </div>

          <div>
            <h3 className="font-semibold">
              {payment?.adId?.title || payment?.ad?.title || "Ad Payment"}
            </h3>

            <p className="mt-1 text-sm" style={{ color: "var(--color-muted)" }}>
              {method}
            </p>
          </div>
        </div>

        <Badge variant={status === "verified" ? "success" : "warning"}>
          {status}
        </Badge>
      </div>

      <div className="mt-5 grid gap-3 text-sm">
        <div className="flex justify-between">
          <span style={{ color: "var(--color-muted)" }}>Amount</span>
          <span className="font-semibold">{formatCurrency(amount)}</span>
        </div>

        <div className="flex justify-between">
          <span style={{ color: "var(--color-muted)" }}>Submitted</span>
          <span className="font-semibold">{formatDate(payment?.createdAt)}</span>
        </div>
      </div>

      {(onVerify || onReject) && (
        <div className="mt-5 flex gap-3">
          {onReject && (
            <Button
              variant="outline"
              fullWidth
              disabled={loading}
              onClick={() => onReject(payment)}
            >
              Reject
            </Button>
          )}

          {onVerify && (
            <Button
              variant="success"
              fullWidth
              loading={loading}
              onClick={() => onVerify(payment)}
            >
              Verify
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default PaymentCard;