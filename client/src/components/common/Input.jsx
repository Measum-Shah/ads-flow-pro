import { forwardRef, useId } from "react";

const Input = forwardRef(({
  label,
  error,
  className = "",
  required = false,
  id,
  ...props
}, ref) => {
  // Generates a unique ID if one isn't passed via props
  const defaultId = useId();
  const inputId = id || defaultId;

  return (
    <div className="w-full">
      {label && (
        <label 
          htmlFor={inputId} 
          className="mb-2 block text-sm font-medium text-[var(--color-text)]"
        >
          {label}
          {required && (
            <span className="text-[var(--color-danger)]"> *</span>
          )}
        </label>
      )}

      <input
        ref={ref}
        id={inputId}
        required={required}
        aria-invalid={error ? "true" : "false"}
        className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition placeholder:text-sm focus:ring-2 bg-[var(--color-surface)] text-[var(--color-text)] ${
          error
            ? "border-[var(--color-danger)] focus:ring-[var(--color-danger)]"
            : "border-[var(--color-border)] focus:ring-[var(--color-primary)]"
        } ${className}`}
        {...props}
      />

      {error && (
        <p className="mt-2 text-sm text-[var(--color-danger)]">
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;