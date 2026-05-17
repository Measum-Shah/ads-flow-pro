const DashboardPageHeader = ({
  title,
  description,
  badge,
  action,
}) => {
  return (
    <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <div>
        {badge && (
          <p
            className="mb-2 text-sm font-semibold uppercase tracking-wide"
            style={{ color: "var(--color-primary)" }}
          >
            {badge}
          </p>
        )}

        <h1 className="text-3xl font-bold">{title}</h1>

        {description && (
          <p
            className="mt-2 max-w-2xl text-sm leading-6"
            style={{ color: "var(--color-muted)" }}
          >
            {description}
          </p>
        )}
      </div>

      {action && <div>{action}</div>}
    </div>
  );
};

export default DashboardPageHeader;