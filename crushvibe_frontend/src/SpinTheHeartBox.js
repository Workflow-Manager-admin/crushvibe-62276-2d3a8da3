import React, { useState, useRef } from "react";
import "./SpinTheHeartBox.css";

// PUBLIC_INTERFACE
/**
 * SpinTheHeartBox
 * A dreamy, pastel spinning heart wheel game for playful love prompts.
 */
function SpinTheHeartBox() {
  const SEGMENTS = [
    { label: "Secret Admirer", emoji: "💌" },
    { label: "Go Text Them!", emoji: "📱" },
    { label: "It’s Fate!", emoji: "✨" },
    { label: "Flirt Alert!", emoji: "💖" },
    { label: "Make a Move!", emoji: "🥰" },
    { label: "Cuddle Mood", emoji: "🧸" },
  ];
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [spinGlow, setSpinGlow] = useState(false);
  const spinnerRef = useRef(null);

  // PUBLIC_INTERFACE
  function handleSpin() {
    if (spinning) return;
    setSpinning(true);
    setSpinGlow(false);

    // Pick randomly, but ensure it's bouncy/fun
    const selected = Math.floor(Math.random() * SEGMENTS.length);

    // Animate spin: 2-3 full turns plus landing on segment
    const baseSpins = 3;
    const degreesPer = 360 / SEGMENTS.length;
    const endDeg =
      baseSpins * 360 +
      (360 - selected * degreesPer) +
      Math.floor(Math.random() * 12 - 6);

    // CSS animation — set variable to force rerender/animation
    if (spinnerRef.current) {
      spinnerRef.current.style.transition = "none";
      spinnerRef.current.style.transform = `rotate(0deg)`;
      // Necessary to reset and retrigger transition
      setTimeout(() => {
        if (spinnerRef.current) {
          spinnerRef.current.style.transition = "transform 1.67s cubic-bezier(.54,1.5,.88,1.07)";
          spinnerRef.current.style.transform = `rotate(${endDeg}deg)`;
        }
      }, 18);
    }

    // End state after animation (~1.7s)
    setTimeout(() => {
      setResult(selected);
      setSpinning(false);
      setSpinGlow(true);
    }, 1700);
  }

  return (
    <section className="spin-heart-box dreamy-spin-box">
      <div
        className="spin-heart-title"
        style={{
          fontFamily: "'Pacifico', cursive",
          fontWeight: 700,
          fontSize: "1.27rem",
          letterSpacing: ".02em",
          color: "#e06db1",
          marginBottom: 14,
          textAlign: "center",
          textShadow: "0 2px 16px #ffe4e161, 0.5px 0.5px #fff6"
        }}
      >
        <span style={{ fontSize: 21, marginRight: 6 }}>💝</span>
        Spin the Heart
      </div>
      <div
        className="heart-spinner-outer"
        style={{ display: "flex", justifyContent: "center", alignItems: "center", }}
      >
        <div className="heart-spinner" ref={spinnerRef} aria-label="Spinning Heart Wheel">
          <HeartWheel
            count={SEGMENTS.length}
            segments={SEGMENTS}
            spinning={spinning}
            highlight={result}
          />
        </div>
      </div>
      <button
        className="spin-heart-btn"
        type="button"
        aria-label="Spin the Heart"
        onClick={handleSpin}
        disabled={spinning}
        style={{ margin: "0 auto", marginTop: 12, display: "block" }}
      >
        <span role="img" aria-label="sparkles" style={{ fontSize: 17, marginRight: 6 }}>
          💫
        </span>
        Spin Now
      </button>
      <div
        className={`spin-heart-result${spinGlow && result !== null ? " spin-heart-result-glow" : ""}`}
        style={{
          marginTop: 18,
          textAlign: "center",
          minHeight: 32,
          fontWeight: 600,
          fontSize: "1.14rem",
          color: "#e06db1",
          textShadow: spinGlow ? "0 2px 20px #ffd1dcba,0 1.6px 14px #ffe4e1b2" : "0 1px 10px #ffe4e181",
          letterSpacing: ".01em",
          transition: "all .14s"
        }}
        aria-live="polite"
      >
        {result !== null && (
          <>
            <span style={{ marginRight: 7, fontSize: 20 }}>
              {SEGMENTS[result].emoji}
            </span>
            <span>{SEGMENTS[result].label}</span>
          </>
        )}
      </div>
    </section>
  );
}

// Render the SVG pastel heart wheel segments with playful colors
function HeartWheel({ count, segments, spinning, highlight }) {
  const R = 67; // radius for big heart shape
  const segmentColors = [
    "#ffe4e1", "#e0bbe4", "#ffd1dc", "#fffde1", "#f7d9ea", "#f8f4ff"
  ];

  // Heart-shaped wheel: render each wedge, offset, with emoji/label
  return (
    <svg
      width="154" height="154" viewBox="0 0 154 154"
      style={{
        filter: "drop-shadow(0 2px 18px #ffd1dccc) drop-shadow(0 1px 10px #e0bbe48a)"
      }}
      aria-hidden="true"
    >
      {[...Array(count)].map((_, i) => {
        // Wedge shape math (polar to cartesian)
        const angle = (360 / count) * i - 90;
        const nextAngle = angle + 360 / count;
        const rad = deg => (deg * Math.PI) / 180;
        // Pie wedge coordinates for heart curve base points
        const x1 = 77 + R * Math.cos(rad(angle));
        const y1 = 77 + R * Math.sin(rad(angle));
        const x2 = 77 + R * Math.cos(rad(nextAngle));
        const y2 = 77 + R * Math.sin(rad(nextAngle));
        // For soft, dreamy effect, draw with curve and pastel border

        // Heart-shaped mask overlay — base is circle, optionally overlay heart
        return (
          <g key={i}>
            <path
              d={
                `M77,77 L${x1},${y1} `
                + `A${R},${R} 0 0,1 ${x2},${y2} Z`
              }
              fill={segmentColors[i % segmentColors.length]}
              stroke={highlight === i ? "#e06db1" : "#e0bbe4"}
              strokeWidth={highlight === i ? 3.8 : 1.7}
              style={{
                opacity: highlight === i ? 0.98 : 0.79,
                filter: highlight === i ? "drop-shadow(0 1px 14px #ffd1dccc)" : "",
                transition: "stroke .12s, opacity .14s"
              }}
            />
            {/* Emoji and label for this wedge */}
            <g
              style={{
                pointerEvents: "none",
                opacity: 0.95,
                filter: (highlight === i ? "drop-shadow(0 1px 11px #ffd1dce8)" : "")
              }}
              transform={`rotate(${angle + 360 / (count*2)},77,77)`}
            >
              <text
                x={77}
                y={33}
                textAnchor="middle"
                alignmentBaseline="middle"
                fontSize="1.25rem"
                fontFamily="Segoe UI Emoji,sans-serif"
                style={{
                  opacity: 0.89,
                  fontWeight: 900
                }}
              >
                {segments[i].emoji}
              </text>
              <text
                x={77}
                y={48}
                textAnchor="middle"
                alignmentBaseline="middle"
                fontSize="0.73rem"
                fontFamily="'Pacifico', cursive, 'Segoe UI',sans-serif"
                fill="#e06db1"
                style={{
                  opacity: highlight === i ? 1 : 0.75,
                  fontWeight: 700,
                  filter: highlight === i ? "drop-shadow(0 1px 8px #ffe4e1b2)" : "",
                  textShadow: "0 2px 10px #e0bbe47a"
                }}
              >
                {segments[i].label}
              </text>
            </g>
          </g>
        );
      })}
      {/* Center pastel-glow heart */}
      <g>
        <ellipse
          cx={77}
          cy={89}
          rx={29}
          ry={19}
          fill="#ffd1dc"
          opacity="0.86"
          style={{
            filter: "drop-shadow(0 2px 14px #ffe4e185)"
          }}
        />
        <path
          d="M57,85
             Q77,64 97,85
             Q83,104 77,115
             Q71,104 57,85"
          fill="#e0bbe4"
          opacity="0.93"
        />
        <ellipse
          cx={77}
          cy={89}
          rx={12}
          ry={7}
          fill="#fffde1"
          opacity={highlight != null ? "1" : ".63"}
          style={{
            filter: highlight != null ? "drop-shadow(0 0 11px #ffd1dc90)" : "none",
            transition: "all .16s"
          }}
        />
      </g>
    </svg>
  );
}

export default SpinTheHeartBox;
