import React, { useState, useRef } from "react";
import "./SpinTheHeartBox.css";

// PUBLIC_INTERFACE
/**
 * SpinTheHeartBox
 * A dreamy, pastel spinning heart wheel game for playful love prompts, now
 * upgraded to be larger, visually clean, spacious, and truly pastel dreamy.
 */
function SpinTheHeartBox() {
  const SEGMENTS = [
    { label: "Secret Admirer", emoji: "💌" },
    { label: "Go Text Them!", emoji: "📱" },
    { label: "It’s Fate!", emoji: "✨" },
    { label: "Flirt Alert!", emoji: "💖" },
    { label: "Make a Move!", emoji: "🥰" },
    { label: "Cuddle Mood", emoji: "🧸" }
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

    const selected = Math.floor(Math.random() * SEGMENTS.length);

    // Animate: 4-5 full turns + land on segment smoothly, use up to 2s.
    const baseSpins = 4 + Math.floor(Math.random() * 2);
    const degreesPer = 360 / SEGMENTS.length;
    const offset = (Math.random() * 8 - 4); // small natural jitter
    const endDeg = baseSpins * 360 + (360 - selected * degreesPer) + offset;

    if (spinnerRef.current) {
      spinnerRef.current.style.transition = "none";
      spinnerRef.current.style.transform = "rotate(0deg)";
      // Double rAF for robust animation reset in React
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (spinnerRef.current) {
            spinnerRef.current.style.transition = "transform 1.98s cubic-bezier(.44,1.19,.61,1.03)";
            spinnerRef.current.style.transform = `rotate(${endDeg}deg)`;
          }
        });
      });
    }

    // End state after animation (~2s)
    setTimeout(() => {
      setResult(selected);
      setSpinning(false);
      setSpinGlow(true);
    }, 2000);
  }

  return (
    <section className="spin-heart-box dreamy-spin-box">
      <div
        className="spin-heart-title"
        style={{
          fontFamily: "'Pacifico', cursive",
          fontWeight: 700,
          fontSize: "1.45rem",
          letterSpacing: ".03em",
          color: "#e06db1",
          marginBottom: 21,
          textAlign: "center",
          textShadow: "0 3px 24px #ffe4e181, 0.5px 0.5px #fff6"
        }}
      >
        <span style={{ fontSize: 27, marginRight: 10, verticalAlign: "bottom" }}>💝</span>
        Spin the Heart
      </div>
      <div
        className="heart-spinner-outer"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "354px"
        }}
      >
        <div
          className="heart-spinner heart-spinner-upgraded"
          ref={spinnerRef}
          aria-label="Spinning Heart Wheel"
          tabIndex={-1}
        >
          <HeartWheel
            count={SEGMENTS.length}
            segments={SEGMENTS}
            highlight={result}
            size={340}
          />
          <div className="spin-heart-pointer">
            <svg width="33" height="40" viewBox="0 0 33 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <polygon points="16.5,0 33,40 0,40" fill="#ffd1dc" stroke="#e06db1" strokeWidth="1.4"/>
              <ellipse cx="16.5" cy="34" rx="7.8" ry="6.9" fill="#ffe4e1" opacity=".63"/>
              <ellipse cx="16.5" cy="35.5" rx="3.1" ry="2.6" fill="#fff" opacity=".32"/>
            </svg>
          </div>
        </div>
      </div>
      <button
        className="spin-heart-btn"
        type="button"
        aria-label="Spin the Heart"
        onClick={handleSpin}
        disabled={spinning}
        style={{
          margin: "0 auto",
          marginTop: 12,
          display: "block",
          fontSize: "1.12rem"
        }}
      >
        <span role="img" aria-label="sparkles" style={{ fontSize: 19, marginRight: 7 }}>
          💫
        </span>
        Spin Now
      </button>
      <div
        className={`spin-heart-result${spinGlow && result !== null ? " spin-heart-result-glow" : ""}`}
        style={{
          marginTop: 25,
          textAlign: "center",
          minHeight: 38,
          fontWeight: 700,
          fontSize: "1.26rem",
          color: "#e06db1",
          textShadow: spinGlow ? "0 2px 20px #ffd1dcba,0 1.6px 14px #ffe4e1b2" : "0 1px 14px #ffe4e181",
          letterSpacing: ".01em",
          transition: "all .18s"
        }}
        aria-live="polite"
      >
        {result !== null && (
          <>
            <span style={{ marginRight: 9, fontSize: 25, verticalAlign: "middle" }}>
              {SEGMENTS[result].emoji}
            </span>
            <span>{SEGMENTS[result].label}</span>
          </>
        )}
      </div>
    </section>
  );
}

// Render a large pastel SVG wheel with clear text and a big heart
// PUBLIC_INTERFACE
function HeartWheel({ count, segments, highlight, size = 340 }) {
  // Segment pastel colors, dreamy, light-to-mid, keep readable
  const segmentColors = [
    "#ffe4e1",
    "#ffd1dc",
    "#e0bbe4",
    "#f8e9fd",
    "#fffde1",
    "#f7d9ea"
  ];
  const center = size / 2;
  const R = center * 0.87;
  const labelR = center * 0.57;
  const emojiR = center * 0.44;
  const fontScale = size / 340;

  // Label layout: slot the labels around, spacing out on arc, vertical fudge for clarity
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{
        display: "block",
        transform: "rotate(-90deg)", // pointer is at 12 o'clock
        filter: "drop-shadow(0 2px 48px #ffd1dc6e) drop-shadow(0 7px 30px #e0bbe430)"
      }}
      aria-hidden="true"
    >
      {[...Array(count)].map((_, i) => {
        // Segment geometry
        const angle = (360 / count) * i;
        const nextAngle = angle + 360 / count;
        const rad = deg => (deg * Math.PI) / 180;
        // Draw arc for wedge
        const x1 = center + R * Math.cos(rad(angle));
        const y1 = center + R * Math.sin(rad(angle));
        const x2 = center + R * Math.cos(rad(nextAngle));
        const y2 = center + R * Math.sin(rad(nextAngle));
        // Large-arc > 180 degrees?
        const largeArc = 360 / count > 180 ? 1 : 0;
        // Space between segments
        const gapR = R * 0.84;
        const gx1 = center + gapR * Math.cos(rad(angle + 1.3));
        const gy1 = center + gapR * Math.sin(rad(angle + 1.3));
        const gx2 = center + gapR * Math.cos(rad(nextAngle - 1.3));
        const gy2 = center + gapR * Math.sin(rad(nextAngle - 1.3));
        return (
          <g key={i}>
            <path
              d={
                `M${center},${center} L${gx1},${gy1} ` +
                `A${gapR},${gapR} 0 ${largeArc},1 ${gx2},${gy2} Z`
              }
              fill={segmentColors[i % segmentColors.length]}
              stroke={highlight === i ? "#e06db1" : "#e0bbe4"}
              strokeWidth={highlight === i ? 5.2 * fontScale : 2.6 * fontScale}
              style={{
                opacity: highlight === i ? 0.99 : 0.83,
                filter: highlight === i ? "drop-shadow(0 3px 22px #ffd1dcc0)" : "",
                transition: "stroke .19s, opacity .17s"
              }}
            />
            {/* Emoji & label centered along arc */}
            <g
              style={{
                pointerEvents: "none",
                opacity: highlight === i ? 1 : 0.89,
                filter: highlight === i ? "drop-shadow(0 1px 24px #ffd1dcb4)" : ""
              }}
              transform={`rotate(${angle + 360 / (count * 2)},${center},${center})`}
            >
              <text
                x={center}
                y={center - emojiR}
                textAnchor="middle"
                alignmentBaseline="middle"
                fontSize={`${30 * fontScale}px`}
                fontFamily="Segoe UI Emoji,sans-serif"
                style={{
                  opacity: 0.92,
                  fontWeight: 900
                }}
              >
                {segments[i].emoji}
              </text>
              <text
                x={center}
                y={center - labelR}
                textAnchor="middle"
                alignmentBaseline="middle"
                fontSize={`${16 * fontScale}px`}
                fontFamily="'Pacifico', cursive, Arial, sans-serif"
                fill="#e06db1"
                style={{
                  fontWeight: 700,
                  opacity: highlight === i ? 1 : 0.73,
                  filter: highlight === i ? "drop-shadow(0 2px 14px #ffe4e1)" : "",
                  textShadow: "0 4px 24px #e0bbe489"
                }}
              >
                {segments[i].label}
              </text>
            </g>
          </g>
        );
      })}
      {/* Large dreamy glowing central heart */}
      <g transform={`rotate(90,${center},${center})`}>
        {/* Outer pastel heart glow */}
        <ellipse
          cx={center}
          cy={center + center * 0.13}
          rx={center * 0.49}
          ry={center * 0.29}
          fill="#ffe4e1"
          opacity="0.92"
          style={{
            filter: "drop-shadow(0 2px 33px #ffd1dc83)"
          }}
        />
        {/* Main heart shape */}
        <path
          d={`
            M${center - size * 0.20},${center + center * 0.09}
            Q${center},${center - center * 0.23} ${center + size * 0.20},${center + center * 0.09}
            Q${center + size * 0.16},${center + center * 0.32} ${center},${center + center * 0.41}
            Q${center - size * 0.16},${center + center * 0.32} ${center - size * 0.20},${center + center * 0.09}
            Z
          `}
          fill="#e0bbe4"
          opacity="0.93"
        />
        {/* Inner highlight */}
        <ellipse
          cx={center}
          cy={center + center * 0.17}
          rx={center * 0.15}
          ry={center * 0.09}
          fill="#fffde1"
          opacity={highlight != null ? "1" : ".55"}
          style={{
            filter: highlight != null ? "drop-shadow(0 0 19px #ffd1dcaa)" : "none",
            transition: "all .18s"
          }}
        />
      </g>
    </svg>
  );
}

export default SpinTheHeartBox;
