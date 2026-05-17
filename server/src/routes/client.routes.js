import express from "express";
import auth from "../middlewares/auth.middleware.js";
import role from "../middlewares/role.middleware.js";
import {
  getDashboard,
  getAdDetails,       // <-- Imported the missing controller method
  createAd,
  editAd,
  submitAd,
  selectPackage,
  submitPayment,
  getAdHistory
} from "../controllers/client.controller.js";

const router = express.Router();

// All client routes require auth + client role
router.use(auth, role("client"));

router.get("/dashboard",              getDashboard);   // GET  /api/client/dashboard
router.get("/ads/:id",                getAdDetails);   // GET  /api/client/ads/:id <-- ADDED ROUTE
router.post("/ads",                   createAd);       // POST /api/client/ads
router.patch("/ads/:id",              editAd);         // PATCH /api/client/ads/:id
router.patch("/ads/:id/submit",       submitAd);       // PATCH /api/client/ads/:id/submit
router.patch("/ads/:id/package",      selectPackage);  // PATCH /api/client/ads/:id/package
router.post("/payments",              submitPayment);  // POST /api/client/payments
router.get("/ads/:id/history",        getAdHistory);   // GET  /api/client/ads/:id/history

export default router;