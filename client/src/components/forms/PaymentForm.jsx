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
  // Fixed: Mapped values to lowercase enums expected by the database 
  const paymentMethods = [
    {
      label: "JazzCash",
      value: "jazzcash",
    },
    {
      label: "EasyPaisa",
      value: "easypaisa",
    },
    {
      label: "Bank Transfer",
      value: "bank_transfer",
    },
    {
      label: "Other",
      value: "other",
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
        {/* Fixed: Name attribute changed from paymentMethod to method  */}
        <Select
          label="Payment Method"
          name="method" 
          value={formData.method || ""}
          onChange={handleChange}
          options={paymentMethods}
          placeholder="Select payment method"
          required
        />

        {/* Added Field: Captures the missing required senderName field  */}
        <Input
          label="Sender Account Name"
          name="senderName"
          placeholder="Enter the name on your account"
          value={formData.senderName || ""}
          onChange={handleChange}
          required
        />

        {/* Added Field: Captures the missing required amount field  */}
        <Input
          label="Amount Paid (PKR)"
          name="amount"
          type="number"
          placeholder="Enter the transaction amount"
          value={formData.amount || ""}
          onChange={handleChange}
          required
        />

        {/* Fixed: Name attribute changed from transactionId to transactionRef  */}
        <Input
          label="Transaction Reference Number"
          name="transactionRef"
          placeholder="Enter payment transaction reference (unique)"
          value={formData.transactionRef || ""}
          onChange={handleChange}
          required
        />

        <Input
          label="Screenshot URL (Optional)"
          name="screenshotUrl"
          placeholder="Paste external screenshot image URL"
          value={formData.screenshotUrl || ""}
          onChange={handleChange}
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