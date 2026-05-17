import { Menu, UserCircle } from "lucide-react";
import ThemeToggle from "../common/ThemeToggle";
import { useAuth } from "../../hooks/useAuth";

const DashboardHeader = () => {
  const { user } = useAuth();

  return (
    <header
      className="sticky top-0 z-30 border-b px-4 py-4 lg:px-8"
      style={{
        backgroundColor: "var(--color-bg)",
        borderColor: "var(--color-border)",
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            className="rounded-xl border p-2 lg:hidden"
            style={{
              borderColor: "var(--color-border)",
              color: "var(--color-text)",
            }}
          >
            <Menu size={22} />
          </button>

          <div>
            <h2 className="text-xl font-bold">Dashboard</h2>
            <p className="mt-1 text-sm" style={{ color: "var(--color-muted)" }}>
              Manage your advertising workflow
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />

          <div
            className="hidden items-center gap-2 rounded-xl border px-3 py-2 md:flex"
            style={{
              backgroundColor: "var(--color-surface)",
              borderColor: "var(--color-border)",
            }}
          >
            <UserCircle size={20} style={{ color: "var(--color-muted)" }} />
            <div>
              <span className="block text-sm font-medium">
                {user?.fullName || "User"}
              </span>
              <span
                className="block text-xs capitalize"
                style={{ color: "var(--color-muted)" }}
              >
                {user?.role || "client"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;