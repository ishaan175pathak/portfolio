// Logo.jsx
// Usage: <Logo /> for icon only, <Logo withText /> for icon + "Ishaan Pathak"

export default function Logo({ withText = false, height = 40 }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <svg
        viewBox="0 0 220 180"
        height={height}
        width={(height * 220) / 180}
      >
        <defs>
          <linearGradient id="ipGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1e3a8a" />
            <stop offset="100%" stopColor="#0891b2" />
          </linearGradient>
        </defs>
        <circle cx="80" cy="90" r="50" fill="url(#ipGradient)" opacity="0.85" />
        <circle cx="150" cy="90" r="66" fill="url(#ipGradient)" opacity="0.5" />
        <text
          x="118"
          y="105"
          fontFamily="'Helvetica Neue', Arial, sans-serif"
          fontWeight="700"
          fontSize="52"
          fill="#ffffff"
          textAnchor="middle"
        >
          IP
        </text>
      </svg>
      {withText && (
        <span
          style={{
            fontFamily: "'Helvetica Neue', Arial, sans-serif",
            fontWeight: 600,
            fontSize: height * 0.5,
            color: "#ffffff",
          }}
        >
          Ishaan Pathak
        </span>
      )}
    </div>
  );
}