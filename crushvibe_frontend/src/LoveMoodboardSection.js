import React, { useState } from "react";
import "./LoveMoodboardSection.css";

/*
 * List of uploaded user images, moved to the assets folder. 
 * You must ensure these files are available inside 'assets' directory at build/runtime.
 */
// PUBLIC_INTERFACE
function LoveMoodboardSection() {
  /** Main pastel dreamy moodboard grid for LOVE CHAMBER left column. */

  // Only use the provided user-uploaded images, stored in public/assets.
  // NOTE: The image paths below match exactly what exists in the public/assets folder.
  const MOODBOARD_IMAGES = [
    "/assets/20250619_070641_Screenshot_2025-06-19_122649.png",
    "/assets/20250619_070642_Screenshot_2025-06-19_122700.png",
    "/assets/20250619_070643_Screenshot_2025-06-19_122712.png",
    "/assets/20250619_070644_Screenshot_2025-06-19_122728.png",
    "/assets/20250619_070645_Screenshot_2025-06-19_122852.png",
    "/assets/20250619_070646_Screenshot_2025-06-19_122905.png",
    "/assets/20250619_070646_Screenshot_2025-06-19_122940.png",
    "/assets/20250619_070647_Screenshot_2025-06-19_123046.png",
    "/assets/20250619_070648_Screenshot_2025-06-19_123152.png",
    "/assets/20250619_070648_Screenshot_2025-06-19_123200.png",
    "/assets/20250619_070649_Screenshot_2025-06-19_123230.png",
    "/assets/20250619_070650_Screenshot_2025-06-19_123321.png",
    "/assets/20250619_070650_Screenshot_2025-06-19_123328.png",
    "/assets/20250619_070651_Screenshot_2025-06-19_123343.png",
    "/assets/20250619_070651_Screenshot_2025-06-19_123348.png",
    "/assets/20250619_070652_Screenshot_2025-06-19_123355.png",
    "/assets/20250619_070652_Screenshot_2025-06-19_123515.png",
    "/assets/20250619_070653_Screenshot_2025-06-19_123524.png",
    "/assets/20250619_070653_Screenshot_2025-06-19_123530.png",
    "/assets/20250619_070654_Screenshot_2025-06-19_123538.png",
    "/assets/20250619_070655_Screenshot_2025-06-19_123547.png",
    "/assets/20250619_070655_Screenshot_2025-06-19_123555.png",
    "/assets/20250619_070655_Screenshot_2025-06-19_123607.png",
    "/assets/20250619_070656_Screenshot_2025-06-19_123612.png",
  ];

  // Initially, grid order is sequential. 
  // You can display either all or a fixed number per row/column.
  // Show exactly 4 images at a time, initially chosen randomly.
  const imageCount = MOODBOARD_IMAGES.length;

  // Utility function to pick 4 unique random indices from all available images
  function getRandomFourIndices() {
    const arr = Array.from({ length: imageCount }, (_, i) => i);
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.slice(0, 4);
  }

  // Indices of images to show
  const [indices, setIndices] = useState(getRandomFourIndices());
  const [shuffleAnim, setShuffleAnim] = useState(false);

  // PUBLIC_INTERFACE
  function shuffleMoodboard() {
    setShuffleAnim(true);
    setTimeout(() => {
      setIndices(getRandomFourIndices());
      setShuffleAnim(false);
    }, 285);
  }

  // Only 4 images, always displayed in a single "row" grid (2x2, 1x4, or 4x1 if mobile)
  return (
    <section className="love-moodboard-box">
      <div className="love-moodboard-title" style={{ fontFamily: "'Pacifico', cursive" }}>
        Love Moodboard
      </div>
      <div
        className={`moodboard-grid${shuffleAnim ? " moodboard-grid-animate" : ""}`}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gridTemplateRows: "repeat(2, 1fr)",
          gap: "19px 16px",
          justifyItems: "center",
          alignItems: "center",
          margin: "0 auto",
          padding: 0,
          maxWidth: 350,
        }}
      >
        {indices.map((imgIdx, i) => (
          <div
            className="moodboard-img-wrap"
            key={MOODBOARD_IMAGES[imgIdx]}
            style={{
              animationDelay: `${i * 30}ms`
            }}
          >
            <img
              src={MOODBOARD_IMAGES[imgIdx]}
              alt={`Moodboard item ${imgIdx + 1}`}
              className="moodboard-img"
              loading="lazy"
              draggable={false}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                aspectRatio: "1/1",
                borderRadius: 16,
                background: "#f6f6fa"
              }}
            />
          </div>
        ))}
      </div>
      <button
        className="moodboard-shuffle-btn"
        style={{ fontFamily: "'Segoe UI', Pacifico, cursive, sans-serif" }}
        onClick={shuffleMoodboard}
        aria-label="Shuffle Moodboard"
      >
        <span role="img" aria-label="shuffle" style={{ fontSize: 18, marginRight: 7 }}>🔄</span>
        Shuffle Moodboard
      </button>
    </section>
  );
}

export default LoveMoodboardSection;
