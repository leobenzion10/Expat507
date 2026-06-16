"use client";

interface GoldDividerProps {
  className?: string;
  width?: "full" | "half" | "quarter";
}

export default function GoldDivider({ className = "", width = "full" }: GoldDividerProps) {
  const widths = {
    full: "w-full",
    half: "w-1/2",
    quarter: "w-1/4",
  };

  return (
    <div className={`flex justify-center ${className}`}>
      <div
        className={`h-px ${widths[width]}`}
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #C9A84C 20%, #C9A84C 80%, transparent 100%)",
          opacity: 0.7,
        }}
      />
    </div>
  );
}
