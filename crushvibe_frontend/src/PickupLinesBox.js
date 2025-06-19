import React, { useState, useRef } from "react";
import "./PickupLinesBox.css";

// Flirty pickup lines (distinct playful set)
const PICKUP_LINES = [
  "Are you a magician? Because whenever I look at you, everyone else disappears.",
  "Do you have a name, or can I call you mine?",
  "Is it hot in here or is it just you?",
  "If kisses were snowflakes, I’d send you a blizzard.",
  "If I could rearrange the alphabet, I’d put ‘U’ and ‘I’ together.",
  "Do you have a map? I just got lost in your eyes.",
  "I must be a snowflake, because I’ve fallen for you.",
  "Your hand looks heavy—can I hold it for you?",
  "Are we, like, married now?",
  "I'm not a photographer, but I can picture us together.",
  "Is your name Wi-fi? Because I'm feeling a connection!",
  "Do you like Star Wars? Because Yoda one for me!",
  "Do you believe in love at first sight, or should I walk by again?",
  "Are you a campfire? Because you’re hot and I want s’more.",
  "Was your dad a boxer? Because wow, you’re a knockout.",
  "If beauty were time, you’d be eternity.",
  "If flirting was a crime, you’d plead guilty.",
  "Are you a loan from a bank? Because you have my interest!"
];

// PUBLIC_INTERFACE
function PickupLinesBox() {
  /**
   * Flirty Pickup Lines Box – pastel card with sparkles, bubbly styles, copy-to-clipboard & sparkle button.
   */
  const [line, setLine] = useState("");
  const [animated, setAnimated] = useState(false);
  const [copySparkle, setCopySparkle] = useState(false);

  const bubbleRef = useRef();

  // PUBLIC_INTERFACE
  function showRandomLine() {
    let next;
    do {
      next = PICKUP_LINES[Math.floor(Math.random() * PICKUP_LINES.length)];
    } while (next === line && PICKUP_LINES.length > 1);
    setLine(next);
    setAnimated(false);
    // retrigger bubble pop animation
    setTimeout(() => setAnimated(true), 25);
  }

  // PUBLIC_INTERFACE
  function handleCopy() {
    if (line) {
      navigator.clipboard.writeText(line);
      setCopySparkle(true);
      setTimeout(() => setCopySparkle(false), 700);
    }
  }

  return (
    <section className="pickup-lines-box pastel-card">
      <div className="pickup-title-bubble">
        <span role="img" aria-label="sparkle" className="title-sparkle-anim">💬</span>
        <span className="pickup-title">Flirty Pickup Lines</span>
        <SparkleBar />
      </div>
      <div
        ref={bubbleRef}
        className={`pickup-speech-bubble${animated && line ? " pickup-speech-bubble-pop" : ""}${!line ? " pickup-speech-bubble-faded" : ""}`}
      >
        {line ? (
          <span className="pickup-bubble-text">{line}</span>
        ) : (
          <span className="pickup-bubble-placeholder">Click <b>Show Me A Line</b> for instant ✨ rizz!</span>
        )}
        {line && (
          <button
            className={`pickup-copy-btn${copySparkle ? " pickup-copy-btn-animate" : ""}`}
            aria-label="Copy line"
            onClick={handleCopy}
            tabIndex={0}
            type="button"
          >
            <span role="img" aria-label="copy" className="copy-emoji">{copySparkle ? "✨" : "📋"}</span>
          </button>
        )}
      </div>
      <button
        className="pickup-show-btn"
        onClick={showRandomLine}
        type="button"
        aria-label="Show Me a Pickup Line"
      >
        <span role="img" aria-label="sparkles" className="show-sparkle">✨</span>
        Show Me A Line
      </button>
    </section>
  );
}

// Animating sparkle bar for header
function SparkleBar() {
  return (
    <span className="sparkle-bar" aria-hidden="true">
      <span className="sparkle s1">✨</span>
      <span className="sparkle s2">🧃</span>
      <span className="sparkle s3">🌸</span>
      <span className="sparkle s4">💖</span>
      <span className="sparkle s5">✨</span>
    </span>
  );
}

export default PickupLinesBox;
