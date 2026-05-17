import { Link } from "react-router-dom";
import Button from "../../components/common/Button";

const NotFound = () => {
  return (
    <section className="flex min-h-screen items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-5xl font-bold">404</h1>
        <p className="mt-3" style={{ color: "var(--color-muted)" }}>
          The page you are looking for does not exist.
        </p>

        <Link to="/">
          <Button className="mt-6">Go Home</Button>
        </Link>
      </div>
    </section>
  );
};

export default NotFound;