import express from "express";
import auth from "../middlewares/auth.middleware.js";
import role from "../middlewares/role.middleware.js";
import {
  getReviewQueue,
  getAdForReview,
  reviewAd
} from "../controllers/moderator.controller.js";

const router = express.Router();

// All moderator routes require auth + moderator role
router.use(auth, role("moderator", "admin", "super_admin"));

// Exact routes from assignment
router.get("/review-queue",       getReviewQueue);   // GET  /api/moderator/review-queue
router.get("/ads/:id",            getAdForReview);   // GET  /api/moderator/ads/:id  (extra — needed to view detail)
router.patch("/ads/:id/review",   reviewAd);         // PATCH /api/moderator/ads/:id/review

export default router;