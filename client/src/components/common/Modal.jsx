import { X } from "lucide-react";

const Modal = ({ isOpen, title, children, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(15, 23, 42, 0.65)" }}
        onClick={onClose}
      />

      <div
        className="relative z-10 w-full max-w-lg rounded-2xl border p-6 shadow-xl"
        style={{
          backgroundColor: "var(--color-surface)",
          borderColor: "var(--color-border)",
          color: "var(--color-text)",
        }}
      >
        <div className="mb-5 flex items-center justify-between gap-4">
          <h2 className="text-xl font-semibold">{title}</h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 transition"
            style={{
              backgroundColor: "var(--color-surface-soft)",
              color: "var(--color-muted)",
            }}
          >
            <X size={18} />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
};

export default Modal;