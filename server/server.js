import app from "./app.js";
import connectDB from "./src/config/db.js";
import env from "./src/config/env.js";
import publishScheduled from "./src/cron/publishScheduled.js";
import expireAds from "./src/cron/expireAds.js";
 
const startServer = async () => {
  await connectDB();

    // Register cron jobs after DB is connected
    publishScheduled();
    expireAds();

  app.listen(env.port, () => {
    console.log(`Server running on port ${env.port}`);
  });
};

startServer();