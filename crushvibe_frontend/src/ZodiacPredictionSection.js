import React, { useState, useRef } from "react";
import "./ZodiacPredictionSection.css";

// List of zodiac signs with emojis for playful dropdown
const ZODIAC_SIGNS = [
  { sign: "Aries", emoji: "♈️" },
  { sign: "Taurus", emoji: "♉️" },
  { sign: "Gemini", emoji: "♊️" },
  { sign: "Cancer", emoji: "♋️" },
  { sign: "Leo", emoji: "♌️" },
  { sign: "Virgo", emoji: "♍️" },
  { sign: "Libra", emoji: "♎️" },
  { sign: "Scorpio", emoji: "♏️" },
  { sign: "Sagittarius", emoji: "♐️" },
  { sign: "Capricorn", emoji: "♑️" },
  { sign: "Aquarius", emoji: "♒️" },
  { sign: "Pisces", emoji: "♓️" }
];

const HOROSCOPES = {
  Aries: "Romantic vibes are high today! Let your playful spark light up a loved one's world 💖.",
  Taurus: "Indulge yourself with love’s little luxuries—sweet words and chocolate included!",
  Gemini: "Love’s a game and you’re winning! Flirt, chat, and share a secret smile.",
  Cancer: "Tender gestures make waves—reach out, even if you’re shy ⭐.",
  Leo: "You’re radiating charm! Don’t be afraid to take center stage in romance.",
  Virgo: "Little details mean a lot. Notice the small things, and your crush will too.",
  Libra: "Your heart is magnetic today—expect extra admiration and a sweet message.",
  Scorpio: "Mystery attracts magic. A flirty look might reveal a hidden admirer 😏.",
  Sagittarius: "Say yes to adventure! Love might arrive in a delightfully unexpected way.",
  Capricorn: "Steady devotion builds trust. Share a dream—or a meme—for cozy connection.",
  Aquarius: "Electric connections are in the air. DM your crush and watch sparks fly ⚡.",
  Pisces: "Dreamy feelings swirl—write (or receive) a poetic message to set hearts afloat.",
};

// Subtle animated pastel stars for sparkly effect
function TwinkleStars({ active }) {
  // 4–6 random star positions, animated
  const starCount = 5;
  return (
    <svg
      className={`twinkle-stars-svg${active ? " twinkle-stars-svg-animate" : ""}`}
      width="120" height="60" viewBox="0 0 120 60" style={{
        position: "absolute",
        pointerEvents: "none",
        left: 0, top: 0, right: 0,
        zIndex: 2,
      }}
      aria-hidden="true"
    >
      {/* Soft pastel yellow and purple stars with gentle twinkle animation */}
      <g>
        <g className="ts1">
          <polygon points="10,17 12,22 17,23 13,26 14,31 10,28 6,31 7,26 3,23 8,22" fill="#FFF2C6" opacity="0.8"/>
        </g>
        <g className="ts2">
          <polygon points="52,10 54,14 59,15 55,18 56,22 52,20 48,22 49,18 45,15 50,14" fill="#e0bbe4" opacity="0.9"/>
        </g>
        <g className="ts3">
          <polygon points="103,19 105,22 109,23 106,25 107,28 103,26 99,28 100,25 97,23 101,22" fill="#ffe4e1" opacity="0.83"/>
        </g>
        <g className="ts4">
          <polygon points="90,45 91,48 95,49 92,51 93,54 90,52 87,54 88,51 85,49 89,48" fill="#ffd1dc" opacity="0.82"/>
        </g>
        <g className="ts5">
          <polygon points="23,42 25,45 29,46 26,48 26,51 23,49 20,51 21,48 17,46 22,45" fill="#c09aff" opacity="0.58"/>
        </g>
      </g>
    </svg>
  );
}

// PUBLIC_INTERFACE
function ZodiacPredictionSection() {
  const [selected, setSelected] = useState("");
  const [lastAnimated, setLastAnimated] = useState("");
  const heartRef = useRef();

  // PUBLIC_INTERFACE
  function handleSignChange(e) {
    setSelected(e.target.value);
    setLastAnimated(e.target.value); // For triggering animation
    // Heart animation is handled via key change in heart element
  }

  // Heart-entrance animation retriggers on selection change (key on lastAnimated)
  return (
    <section className="zodiac-box dreamy-zodiac-box">
      <div className="zodiac-title" style={{ fontFamily: "'Pacifico', cursive" }}>
        <span style={{ fontSize: 22, marginRight: 7 }}>🔮</span>
        Today’s Love Horoscope
      </div>
      <div style={{ marginTop: 13, marginBottom: 11, textAlign: "center" }}>
        <label htmlFor="zodiac-sign" style={{ fontWeight: 500, color: "#ca86af", fontSize: "1.08rem" }}>
          Select your sign:
        </label>
        <select
          id="zodiac-sign"
          className="zodiac-dropdown"
          value={selected}
          onChange={handleSignChange}
          aria-label="Choose your zodiac sign"
          style={{
            marginLeft: 8,
            borderRadius: 12,
            background: "linear-gradient(90deg,#ffe4e1,#ffd1dc)",
            fontFamily: "'Segoe UI', Pacifico, cursive, sans-serif",
            color: "#b584e9",
            border: "1.3px solid #e0bbe494",
            boxShadow: "0 1.4px 8px #ffd1dc37",
            fontSize: "1.11rem",
            padding: "6px 11px 6px 9px"
          }}
        >
          <option value="">— Select —</option>
          {ZODIAC_SIGNS.map(({ sign, emoji }) => (
            <option key={sign} value={sign}>
              {emoji} {sign}
            </option>
          ))}
        </select>
      </div>
      <div style={{ position: "relative", minHeight: 120 }}>
        <div
          ref={heartRef}
          key={lastAnimated}
          className={`horoscope-heart${selected ? " horoscope-heart-animate" : ""}`}
          aria-live="polite"
        >
          <TwinkleStars active={!!selected} />
          <span className="horoscope-heart-inner">
            {selected ? (
              <span>
                <span style={{
                  fontFamily: "'Pacifico', cursive",
                  fontSize: "1.22rem",
                  color: "#ffd1dc",
                  textShadow: "0px 2px 13px #fffbe1;"
                }}>
                  {ZODIAC_SIGNS.find(obj => obj.sign === selected)?.emoji} {selected}
                </span>
                <br />
                <span className="horoscope-text" style={{
                  fontSize: "1.10rem",
                  color: "#fffde9",
                  marginTop: 6,
                  textShadow: "0px 1px 9px #e0bbe4b0"
                }}>
                  {HOROSCOPES[selected]}
                </span>
              </span>
            ) : (
              <span style={{ color: "#ffe4e1", opacity: 0.73 }}>
                <span style={{ fontSize: 18, opacity: 0.97 }}>💘</span> Choose a sign for some cosmic love advice!
              </span>
            )}
          </span>
        </div>
      </div>
    </section>
  );
}

export default ZodiacPredictionSection;
