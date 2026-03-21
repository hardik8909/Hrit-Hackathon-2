import { hourlyTrend } from "@/data/mock-data";
import { Card } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid } from "recharts";

const chartConfig = {
  aqi: { label: "AQI", color: "hsl(var(--chart-1))" },
};

export function AQITrendChart() {
  return (
    <Card className="p-5">
      <h3 className="text-sm font-semibold text-foreground mb-1">24-Hour AQI Trend</h3>
      <p className="text-xs text-muted-foreground mb-4">Hourly air quality index readings</p>
      <ChartContainer config={chartConfig} className="h-[220px] w-full">
        <AreaChart data={hourlyTrend} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="aqiGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
          <XAxis dataKey="hour" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} interval={3} />
          <YAxis tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Area type="monotone" dataKey="aqi" stroke="hsl(var(--chart-1))" fill="url(#aqiGrad)" strokeWidth={2} />
        </AreaChart>
      </ChartContainer>
    </Card>
  );
}
