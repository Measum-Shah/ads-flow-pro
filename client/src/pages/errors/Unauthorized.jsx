import { Link } from "react-router-dom";
import Button from "../../components/common/Button";

const Unauthorized = () => {
  return (
    <section className="flex min-h-screen items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Unauthorized</h1>
        <p className="mt-3" style={{ color: "var(--color-muted)" }}>
          You do not have permission to access this page.
        </p>

        <Link to="/">
          <Button className="mt-6">Go Home</Button>
        </Link>
      </div>
    </section>
  );
};

export default Unauthorized;