import { Menu } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import ThemeToggle from "../common/ThemeToggle";
import Button from "../common/Button";

const PublicNavbar = () => {
  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Browse Ads", path: "/ads" },
    { label: "Packages", path: "/packages" },
    { label: "About", path: "/about" },
  ];

  const navLinkClass = ({ isActive }) =>
    `text-sm font-medium transition ${
      isActive ? "text-[var(--color-primary)]" : "text-[var(--color-muted)]"
    }`;

  return (
    <header
      className="sticky top-0 z-40 border-b backdrop-blur"
      style={{
        backgroundColor: "color-mix(in srgb, var(--color-bg) 88%, transparent)",
        borderColor: "var(--color-border)",
      }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
            <img src="/logo-ad.png" className="flex h-10 w-10 items-center justify-center rounded-xl " />
          <div>
            <h1 className="text-lg font-bold leading-none">Ads Flow</h1>
            <p className="mt-1 text-xs" style={{ color: "var(--color-muted)" }}>
              Smart advertising platform
            </p>
          </div>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.path} to={link.path} className={navLinkClass}>
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />

          <Link to="/login">
            <Button variant="outline" size="sm">
              Login
            </Button>
          </Link>

          <Link to="/register">
            <Button size="sm">Get Started</Button>
          </Link>
        </div>

        <button
          className="rounded-xl border p-2 md:hidden"
          style={{
            borderColor: "var(--color-border)",
            color: "var(--color-text)",
          }}
        >
          <Menu size={22} />
        </button>
      </nav>
    </header>
  );
};

export default PublicNavbar;