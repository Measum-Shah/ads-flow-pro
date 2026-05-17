const About = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
      <div className="max-w-3xl">
        <p
          className="mb-4 text-sm font-semibold uppercase tracking-wide"
          style={{ color: "var(--color-primary)" }}
        >
          About Ads Flow
        </p>

        <h1 className="text-4xl font-bold">Built to make online advertising more organized.</h1>

        <p className="mt-5 leading-7" style={{ color: "var(--color-muted)" }}>
          Ads Flow is designed to help businesses create ads, submit them for
          moderation, verify payments, and publish them through a clean and
          trusted process.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <div
            className="rounded-2xl border p-6"
            style={{
              backgroundColor: "var(--color-surface)",
              borderColor: "var(--color-border)",
            }}
          >
            <h2 className="text-xl font-semibold">Our Motive</h2>
            <p className="mt-3 text-sm leading-6" style={{ color: "var(--color-muted)" }}>
              To provide a simple, professional, and verified advertising
              workflow for users, moderators, and administrators.
            </p>
          </div>

          <div
            className="rounded-2xl border p-6"
            style={{
              backgroundColor: "var(--color-surface)",
              borderColor: "var(--color-border)",
            }}
          >
            <h2 className="text-xl font-semibold">Developer</h2>
            <p className="mt-3 text-sm leading-6" style={{ color: "var(--color-muted)" }}>
              This platform is developed as a full-stack web application using
              React, Node.js, Express, and MongoDB.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;