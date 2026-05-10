// Normalizes external media URLs — extracts YouTube thumbnails,
// validates image URLs, sets sourceType and validationStatus

const YOUTUBE_REGEX =
  /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

const ALLOWED_IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"];

/**
 * Detect source type from a URL
 */
const detectSourceType = (url) => {
  if (YOUTUBE_REGEX.test(url)) return "youtube";
  if (url.includes("cloudinary.com")) return "cloudinary";

  try {
    const { pathname } = new URL(url);
    const ext = pathname.slice(pathname.lastIndexOf(".")).toLowerCase();
    if (ALLOWED_IMAGE_EXTENSIONS.includes(ext)) return "image";
  } catch {
    return "unknown";
  }

  return "unknown";
};

/**
 * Extract YouTube video ID from a URL
 */
const extractYouTubeId = (url) => {
  const match = url.match(YOUTUBE_REGEX);
  return match ? match[1] : null;
};

/**
 * Normalize a single media URL — returns a structured object
 * ready to save into AdMedia
 */
export const normalizeMediaUrl = (originalUrl) => {
  if (!originalUrl || typeof originalUrl !== "string") {
    return {
      originalUrl,
      sourceType: "unknown",
      thumbnailUrl: null,
      validationStatus: "invalid"
    };
  }

  // Validate URL format
  try {
    new URL(originalUrl);
  } catch {
    return {
      originalUrl,
      sourceType: "unknown",
      thumbnailUrl: null,
      validationStatus: "invalid"
    };
  }

  const sourceType = detectSourceType(originalUrl);

  if (sourceType === "youtube") {
    const videoId = extractYouTubeId(originalUrl);
    return {
      originalUrl,
      sourceType: "youtube",
      thumbnailUrl: videoId
        ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
        : null,
      validationStatus: videoId ? "valid" : "invalid"
    };
  }

  if (sourceType === "image" || sourceType === "cloudinary") {
    return {
      originalUrl,
      sourceType,
      thumbnailUrl: originalUrl, // image IS the thumbnail
      validationStatus: "valid"
    };
  }

  return {
    originalUrl,
    sourceType: "unknown",
    thumbnailUrl: null,
    validationStatus: "invalid"
  };
};

/**
 * Normalize an array of URLs — used when creating/editing an ad
 */
export const normalizeMediaUrls = (urls = []) => {
  return urls.map((url, index) => ({
    ...normalizeMediaUrl(url),
    order: index
  }));
};