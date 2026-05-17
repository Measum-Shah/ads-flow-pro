import { CheckCircle, Clock } from "lucide-react";
import { formatDateTime } from "../../utils/formatters";
import { getStatusLabel } from "../../utils/statusRules";

const AdStatusTimeline = ({ history = [] }) => {
  if (!history || history.length === 0) {
    return (
      <div
        className="rounded-2xl border p-6"
        style={{
          backgroundColor: "var(--color-surface)",
          borderColor: "var(--color-border)",
        }}
      >
        <h2 className="text-xl font-semibold">Status Timeline</h2>

        <p className="mt-3 text-sm" style={{ color: "var(--color-muted)" }}>
          No status history available yet.
        </p>
      </div>
    );
  }

  return (
    <div
      className="rounded-2xl border p-6"
      style={{
        backgroundColor: "var(--color-surface)",
        borderColor: "var(--color-border)",
      }}
    >
      <h2 className="text-xl font-semibold">Status Timeline</h2>

      <div className="mt-6 grid gap-5">
        {history.map((item, index) => {
          const isLast = index === history.length - 1;

          return (
            <div key={item._id || index} className="relative flex gap-4">
              {!isLast && (
                <div
                  className="absolute left-[15px] top-8 h-full w-px"
                  style={{ backgroundColor: "var(--color-border)" }}
                />
              )}

              <div
                className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                style={{
                  backgroundColor: isLast
                    ? "var(--color-primary)"
                    : "var(--color-success)",
                  color: "#ffffff",
                }}
              >
                {isLast ? <Clock size={16} /> : <CheckCircle size={16} />}
              </div>

              <div className="pb-3">
                <h3 className="font-semibold">
                  {getStatusLabel(item.status)}
                </h3>

                <p
                  className="mt-1 text-sm"
                  style={{ color: "var(--color-muted)" }}
                >
                  {formatDateTime(item.createdAt || item.updatedAt)}
                </p>

                {item.note && (
                  <p
                    className="mt-2 text-sm leading-6"
                    style={{ color: "var(--color-muted)" }}
                  >
                    {item.note}
                  </p>
                )}

                {item.changedBy && (
                  <p
                    className="mt-1 text-xs"
                    style={{ color: "var(--color-muted)" }}
                  >
                    Updated by:{" "}
                    {item.changedBy.fullName ||
                      item.changedBy.name ||
                      item.changedBy.email ||
                      "System"}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdStatusTimeline;