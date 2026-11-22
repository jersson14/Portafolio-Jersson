import { useId } from 'react';

/*
 * El robot del agente. `full` agrega cuerpo, brazos y propulsor; sin él es solo la cabeza.
 * mood: idle | think | happy | dizzy | listen | talk. Las pupilas (.rb-pupils) las mueve RobotBuddy.
 */
const RobotFace = ({ full = false, mood = 'idle', className = '' }) => {
  const id = useId().replace(/[^a-zA-Z0-9]/g, '');
  const u = (n) => `url(#${n}${id})`;

  return (
    <svg viewBox={full ? '0 0 120 168' : '6 0 108 94'} className={`rb ${className}`} data-mood={mood} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`shell${id}`} x1="0.2" y1="0" x2="0.75" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.55" stopColor="#eef3f7" />
          <stop offset="1" stopColor="#b4c3d1" />
        </linearGradient>
        <linearGradient id={`visor${id}`} x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0" stopColor="#1b3350" />
          <stop offset="0.5" stopColor="#0a1a30" />
          <stop offset="1" stopColor="#06101f" />
        </linearGradient>
        <linearGradient id={`ear${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4c6076" />
          <stop offset="1" stopColor="#15232f" />
        </linearGradient>
        <radialGradient id={`glow${id}`}>
          <stop offset="0" stopColor="#5ff5e6" stopOpacity="0.55" />
          <stop offset="1" stopColor="#5ff5e6" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`ball${id}`} cx="0.35" cy="0.3">
          <stop offset="0" stopColor="#d9fffb" />
          <stop offset="0.45" stopColor="#2fe0d0" />
          <stop offset="1" stopColor="#0b8f8a" />
        </radialGradient>
      </defs>

      {full && (
        <g>
          {/* Brazos */}
          <g className="rb-arm rb-arm-l">
            <path d="M42 101 Q26 104 24 118" fill="none" stroke={u('shell')} strokeWidth="9" strokeLinecap="round" />
            <circle cx="24" cy="120" r="6.5" fill={u('ear')} />
            <circle cx="24" cy="120" r="2.3" fill="#36e6d8" />
          </g>
          <g className="rb-arm rb-arm-r">
            <path d="M78 101 Q94 104 96 118" fill="none" stroke={u('shell')} strokeWidth="9" strokeLinecap="round" />
            <circle cx="96" cy="120" r="6.5" fill={u('ear')} />
            <circle cx="96" cy="120" r="2.3" fill="#36e6d8" />
          </g>
          {/* Cuerpo */}
          <path d="M50 127 h20 l-3 9 h-14 Z" fill={u('ear')} />
          <rect x="50" y="86" width="20" height="10" rx="4" fill={u('ear')} />
          <path d="M40 106 Q40 92 54 92 H66 Q80 92 80 106 V113 Q80 130 60 130 Q40 130 40 113 Z" fill={u('shell')} />
          <path d="M43 119 Q48 130 60 130 Q72 130 77 119 Q70 125 60 125 Q50 125 43 119 Z" fill="#93a6b7" opacity="0.5" />
          <circle cx="60" cy="109" r="9" fill="#0a1a30" />
          <circle cx="60" cy="109" r="5" fill={u('ball')} className="rb-core" />
        </g>
      )}

      {/* Antena */}
      <path d="M56 24 L58 11 H62 L64 24 Z" fill={u('ear')} />
      <path d="M49 23 Q60 15 71 23 Z" fill="#a9bac8" />
      <circle cx="60" cy="8" r="11" fill={u('glow')} className="rb-beacon" />
      <circle cx="60" cy="8" r="5.6" fill={u('ball')} />

      {/* Orejas */}
      {[10, 98].map((x) => (
        <g key={x}>
          <rect x={x} y="43" width="12" height="29" rx="5.5" fill={u('ear')} />
          <rect x={x + 4.5} y="49" width="3" height="17" rx="1.5" fill="#36e6d8" opacity="0.9" />
        </g>
      ))}

      {/* Casco */}
      <path d="M60 19 C90 19 104 34 104 56 C104 78 92 90 60 90 C28 90 16 78 16 56 C16 34 30 19 60 19 Z" fill={u('shell')} />
      <path d="M28 33 Q38 24 54 23" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity="0.95" />
      <path d="M20 66 Q27 88 60 90 Q93 88 100 66 Q92 82 60 83 Q28 82 20 66 Z" fill="#8fa3b5" opacity="0.45" />
      <path d="M46 85.5 H74 L70 88.5 H50 Z" fill="#1b3350" opacity="0.75" />

      {/* Visor */}
      <path d="M35 34 Q60 29 85 34 Q95 37 95 50 V61 Q95 75 82 77 Q60 81 38 77 Q25 75 25 61 V50 Q25 37 35 34 Z" fill={u('visor')} stroke="#23405e" strokeWidth="1.2" />
      <g fill="none" stroke="#36e6d8" strokeWidth="0.9" opacity="0.55">
        <path d="M29 60 V68 L34 73 H42" /><path d="M91 60 V68 L86 73 H78" />
        <path d="M33 39 H42 L46 36" /><path d="M87 39 H78 L74 36" />
      </g>
      <g fill="#36e6d8" opacity="0.8">
        <circle cx="29" cy="59" r="1.4" /><circle cx="91" cy="59" r="1.4" /><circle cx="43" cy="73" r="1.2" /><circle cx="77" cy="73" r="1.2" />
      </g>

      {/* Ojos */}
      <g className="rb-eyes">
        {[44, 76].map((x) => (
          <g key={x}>
            <circle cx={x} cy="53" r="17" fill={u('glow')} />
            <circle cx={x} cy="53" r="9.6" fill="#05222b" stroke="#3ff0e0" strokeWidth="2.8" />
          </g>
        ))}
        <g className="rb-pupils">
          {[44, 76].map((x) => (
            <g key={x}>
              <circle cx={x} cy="53" r="5.2" fill="#0c4a55" />
              <circle cx={x + 2} cy="50" r="2.6" fill="#eafffd" />
              <circle cx={x - 2} cy="55.5" r="1.2" fill="#7ff8ec" />
            </g>
          ))}
        </g>
      </g>
      <g className="rb-eyes-happy" fill="none" stroke="#3ff0e0" strokeWidth="4" strokeLinecap="round">
        <path d="M35 56 Q44 44 53 56" /><path d="M67 56 Q76 44 85 56" />
      </g>
      <g className="rb-eyes-dizzy" fill="none" stroke="#3ff0e0" strokeWidth="3.4" strokeLinecap="round">
        <path d="M38 47 L50 59 M50 47 L38 59" /><path d="M70 47 L82 59 M82 47 L70 59" />
      </g>

      <path className="rb-smile" d="M53 66 Q60 72 67 66" fill="none" stroke="#3ff0e0" strokeWidth="2.6" strokeLinecap="round" />
      <ellipse className="rb-mouth" cx="60" cy="68" rx="8.5" ry="6.5" fill="#05222b" stroke="#3ff0e0" strokeWidth="2.4" />
      <g className="rb-waves" fill="none" stroke="#3ff0e0" strokeWidth="2.4" strokeLinecap="round">
        <path d="M6 48 Q1 57 6 66" /><path d="M114 48 Q119 57 114 66" />
      </g>
      <g className="rb-dots" fill="#3ff0e0"><circle cx="53" cy="68" r="2" /><circle cx="60" cy="68" r="2" /><circle cx="67" cy="68" r="2" /></g>
    </svg>
  );
};

export default RobotFace;
