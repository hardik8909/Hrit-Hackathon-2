import { recommendations, getAQILabel } from "@/data/mock-data";
import { Card } from "@/components/ui/card";
import { Droplets, Truck, Building, Trees, AlertTriangle } from "lucide-react";

const iconMap = {
  droplets: Droplets,
  truck: Truck,
  building: Building,
  trees: Trees,
};

const severityBadge = {
  good: "bg-aqi-good/15 text-aqi-good border-aqi-good/30",
  moderate: "bg-aqi-moderate/15 text-aqi-moderate border-aqi-moderate/30",
  poor: "bg-aqi-poor/15 text-aqi-poor border-aqi-poor/30",
  "very-poor": "bg-aqi-very-poor/15 text-aqi-very-poor border-aqi-very-poor/30",
  severe: "bg-aqi-severe/15 text-aqi-severe border-aqi-severe/30",
};

export function RecommendationsPanel() {
  return (
    <Card className="p-5">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="w-4 h-4 text-aqi-poor" />
        <h3 className="text-sm font-semibold text-foreground">Action Recommendations</h3>
      </div>
      <div className="space-y-3">
        {recommendations.map((rec) => {
          const Icon = iconMap[rec.icon] || Droplets;
          return (
            <div key={rec.id} className="flex gap-3 p-3 rounded-lg bg-secondary/40 border border-border/50 hover:border-border transition-colors">
              <div className="mt-0.5">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className="text-sm font-medium text-foreground">{rec.title}</h4>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${severityBadge[rec.severity]}`}>
                    {getAQILabel(rec.severity)}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mb-1.5">{rec.reason}</p>
                <div className="flex flex-wrap gap-1">
                  {rec.wards.map((w) => (
                    <span key={w} className="text-[10px] bg-secondary px-1.5 py-0.5 rounded font-medium text-muted-foreground">
                      {w}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
