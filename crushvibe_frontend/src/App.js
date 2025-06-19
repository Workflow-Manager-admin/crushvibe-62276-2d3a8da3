
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
          </div>
          <div className="lovechamber-compat-col">
            <div className="main-box centered-mainbox">
              <div className="hero" style={{
                paddingTop: "35px",
                maxWidth: "95%",
                margin: "0 auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}>
                <div
                  className="subtitle"
                  style={{
                    marginBottom: 16,
                    marginTop: 8,
                    fontSize: "1.16rem",
                    color: "#ca86af",
                    fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
                    opacity: 0.91,
                    fontWeight: 500,
                    textAlign: "center",
                  }}
                >
                  Enter your name and your crush’s name to unveil your playful fate and get a flirty line!
                </div>
                <form
                  style={{ width: "94%", display: "flex", flexDirection: "column", gap: 18, alignItems: "center" }}
                  onSubmit={e => { e.preventDefault(); handleGenerate(); }}
                  autoComplete="off"
                >
                  <input
                    className="container"
                    style={{
                      padding: '13px 19px',
                      borderRadius: 12,
                      border: '1.5px solid #e0bbe4',
                      fontSize: 18,
                      fontFamily: "'Segoe UI', 'Roboto', Arial, sans-serif",
                      background: 'rgba(255,255,255,0.13)',
                      color: '#aa70a9',
                      outline: "none",
                      marginBottom: -1,
                      width: "100%",
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
                      padding: '13px 19px',
                      borderRadius: 12,
                      border: '1.5px solid #e0bbe4',
                      fontSize: 18,
                      fontFamily: "'Segoe UI', 'Roboto', Arial, sans-serif",
                      background: 'rgba(255,255,255,0.14)',
                      color: '#aa70a9',
                      outline: "none",
                      width: "100%",
                    }}
                    name="crushName"
                    placeholder="Crush's Name"
                    value={crushName}
                    onChange={handleInputChange}
                    spellCheck="false"
                    required
                  />
                  <div style={{ display: 'flex', gap: 14, marginTop: 6, justifyContent: 'center' }}>
                    <button
                      type="submit"
                      className="btn btn-large"
                      style={{
                        minWidth: 120,
                        fontWeight: 600,
                        background: "linear-gradient(93deg, #ffe4e1 55%, #ffd1dc 100%)",
                        color: "#e06db1",
                        border: "none",
                        borderRadius: 20,
                        fontSize: "1.16rem",
                        boxShadow: "0 2px 12px 0 #ffd1dc33"
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
                        minWidth: 90,
                        borderRadius: 20,
                        fontWeight: 500
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
                      marginTop: 32,
                      width: '95%',
                      padding: showResult ? '28px 20px 18px' : '18px 20px 10px',
                      borderRadius: 18,
                      background: '#ffe4e1ee',
                      boxShadow: '0 2px 10px 0 #e0bbe44d',
                      textAlign: 'center',
                      minHeight: 60,
                      border: "1px solid #ffd1dc"
                    }}
                  >
                    {verdict && (
                      <div style={{
                        fontSize: 20,
                        fontWeight: 500,
                        marginBottom: showResult && flirtyLine ? 11 : 0,
                        color: verdict.startsWith('💔') ? '#e06db1' : '#ca86af',
                      }}>
                        {verdict}
                      </div>
                    )}
                    {showResult && flirtyLine && (
                      <div style={{
                        fontSize: 18,
                        marginTop: 5,
                        color: '#a76fb9',
                        opacity: 0.97
                      }}>
                        <span style={{ fontWeight: 400 }}>Flirty Line: </span>
                        <span style={{
                          fontWeight: 600,
                          color: '#ff77a9'
                        }}>
                          {flirtyLine}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            {/* Spin The Heart Box bigger, below compatibility */}
            <div className="spin-the-heart-wrap">
              <SpinTheHeartBox />
            </div>
            {/* Flirty Pickup Lines Feature Box */}
            <PickupLinesBox />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
