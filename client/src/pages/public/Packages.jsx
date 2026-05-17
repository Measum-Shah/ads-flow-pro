import ErrorMessage from "../../components/common/ErrorMessage";
import CardSkeleton from "../../components/loaders/CardSkeleton";
import { usePublicData } from "../../hooks/usePublicData";

const Packages = () => {
  const { packages, publicDataLoading, publicDataError } = usePublicData();

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
      <div className="mb-10">
        <p
          className="mb-3 text-sm font-semibold uppercase tracking-wide"
          style={{ color: "var(--color-primary)" }}
        >
          Pricing Plans
        </p>

        <h1 className="text-4xl font-bold">Choose the right ad package</h1>

        <p className="mt-3 max-w-2xl leading-7" style={{ color: "var(--color-muted)" }}>
          Select a package based on how much visibility and promotion your ad
          needs.
        </p>
      </div>

      {publicDataError && <ErrorMessage message={publicDataError} />}

      {publicDataLoading ? (
        <CardSkeleton count={3} />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {packages.length > 0 ? (
            packages.map((pkg) => (
              <div
                key={pkg._id || pkg.id}
                className="rounded-2xl border p-6"
                style={{
                  backgroundColor: "var(--color-surface)",
                  borderColor: "var(--color-border)",
                  boxShadow: "var(--shadow-soft)",
                }}
              >
                <h2 className="text-2xl font-bold">
                  {pkg.name || pkg.title || "Package"}
                </h2>

                <p
                  className="mt-3 text-sm leading-6"
                  style={{ color: "var(--color-muted)" }}
                >
                  {pkg.description || "Package details will appear here."}
                </p>

                <div className="mt-6">
                  <span className="text-3xl font-bold">
                    Rs. {pkg.price || 0}
                  </span>
                </div>

                <div
                  className="mt-5 rounded-xl p-4 text-sm"
                  style={{ backgroundColor: "var(--color-surface-soft)" }}
                >
                  Duration: {pkg.durationDays || pkg.duration || "N/A"} days
                </div>
              </div>
            ))
          ) : (
            <p style={{ color: "var(--color-muted)" }}>
              No packages found from backend yet.
            </p>
          )}
        </div>
      )}
    </section>
  );
};

export default Packages;