import { Wind, Thermometer, Droplets, Eye } from "lucide-react";
import { Card } from "@/components/ui/card";
import { wards } from "@/data/mock-data";

const avgAqi = Math.round(wards.reduce((s, w) => s + w.aqi, 0) / wards.length);

const stats = [
  { label: "City AQI", value: String(avgAqi), change: "+12%", up: true, icon: Wind, color: "text-[hsl(var(--aqi-poor))]", bgColor: "bg-[hsl(var(--aqi-poor))/0.1]" },
  { label: "Temperature", value: "34°C", change: "+2°C", up: true, icon: Thermometer, color: "text-[hsl(var(--chart-3))]", bgColor: "bg-[hsl(var(--chart-3))/0.1]" },
  { label: "Humidity", value: "45%", change: "-5%", up: false, icon: Droplets, color: "text-[hsl(var(--chart-1))]", bgColor: "bg-[hsl(var(--chart-1))/0.1]" },
  { label: "Visibility", value: "3.2 km", change: "-0.8 km", up: false, icon: Eye, color: "text-[hsl(var(--chart-2))]", bgColor: "bg-[hsl(var(--chart-2))/0.1]" },
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s) => {
        const Icon = s.icon;
        return (
          <Card key={s.label} className="p-4 flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl ${s.bgColor} flex items-center justify-center`}>
              <Icon className={`w-5 h-5 ${s.color}`} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-foreground">{s.value}</span>
                <span className={`text-xs font-medium ${s.up ? "text-[hsl(var(--aqi-very-poor))]" : "text-[hsl(var(--aqi-good))]"}`}>
                  {s.change}
                </span>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
