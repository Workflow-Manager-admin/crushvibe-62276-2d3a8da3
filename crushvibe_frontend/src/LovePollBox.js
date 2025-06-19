import React, { useState, useRef } from "react";
import "./LovePollBox.css";

// The five love languages
const LOVE_LANGUAGES = [
  { key: "words", label: "Words of Affirmation", emoji: "💬" },
  { key: "acts", label: "Acts of Service", emoji: "🧁" },
  { key: "gifts", label: "Receiving Gifts", emoji: "🎁" },
  { key: "time", label: "Quality Time", emoji: "⏰" },
  { key: "touch", label: "Physical Touch", emoji: "🤗" }
];

// Default, soft pastel palette for poll bars
const POLL_COLORS = [
  "#ffe4e1", // main accent
  "#ffd1dc", // light pink
  "#e0bbe4", // dreamy purple
  "#f7b8d9", // warm pink
  "#fffde1", // pastel yellow
];

// Load/save to localStorage for soft persistence
const POLL_LS_KEY = "lovechamber-love-poll-results";

// PUBLIC_INTERFACE
function LovePollBox() {
  // Attempt to restore votes from localStorage, fallback to zeroed array
  const initialResults = (() => {
    try {
      const saved = JSON.parse(localStorage.getItem(POLL_LS_KEY));
      if (
        saved &&
        Array.isArray(saved) &&
        saved.length === LOVE_LANGUAGES.length &&
        saved.every((x) => typeof x === "number" && x >= 0)
      )
        return saved;
    } catch {}
    return Array(LOVE_LANGUAGES.length).fill(0);
  })();

  const [voteResults, setVoteResults] = useState(initialResults);
  const [selected, setSelected] = useState("");
  const [hasVoted, setHasVoted] = useState(
    !!localStorage.getItem("lovechamber-love-poll-voted")
  );
  const [animIndex, setAnimIndex] = useState(null); // for animating which bar
  const [animating, setAnimating] = useState(false);

  const barRefs = useRef([]);

  // Calculate total votes
  const total = voteResults.reduce((a, b) => a + b, 0);

  // Handler for voting
  // PUBLIC_INTERFACE
  function handleVoteSubmit(e) {
    e.preventDefault();
    if (!selected || animating || hasVoted) return;
    // Animate the selected bar "growing"
    const idx = LOVE_LANGUAGES.findIndex((item) => item.key === selected);
    setAnimIndex(idx);
    setAnimating(true);

    setTimeout(() => {
      // Actually update results after delay
      const next = [...voteResults];
      next[idx]++;
      setVoteResults(next);
      setHasVoted(true);
      setAnimating(false);
      setAnimIndex(null);
      // Persist to localStorage
      localStorage.setItem(POLL_LS_KEY, JSON.stringify(next));
      localStorage.setItem("lovechamber-love-poll-voted", "1");
    }, 640); // matches CSS animation duration
  }

  // PUBLIC_INTERFACE
  function handleRadioChange(e) {
    setSelected(e.target.value);
  }

  // Reset only for demo, not exposed to user
  // PUBLIC_INTERFACE
  // function resetPoll() {
  //   setVoteResults(Array(LOVE_LANGUAGES.length).fill(0));
  //   setHasVoted(false);
  //   localStorage.removeItem("lovechamber-love-poll-voted");
  //   localStorage.removeItem(POLL_LS_KEY);
  // }

  // Heart bar rendering
  function renderBar({ percent, color, anim, highlight, emoji }, i) {
    // Bar is a pastel rounded rectangle with a floating heart/emoji on the end
    return (
      <div
        key={i}
        className={`love-poll-bar-wrap${anim ? " bar-animate-grow" : ""}${highlight ? " bar-highlight" : ""}`}
        ref={(el) => (barRefs.current[i] = el)}
        style={{
          marginBottom: 17,
          position: "relative",
        }}
        aria-valuenow={percent}
      >
        <div
          className="love-poll-bar"
          style={{
            background: `linear-gradient(90deg, ${color} 78%, #fffde199 100%)`,
            width: anim ? "0%" : `${percent}%`,
            minWidth: 28,
            height: 32,
            borderRadius: 22,
            transition: anim
              ? "none"
              : "width 0.76s cubic-bezier(.51,1.13,.71,1.02)",
            boxShadow:
              highlight && !anim
                ? "0 4px 22px #ffd1dc77, 0 0 14px #e0bbe430"
                : "0 2px 12px 0 #ffd1dc24",
            display: "flex",
            alignItems: "center",
            position: "relative",
            zIndex: 2
          }}
        >
          <span
            className="love-poll-bar-label"
            style={{
              fontWeight: 700,
              color: "#e06db1",
              fontFamily: "'Segoe UI', Pacifico, sans-serif",
              fontSize: "1.08rem",
              marginLeft: 18,
              lineHeight: "32px",
              zIndex: 3
            }}
          >
            {emoji}
          </span>
        </div>
        {/* Heart/emoji at end */}
        <span
          className="love-poll-bar-emoji-float"
          style={{
            left: anim
              ? "12px"
              : `calc(${percent}% + 0px - 18px)`,
            transition: anim
              ? "none"
              : "left 0.75s cubic-bezier(.51,1.13,.71,1.02)",
            background: "#ffe4e1cc",
            borderRadius: "50%",
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            boxShadow:
              highlight && !anim
                ? "0 2px 20px #ffd1dc, 0 0 12px #e0bbe477"
                : "0 1px 7px #e0bbe445",
            fontSize: "23px",
            width: "36px",
            height: "36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 4,
            border: highlight ? "2.8px solid #e06db1" : "2.3px solid #ffd1dc"
          }}
        >
          {emoji === "💬" ? "💖" : emoji}
        </span>
        {/* Percent and label */}
        <span
          className="love-poll-bar-caption"
          style={{
            position: "absolute",
            top: "48%",
            left: "65px",
            transform: "translateY(-50%)",
            fontWeight: anim ? 400 : 600,
            color: "#a76fb9",
            fontSize: "1.04rem",
            zIndex: 6,
            textShadow: "0 1px 4px #ffe4e18a",
            letterSpacing: "0.03em"
          }}
        >
          {LOVE_LANGUAGES[i].label}
          {total > 0 && (
            <span style={{
              fontWeight: 500,
              color: "#e06db1",
              marginLeft: 15
            }}>
              {voteResults[i]} vote{voteResults[i] !== 1 ? "s" : ""} ({percent}%)
            </span>
          )}
        </span>
      </div>
    );
  }

  // Calculate percent (rounded, always at least bar visible)
  const getPercents = () => {
    if (total === 0) return Array(LOVE_LANGUAGES.length).fill(12);
    let raw = voteResults.map((count) =>
      Math.round((count / total) * 100)
    );
    // Padding so a 0-vote has a tiny bar
    return raw.map((p) => Math.max(12, p));
  };
  const percents = getPercents();

  return (
    <section className="love-poll-box pastel-card">
      <div className="love-poll-title-wrap">
        <span className="love-poll-title">
          <span role="img" aria-label="love letter" style={{ fontSize: 22, marginRight: 8 }}>💌</span>
          What’s Your Love Language?
        </span>
        <span className="love-poll-heart-deco" aria-hidden="true">💕</span>
      </div>
      {/* Voting form */}
      {!hasVoted ? (
        <form className="love-poll-form" onSubmit={handleVoteSubmit}>
          {LOVE_LANGUAGES.map(({ key, label, emoji }, idx) => (
            <label className="love-poll-radio-label" key={key}>
              <input
                type="radio"
                name="loveLang"
                value={key}
                checked={selected === key}
                disabled={animating}
                onChange={handleRadioChange}
                className="love-poll-radio"
                required
                aria-label={label}
              />
              <span className="love-poll-radio-custom">
                {emoji}
              </span>
              <span className="love-poll-radio-text">{label}</span>
            </label>
          ))}
          <button
            type="submit"
            className="love-poll-submit-btn"
            disabled={!selected || animating}
          >
            <span role="img" aria-label="heart">💖</span> Vote!
          </button>
        </form>
      ) : (
        <div className="love-poll-thanks-text" tabIndex={0} aria-live="polite">
          <span role="img" aria-label="thank you" style={{ fontSize: 20, marginRight: 8 }}>🥰</span>
          Thanks for voting! Here’s what everyone loves most:
        </div>
      )}
      {/* Results bar chart, always visible for live updating */}
      <div className="love-poll-results-wrap">
        {LOVE_LANGUAGES.map((lang, idx) =>
          renderBar({
            percent: percents[idx],
            color: POLL_COLORS[idx % POLL_COLORS.length],
            anim: animating && animIndex === idx,
            highlight: hasVoted
              ? voteResults[idx] > 0 &&
                voteResults[idx] === Math.max(...voteResults)
              : false,
            emoji: lang.emoji
          }, idx)
        )}
      </div>
      {/* <button onClick={resetPoll}>[reset poll for dev]</button> */}
    </section>
  );
}

export default LovePollBox;
