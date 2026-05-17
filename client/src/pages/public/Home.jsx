import { Link } from "react-router-dom";
import Button from "../../components/common/Button";

const Home = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <p
            className="mb-4 text-sm font-semibold uppercase tracking-wide"
            style={{ color: "var(--color-primary)" }}
          >
            Professional Advertising Platform
          </p>

          <h1 className="text-4xl font-bold leading-tight md:text-6xl">
            Publish, verify, and manage ads with confidence.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7" style={{ color: "var(--color-muted)" }}>
            Ads Flow helps businesses submit ads, go through moderation, verify
            payments, and publish campaigns through a clean multi-role workflow.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/register">
              <Button>Start Posting Ads</Button>
            </Link>

            <Link to="/ads">
              <Button variant="outline">Browse Ads</Button>
            </Link>
          </div>
        </div>

        <div
          className="rounded-3xl border p-6"
          style={{
            backgroundColor: "var(--color-surface)",
            borderColor: "var(--color-border)",
            boxShadow: "var(--shadow-soft)",
          }}
        >
          <div
            className="rounded-2xl p-6"
            style={{ backgroundColor: "var(--color-surface-soft)" }}
          >
            <h2 className="text-2xl font-bold">Ad Lifecycle</h2>

            <div className="mt-6 grid gap-3">
              {["Draft", "Submitted", "Approved", "Payment Verified", "Published"].map(
                (item, index) => (
                  <div
                    key={item}
                    className="flex items-center justify-between rounded-xl border p-4"
                    style={{
                      backgroundColor: "var(--color-surface)",
                      borderColor: "var(--color-border)",
                    }}
                  >
                    <span className="font-medium">{item}</span>
                    <span style={{ color: "var(--color-muted)" }}>
                      Step {index + 1}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;