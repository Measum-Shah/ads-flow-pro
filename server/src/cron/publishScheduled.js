import cron from "node-cron";
import Ad from "../models/Ad.js";
import AdStatusHistory from "../models/AdStatusHistory.js";
import adStatus from "../constants/adstatus.js";
import { updateAdRankScore } from "../services/ranking.service.js";

// Runs every hour
// Finds all SCHEDULED ads whose publishAt has passed and publishes them

const publishScheduled = () => {
  cron.schedule("0 * * * *", async () => {
    console.log("⏰ [CRON] publishScheduled running...");

    try {
      const now = new Date();

      const ads = await Ad.find({
        status: adStatus.SCHEDULED,
        publishAt: { $lte: now }
      }).populate("package");

      if (ads.length === 0) {
        console.log("✅ [CRON] No scheduled ads to publish");
        return;
      }

      for (const ad of ads) {
        const prev = ad.status;
        ad.status = adStatus.PUBLISHED;
        await ad.save();

        // Calculate rank score now that it's published
        await updateAdRankScore(ad);

        await AdStatusHistory.create({
          ad: ad._id,
          previousStatus: prev,
          newStatus: adStatus.PUBLISHED,
          changedBy: ad.user,
          note: "Auto-published by scheduled cron job"
        });

        console.log(`✅ [CRON] Published: ${ad.title}`);
      }

      console.log(`✅ [CRON] publishScheduled done — ${ads.length} ads published`);
    } catch (error) {
      console.error("❌ [CRON] publishScheduled failed:", error.message);
    }
  });

  console.log("🟢 [CRON] publishScheduled registered — runs every hour");
};

export default publishScheduled;