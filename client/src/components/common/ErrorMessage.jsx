import { AlertCircle } from "lucide-react";

const ErrorMessage = ({ message = "Something went wrong." }) => {
  return (
    <div
      className="flex items-start gap-3 rounded-xl border p-4 text-sm"
      style={{
        backgroundColor: "rgba(220, 38, 38, 0.08)",
        borderColor: "rgba(220, 38, 38, 0.25)",
        color: "var(--color-danger)",
      }}
    >
      <AlertCircle size={18} className="mt-0.5 shrink-0" />
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;