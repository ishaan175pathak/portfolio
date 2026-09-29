import React, { useEffect, useRef } from "react";

const Starfield = ({ count = 300 }) => {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let w = 0;
    let h = 0;
    let raf;
    let last = 0;

    const stars = Array.from({ length: count }, () => ({
      x: Math.random(),
      y: Math.random(),
      size: Math.random() < 0.8 ? 1.5 : 2.5,
      speed: Math.random() * 2 + 1,   // twinkle rate
      phase: Math.random() * Math.PI * 2,
    }));

    const resize = () => {
      // Mobile address bars fire resize while scrolling; ignore height shrinks
      // so the canvas isn't reallocated and cleared mid-scroll.
      if (window.innerWidth === w && window.innerHeight <= h) return;
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    const draw = (t) => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#fff";
      for (const s of stars) {
        ctx.globalAlpha = 0.3 + 0.7 * Math.abs(Math.sin((t / 1000) * s.speed + s.phase));
        ctx.fillRect(s.x * w, s.y * h, s.size, s.size);
      }
    };

    const loop = (t) => {
      raf = requestAnimationFrame(loop);
      if (document.hidden || t - last < 33) return; // ~30fps cap
      last = t;
      draw(t);
    };

    resize();
    window.addEventListener("resize", resize);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      draw(0); // one static frame
    } else {
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [count]);

  return <canvas ref={ref} id="starfield" className="starfield" />;
};

export default React.memo(Starfield);