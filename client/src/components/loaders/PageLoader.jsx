const PageLoader = ({ text = "Loading data..." }) => {
  return (
    <div
      className="flex min-h-[60vh] items-center justify-center rounded-2xl border p-8"
      style={{
        backgroundColor: "var(--color-surface)",
        borderColor: "var(--color-border)",
      }}
    >
      <div className="flex flex-col items-center gap-4">
        <div
          className="h-10 w-10 animate-spin rounded-full border-4 border-solid"
          style={{
            borderColor: "var(--color-border)",
            borderTopColor: "var(--color-primary)",
          }}
        />

        <p className="text-sm font-medium" style={{ color: "var(--color-muted)" }}>
          {text}
        </p>
      </div>
    </div>
  );
};

export default PageLoader;