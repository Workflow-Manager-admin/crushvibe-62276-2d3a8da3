import React from "react";
import "./GoofyImageBox.css";

// PUBLIC_INTERFACE
/**
 * GoofyImageBox
 * Shows a playful, cartoon-style pastel illustration with a subtle wiggle animation,
 * a cheerful caption, and a friendly style. Designed to brighten the page and amuse.
 */
function GoofyImageBox() {
  return (
    <section className="goofy-image-box laugh-card" tabIndex={0} aria-label="Goofy Fun Box">
      <div className="goofy-pic-outer">
        {/* Fun cartoon style SVG with a goofy smiling face */}
        <svg
          className="goofy-pic-svg"
          width="125"
          height="100"
          viewBox="0 0 125 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <ellipse
            cx="65"
            cy="50"
            rx="51"
            ry="38"
            fill="#fffde1"
            stroke="#e0bbe4"
            strokeWidth="2.2"
          />
          {/* Eyes (one winking!) */}
          <ellipse cx="47" cy="48" rx="7" ry="7.5" fill="#ffd1dc" />
          <ellipse cx="88" cy="48.5" rx="8" ry="3.7" fill="#e0bbe4" />
          <ellipse cx="47" cy="48.1" rx="2.6" ry="2.7" fill="#e06db1" opacity="0.85" />
          <ellipse
            cx="88"
            cy="48.6"
            rx="2.2"
            ry="1.1"
            fill="#ca86af"
            opacity="0.75"
          />
          {/* Big smile */}
          <path
            d="M54 66 Q65 82 78 67"
            stroke="#e06db1"
            strokeWidth="4.2"
            fill="none"
            strokeLinecap="round"
          />
          {/* Goofy tongue */}
          <ellipse
            cx="66"
            cy="74"
            rx="6.6"
            ry="3.2"
            fill="#ffd1dc"
            opacity="0.63"
          />
          {/* Pink cheek blush */}
          <ellipse cx="42" cy="60" rx="4" ry="2.1" fill="#ffd1dc" opacity="0.48" />
          <ellipse cx="90" cy="60" rx="5.1" ry="2.5" fill="#ffd1dc" opacity="0.42" />
          {/* Random hair squiggle */}
          <path
            d="M55 25 Q63 14 72 27"
            stroke="#e0bbe4"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          {/* Silly sticker / accent */}
          <ellipse cx="98" cy="33" rx="8" ry="5.5" fill="#ffe4e1" opacity="0.37" />
        </svg>
      </div>
      <div className="goofy-caption">
        <span role="img" aria-label="silly">😜</span> 
        Stay silly, spread smiles!
      </div>
    </section>
  );
}

export default GoofyImageBox;
