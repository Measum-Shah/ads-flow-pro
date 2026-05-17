import express from "express";
import { checkDb } from "../controllers/health.controller.js";

const router = express.Router();

router.get("/db", checkDb); // GET /api/health/db

export default router;