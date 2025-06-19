import React, { useRef, useState } from "react";
import "./SpinTheHeartBox.css";

// PUBLIC_INTERFACE
/**
 * SpinTheHeartBox
 * A dreamy, pastel, accurate SVG spinner wheel for love prompts.
 * Now: 6 gorgeous pastel segments, center heart, top pointer, smooth spin, and highlighted result.
 */
function SpinTheHeartBox() {
  // Segment data and pastel-paired colors
  const SEGMENTS = [
    { label: "Secret Admirer", emoji: "💌" },
    { label: "Go Text Them!", emoji: "📱" },
    { label: "It’s Fate!", emoji: "✨" },
    { label: "Flirt Alert!", emoji: "💖" },
    { label: "Make a Move!", emoji: "🥰" },
    { label: "Cuddle Mood", emoji: "🧸" },
  ];
  const PASTEL_COLORS = [
    "#ffe4e1", // 1
    "#ffd1dc", // 2
    "#e0bbe4", // 3
    "#f8e9fd", // 4
    "#fffde1", // 5 (yellow pastel)
    "#f7d9ea"  // 6 (warm pink)
  ];

  const spinnerRef = useRef(null);
  const [spinning, setSpinning] = useState(false);
  const [selected, setSelected] = useState(null);
  const [postSpinGlow, setPostSpinGlow] = useState(false);

  // ------------------------------------------------------------------
  // PUBLIC_INTERFACE
  function handleSpin() {
    if (spinning) return;
    setSpinning(true);
    setPostSpinGlow(false);

    const slice = SEGMENTS.length;
    const choice = Math.floor(Math.random() * slice);

    // Spin math: 360deg/(n), 4-5 full turns, always lands with pointer at 12 o'clock on chosen wedge
    const rounds = 4 + Math.floor(Math.random() * 2); // 4 or 5 spins
    const sliceAngle = 360 / slice;
    const pointerOffset = 0; // SVG pointer is at 0deg (top)
    const endAngle =
      rounds * 360 +
      pointerOffset -
      (choice * sliceAngle + sliceAngle / 2); // Center of wedge at pointer

    // Reset rotation for repeatable animation
    if (spinnerRef.current) {
      spinnerRef.current.style.transition = "none";
      spinnerRef.current.style.transform = "rotate(0deg)";
      // Two rAFs for React layout flush
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (spinnerRef.current) {
            spinnerRef.current.style.transition =
              "transform 2.11s cubic-bezier(.51,1.13,.71,1.02)";
            spinnerRef.current.style.transform = `rotate(${endAngle}deg)`;
          }
        });
      });
    }
    // After spin animation, set result/highlight
    setTimeout(() => {
      setSelected(choice);
      setSpinning(false);
      setPostSpinGlow(true);
    }, 2100);
  }
  // ------------------------------------------------------------------

  return (
    <section className="spin-heart-box dreamy-spin-box" data-testid="SpinTheHeartBox">
      <div className="spin-heart-title">
        <span style={{ fontSize: 27, marginRight: 10, verticalAlign: "bottom" }}>💝</span>
        Spin the Heart
      </div>
      <div className="heart-spinner-outer">
        {/* Spinner and pointer */}
        <div
          className="heart-spinner heart-spinner-upgraded"
          ref={spinnerRef}
          aria-label="Love Spinner"
          tabIndex={-1}
        >
          <SVGSpinner
            segments={SEGMENTS}
            pastelColors={PASTEL_COLORS}
            highlight={selected}
            size={340}
          />
          <PointerSVG />
        </div>
      </div>
      <button
        type="button"
        className="spin-heart-btn"
        aria-label="Spin the Heart"
        onClick={handleSpin}
        disabled={spinning}
        style={{
          margin: "0 auto",
          marginTop: 14,
          display: "block",
          fontSize: "1.13rem",
        }}
      >
        <span role="img" aria-label="sparkles" style={{ fontSize: 18, marginRight: 7 }}>💫</span>
        Spin Now
      </button>
      <div
        className={`spin-heart-result${postSpinGlow && selected != null ? " spin-heart-result-glow" : ""}`}
        style={{
          marginTop: 26, textAlign: "center", minHeight: 38, fontWeight: 700, fontSize: "1.27rem",
          color: "#e06db1", transition: "all .18s"
        }}
        aria-live="polite"
      >
        {selected !== null && (
          <>
            <span style={{ marginRight: 9, fontSize: 24, verticalAlign: "middle" }}>{SEGMENTS[selected].emoji}</span>
            <span>{SEGMENTS[selected].label}</span>
          </>
        )}
      </div>
    </section>
  );
}

// PUBLIC_INTERFACE
function SVGSpinner({ segments, pastelColors, highlight, size }) {
  // SVG spinner - 6 wedges, pastel, centered labels/emojis on arc, glowing heart center
  const count = segments.length;
  const center = size / 2;
  const R = center * 0.97; // Outer
  const Rgap = center * 0.84; // Wedge end, for visible space
  const labelR = center * 0.57;
  const emojiR = center * 0.44;
  const fontScale = size / 340;

  // Render wedges and labels using polar math
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{
        display: "block",
        userSelect: "none",
        pointerEvents: "none",
        transform: "rotate(-90deg)", // pointer points up
        filter:
          "drop-shadow(0 2px 44px #ffd1dca8) drop-shadow(0 7px 22px #e0bbe450)",
        background: "none"
      }}
      aria-hidden="true"
    >
      {Array.from({ length: count }).map((_, i) => {
        // Geometric math for wedges
        const angle = (360 / count) * i;
        const nextAngle = angle + 360 / count;
        const rad = (deg) => (deg * Math.PI) / 180;

        // Per-wedge
        const gx1 = center + Rgap * Math.cos(rad(angle + 1.1));
        const gy1 = center + Rgap * Math.sin(rad(angle + 1.1));
        const gx2 = center + Rgap * Math.cos(rad(nextAngle - 1.1));
        const gy2 = center + Rgap * Math.sin(rad(nextAngle - 1.1));
        const largeArc = 360 / count > 180 ? 1 : 0;

        return (
          <g key={i}>
            <path
              d={
                `M${center},${center} L${gx1},${gy1} ` +
                `A${Rgap},${Rgap} 0 ${largeArc},1 ${gx2},${gy2} Z`
              }
              fill={pastelColors[i % pastelColors.length]}
              stroke={highlight === i ? "#e06db1" : "#e0bbe4"}
              strokeWidth={highlight === i ? 5.0 * fontScale : 2.6 * fontScale}
              style={{
                opacity: highlight === i ? 0.99 : 0.83,
                filter: highlight === i ? "drop-shadow(0 2px 21px #ffd1dcc0)" : "",
                transition: "stroke .2s, opacity .18s"
              }}
            />
            {/* Label/emoji arc center */}
            <g
              style={{
                pointerEvents: "none",
                opacity: highlight === i ? 1 : 0.91,
                filter: highlight === i ? "drop-shadow(0 1px 14px #ffd1dcb3)" : ""
              }}
              transform={`rotate(${angle + 360 / (count * 2)},${center},${center})`}
            >
              <text
                x={center}
                y={center - emojiR}
                textAnchor="middle"
                alignmentBaseline="middle"
                fontSize={`${29 * fontScale}px`}
                fontFamily="Segoe UI Emoji,sans-serif"
                style={{
                  opacity: 0.94,
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
                fontSize={`${15.3 * fontScale}px`}
                fontFamily="'Pacifico', cursive, Arial, sans-serif"
                fill="#e06db1"
                style={{
                  fontWeight: 700,
                  opacity: highlight === i ? 1 : 0.74,
                  filter: highlight === i ? "drop-shadow(0 2px 8px #ffe4e1)" : "",
                  textShadow: "0px 4px 14px #e0bbe488"
                }}
              >
                {segments[i].label}
              </text>
            </g>
          </g>
        );
      })}
      {/* Center pastel dreamy heart */}
      <g transform={`rotate(90,${center},${center})`}>
        <ellipse
          cx={center}
          cy={center + center * 0.17}
          rx={center * 0.45}
          ry={center * 0.28}
          fill="#ffe4e1"
          opacity="0.93"
          style={{
            filter: "drop-shadow(0 2px 27px #ffd1dc83)"
          }}
        />
        {/* Main heart */}
        <path
          d={`
            M${center - size * 0.20},${center + center * 0.09}
            Q${center},${center - center * 0.22} ${center + size * 0.20},${center + center * 0.09}
            Q${center + size * 0.16},${center + center * 0.31} ${center},${center + center * 0.43}
            Q${center - size * 0.16},${center + center * 0.31} ${center - size * 0.20},${center + center * 0.09}
            Z
          `}
          fill="#e0bbe4"
          opacity="0.92"
        />
        {/* Inner light highlight */}
        <ellipse
          cx={center}
          cy={center + center * 0.18}
          rx={center * 0.15}
          ry={center * 0.09}
          fill="#fffde1"
          opacity={highlight != null ? "1" : ".51"}
          style={{
            filter: highlight != null ? "drop-shadow(0 0 16px #ffd1dcaa)" : "none",
            transition: "all .17s"
          }}
        />
      </g>
    </svg>
  );
}

// PUBLIC_INTERFACE - Top triangle pointer SVG
function PointerSVG() {
  return (
    <div className="spin-heart-pointer" aria-hidden="true">
      <svg width="40" height="45" viewBox="0 0 33 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="16.5,0 33,40 0,40" fill="#ffd1dc" stroke="#e06db1" strokeWidth="1.4" />
        <ellipse cx="16.5" cy="34" rx="7.8" ry="6.9" fill="#ffe4e1" opacity=".63" />
        <ellipse cx="16.5" cy="35.5" rx="3.1" ry="2.6" fill="#fff" opacity=".32" />
      </svg>
    </div>
  );
}

export default SpinTheHeartBox;
