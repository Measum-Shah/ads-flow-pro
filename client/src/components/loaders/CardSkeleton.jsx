const CardSkeleton = ({ count = 3 }) => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="rounded-2xl border p-5"
          style={{
            backgroundColor: "var(--color-surface)",
            borderColor: "var(--color-border)",
          }}
        >
          <div
            className="mb-5 h-40 animate-pulse rounded-xl"
            style={{ backgroundColor: "var(--color-surface-soft)" }}
          />

          <div
            className="mb-3 h-5 w-3/4 animate-pulse rounded"
            style={{ backgroundColor: "var(--color-surface-soft)" }}
          />

          <div
            className="mb-2 h-4 w-full animate-pulse rounded"
            style={{ backgroundColor: "var(--color-surface-soft)" }}
          />

          <div
            className="mb-5 h-4 w-2/3 animate-pulse rounded"
            style={{ backgroundColor: "var(--color-surface-soft)" }}
          />

          <div
            className="h-10 w-full animate-pulse rounded-xl"
            style={{ backgroundColor: "var(--color-surface-soft)" }}
          />
        </div>
      ))}
    </div>
  );
};

export default CardSkeleton;