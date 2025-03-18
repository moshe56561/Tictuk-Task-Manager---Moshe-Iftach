import React from "react";

interface CircleProgressBarProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  filledColor?: string;
  unfilledColor?: string;
  textColor?: string;
  className?: string;
}

export const CircleProgressBar: React.FC<CircleProgressBarProps> = ({
  progress,
  size = 40,
  strokeWidth = 5, // Increased to 5px as requested
  filledColor, // Default purple color
  unfilledColor, // Default light gray
  textColor,
  className = "",
}) => {
  // Ensure progress is between 0 and 100
  const normalizedProgress = Math.min(100, Math.max(0, progress));

  // Calculate the circle parameters
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset =
    circumference - (normalizedProgress / 100) * circumference;

  // Center position
  const center = size / 2;

  return (
    <div
      className={`relative w-10 h-10 inline-flex items-center justify-center ${className}`}
    >
      {/* Background Circle (unfilled) */}
      <svg width={size} height={size} className="absolute">
        <circle
          stroke={unfilledColor}
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={center}
          cy={center}
        />
      </svg>

      {/* Progress Circle (filled) */}
      <svg width={size} height={size} className="absolute rotate-[-90deg]">
        <circle
          stroke={filledColor}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          r={radius}
          cx={center}
          cy={center}
        />
      </svg>

      {/* Percentage Text - Centered */}
      <div
        className="absolute font-inter text-xs font-normal flex items-center justify-center"
        style={{
          color: textColor || "var(--foreground-dark, #FFF)",
          lineHeight: "normal",
          width: "100%",
          height: "100%",
          transform: "translateY(1px)",
        }}
      >
        {normalizedProgress}%
      </div>
    </div>
  );
};
