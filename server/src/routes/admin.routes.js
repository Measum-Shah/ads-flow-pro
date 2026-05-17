import express from "express";
import auth from "../middlewares/auth.middleware.js";
import role from "../middlewares/role.middleware.js";
import {
  getPaymentQueue,
  verifyPayment,
  publishAd,
  getAnalyticsSummary
} from "../controllers/admin.controller.js";

const router = express.Router();

// All admin routes require auth + admin or super_admin role
router.use(auth, role("admin", "super_admin"));

// Exact routes from assignment
router.get("/payment-queue",          getPaymentQueue);     // GET   /api/admin/payment-queue
router.patch("/payments/:id/verify",  verifyPayment);       // PATCH /api/admin/payments/:id/verify
router.patch("/ads/:id/publish",      publishAd);           // PATCH /api/admin/ads/:id/publish
router.get("/analytics/summary",      getAnalyticsSummary); // GET   /api/admin/analytics/summary

export default router;