import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";
import ErrorMessage from "../../components/common/ErrorMessage";
import Input from "../../components/common/Input";
import { useAuth } from "../../hooks/useAuth";
import { getDefaultDashboardByRole } from "../../utils/rolePermissions";

const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated, role } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) {
    return <Navigate to={getDefaultDashboardByRole(role)} replace />;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await login(formData);
      const dashboardPath = getDefaultDashboardByRole(result?.user?.role);
      navigate(dashboardPath);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-md px-4 py-16">
      <div
        className="rounded-2xl border p-6"
        style={{
          backgroundColor: "var(--color-surface)",
          borderColor: "var(--color-border)",
          boxShadow: "var(--shadow-soft)",
        }}
      >
        <h1 className="text-3xl font-bold">Login</h1>

        <p className="mt-2 text-sm" style={{ color: "var(--color-muted)" }}>
          Access your Ads Flow dashboard.
        </p>

        {error && (
          <div className="mt-5">
            <ErrorMessage message={error} />
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <Button type="submit" fullWidth loading={loading}>
            Login
          </Button>
        </form>

        <p className="mt-5 text-center text-sm" style={{ color: "var(--color-muted)" }}>
          Do not have an account?{" "}
          <Link to="/register" style={{ color: "var(--color-primary)" }}>
            Register
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;