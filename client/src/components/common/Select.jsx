const Select = ({
  label,
  error,
  options = [],
  placeholder = "Select option",
  className = "",
  required = false,
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

      <select
        className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:ring-2 ${className}`}
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
      >
        <option value="">{placeholder}</option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && (
        <p className="mt-2 text-sm" style={{ color: "var(--color-danger)" }}>
          {error}
        </p>
      )}
    </div>
  );
};

export default Select;