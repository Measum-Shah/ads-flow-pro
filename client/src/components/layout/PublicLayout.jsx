import { Outlet } from "react-router-dom";
import PublicNavbar from "./PublicNavbar";
import Footer from "./Footer";

const PublicLayout = () => {
  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "var(--color-bg)",
        color: "var(--color-text)",
      }}
    >
      <PublicNavbar />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default PublicLayout;