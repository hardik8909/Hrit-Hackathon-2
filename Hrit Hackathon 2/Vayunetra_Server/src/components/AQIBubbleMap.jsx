import { wards, getAQILevel } from "@/data/mock-data";
import { Card } from "@/components/ui/card";
import { Radio } from "lucide-react";

const levelColors = {
  good: "hsl(var(--aqi-good))",
  moderate: "hsl(var(--aqi-moderate))",
  poor: "hsl(var(--aqi-poor))",
  "very-poor": "hsl(var(--aqi-very-poor))",
  severe: "hsl(var(--aqi-severe))",
};

const legendItems = [
  { label: "Good", level: "good" },
  { label: "Moderate", level: "moderate" },
  { label: "Poor", level: "poor" },
  { label: "Very Poor", level: "very-poor" },
  { label: "Severe", level: "severe" },
];

const positions = [
  { x: 25, y: 30 },
  { x: 45, y: 40 },
  { x: 65, y: 55 },
  { x: 35, y: 60 },
  { x: 55, y: 50 },
  { x: 70, y: 30 },
  { x: 50, y: 70 },
  { x: 28, y: 48 },
];

export function AQIBubbleMap() {
  return (
    <Card className="p-5 flex-1">
      <div className="flex items-center gap-2 mb-4">
        <Radio className="w-4 h-4 text-primary" />
        <h3 className="text-sm font-semibold text-foreground">Live Ward-Level AQI Map</h3>
      </div>
      <div className="relative w-full" style={{ paddingBottom: "75%" }}>
        <div className="absolute inset-0 rounded-xl bg-muted/30 overflow-hidden">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 80">
            {[15, 25, 35].map((r) => (
              <circle key={r} cx="50" cy="45" r={r} fill="none" stroke="hsl(var(--border))" strokeWidth="0.3" strokeDasharray="2 2" />
            ))}
            <line x1="50" y1="10" x2="50" y2="80" stroke="hsl(var(--border))" strokeWidth="0.2" strokeDasharray="2 2" />
            <line x1="15" y1="45" x2="85" y2="45" stroke="hsl(var(--border))" strokeWidth="0.2" strokeDasharray="2 2" />
          </svg>
          {wards.map((ward, i) => {
            const pos = positions[i];
            const color = levelColors[ward.level];
            const size = ward.aqi > 200 ? 44 : ward.aqi > 100 ? 38 : 32;
            return (
              <div
                key={ward.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full cursor-pointer transition-transform hover:scale-110"
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  width: size,
                  height: size,
                  backgroundColor: color,
                  boxShadow: `0 0 16px ${color}40`,
                }}
                title={`${ward.name}: AQI ${ward.aqi}`}
              >
                <span className="text-[11px] font-bold text-white">{ward.aqi}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex items-center gap-4 mt-4 justify-center">
        {legendItems.map((item) => (
          <div key={item.level} className="flex items-center gap-1.5 text-xs">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: levelColors[item.level] }} />
            <span className="text-muted-foreground">{item.label}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
