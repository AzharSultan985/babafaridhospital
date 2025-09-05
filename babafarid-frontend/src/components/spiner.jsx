
const HeartbeatLoader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <style>
        {`
          @keyframes dash {
            to {
              stroke-dashoffset: -200;
            }
          }
        `}
      </style>

      <div className="relative w-56 h-28 overflow-hidden">
        {/* ECG line */}
        <svg
          className="w-full h-full"
          viewBox="0 0 120 50"
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="120" y2="0">
              <stop offset="0%" stopColor="#2563eb" /> {/* blue */}
              <stop offset="50%" stopColor="#16a34a" /> {/* green */}
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
          </defs>

          <polyline
            points="0,25 15,25 25,5 35,45 45,25 120,25"
            strokeDasharray="200"
            strokeDashoffset="0"
            className="animate-[dash_2s_linear_infinite]"
          />
        </svg>

        {/* Pulsing Heart */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <div className="w-10 h-10 bg-red-500 rotate-45 transform origin-center rounded-sm animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.7)]"></div>
            {/* Heart glow pulse */}
            <div className="absolute inset-0 w-10 h-10 bg-red-400 opacity-40 blur-lg rounded-sm rotate-45 animate-ping"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeartbeatLoader;
