import React, { useState } from 'react';
import './App.css';
import FloatingHeartsBackground from './FloatingHeartsBackground';

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
    <div className="app" style={{ position: "relative" }}>
      {/* Playful floating hearts/stars background */}
      <FloatingHeartsBackground />
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">*</span> CrushVibe
            </div>
            <a href="https://kavia.ai" style={{ textDecoration: 'none' }}>
              <button className="btn">by KAVIA</button>
            </a>
          </div>
        </div>
      </nav>
      <main>
        <div className="container">
          <div className="hero" style={{paddingTop: '150px', maxWidth: 450, margin: '0 auto'}}>
            <div className="title" style={{
              marginBottom: 8,
              fontSize: '2.8rem',
              color: 'var(--base-light)',
              letterSpacing: 1
            }}>
              💖 CrushVibe
            </div>
            <div className="description" style={{marginBottom: 32, color: 'var(--text-secondary)'}}>
              Enter your name and your crush’s name to unveil your playful fate and get a flirty line!
            </div>
            <form
              style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 18 }}
              onSubmit={e => { e.preventDefault(); handleGenerate(); }}
              autoComplete="off"
            >
              <input
                className="container"
                style={{
                  padding: '12px 18px',
                  borderRadius: 10,
                  border: '1px solid var(--border-color)',
                  fontSize: 18,
                  background: 'rgba(255,255,255,0.04)',
                  color: 'var(--text-color)'
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
                  padding: '12px 18px',
                  borderRadius: 10,
                  border: '1px solid var(--border-color)',
                  fontSize: 18,
                  background: 'rgba(255,255,255,0.04)',
                  color: 'var(--text-color)'
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
                  style={{ minWidth: 120, fontWeight: 600 }}
                >
                  Generate Flirty Line
                </button>
                <button
                  type="button"
                  className="btn btn-large"
                  style={{ background: 'var(--border-color)', color: '#fff', minWidth: 90 }}
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
                  width: '100%',
                  padding: showResult ? '28px 20px 18px' : '18px 20px 10px',
                  borderRadius: 18,
                  background: 'rgba(0,255,255,0.06)',
                  boxShadow: '0 3px 16px 0 rgba(0,0,0,0.11)',
                  textAlign: 'center',
                  minHeight: 60
                }}
              >
                {verdict && (
                  <div style={{
                    fontSize: 20,
                    fontWeight: 500,
                    marginBottom: showResult && flirtyLine ? 11 : 0,
                    color: verdict.startsWith('💔') ? '#ffd1dc' : 'var(--base-light)',
                  }}>
                    {verdict}
                  </div>
                )}
                {showResult && flirtyLine && (
                  <div style={{
                    fontSize: 18,
                    marginTop: 5,
                    color: 'var(--text-color)',
                    opacity: 0.93
                  }}>
                    <span style={{ fontWeight: 400 }}>Flirty Line: </span>
                    <span style={{
                      fontWeight: 600,
                      color: '#ffd1dc'
                    }}>
                      {flirtyLine}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
