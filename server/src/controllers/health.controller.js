
import mongoose from "mongoose";

/**
 * GET /api/health/db
 * Checks DB connection and logs response time
 */
export const checkDb = async (req, res) => {
  const start = Date.now();

  try {
    // Ping the database
    await mongoose.connection.db.admin().ping();

    const responseMs = Date.now() - start;

    res.json({
      success: true,
      status: "ok",
      database: "connected",
      responseMs
    });
  } catch (error) {
    const responseMs = Date.now() - start;

    res.status(500).json({
      success: false,
      status: "error",
      database: "disconnected",
      responseMs,
      message: error.message
    });
  }
};