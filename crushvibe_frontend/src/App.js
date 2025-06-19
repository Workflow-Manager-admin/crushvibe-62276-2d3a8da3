
import React, { useState } from 'react';
import './App.css';
// PUBLIC_INTERFACE
import FloatingHeartsBackground from './FloatingHeartsBackground';
import Logo from './Logo';
import LoveMoodboardSection from './LoveMoodboardSection';
import "./LoveMoodboardSection.css"; // Import CSS for LoveMoodboardSection
import ZodiacPredictionSection from "./ZodiacPredictionSection";
import "./ZodiacPredictionSection.css";

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
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        position: "relative"
      }}
    >
      <FloatingHeartsBackground />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "flex-start",
          width: "100%",
          maxWidth: 1120,
          marginTop: 36,
          gap: 28,
        }}
      >
        {/* Left column with LOVE CHAMBER header and stack of sections */}
        <div
          className="lovechamber-left-col"
          style={{
            minWidth: 295,
            maxWidth: 335,
            width: "28vw",
            marginRight: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            paddingLeft: 5,
            paddingRight: 6,
            position: "relative"
          }}
        >
          {/* The LOVE CHAMBER header */}
          <header
            style={{
              display: "flex",
              alignItems: "center",
              height: "78px",
              borderTopLeftRadius: "2.1rem",
              borderTopRightRadius: "2.1rem",
              background: "linear-gradient(90deg, #ffd1dc 60%, #e0bbe4 100%)",
              borderBottom: "1.3px solid #e0bbe4",
              boxShadow: "none",
              marginBottom: 0
            }}
          >
            <div style={{ marginLeft: 15, marginRight: 8 }}>
              <Logo size={51} />
            </div>
            <div
              style={{
                display: "flex",
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <span
                style={{
                  fontFamily: "'Times New Roman', Times, serif",
                  fontWeight: 700,
                  fontSize: "2.0rem",
                  color: "#e0bbe4",
                  letterSpacing: "1.8px",
                  textShadow: "0px 2px 8px #ffe4e18a, 0.5px 0.5px #fff1",
                  marginRight: 57,
                  marginLeft: 0,
                }}
                children="LOVE CHAMBER"
              />
            </div>
          </header>
          {/* 1: Love Moodboard Box */}
          <LoveMoodboardSection />
          {/* 2: Zodiac Prediction Section */}
          <ZodiacPredictionSection />
          {/* 3: Spin the Heart Game - placeholder for stacking */}
          <div style={{ height: 88, borderRadius: "1.4rem", background: "#e0bbe433", display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ca86af', fontWeight: 500, fontSize: "1.07rem", opacity: 0.6 }}>
            (Spin the Heart Game coming soon)
          </div>
        </div>
        {/* Main box stays centered/right */}
        <div
          className="main-box"
          style={{
            background: "linear-gradient(135deg, #ffe4e1 0%, #ffd1dc 84%, #e0bbe4 100%)",
            borderRadius: "2.1rem",
            boxShadow: "0 7px 36px 0 rgba(224, 187, 228, 0.13)",
            minWidth: 340,
            maxWidth: 420,
            width: "100%",
            padding: "0 0 38px 0",
            margin: "0 10px",
            border: "2px solid #e0bbe4",
            position: "relative"
          }}
        >
          <main>
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
                {/* Tagline */}
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
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
