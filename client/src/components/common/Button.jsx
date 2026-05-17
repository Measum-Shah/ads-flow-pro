import ButtonLoader from "../loaders/ButtonLoader";

const Button = ({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  fullWidth = false,
  className = "",
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-xl font-semibold transition disabled:cursor-not-allowed disabled:opacity-60";

  const sizeClasses = {
    sm: "px-3 py-2 text-xs",
    md: "px-5 py-3 text-sm",
    lg: "px-6 py-3.5 text-base",
  };

  const variantStyles = {
    primary: {
      backgroundColor: "var(--color-primary)",
      color: "#ffffff",
    },
    secondary: {
      backgroundColor: "var(--color-surface-soft)",
      color: "var(--color-text)",
      border: "1px solid var(--color-border)",
    },
    outline: {
      backgroundColor: "transparent",
      color: "var(--color-text)",
      border: "1px solid var(--color-border)",
    },
    danger: {
      backgroundColor: "var(--color-danger)",
      color: "#ffffff",
    },
    success: {
      backgroundColor: "var(--color-success)",
      color: "#ffffff",
    },
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`${baseClasses} ${sizeClasses[size]} ${
        fullWidth ? "w-full" : ""
      } ${className}`}
      style={variantStyles[variant]}
      {...props}
    >
      {loading ? <ButtonLoader text="Please wait..." /> : children}
    </button>
  );
};

export default Button;