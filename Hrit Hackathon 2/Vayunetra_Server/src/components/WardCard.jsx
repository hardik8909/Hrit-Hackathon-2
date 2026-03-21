import { getAQILabel } from "@/data/mock-data";
import { Card } from "@/components/ui/card";
import { MapPin } from "lucide-react";

const levelStyles = {
  good: "border-aqi-good/30 bg-aqi-good/5",
  moderate: "border-aqi-moderate/30 bg-aqi-moderate/5",
  poor: "border-aqi-poor/30 bg-aqi-poor/5",
  "very-poor": "border-aqi-very-poor/30 bg-aqi-very-poor/5",
  severe: "border-aqi-severe/30 bg-aqi-severe/5",
};

const badgeStyles = {
  good: "bg-aqi-good text-white",
  moderate: "bg-aqi-moderate text-foreground",
  poor: "bg-aqi-poor text-white",
  "very-poor": "bg-aqi-very-poor text-white",
  severe: "bg-aqi-severe text-white",
};

const dotStyles = {
  good: "bg-aqi-good",
  moderate: "bg-aqi-moderate",
  poor: "bg-aqi-poor",
  "very-poor": "bg-aqi-very-poor",
  severe: "bg-aqi-severe",
};

export function WardCard({ ward }) {
  return (
    <Card className={`p-4 border-2 transition-all hover:shadow-lg ${levelStyles[ward.level]}`}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-sm text-foreground">{ward.name}</h3>
          <p className="text-xs text-muted-foreground font-mono">{ward.code}</p>
        </div>
        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${badgeStyles[ward.level]}`}>
          {getAQILabel(ward.level)}
        </span>
      </div>
      <div className="flex items-end gap-2 mb-3">
        <span className="text-3xl font-bold font-mono text-foreground">{ward.aqi}</span>
        <span className="text-xs text-muted-foreground mb-1">AQI</span>
        <div className={`w-2 h-2 rounded-full mb-2 animate-pulse ${dotStyles[ward.level]}`} />
      </div>
      <div className="grid grid-cols-3 gap-2 text-xs">
        <div className="bg-secondary/50 rounded p-1.5 text-center">
          <p className="text-muted-foreground">PM2.5</p>
          <p className="font-mono font-semibold text-foreground">{ward.pm25}</p>
        </div>
        <div className="bg-secondary/50 rounded p-1.5 text-center">
          <p className="text-muted-foreground">PM10</p>
          <p className="font-mono font-semibold text-foreground">{ward.pm10}</p>
        </div>
        <div className="bg-secondary/50 rounded p-1.5 text-center">
          <p className="text-muted-foreground">NO₂</p>
          <p className="font-mono font-semibold text-foreground">{ward.no2}</p>
        </div>
      </div>
      <div className="flex items-center gap-1 mt-3 text-xs text-muted-foreground">
        <MapPin className="w-3 h-3" />
        <span>{ward.lat.toFixed(2)}°N, {ward.lng.toFixed(2)}°E</span>
      </div>
    </Card>
  );
}
