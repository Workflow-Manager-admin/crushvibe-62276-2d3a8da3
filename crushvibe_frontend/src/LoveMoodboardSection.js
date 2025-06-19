import React, { useState } from "react";
import "./LoveMoodboardSection.css";

// PUBLIC_INTERFACE
function LoveMoodboardSection() {
  /** Main pastel dreamy moodboard grid for LOVE CHAMBER left column. */

  // Placeholder dreamy pastel image URLs/unsplash/light blob SVGs—use 8 for full grid shuffle effect.
  const MOODBOARD_IMAGES = [
    "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1465101178521-c1a9136a0408?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1424746219973-8fe3bd07d8e3?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1544986581-efac024faf62?auto=format&fit=crop&w=400&q=80"
  ];

  const [indices, setIndices] = useState([0, 1, 2, 3, 4, 5, 6, 7]);
  const [shuffleAnim, setShuffleAnim] = useState(false);

  // Fisher-Yates shuffle for images
  function shuffleMoodboard() {
    const arr = [...indices];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    setShuffleAnim(true);
    setTimeout(() => {
      setIndices(arr);
      setShuffleAnim(false);
    }, 285);
  }

  return (
    <section className="love-moodboard-box">
      <div className="love-moodboard-title" style={{ fontFamily: "'Pacifico', cursive" }}>
        Love Moodboard
      </div>
      <div className={`moodboard-grid${shuffleAnim ? " moodboard-grid-animate" : ""}`}>
        {indices.slice(0, 8).map((imgIdx, i) => (
          <div
            className="moodboard-img-wrap"
            key={MOODBOARD_IMAGES[imgIdx]}
            style={{ animationDelay: `${i * 35}ms` }}
          >
            <img
              src={MOODBOARD_IMAGES[imgIdx]}
              alt="Dreamy Love Mood"
              className="moodboard-img"
              draggable={false}
              loading="lazy"
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
