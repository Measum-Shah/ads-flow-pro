import { useState } from "react";

const AdMediaGallery = ({ media = [] }) => {
  const normalizedMedia = media.map((item) => {
    if (typeof item === "string") {
      return item;
    }

    return (
      item?.url ||
      item?.secureUrl ||
      item?.imageUrl ||
      ""
    );
  });

  const validMedia = normalizedMedia.filter(Boolean);

  const [selectedImage, setSelectedImage] = useState(
    validMedia[0] || null
  );

  if (validMedia.length === 0) {
    return (
      <div
        className="flex h-[420px] items-center justify-center rounded-3xl border"
        style={{
          backgroundColor: "var(--color-surface)",
          borderColor: "var(--color-border)",
          color: "var(--color-muted)",
        }}
      >
        No Images Available
      </div>
    );
  }

  return (
    <div>
      <div
        className="overflow-hidden rounded-3xl border"
        style={{
          backgroundColor: "var(--color-surface)",
          borderColor: "var(--color-border)",
        }}
      >
        <img
          src={selectedImage}
          alt="Advertisement"
          className="h-[420px] w-full object-cover"
        />
      </div>

      {validMedia.length > 1 && (
        <div className="mt-4 grid grid-cols-4 gap-4 md:grid-cols-5">
          {validMedia.map((image, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setSelectedImage(image)}
              className="overflow-hidden rounded-2xl border transition"
              style={{
                borderColor:
                  selectedImage === image
                    ? "var(--color-primary)"
                    : "var(--color-border)",
              }}
            >
              <img
                src={image}
                alt={`Preview ${index + 1}`}
                className="h-24 w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdMediaGallery;