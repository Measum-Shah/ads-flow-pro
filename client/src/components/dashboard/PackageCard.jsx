import { CheckCircle } from "lucide-react";
import Button from "../common/Button";
import { formatCurrency } from "../../utils/formatters";

const PackageCard = ({
  packageData,
  onSelect,
  selected = false,
  loading = false,
}) => {
  const name = packageData?.name || packageData?.title || "Package";
  const description =
    packageData?.description || "Promote your ad with this package.";
  const price = packageData?.price || 0;
  const duration = packageData?.durationDays || packageData?.duration || 0;

  const features = packageData?.features || [
    `${duration || "N/A"} days visibility`,
    "Ad publishing support",
    "Professional review process",
  ];

  return (
    <div
      className="flex h-full flex-col rounded-2xl border p-6 transition"
      style={{
        backgroundColor: "var(--color-surface)",
        borderColor: selected ? "var(--color-primary)" : "var(--color-border)",
        boxShadow: selected ? "var(--shadow-soft)" : "none",
      }}
    >
      <div className="flex-1">
        <h2 className="text-2xl font-bold">{name}</h2>

        <p
          className="mt-3 text-sm leading-6"
          style={{ color: "var(--color-muted)" }}
        >
          {description}
        </p>

        <div className="mt-6">
          <span className="text-3xl font-bold">{formatCurrency(price)}</span>

          {duration ? (
            <span className="ml-2 text-sm" style={{ color: "var(--color-muted)" }}>
              / {duration} days
            </span>
          ) : null}
        </div>

        <div className="mt-6 grid gap-3">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-3">
              <CheckCircle
                size={18}
                className="mt-0.5 shrink-0"
                style={{ color: "var(--color-success)" }}
              />

              <span className="text-sm" style={{ color: "var(--color-muted)" }}>
                {feature}
              </span>
            </div>
          ))}
        </div>
      </div>

      {onSelect && (
        <Button
          className="mt-6"
          fullWidth
          loading={loading}
          variant={selected ? "secondary" : "primary"}
          onClick={() => onSelect(packageData)}
        >
          {selected ? "Selected" : "Select Package"}
        </Button>
      )}
    </div>
  );
};

export default PackageCard;