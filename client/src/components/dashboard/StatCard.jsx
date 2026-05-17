const StatCard = ({
  title,
  value,
  icon: Icon,
  description,
}) => {
  return (
    <div
      className="rounded-2xl border p-5"
      style={{
        backgroundColor: "var(--color-surface)",
        borderColor: "var(--color-border)",
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium" style={{ color: "var(--color-muted)" }}>
            {title}
          </p>

          <h2 className="mt-3 text-3xl font-bold">{value}</h2>

          {description && (
            <p className="mt-2 text-sm" style={{ color: "var(--color-muted)" }}>
              {description}
            </p>
          )}
        </div>

        {Icon && (
          <div
            className="flex h-12 w-12 items-center justify-center rounded-xl"
            style={{
              backgroundColor: "var(--color-surface-soft)",
              color: "var(--color-primary)",
            }}
          >
            <Icon size={22} />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;