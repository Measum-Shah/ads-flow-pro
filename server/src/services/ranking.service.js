// Implements the ranking formula from the docs:
// rankScore = (featured ? 50 : 0) + (packageWeight * 10) + freshnessPoints + adminBoost

/**
 * Calculate freshness points based on how recently an ad was published.
 * Ads published within 24h get full points, decaying over 7 days.
 */
const getFreshnessPoints = (publishAt) => {
  if (!publishAt) return 0;

  const now = Date.now();
  const published = new Date(publishAt).getTime();
  const hoursOld = (now - published) / (1000 * 60 * 60);

  if (hoursOld <= 24) return 20;
  if (hoursOld <= 72) return 10;
  if (hoursOld <= 168) return 5; // 7 days
  return 0;
};

/**
 * Calculate rank score for a single ad.
 * packageWeight comes from the Package document (1, 2, or 3).
 */
export const calculateRankScore = ({ isFeatured, packageWeight, publishAt, adminBoost = 0 }) => {
  const featuredPoints = isFeatured ? 50 : 0;
  const packagePoints = (packageWeight || 1) * 10;
  const freshnessPoints = getFreshnessPoints(publishAt);

  return featuredPoints + packagePoints + freshnessPoints + adminBoost;
};

/**
 * Recalculate and save rankScore directly on an Ad document.
 * Expects ad to be populated with its package.
 */
export const updateAdRankScore = async (ad) => {
  const packageWeight = ad.package?.weight || 1;

  ad.rankScore = calculateRankScore({
    isFeatured: ad.isFeatured,
    packageWeight,
    publishAt: ad.publishAt,
    adminBoost: ad.adminBoost || 0
  });

  await ad.save();
  return ad.rankScore;
};