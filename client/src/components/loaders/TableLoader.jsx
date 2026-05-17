const TableLoader = ({ rows = 5, columns = 4 }) => {
  return (
    <div
      className="overflow-hidden rounded-2xl border"
      style={{
        backgroundColor: "var(--color-surface)",
        borderColor: "var(--color-border)",
      }}
    >
      <div
        className="grid gap-4 border-b p-4"
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          borderColor: "var(--color-border)",
        }}
      >
        {Array.from({ length: columns }).map((_, index) => (
          <div
            key={index}
            className="h-4 animate-pulse rounded"
            style={{ backgroundColor: "var(--color-surface-soft)" }}
          />
        ))}
      </div>

      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div
          key={rowIndex}
          className="grid gap-4 border-b p-4 last:border-b-0"
          style={{
            gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
            borderColor: "var(--color-border)",
          }}
        >
          {Array.from({ length: columns }).map((_, colIndex) => (
            <div
              key={colIndex}
              className="h-4 animate-pulse rounded"
              style={{ backgroundColor: "var(--color-surface-soft)" }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default TableLoader;