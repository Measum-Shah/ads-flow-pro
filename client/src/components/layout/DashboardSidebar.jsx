import {
  BarChart3,
  CreditCard,
  FileText,
  Home,
  LayoutDashboard,
  LogOut,
  Megaphone,
  ShieldCheck,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { USER_ROLES } from "../../utils/constants";

const DashboardSidebar = () => {
  const navigate = useNavigate();
  const { logout, role } = useAuth();

  const navGroups = [
    {
      section: "Client",
      allowedRoles: [USER_ROLES.CLIENT],
      links: [
        { label: "Client Dashboard", path: "/client/dashboard", icon: LayoutDashboard },
        { label: "My Ads", path: "/client/ads", icon: Megaphone },
        { label: "Create Ad", path: "/client/ads/create", icon: FileText },
      ],
    },
    {
      section: "Moderator",
      allowedRoles: [USER_ROLES.MODERATOR, USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN],
      links: [
        { label: "Moderator Dashboard", path: "/moderator/dashboard", icon: ShieldCheck },
        { label: "Review Queue", path: "/moderator/review-queue", icon: FileText },
      ],
    },
    {
      section: "Admin",
      allowedRoles: [USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN],
      links: [
        { label: "Admin Dashboard", path: "/admin/dashboard", icon: BarChart3 },
        { label: "Payment Queue", path: "/admin/payment-queue", icon: CreditCard },
        { label: "Analytics", path: "/admin/analytics", icon: BarChart3 },
      ],
    },
  ];

  const visibleGroups = navGroups.filter((group) =>
    group.allowedRoles.includes(role)
  );

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
      isActive ? "text-white" : "text-[var(--color-muted)]"
    }`;

  return (
    <aside
      className="hidden min-h-screen w-72 shrink-0 border-r p-5 lg:block"
      style={{
        backgroundColor: "var(--color-surface)",
        borderColor: "var(--color-border)",
      }}
    >
      <div className="mb-8 flex items-center gap-3">
        <div
          className="flex h-11 w-11 items-center justify-center rounded-xl text-sm font-bold text-white"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          AF
        </div>

        <div>
          <h1 className="text-lg font-bold leading-none">Ads Flow</h1>
          <p className="mt-1 text-xs" style={{ color: "var(--color-muted)" }}>
            Dashboard
          </p>
        </div>
      </div>

      <nav className="grid gap-6">
        <NavLink
          to="/"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium"
          style={{
            backgroundColor: "var(--color-surface-soft)",
            color: "var(--color-text)",
          }}
        >
          <Home size={18} />
          Public Website
        </NavLink>

        {visibleGroups.map((group) => (
          <div key={group.section}>
            <p
              className="mb-2 px-4 text-xs font-semibold uppercase tracking-wide"
              style={{ color: "var(--color-muted)" }}
            >
              {group.section}
            </p>

            <div className="grid gap-1">
              {group.links.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={linkClass}
                    style={({ isActive }) => ({
                      backgroundColor: isActive
                        ? "var(--color-primary)"
                        : "transparent",
                    })}
                  >
                    <Icon size={18} />
                    {item.label}
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <button
        onClick={handleLogout}
        className="mt-8 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium"
        style={{
          backgroundColor: "var(--color-surface-soft)",
          color: "var(--color-danger)",
        }}
      >
        <LogOut size={18} />
        Logout
      </button>
    </aside>
  );
};

export default DashboardSidebar;