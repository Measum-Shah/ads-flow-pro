const AppLoader = ({ text = "Loading Ads Flow..." }) => {
  return (
    <div
      className="flex min-h-screen items-center justify-center px-4"
      style={{
        backgroundColor: "var(--color-bg)",
        color: "var(--color-text)",
      }}
    >
      <div className="flex flex-col items-center gap-4">
        <div
          className="h-12 w-12 animate-spin rounded-full border-4 border-solid"
          style={{
            borderColor: "var(--color-border)",
            borderTopColor: "var(--color-primary)",
          }}
        />

        <div className="text-center">
          <h2 className="text-xl font-semibold">Ads Flow</h2>
          <p className="mt-1 text-sm" style={{ color: "var(--color-muted)" }}>
            {text}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AppLoader;