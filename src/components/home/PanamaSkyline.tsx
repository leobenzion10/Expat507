export default function PanamaSkyline({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 420"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="skylineFade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0B1A17" stopOpacity="0" />
          <stop offset="55%" stopColor="#0B1A17" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#0B1A17" stopOpacity="1" />
        </linearGradient>
      </defs>

      {/* Back row, dimmer */}
      <g fill="#11241F" opacity="0.65">
        <rect x="20" y="180" width="60" height="240" />
        <rect x="95" y="140" width="44" height="280" />
        <rect x="155" y="200" width="70" height="220" />
        <rect x="430" y="160" width="50" height="260" />
        <rect x="500" y="120" width="38" height="300" />
        <rect x="900" y="190" width="60" height="230" />
        <rect x="980" y="150" width="46" height="270" />
        <rect x="1240" y="170" width="56" height="250" />
        <rect x="1320" y="130" width="40" height="290" />
      </g>

      {/* Front row, brighter */}
      <g fill="#163029">
        <rect x="0" y="260" width="46" height="160" />
        <rect x="60" y="220" width="36" height="200" />
        <rect x="120" y="280" width="50" height="140" />
        <rect x="250" y="240" width="42" height="180" />
        <rect x="300" y="190" width="34" height="230" />
        <rect x="345" y="260" width="56" height="160" />
        {/* Tapered "tornillo"-style tower, a nod to Panama City's signature twisted skyscraper */}
        <path d="M540 420 L540 200 Q558 150 576 200 L576 420 Z" />
        <rect x="610" y="230" width="40" height="190" />
        <rect x="665" y="270" width="60" height="150" />
        <rect x="745" y="200" width="36" height="220" />
        <rect x="800" y="250" width="48" height="170" />
        <rect x="865" y="300" width="40" height="120" />
        <rect x="1040" y="230" width="44" height="190" />
        <rect x="1100" y="270" width="58" height="150" />
        <rect x="1180" y="210" width="36" height="210" />
        <rect x="1360" y="250" width="50" height="170" />
        <rect x="1410" y="290" width="30" height="130" />
      </g>

      {/* Window lights */}
      <g fill="#B8935A" opacity="0.5">
        <rect x="552" y="230" width="3" height="3" />
        <rect x="562" y="260" width="3" height="3" />
        <rect x="552" y="300" width="3" height="3" />
        <rect x="565" y="330" width="3" height="3" />
        <rect x="680" y="300" width="3" height="3" />
        <rect x="700" y="320" width="3" height="3" />
        <rect x="815" y="290" width="3" height="3" />
        <rect x="1115" y="300" width="3" height="3" />
        <rect x="310" y="230" width="3" height="3" />
        <rect x="320" y="270" width="3" height="3" />
      </g>

      <rect x="0" y="0" width="1440" height="420" fill="url(#skylineFade)" />
    </svg>
  );
}
