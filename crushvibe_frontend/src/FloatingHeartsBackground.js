import React, { useEffect, useRef } from "react";

/**
 * FloatingHeartsBackground
 * Renders a lightweight canvas-based animation of floating hearts (and occasional stars for sparkle!),
 * with colors harmonious to the CrushVibe palette.
 */
// PUBLIC_INTERFACE
function FloatingHeartsBackground() {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const hearts = useRef([]);

  // Generate random heart/star properties within bounds
  const createShape = (width, height) => {
    // 80% heart, 20% star
    const isHeart = Math.random() > 0.2;
    return {
      x: Math.random() * width,
      y: height + Math.random() * 40, // begin off-bottom
      size: 18 + Math.random() * 12,
      speed: 0.35 + Math.random() * 0.45, // animate speed
      dx: (Math.random() - 0.5) * 0.3, // drift
      opacity: 0.55 + Math.random() * 0.35,
      swing: Math.random() * Math.PI * 2,
      isHeart,
      color: isHeart
        ? ["#ffd1dc", "#e0bbe4", "#ffe4e1", "#f7a6c8"][Math.floor(Math.random() * 4)]
        : "#ffe4e1" // stars always accent
    };
  };

  // Draw a heart shape
  const drawHeart = (ctx, x, y, size, color, opacity, swing) => {
    ctx.save();
    ctx.globalAlpha = opacity;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.bezierCurveTo(
      x, y - size / 3,
      x - size, y - size / 2,
      x - size, y + size / 3
    );
    ctx.bezierCurveTo(
      x - size, y + size,
      x, y + size * 0.88,
      x, y + size * 1.5
    );
    ctx.bezierCurveTo(
      x, y + size * 0.88,
      x + size, y + size,
      x + size, y + size / 3
    );
    ctx.bezierCurveTo(
      x + size, y - size / 2,
      x, y - size / 3,
      x, y
    );
    ctx.closePath();
    ctx.fill();

    // slight pulsing (playful), modulate scale
    ctx.restore();
  };

  // Draw a simple star (5-pointed)
  const drawStar = (ctx, x, y, size, color, opacity) => {
    ctx.save();
    ctx.globalAlpha = opacity;
    ctx.fillStyle = color;
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      ctx.lineTo(
        x + size * Math.cos((18 + 72 * i) * Math.PI / 180),
        y + size * Math.sin((18 + 72 * i) * Math.PI / 180)
      );
      ctx.lineTo(
        x + (size / 2.15) * Math.cos((54 + 72 * i) * Math.PI / 180),
        y + (size / 2.15) * Math.sin((54 + 72 * i) * Math.PI / 180)
      );
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  };

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let running = true;
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Initial produce
    hearts.current = Array.from({ length: Math.floor(width / 48) + 12 }, () =>
      createShape(width, height)
    );

    function animate() {
      ctx.clearRect(0, 0, width, height);
      for (let h of hearts.current) {
        // Float upward, sway side to side
        let swingX = Math.sin(h.y / 32 + h.swing) * 4 + h.dx * (height - h.y) / 120;
        h.x += swingX * 0.06;
        h.y -= h.speed;
        // Slight pulsing size for fun
        let sz = h.size * (0.98 + 0.05 * Math.sin(h.y / 35 + h.swing));
        if (h.isHeart) {
          drawHeart(ctx, h.x, h.y, sz, h.color, h.opacity, h.swing);
        } else {
          drawStar(ctx, h.x, h.y, sz * 0.53, h.color, Math.min(h.opacity + 0.15, 1));
        }
      }
      // Remove passed top, add fresh at bottom
      hearts.current = hearts.current.filter(h => h.y > -36);
      while (hearts.current.length < Math.floor(width / 48) + 12) {
        hearts.current.push(createShape(width, height));
      }
      if (running) {
        animationRef.current = requestAnimationFrame(animate);
      }
    }

    animate();

    // Responsiveness: redraw on resize
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      // Optionally reinitialize shapes so they fill new area
      hearts.current = Array.from({ length: Math.floor(width / 48) + 12 }, () =>
        createShape(width, height)
      );
    };
    window.addEventListener("resize", handleResize);

    return () => {
      running = false;
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Pointer events none so main UI is unaffected
  return (
    <canvas
      ref={canvasRef}
      className="floating-hearts-bg floating-hearts-overlay"
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 10000, // very high for overlay
        width: "100vw",
        height: "100vh",
        pointerEvents: "none"
      }}
      aria-hidden="true"
      tabIndex={-1}
    />
  );
}

export default FloatingHeartsBackground;
