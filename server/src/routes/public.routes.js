import express from "express";
import {
  getPackages,
  getAds,
  getAdBySlug,
  getCategories,
  getCities,
  getRandomQuestion
} from "../controllers/public.controller.js";

const router = express.Router();

// Packages
router.get("/packages", getPackages);

// Ads — browse + detail
router.get("/ads", getAds);
router.get("/ads/:slug", getAdBySlug);

// Taxonomy
router.get("/categories", getCategories);
router.get("/cities", getCities);

// Learning question widget
router.get("/questions/random", getRandomQuestion);

export default router;