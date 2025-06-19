
import React, { useState } from 'react';
import './App.css';
// PUBLIC_INTERFACE
import FloatingHeartsBackground from './FloatingHeartsBackground';
import './FloatingHeartsBackground.css';
import Logo from './Logo';
import LoveMoodboardSection from './LoveMoodboardSection';
import "./LoveMoodboardSection.css";
import ZodiacPredictionSection from "./ZodiacPredictionSection";
import "./ZodiacPredictionSection.css";
import SpinTheHeartBox from "./SpinTheHeartBox";
import "./SpinTheHeartBox.css";
import PickupLinesBox from "./PickupLinesBox";
import LovePollBox from "./LovePollBox";
import GoofyImageBox from "./GoofyImageBox";
import "./GoofyImageBox.css";
import ConfessionsWallBox from "./ConfessionsWallBox";
import "./ConfessionsWallBox.css";
import LoveDareBox from "./LoveDareBox";
import "./LoveDareBox.css";

// PUBLIC_INTERFACE
function App() {
  // State hooks for inputs and outputs
  const [yourName, setYourName] = useState('');
  const [crushName, setCrushName] = useState('');
  const [verdict, setVerdict] = useState('');
  const [flirtyLine, setFlirtyLine] = useState('');
  const [showResult, setShowResult] = useState(false);

  // Sample hardcoded playful verdicts and flirty lines
  const verdicts = [
    "🔥 Sparks are flying!",
    "💘 Hot match alert!",
    "😉 The universe is rooting for you two!",
    "🥵 Warning: Chemistry off the charts!",
    "😇 Can you feel the love tonight?",
    "🤭 Looks a little mischievous!",
    "🧊 Hmm... a bit frosty, but there's hope!",
    "🎢 Emotional rollercoaster. Buckle up!",
    "💔 Oops, it's complicated. Try a flirty line!"
  ];

  const flirtyLines = [
    "Are you a magician? Because whenever I look at you, everyone else disappears.",
    "Do you have a name, or can I call you mine?",
    "Is it hot in here or is it just you?",
    "If kisses were snowflakes, I’d send you a blizzard.",
    "If I could rearrange the alphabet, I’d put ‘U’ and ‘I’ together.",
    "Do you have a map? I just got lost in your eyes.",
    "I must be a snowflake, because I’ve fallen for you.",
    "Your hand looks heavy—can I hold it for you?"
  ];

  // PUBLIC_INTERFACE
  function handleInputChange(e) {
    const { name, value } = e.target;
    if (name === "yourName") {
      setYourName(value);
    } else {
      setCrushName(value);
    }
  }

  // PUBLIC_INTERFACE
  function handleGenerate() {
    // Random verdict and flirty line logic
    if (yourName.trim() && crushName.trim()) {
      // Deterministic but fun: sum charCodes of inputs, modulo arrays
      const index = ((yourName[0]?.charCodeAt?.(0) || 0) + (crushName[0]?.charCodeAt?.(0) || 0) + yourName.length + crushName.length) % verdicts.length;
      const flirtIndex = ((yourName.length * crushName.length) + (yourName.charCodeAt(0) || 0) + (crushName.charCodeAt(0) || 0)) % flirtyLines.length;
      setVerdict(verdicts[index]);
      setFlirtyLine(flirtyLines[flirtIndex]);
      setShowResult(true);
    } else {
      setVerdict('Please enter both your name and your crush’s name!');
      setFlirtyLine('');
      setShowResult(false);
    }
  }

  // PUBLIC_INTERFACE
  function handleReset() {
    setYourName('');
    setCrushName('');
    setVerdict('');
    setFlirtyLine('');
    setShowResult(false);
  }

  return (
    <div
      className="app"
      style={{
        minHeight: "100vh",
        width: "100vw",
        background: "linear-gradient(132deg, #e0bbe4 45%, #ffd1dc 100%)",
        position: "relative"
      }}
    >
      {/* Foreground floating animation across top area */}
      <FloatingHeartsBackground />
      {/* Full-width header, always at top */}
      <header className="lovechamber-header">
        <div className="lovechamber-header-inner">
          <Logo size={57} />
          <span className="lovechamber-header-title">LOVE CHAMBER</span>
        </div>
      </header>
      {/* Main content below fixed header */}
      <main className="lovechamber-main-content">
        <div className="lovechamber-section-row">
          <div className="lovechamber-section-col">
            <LoveMoodboardSection />
            <ZodiacPredictionSection />
            {/* Love Poll Box: moved below Zodiac Prediction in left column */}
            <LovePollBox />
            {/* Fun goofy box just below LovePollBox */}
            <GoofyImageBox />
          </div>
          <div className="lovechamber-compat-col">
            <div className="main-box centered-mainbox">
              <div className="hero" style={{
                paddingTop: "22px",
                maxWidth: "98%",
                margin: "0 auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}>
                {/* Decorative heading for compatibility box and prompt */}
                <div className="compatibility-title-heading-wrap" style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginBottom: 19,
                  marginTop: "-4px"
                }}>
                  <div
                    className="compatibility-title-wrap"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "13px",
                      justifyContent: "center",
                      width: "100%",
                      marginBottom: "2px",
                      marginTop: "0"
                    }}
                  >
                    <span
                      className="compatibility-title"
                      style={{
                        fontFamily: "'Pacifico', 'Baloo 2', cursive, sans-serif",
                        fontSize: "1.44rem",
                        color: "#e06db1",
                        textShadow: "0 2px 10px #ffe4e18d, 0.5px 0.5px #ffd1dc55",
                        fontWeight: 700,
                        letterSpacing: ".03em",
                        marginLeft: "6px",
                        marginRight: "2px",
                        display: "flex",
                        alignItems: "center",
                        userSelect: "none"
                      }}
                    >
                      <span
                        role="img"
                        aria-label="heart"
                        style={{
                          fontSize: 27,
                          marginRight: 9,
                          filter: "drop-shadow(0 1.2px 8px #ffd1dc66)",
                          opacity: .88,
                          verticalAlign: "middle"
                        }}
                      >
                        💖
                      </span>
                      <span
                        style={{
                          display: "inline",
                          fontFamily: "'Pacifico', 'Baloo 2', cursive, sans-serif"
                        }}
                      >
                        Compatibility Match
                      </span>
                    </span>
                    <span
                      className="compatibility-title-sticker"
                      aria-hidden="true"
                      style={{
                        fontSize: 21,
                        marginLeft: 7,
                        filter: "drop-shadow(0 0.5px 8px #e0bbe499)",
                        opacity: 0.80
                      }}
                    >✨</span>
                  </div>
                  <div
                    className="compatibility-prompt-heading"
                    style={{
                      fontFamily: "'Pacifico', 'Baloo 2', cursive, sans-serif",
                      fontSize: "1.09rem",
                      color: "#ca86af",
                      background: "#ffe4e1",
                      borderRadius: "17px",
                      boxShadow: "0 1.5px 12px #ffd1dc20",
                      padding: "8.5px 16px 8.5px 16px",
                      margin: "0 auto 6px auto",
                      textAlign: "center",
                      width: "100%",
                      letterSpacing: ".01em",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      userSelect: "none",
                      maxWidth: "438px",
                      opacity: 1
                    }}
                  >
                    <span role="img" aria-label="stars" style={{fontSize: 19, marginRight: 8, opacity: .82}}>🌸</span>
                    Enter your name and your crush’s name to unveil your playful fate and get a flirty line!
                    <span role="img" aria-label="sparkle" style={{fontSize: 19, marginLeft: 8, opacity: .8}}>✨</span>
                  </div>
                </div>
                <form
                  style={{
                    width: "100%",
                    maxWidth: "100%",
                    minWidth: "0",
                    display: "flex",
                    flexDirection: "column",
                    gap: 15,
                    alignItems: "center",
                    margin: "0 auto",
                  }}
                  onSubmit={e => { e.preventDefault(); handleGenerate(); }}
                  autoComplete="off"
                >
                  <input
                    className="container"
                    style={{
                      padding: '13px 17px',
                      borderRadius: 13,
                      border: '1.5px solid #e0bbe4',
                      fontSize: "1.12rem",
                      fontFamily: "'Baloo 2','Segoe UI', 'Roboto', Arial, sans-serif",
                      background: 'rgba(255,255,255,0.16)',
                      color: '#aa70a9',
                      outline: "none",
                      marginBottom: -1,
                      width: "100%",
                      boxShadow: "0 1.2px 9px #ffd1dc26",
                      transition: "box-shadow 0.18s, border 0.15s"
                    }}
                    name="yourName"
                    placeholder="Your Name"
                    value={yourName}
                    onChange={handleInputChange}
                    autoFocus
                    spellCheck="false"
                    required
                  />
                  <input
                    className="container"
                    style={{
                      padding: '13px 17px',
                      borderRadius: 13,
                      border: '1.5px solid #e0bbe4',
                      fontSize: "1.12rem",
                      fontFamily: "'Baloo 2', 'Segoe UI', 'Roboto', Arial, sans-serif",
                      background: 'rgba(255,255,255,0.17)',
                      color: '#aa70a9',
                      outline: "none",
                      width: "100%",
                      boxShadow: "0 1.2px 9px #ffd1dc26",
                    }}
                    name="crushName"
                    placeholder="Crush's Name"
                    value={crushName}
                    onChange={handleInputChange}
                    spellCheck="false"
                    required
                  />
                  <div style={{
                    display: 'flex',
                    gap: "11px",
                    marginTop: "7px",
                    justifyContent: 'center',
                    width: "100%",
                    flexWrap: "wrap"
                  }}>
                    <button
                      type="submit"
                      className="btn btn-large"
                      style={{
                        minWidth: 124,
                        fontWeight: 600,
                        background: "linear-gradient(93deg, #ffe4e1 56%, #ffd1dc 100%)",
                        color: "#e06db1",
                        border: "none",
                        borderRadius: 20,
                        fontSize: "1.13rem",
                        boxShadow: "0 2px 12px 0 #ffd1dc44",
                        padding: "12px 20px"
                      }}
                    >
                      Generate Flirty Line
                    </button>
                    <button
                      type="button"
                      className="btn btn-large"
                      style={{
                        background: "#e0bbe4",
                        color: "#fff",
                        minWidth: 97,
                        borderRadius: 20,
                        fontWeight: 500,
                        fontSize: "1.08rem"
                      }}
                      onClick={handleReset}
                    >
                      Reset
                    </button>
                  </div>
                </form>
                {(verdict || flirtyLine) && (
                  <div
                    style={{
                      marginTop: "25px",
                      width: '100%',
                      maxWidth: "420px",
                      minWidth: "210px",
                      padding: showResult ? '22px 20px 15px' : '14px 20px 8px',
                      borderRadius: "1.6em",
                      background: 'linear-gradient(132deg,#ffe4e1ee 74%, #ffd1dcbb 100%)',
                      boxShadow: '0 2px 12px 0 #e0bbe432',
                      textAlign: 'center',
                      minHeight: 58,
                      border: "1.2px solid #ffd1dc",
                      marginLeft: "auto",
                      marginRight: "auto"
                    }}
                  >
                    {verdict && (
                      <div style={{
                        fontSize: 20,
                        fontWeight: 600,
                        marginBottom: showResult && flirtyLine ? 11 : 0,
                        color: verdict.startsWith('💔') ? '#e06db1' : '#ca86af',
                        fontFamily: "'Baloo 2', 'Segoe UI', cursive, sans-serif"
                      }}>
                        {verdict}
                      </div>
                    )}
                    {showResult && flirtyLine && (
                      <div style={{
                        fontSize: "1.07rem",
                        marginTop: 6,
                        color: '#a76fb9',
                        opacity: .98
                      }}>
                        <span style={{ fontWeight: 400, fontFamily: "'Segoe UI', 'Baloo 2', cursive, sans-serif" }}>Flirty Line: </span>
                        <span style={{
                          fontWeight: 700,
                          color: '#ff77a9',
                          fontFamily: "'Baloo 2', 'Segoe UI', cursive, sans-serif"
                        }}>
                          {flirtyLine}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            {/* Love Dare of the Day Box: now below compatibility result */}
            <div style={{ width: '100%', maxWidth: 560, margin: "36px auto 0 auto", zIndex: 3 }}>
              <LoveDareBox />
            </div>
            {/* Flirty Pickup Lines Feature Box */}
            <PickupLinesBox />
            {/* Confessions Wall Box: below Pickup Lines */}
            <ConfessionsWallBox />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
