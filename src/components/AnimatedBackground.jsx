import { useEffect, useState } from 'react';

/* ─── Circuit traces (PCB-style paths) ─── */
const traces = [
  { d: "M 0 120 L 160 120 L 160 60 L 320 60 L 320 160 L 480 160", color: '#22d3ee', duration: 4, delay: 0 },
  { d: "M 760 0 L 760 100 L 920 100 L 920 40 L 1200 40", color: '#06b6d4', duration: 3.5, delay: 0.8 },
  { d: "M 0 320 L 100 320 L 100 240 L 280 240 L 280 380 L 500 380 L 500 260 L 680 260", color: '#22d3ee', duration: 5.5, delay: 1.2 },
  { d: "M 1200 280 L 1040 280 L 1040 180 L 880 180 L 880 320 L 740 320", color: '#a855f7', duration: 4.2, delay: 0.5 },
  { d: "M 0 560 L 200 560 L 200 480 L 380 480 L 380 580 L 580 580", color: '#06b6d4', duration: 4.8, delay: 1.8 },
  { d: "M 500 800 L 500 660 L 640 660 L 640 560 L 820 560 L 820 660 L 980 660", color: '#22d3ee', duration: 5, delay: 0.3 },
  { d: "M 1200 600 L 1060 600 L 1060 500 L 900 500 L 900 620 L 760 620", color: '#a855f7', duration: 3.8, delay: 2 },
  { d: "M 480 0 L 480 80 L 600 80 L 600 160 L 720 160 L 720 0", color: '#06b6d4', duration: 3.2, delay: 1.5 },
  { d: "M 0 700 L 120 700 L 120 600 L 60 600 L 60 500 L 180 500", color: '#22d3ee', duration: 4.5, delay: 2.5 },
  { d: "M 700 800 L 700 720 L 860 720 L 860 640 L 1020 640 L 1020 800", color: '#a855f7', duration: 4, delay: 0.7 },
  { d: "M 0 420 L 80 420 L 80 500 L 250 500", color: '#22d3ee', duration: 3, delay: 3 },
  { d: "M 1100 350 L 1100 450 L 1200 450", color: '#06b6d4', duration: 2.5, delay: 1 },
];

/* ─── Junction nodes at trace turns ─── */
const nodes = [
  { x: 160, y: 120 }, { x: 160, y: 60 }, { x: 320, y: 60 }, { x: 320, y: 160 },
  { x: 760, y: 100 }, { x: 920, y: 100 }, { x: 920, y: 40 },
  { x: 100, y: 320 }, { x: 100, y: 240 }, { x: 280, y: 240 }, { x: 280, y: 380 }, { x: 500, y: 380 }, { x: 500, y: 260 },
  { x: 1040, y: 280 }, { x: 1040, y: 180 }, { x: 880, y: 180 }, { x: 880, y: 320 },
  { x: 200, y: 560 }, { x: 200, y: 480 }, { x: 380, y: 480 }, { x: 380, y: 580 },
  { x: 500, y: 660 }, { x: 640, y: 660 }, { x: 640, y: 560 }, { x: 820, y: 560 }, { x: 820, y: 660 },
  { x: 1060, y: 600 }, { x: 1060, y: 500 }, { x: 900, y: 500 }, { x: 900, y: 620 },
  { x: 480, y: 80 }, { x: 600, y: 80 }, { x: 600, y: 160 }, { x: 720, y: 160 },
  { x: 120, y: 700 }, { x: 120, y: 600 }, { x: 60, y: 600 }, { x: 60, y: 500 },
  { x: 700, y: 720 }, { x: 860, y: 720 }, { x: 860, y: 640 }, { x: 1020, y: 640 },
];

/* ─── PCB chip components ─── */
const chips = [
  { x: 220, y: 52, w: 36, h: 14 },
  { x: 392, y: 152, w: 36, h: 14 },
  { x: 172, y: 234, w: 14, h: 24 },
  { x: 1042, y: 296, w: 36, h: 14 },
  { x: 588, y: 652, w: 14, h: 24 },
  { x: 892, y: 496, w: 36, h: 14 },
];

const AnimatedBackground = () => {
  const [isLite, setIsLite] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px), (prefers-reduced-motion: reduce)');
    setIsLite(mq.matches);
    const onChange = (e) => setIsLite(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  if (isLite) {
    /* Mobile / reduced-motion: static gradient only, no SVG animation, no blur filters */
    return (
      <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 85% -10%, rgba(6,182,212,0.10) 0%, transparent 45%), radial-gradient(circle at -5% 100%, rgba(168,85,247,0.08) 0%, transparent 45%), #02040f',
          }}
        />
        <div className="absolute inset-x-0 top-0 h-24" style={{ background: 'linear-gradient(to bottom, #02040f, transparent)' }} />
        <div className="absolute inset-x-0 bottom-0 h-24" style={{ background: 'linear-gradient(to top, #02040f, transparent)' }} />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0">

      {/* Very subtle aurora for depth */}
      <div
        className="absolute rounded-full"
        style={{
          width: 700, height: 700,
          top: '-15%', right: '-10%',
          background: 'radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: 550, height: 550,
          bottom: '0%', left: '-8%',
          background: 'radial-gradient(circle, rgba(168,85,247,0.06) 0%, transparent 70%)',
          filter: 'blur(90px)',
        }}
      />

      {/* ─── Circuit Board SVG ─── */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Glow filter for current */}
          <filter id="circuit-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Node glow */}
          <filter id="node-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* CSS for current flow animation */}
          <style>{`
            @keyframes flowTrace {
              from { stroke-dashoffset: 0; }
              to   { stroke-dashoffset: -860; }
            }
            @keyframes nodePulse {
              0%, 100% { opacity: 0.2; r: 2; }
              50%       { opacity: 0.8; r: 3.5; }
            }
          `}</style>
        </defs>

        {/* ── Static dim traces (base PCB grid) ── */}
        <g stroke="#06b6d4" strokeWidth="0.7" fill="none" opacity="0.1">
          {traces.map((t, i) => (
            <path key={`dim-${i}`} d={t.d} />
          ))}
        </g>

        {/* ── Animated current flow ── */}
        {traces.map((t, i) => (
          <path
            key={`cur-${i}`}
            d={t.d}
            stroke={t.color}
            strokeWidth="1.8"
            fill="none"
            filter="url(#circuit-glow)"
            style={{
              strokeDasharray: '60 800',
              strokeDashoffset: 0,
              animation: `flowTrace ${t.duration}s ${t.delay}s linear infinite`,
            }}
          />
        ))}

        {/* ── Pulsing nodes ── */}
        {nodes.map((n, i) => (
          <circle
            key={`node-${i}`}
            cx={n.x}
            cy={n.y}
            r="2"
            fill={i % 3 === 0 ? '#a855f7' : '#22d3ee'}
            filter="url(#node-glow)"
            style={{
              animation: `nodePulse ${2 + (i % 4) * 0.5}s ${(i * 0.25) % 3}s ease-in-out infinite`,
            }}
          />
        ))}

        {/* ── PCB chip components ── */}
        <g stroke="#22d3ee" strokeWidth="0.8" fill="none" opacity="0.18">
          {chips.map((c, i) => (
            <g key={`chip-${i}`}>
              <rect x={c.x} y={c.y} width={c.w} height={c.h} rx="1.5" />
              {/* Pin marks */}
              {[0, 1, 2].map((p) => (
                <line
                  key={p}
                  x1={c.x + (c.w / 4) * (p + 0.5)}
                  y1={c.y}
                  x2={c.x + (c.w / 4) * (p + 0.5)}
                  y2={c.y - 4}
                  strokeOpacity="0.5"
                />
              ))}
            </g>
          ))}
        </g>

        {/* ── Faint background grid ── */}
        <g stroke="#06b6d4" strokeWidth="0.3" opacity="0.04">
          {Array.from({ length: 25 }).map((_, i) => (
            <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="800" />
          ))}
          {Array.from({ length: 17 }).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 50} x2="1200" y2={i * 50} />
          ))}
        </g>
      </svg>

      {/* Bottom + top vignettes to blend into section */}
      <div className="absolute inset-x-0 top-0 h-24" style={{ background: 'linear-gradient(to bottom, #02040f, transparent)' }} />
      <div className="absolute inset-x-0 bottom-0 h-24" style={{ background: 'linear-gradient(to top, #02040f, transparent)' }} />
    </div>
  );
};

export default AnimatedBackground;
