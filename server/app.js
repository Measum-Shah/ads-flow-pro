import express from "express";
import cors from "cors";
import authRoutes from "./src/routes/auth.routes.js";
import publicRoutes from "./src/routes/public.routes.js";
import clientRoutes from "./src/routes/client.routes.js";
import moderatorRoutes from "./src/routes/moderator.routes.js";
import adminRoutes from "./src/routes/admin.routes.js";
import healthRoutes from "./src/routes/health.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ success: true, message: "AdFlow Pro API running" });
});

app.use("/api/auth",      authRoutes);
app.use("/api",           publicRoutes);
app.use("/api/client",    clientRoutes);
app.use("/api/moderator", moderatorRoutes);
app.use("/api/admin",     adminRoutes);
app.use("/api/health",    healthRoutes);

export default app; 