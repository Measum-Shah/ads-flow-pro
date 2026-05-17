import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { LoaderProvider } from "./context/LoaderContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { PublicDataProvider } from "./context/PublicDataContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <LoaderProvider>
          <AuthProvider>
            <PublicDataProvider>
              <App />
            </PublicDataProvider>
          </AuthProvider>
        </LoaderProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);