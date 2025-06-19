import React, { useState, useRef, useEffect } from "react";
import "./ConfessionsWallBox.css";

// PUBLIC_INTERFACE
/**
 * ConfessionsWallBox
 * Displays a sweet secret/confession text wall: animated floating pastel speech bubbles,
 * anonymous confessions, scrollable area, soft cream BG, faded roses, float-up animation.
 */
function ConfessionsWallBox() {
  const [input, setInput] = useState("");
  const [confessions, setConfessions] = useState(() => {
    // Store to localStorage for fun, start with some seed examples
    try {
      const c = JSON.parse(localStorage.getItem("lovechamber-confessions-wall"));
      if (Array.isArray(c) && c.every(x => typeof x === "string")) return c;
    } catch {}
    return [
      "I still blush when I see your smile 💖",
      "Your texts make my day, every day!",
      "Sometimes I re-read our DMs just to feel those butterflies. 🦋",
      "I'm secretly hoping you'll ask me out... 💌",
    ];
  });
  const [animQueue, setAnimQueue] = useState([]);

  const scrollRef = useRef();

  // Float-in animation index tracking
  useEffect(() => {
    if (confessions.length === 0) return;
    // Schedule animation for newest entry at top
    setAnimQueue(q => [...q, confessions.length - 1]);
    // Remove after animation duration
    const timeout = setTimeout(() => {
      setAnimQueue(q => q.filter(i => i !== confessions.length - 1));
    }, 850);
    // Scroll to top for new confession
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
    return () => clearTimeout(timeout);
  }, [confessions.length]);

  // PUBLIC_INTERFACE
  function handleInput(e) {
    setInput(e.target.value);
  }

  // PUBLIC_INTERFACE
  function handlePost(e) {
    e.preventDefault();
    const val = input.trim();
    if (!val) return;
    const next = [val, ...confessions].slice(0, 30); // display only last 30
    setConfessions(next);
    setInput("");
    try {
      localStorage.setItem("lovechamber-confessions-wall", JSON.stringify(next));
    } catch {}
  }

  // Soft randomize pastel bubble color for each confession
  function pastelBubbleColor(i) {
    const shades = [
      "#fffbe1", // soft cream
      "#ffe4e1",
      "#ffe5ef",
      "#f9e0e5",
      "#fff4fa",
      "#fff7eb",
    ];
    return shades[i % shades.length];
  }

  return (
    <section className="confessions-wall-box dreamy-confession-card">
      <div className="confessions-wall-title-wrap">
        <span className="confessions-wall-title">
          <span role="img" aria-label="love note" style={{ fontSize: 22, marginRight: 8 }}>💌</span>
          Confessions Wall
        </span>
        <span className="confessions-wall-rose" aria-hidden="true">🌹</span>
      </div>
      <form
        className="confessions-wall-form"
        style={{ marginBottom: 17 }}
        onSubmit={handlePost}
        autoComplete="off"
      >
        <input
          className="confession-input"
          type="text"
          value={input}
          maxLength={160}
          onChange={handleInput}
          placeholder="Type your sweet secret here..."
          aria-label="Type your confession"
          required
          spellCheck="false"
        />
        <button
          type="submit"
          className="confession-post-btn"
          disabled={!input.trim()}
          aria-label="Post confession"
        >
          💌 Post
        </button>
      </form>
      <div
        className="confessions-list-outer"
        ref={scrollRef}
        tabIndex={0}
        aria-label="Anonymous confessions wall"
      >
        {confessions.length === 0 ? (
          <div className="confession-bubble confession-empty">
            Nothing here yet. Be the first to confess your sweet secret!
          </div>
        ) : (
          confessions.map((msg, idx) => (
            <div
              key={confessions.length - idx + ":" + msg.slice(0, 28)}
              className={
                "confession-bubble" +
                (animQueue.includes(idx) ? " confession-bubble-pop" : "") +
                ((confessions.length - idx) % 4 === 0 ? " confession-bubble-right" : "")
              }
              style={{
                background: pastelBubbleColor(idx),
                animationDelay: animQueue.includes(idx) ? "0ms" : undefined,
              }}
            >
              <span className="confession-bubble-heart">💗</span>
              <span className="confession-msg">{msg}</span>
            </div>
          ))
        )}
      </div>
      <div className="confessions-wall-roses-bg" aria-hidden="true">
        {/* SVG faded roses */}
        <svg width="160" height="74" viewBox="0 0 160 74" className="confessions-wall-roses-svg">
          <ellipse cx="35" cy="39" rx="32" ry="15" fill="#ffe4e1" opacity="0.08" />
          <ellipse cx="120" cy="25" rx="28" ry="18" fill="#e0bbe4" opacity="0.05" />
          <ellipse cx="94" cy="68" rx="25" ry="11" fill="#ffd1dc" opacity="0.07" />
          <ellipse cx="55" cy="10" rx="18" ry="8" fill="#ffe4e1" opacity="0.10" />
          {/* Cute little "petal" */}
          <ellipse cx="140" cy="57" rx="13" ry="4" fill="#f9e0e5" opacity="0.09" />
        </svg>
      </div>
    </section>
  );
}

export default ConfessionsWallBox;
