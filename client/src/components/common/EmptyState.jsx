import { Inbox } from "lucide-react";
import Button from "./Button";

const EmptyState = ({
  title = "No data found",
  description = "There is nothing to show right now.",
  actionText,
  onAction,
}) => {
  return (
    <div
      className="flex flex-col items-center justify-center rounded-2xl border px-6 py-14 text-center"
      style={{
        backgroundColor: "var(--color-surface)",
        borderColor: "var(--color-border)",
      }}
    >
      <div
        className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl"
        style={{ backgroundColor: "var(--color-surface-soft)" }}
      >
        <Inbox size={26} style={{ color: "var(--color-muted)" }} />
      </div>

      <h3 className="text-lg font-semibold">{title}</h3>

      <p
        className="mt-2 max-w-md text-sm leading-6"
        style={{ color: "var(--color-muted)" }}
      >
        {description}
      </p>

      {actionText && onAction && (
        <Button className="mt-6" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;