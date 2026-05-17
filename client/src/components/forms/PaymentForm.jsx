import Button from "../common/Button";
import Input from "../common/Input";
import Select from "../common/Select";
import Textarea from "../common/Textarea";

const PaymentForm = ({
  formData,
  setFormData,
  loading = false,
  onSubmit,
}) => {
  const paymentMethods = [
    {
      label: "JazzCash",
      value: "JazzCash",
    },
    {
      label: "EasyPaisa",
      value: "EasyPaisa",
    },
    {
      label: "Bank Transfer",
      value: "Bank Transfer",
    },
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border p-6"
      style={{
        backgroundColor: "var(--color-surface)",
        borderColor: "var(--color-border)",
      }}
    >
      <div className="grid gap-5">
        <Select
          label="Payment Method"
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
          options={paymentMethods}
          placeholder="Select payment method"
          required
        />

        <Input
          label="Transaction ID"
          name="transactionId"
          placeholder="Enter payment transaction ID"
          value={formData.transactionId}
          onChange={handleChange}
          required
        />

        <Input
          label="Screenshot URL"
          name="screenshotUrl"
          placeholder="Paste screenshot image URL"
          value={formData.screenshotUrl}
          onChange={handleChange}
          required
        />

        <Textarea
          label="Additional Notes"
          name="notes"
          placeholder="Optional payment notes"
          value={formData.notes}
          onChange={handleChange}
          rows={4}
        />

        <div
          className="rounded-xl p-5"
          style={{
            backgroundColor: "var(--color-surface-soft)",
          }}
        >
          <h3 className="font-semibold">
            Payment Instructions
          </h3>

          <div
            className="mt-3 grid gap-2 text-sm leading-6"
            style={{ color: "var(--color-muted)" }}
          >
            <p>JazzCash: 0300-1234567</p>
            <p>EasyPaisa: 0311-9876543</p>
            <p>Bank: Meezan Bank - 123456789</p>
          </div>
        </div>

        <Button type="submit" loading={loading}>
          Submit Payment Proof
        </Button>
      </div>
    </form>
  );
};

export default PaymentForm;