import React from "react";

// PUBLIC_INTERFACE
function Logo({ size = 50 }) {
  /** This is a public simple pastel circular logo representing LOVE CHAMBER. */
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 58 58"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        display: "block",
        borderRadius: "50%",
        background: "linear-gradient(135deg, #ffd1dc 40%, #e0bbe4 90%)",
        boxShadow: "0 2px 8px 0 rgba(224,187,228,0.13)",
      }}
    >
      <circle cx="29" cy="29" r="28" fill="#ffd1dc" stroke="#e0bbe4" strokeWidth="1.5" />
      <ellipse
        cx="29"
        cy="32"
        rx="15"
        ry="13"
        fill="#ffe4e1"
        opacity="0.88"
      />
      <path
        d="M21 27C21 23.134 24.134 20 28 20C31.866 20 35 23.134 35 27C35 29.761 32.761 32 30 32C27.239 32 25 29.761 25 27"
        fill="#e0bbe4"
        opacity="0.75"
      />
      <circle cx="20.5" cy="23.5" r="2.5" fill="#fff" opacity="0.5" />
      <circle cx="37.5" cy="23.5" r="2.5" fill="#fff" opacity="0.3" />
      <text
        x="29"
        y="38"
        textAnchor="middle"
        fontFamily="Times New Roman, Times, serif"
        fontWeight="bold"
        fontSize="11"
        fill="#e0bbe4"
        opacity="0.95"
        alignmentBaseline="middle"
      >
        LOVE
      </text>
    </svg>
  );
}

export default Logo;
