import Modal from "./Modal";
import Button from "./Button";

const ConfirmDialog = ({
  isOpen,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger",
  loading = false,
  onConfirm,
  onClose,
}) => {
  return (
    <Modal isOpen={isOpen} title={title} onClose={onClose}>
      <p className="text-sm leading-6" style={{ color: "var(--color-muted)" }}>
        {message}
      </p>

      <div className="mt-6 flex justify-end gap-3">
        <Button variant="outline" onClick={onClose} disabled={loading}>
          {cancelText}
        </Button>

        <Button variant={variant} onClick={onConfirm} loading={loading}>
          {confirmText}
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;