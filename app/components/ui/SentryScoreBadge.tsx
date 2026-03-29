import React from 'react';

interface SentryScoreBadgeProps {
  score: number;
  label?: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function SentryScoreBadge({ score, label, description, size = 'md' }: SentryScoreBadgeProps) {
  let colorClass = "text-danger";
  let bgBorderClass = "text-danger/20";
  
  if (score >= 80) {
    colorClass = "text-success";
    bgBorderClass = "text-success/20";
  } else if (score >= 50) {
    colorClass = "text-warning";
    bgBorderClass = "text-warning/20";
  }

  const sizes = {
    sm: { wrapper: "w-16 h-16", radius: 26, stroke: 4, text: "text-xl" },
    md: { wrapper: "w-24 h-24", radius: 38, stroke: 6, text: "text-3xl" },
    lg: { wrapper: "w-32 h-32", radius: 52, stroke: 8, text: "text-5xl" },
  };

  const currentSize = sizes[size];
  const circumference = 2 * Math.PI * currentSize.radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex items-center gap-6">
      <div className={`relative flex items-center justify-center ${currentSize.wrapper}`}>
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle
            cx="50%"
            cy="50%"
            r={currentSize.radius}
            className={`stroke-current ${bgBorderClass}`}
            strokeWidth={currentSize.stroke}
            fill="none"
          />
          <circle
            cx="50%"
            cy="50%"
            r={currentSize.radius}
            className={`stroke-current ${colorClass}`}
            strokeWidth={currentSize.stroke}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{ transition: 'stroke-dashoffset 1s ease-out' }}
          />
        </svg>
        <span className={`font-mono-data font-bold tracking-tighter ${currentSize.text} ${colorClass}`}>{score}</span>
      </div>
      {(label || description) && (
        <div className="flex flex-col justify-center">
          {label && <h3 className="text-text-primary font-medium text-lg leading-tight">{label}</h3>}
          {description && <p className="text-sm text-text-secondary mt-1.5 max-w-sm leading-relaxed">{description}</p>}
        </div>
      )}
    </div>
  );
}
