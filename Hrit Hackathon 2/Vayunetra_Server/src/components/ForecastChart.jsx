import { forecastData } from "@/data/mock-data";
import { Card } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell } from "recharts";
import { AlertTriangle } from "lucide-react";

const chartConfig = {
  aqi: { label: "AQI", color: "hsl(var(--chart-3))" },
};

export function ForecastChart() {
  return (
    <Card className="p-5">
      <div className="flex items-center gap-2 mb-1">
        <h3 className="text-sm font-semibold text-foreground">7-Day Forecast</h3>
        {forecastData.some(d => d.isSpike) && (
          <span className="flex items-center gap-1 text-xs text-aqi-very-poor font-medium">
            <AlertTriangle className="w-3 h-3" /> Spike Alert
          </span>
        )}
      </div>
      <p className="text-xs text-muted-foreground mb-4">Predicted AQI levels for the week</p>
      <ChartContainer config={chartConfig} className="h-[220px] w-full">
        <BarChart data={forecastData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
          <XAxis dataKey="day" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
          <YAxis tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="aqi" radius={[6, 6, 0, 0]}>
            {forecastData.map((entry, index) => (
              <Cell key={index} fill={entry.isSpike ? "hsl(var(--aqi-very-poor))" : "hsl(var(--chart-1))"} opacity={entry.isSpike ? 1 : 0.8} />
            ))}
          </Bar>
        </BarChart>
      </ChartContainer>
    </Card>
  );
}
