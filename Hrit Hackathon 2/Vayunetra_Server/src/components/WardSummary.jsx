import { wards, getAQILabel } from "@/data/mock-data";
import { Card } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

const levelColors = {
  good: "bg-[hsl(var(--aqi-good))]",
  moderate: "bg-[hsl(var(--aqi-moderate))]",
  poor: "bg-[hsl(var(--aqi-poor))]",
  "very-poor": "bg-[hsl(var(--aqi-very-poor))]",
  severe: "bg-[hsl(var(--aqi-severe))]",
};

const badgeStyles = {
  good: "bg-[hsl(var(--aqi-good))/0.1] text-[hsl(var(--aqi-good))]",
  moderate: "bg-[hsl(var(--aqi-moderate))/0.1] text-[hsl(var(--aqi-moderate))]",
  poor: "bg-[hsl(var(--aqi-poor))/0.1] text-[hsl(var(--aqi-poor))]",
  "very-poor": "bg-[hsl(var(--aqi-very-poor))/0.1] text-[hsl(var(--aqi-very-poor))]",
  severe: "bg-[hsl(var(--aqi-severe))/0.1] text-[hsl(var(--aqi-severe))]",
};

const sortedWards = [...wards].sort((a, b) => b.aqi - a.aqi);

export function WardSummary() {
  return (
    <Card className="p-5 w-full lg:w-[300px] shrink-0">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-4 h-4 text-primary" />
        <h3 className="text-sm font-semibold text-foreground">Ward Summary</h3>
      </div>
      <div className="space-y-2">
        {sortedWards.map((ward) => (
          <div key={ward.id} className="flex items-center gap-3 py-1.5">
            <div className={`w-10 h-10 rounded-full ${levelColors[ward.level]} flex items-center justify-center shrink-0`}>
              <span className="text-[11px] font-bold text-white">{ward.aqi}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{ward.name}</p>
              <p className="text-[10px] text-muted-foreground font-mono">{ward.code}</p>
            </div>
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${badgeStyles[ward.level]}`}>
              {getAQILabel(ward.level)}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
