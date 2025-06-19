import React, { useState } from "react";
import "./LoveMoodboardSection.css";

/*
 * LoveMoodboardSection
 * Displays a playful grid of animated, randomly chosen emojis.
 * Provides a Shuffle button to randomly refresh the emoji grid.
 */
// PUBLIC_INTERFACE
function LoveMoodboardSection() {
  // Array of playful, love/cute/soft themed emoji (hearts, sparkles, sweets, faces, animals)
  const EMOJI_POOL = [
    "💖", "💗", "💞", "💘", "💝", "💕", "🦋", "✨", "🌸", "🍰",
    "🍓", "🧸", "🐻", "❤️", "🩷", "😚", "😳", "😊", "🥰", "😻",
    "💐", "🎀", "🩵", "💜", "💛", "🌈", "🎉", "💌", "🦄", "🌺",
    "💓", "🤍", "👩‍❤️‍👨", "😇", "💃", "👑", "🍭", "🎂", "📸", "🎆",
    "😽", "🥳", "😋", "⭐", "🫦", "🍦", "🎶", "🪽", "💬", "🌷"
  ];

  const GRID_SIZE = 2; // 2x2 grid (only 4 emojis total)

  // Utility: get n unique random emojis (no repeats in a batch)
  function getRandomEmojis(count) {
    const shuffled = [...EMOJI_POOL].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }

  // Show 4 unique emojis
  const [emojis, setEmojis] = useState(() => getRandomEmojis(GRID_SIZE * GRID_SIZE));
  const [animState, setAnimState] = useState(false);

  // PUBLIC_INTERFACE
  function shuffleMoodboard() {
    setAnimState(true);
    setTimeout(() => {
      setEmojis(getRandomEmojis(GRID_SIZE * GRID_SIZE));
      setAnimState(false);
    }, 280);
  }

  // Animated class helper: subtle bounce & fun
  const animClass = animState ? "moodboard-grid-animate" : "";

  // Animation/decoration for each emoji (pulse, tilt, rotate for variety)
  const getEmojiAnimClass = i => {
    const mod = i % 4;
    return "moodboard-emoji " +
      (mod === 0 ? "emoji-bounce" :
       mod === 1 ? "emoji-tilt" :
       mod === 2 ? "emoji-pop" : "emoji-spin");
  };

  return (
    <section className="love-moodboard-box">
      <div className="love-moodboard-title" style={{ fontFamily: "'Pacifico', cursive" }}>
        Love Moodboard
      </div>
      <div
        className={`moodboard-grid ${animClass}`}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gridTemplateRows: "repeat(2, 1fr)",
          gap: "11px 7px",
          justifyItems: "center",
          alignItems: "center",
          margin: "0 auto",
          padding: 0,
          maxWidth: 340,
        }}
      >
        {emojis.map((emoji, i) => (
          <div
            className="moodboard-emoji-wrap"
            key={i + ":" + emoji}
            style={{
              aspectRatio: "1/1",
              width: "100%",
              minWidth: 0,
              minHeight: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <span
              className={getEmojiAnimClass(i) + (animState ? " emoji-grid-fade" : "")}
              aria-label="decorative emoji"
              tabIndex={-1}
              style={{
                fontSize: "3.5rem",
                userSelect: "none",
                pointerEvents: "none",
                filter: "drop-shadow(0 1.2px 11px #ffd1dc) drop-shadow(0 0.8px 6px #e0bbe4aa)",
                borderRadius: "18px",
                background: "rgba(255,244,250,0.08)",
                transition: "transform 0.23s",
                margin: "0 auto",
                display: "inline-flex",
                justifyContent: "center",
                alignItems: "center",
                width: "90%",
                height: "90%",
                willChange: "transform"
              }}
            >
              {emoji}
            </span>
          </div>
        ))}
      </div>
      <button
        className="moodboard-shuffle-btn"
        style={{ fontFamily: "'Segoe UI', Pacifico, cursive, sans-serif" }}
        onClick={shuffleMoodboard}
        aria-label="Shuffle Moodboard"
      >
        <span role="img" aria-label="shuffle" style={{ fontSize: 20, marginRight: 8 }}>🔄</span>
        Shuffle Moodboard
      </button>
    </section>
  );
}

export default LoveMoodboardSection;
