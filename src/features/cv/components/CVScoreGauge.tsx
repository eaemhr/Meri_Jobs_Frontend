"use client";
import React from "react";
import dynamic from "next/dynamic";

const RadialBarChart = dynamic(
  () => import("recharts").then((m) => m.RadialBarChart),
  { ssr: false },
);
const RadialBar = dynamic(() => import("recharts").then((m) => m.RadialBar), {
  ssr: false,
});
const PolarAngleAxis = dynamic(
  () => import("recharts").then((m) => m.PolarAngleAxis),
  { ssr: false },
);

interface CVScoreGaugeProps {
  score: number;
  previousScore?: number;
  size?: number;
}

export default function CVScoreGauge({
  score,
  previousScore,
  size = 140,
}: CVScoreGaugeProps) {
  const color =
    score >= 80
      ? "var(--score-high)"
      : score >= 60
        ? "var(--score-mid)"
        : "var(--score-low)";
  const label = score >= 80 ? "Strong" : score >= 60 ? "Good" : "Needs work";
  const delta = previousScore !== undefined ? score - previousScore : null;

  const data = [{ value: score, fill: color }];

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <RadialBarChart
          width={size}
          height={size}
          cx={size / 2}
          cy={size / 2}
          innerRadius={size * 0.35}
          outerRadius={size * 0.48}
          barSize={size * 0.1}
          data={data}
          startAngle={225}
          endAngle={-45}
        >
          <PolarAngleAxis
            type="number"
            domain={[0, 100]}
            angleAxisId={0}
            tick={false}
          />
          <RadialBar
            background={{ fill: "var(--muted)" }}
            dataKey="value"
            angleAxisId={0}
            cornerRadius={size * 0.05}
          />
        </RadialBarChart>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold tabular-nums" style={{ color }}>
            {score}
          </span>
          <span className="text-xs font-semibold text-muted-foreground">
            /100
          </span>
        </div>
      </div>
      <div className="text-center mt-1">
        <p className="text-sm font-bold" style={{ color }}>
          {label}
        </p>
        {delta !== null && (
          <p
            className={`text-xs font-medium mt-0.5 ${delta >= 0 ? "text-accent" : "text-error"}`}
          >
            {delta >= 0 ? `+${delta}` : delta} pts this session
          </p>
        )}
      </div>
    </div>
  );
}
