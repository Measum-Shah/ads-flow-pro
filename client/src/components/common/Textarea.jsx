const Textarea = ({
  label,
  error,
  className = "",
  required = false,
  rows = 4,
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="mb-2 block text-sm font-medium">
          {label}
          {required && (
            <span style={{ color: "var(--color-danger)" }}> *</span>
          )}
        </label>
      )}

      <textarea
        rows={rows}
        className={`w-full resize-none rounded-xl border px-4 py-3 text-sm outline-none transition placeholder:text-sm focus:ring-2 ${className}`}
        style={{
          backgroundColor: "var(--color-surface)",
          color: "var(--color-text)",
          borderColor: error ? "var(--color-danger)" : "var(--color-border)",
          "--tw-ring-color": error
            ? "var(--color-danger)"
            : "var(--color-primary)",
        }}
        required={required}
        {...props}
      />

      {error && (
        <p className="mt-2 text-sm" style={{ color: "var(--color-danger)" }}>
          {error}
        </p>
      )}
    </div>
  );
};

export default Textarea;