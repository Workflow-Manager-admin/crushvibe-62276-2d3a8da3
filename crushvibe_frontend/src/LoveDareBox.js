import React, { useState, useRef, useEffect } from "react";
import "./LoveDareBox.css";

// PUBLIC_INTERFACE
/**
 * LoveDareBox
 * "Love Dare of the Day" pastel, dreamy, rounded card with
 * curly title, random dare, "I Did It!" checkbox, decorative hearts/stickers,
 * 🎲 New Dare button, and confetti/sparkle animation.
 */
// Dares array: editable, playful and romantic
const LOVE_DARES = [
  "Send a sweet message to someone you love 💬✨",
  "Compliment your crush in a flirty way 😘",
  "Share a song that reminds you of someone special 🎶",
  "Smile at a stranger (and maybe a secret crush!) 😊",
  "Write a love note (or DM) and send it anonymously 💌",
  "Draw a heart somewhere and show it to your beloved ❤️",
  "Do a little random act of kindness for someone today 🌸",
  "Give a genuine compliment to yourself (you deserve it!) 🪞",
  "Share your favorite love emoji with someone 💖",
  "Embrace your dreamy side: daydream about love☁️",
  "Make someone blush with a playful wink 😉",
  "Send a pastel heart to your best friend 💗",
  "Share your favorite romantic movie recommendation 🎬",
  "Tell someone why you appreciate them 💖",
  "Swap a flirty meme with your crush 😏",
  "Draw a heart next to your name on a note 💕",
  "Say 'thank you' with extra warmth today 🥰",
  "Gift a digital sticker to someone who made you smile 💟",
  "Send a selfie with your brightest smile 😊"
];

// Helper: random index, not same as prev
function getRandomDareIdx(lastIdx) {
  let idx;
  do {
    idx = Math.floor(Math.random() * LOVE_DARES.length);
  } while (LOVE_DARES.length > 1 && idx === lastIdx);
  return idx;
}

// Lightweight confetti/sparkle animation as React Component
function ConfettiSparkle({ active }) {
  // Renders soft, pastel-confetti and sparkles, fading out
  return (
    <div className={`lovedare-confetti-wrap${active ? " visible" : ""}`}>
      {/* Simple sparkles */}
      {[...Array(16)].map((_, i) => {
        // Randomized angles and positions
        const angle = Math.random() * 360;
        const dist = 48 + Math.random() * 34;
        const s = 13 + Math.random() * 16;
        const c = ["#ffd1dc", "#e0bbe4", "#ffe4e1", "#fffde1", "#f7a6c8"][i % 5];
        const type = i % 4;
        return (
          <span
            key={i}
            className={`lovedare-confetti-piece t${type}`}
            style={{
              left: `50%`, top: "38%",
              transform: `rotate(${angle}deg) translate(${dist}px, 0) scale(${0.69 + Math.random()*0.8})`,
              background: c,
              width: s/2,
              height: s,
              opacity: 0.81 - Math.random()*0.41,
            }}
          ></span>
        );
      })}
      {/* Heart stickers */}
      <span className="lovedare-heart-sticker" style={{ left: "29%", top: "48%" }}>💖</span>
      <span className="lovedare-heart-sticker" style={{ left: "67%", top: "40%" }}>💗</span>
      <span className="lovedare-heart-sticker" style={{ left: "38%", top: "55%" }}>✨</span>
      <span className="lovedare-heart-sticker" style={{ left: "59%", top: "54%" }}>💞</span>
    </div>
  );
}

// PUBLIC_INTERFACE
function LoveDareBox() {
  const [dareIdx, setDareIdx] = useState(getRandomDareIdx(-1));
  const [checked, setChecked] = useState(false);
  const [animate, setAnimate] = useState(false);

  // Animate confetti/sparkle on new dare or check
  const prevDare = useRef(dareIdx);
  useEffect(() => {
    if (prevDare.current !== dareIdx || checked) {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 1050);
      prevDare.current = dareIdx;
    }
    // eslint-disable-next-line
  }, [dareIdx, checked]);

  // "New Dare" handler
  // PUBLIC_INTERFACE
  function handleNewDare() {
    setChecked(false);
    setDareIdx(idx => getRandomDareIdx(idx));
  }
  // Checkbox handler
  // PUBLIC_INTERFACE
  function handleCheckbox(e) {
    setChecked(e.target.checked);
  }

  return (
    <section className="lovedare-box pastel-love-dare-card">
      <div className="lovedare-title-deco">
        <span className="lovedare-title" aria-label="Love Dare of the Day">
          💝
          <span className="lovedare-curly">Love Dare of the Day</span>
        </span>
        <span className="lovedare-sticker" style={{ fontSize: 22, marginLeft: 7 }}>💞</span>
        <span className="lovedare-sticker" style={{ fontSize: 17, marginLeft: 3 }}>✨</span>
      </div>
      <div className="lovedare-dare-row">
        <span className="lovedare-heartleft" aria-hidden="true">💖</span>
        <div className={`lovedare-dare-text${animate ? " lovedare-pop-anim" : ""}`}>
          {LOVE_DARES[dareIdx]}
        </div>
        <span className="lovedare-heartright" aria-hidden="true">💗</span>
      </div>
      <div className="lovedare-actions-row">
        <label className="lovedare-checkbox-wrap">
          <input
            type="checkbox"
            checked={checked}
            onChange={handleCheckbox}
            className="lovedare-checkbox"
            aria-checked={checked}
            aria-label="Did you do the dare?"
          />
          <span className="lovedare-checkbox-label">
            <span className="lovedare-checkbox-emoji">
              {checked ? "✅" : "☑️"}
            </span>
            I Did It!
          </span>
        </label>
        <button
          className="lovedare-new-btn"
          type="button"
          onClick={handleNewDare}
          aria-label="Get a new dare"
        >
          🎲 New Dare
        </button>
      </div>
      {/* Heart & sticker background decoration */}
      <div className="lovedare-bgdeco" aria-hidden="true">
        <span className="deco-heart h1">💖</span>
        <span className="deco-heart h2">💘</span>
        <span className="deco-heart h3">💟</span>
        <span className="deco-heart h4">✨</span>
        <span className="deco-heart h5">💐</span>
      </div>
      {/* Confetti/sparkle animation (on, overlayed) */}
      <ConfettiSparkle active={animate} />
    </section>
  );
}

export default LoveDareBox;
