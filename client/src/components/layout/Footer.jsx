import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      className="border-t"
      style={{
        backgroundColor: "var(--color-surface)",
        borderColor: "var(--color-border)",
      }}
    >
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-3 lg:px-8">
        <div>
          <h2 className="text-lg font-bold">Ads Flow</h2>
          <p className="mt-3 max-w-sm text-sm leading-6" style={{ color: "var(--color-muted)" }}>
            A professional advertising platform where businesses can publish,
            manage, and track their ads through a verified workflow.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Platform</h3>

          <div className="mt-4 grid gap-3 text-sm" style={{ color: "var(--color-muted)" }}>
            <Link to="/ads">Browse Ads</Link>
            <Link to="/packages">Packages</Link>
            <Link to="/about">About</Link>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Account</h3>

          <div className="mt-4 grid gap-3 text-sm" style={{ color: "var(--color-muted)" }}>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        </div>
      </div>

      <div
        className="border-t px-4 py-4 text-center text-sm"
        style={{
          borderColor: "var(--color-border)",
          color: "var(--color-muted)",
        }}
      >
        © {new Date().getFullYear()} Ads Flow. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;