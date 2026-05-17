const Badge = ({ children, variant = "default", className = "" }) => {
  const variantStyles = {
    default: {
      backgroundColor: "var(--color-surface-soft)",
      color: "var(--color-muted)",
    },
    primary: {
      backgroundColor: "rgba(37, 99, 235, 0.12)",
      color: "var(--color-primary)",
    },
    success: {
      backgroundColor: "rgba(22, 163, 74, 0.12)",
      color: "var(--color-success)",
    },
    warning: {
      backgroundColor: "rgba(217, 119, 6, 0.12)",
      color: "var(--color-warning)",
    },
    danger: {
      backgroundColor: "rgba(220, 38, 38, 0.12)",
      color: "var(--color-danger)",
    },
    info: {
      backgroundColor: "rgba(37, 99, 235, 0.12)",
      color: "var(--color-info)",
    },
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${className}`}
      style={variantStyles[variant]}
    >
      {children}
    </span>
  );
};

export default Badge;