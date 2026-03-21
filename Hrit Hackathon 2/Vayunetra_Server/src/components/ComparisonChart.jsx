import { wards } from "@/data/mock-data";
import { Card } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const top5 = [...wards].sort((a, b) => b.aqi - a.aqi).slice(0, 5);

const data = top5.map((w) => ({
  name: w.name,
  AQI: w.aqi,
  "PM2.5": w.pm25,
  PM10: w.pm10,
}));

const chartConfig = {
  AQI: { label: "AQI", color: "hsl(var(--chart-1))" },
  "PM2.5": { label: "PM2.5", color: "hsl(var(--chart-3))" },
  PM10: { label: "PM10", color: "hsl(var(--aqi-very-poor))" },
};

export function ComparisonChart() {
  return (
    <Card className="p-5 flex-1">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-sm font-semibold text-foreground">AQI Comparison - Top 5 Wards</h3>
      </div>
      <Tabs defaultValue="aqi" className="mb-3">
        <TabsList className="h-7">
          <TabsTrigger value="aqi" className="text-xs px-3 h-6">AQI</TabsTrigger>
          <TabsTrigger value="pm25" className="text-xs px-3 h-6">PM2.5</TabsTrigger>
          <TabsTrigger value="pm10" className="text-xs px-3 h-6">PM10</TabsTrigger>
        </TabsList>
      </Tabs>
      <ChartContainer config={chartConfig} className="h-[240px] w-full">
        <BarChart data={data} margin={{ top: 5, right: 10, left: -15, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
          <XAxis dataKey="name" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
          <YAxis tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="AQI" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} barSize={16} />
          <Bar dataKey="PM2.5" fill="hsl(var(--chart-3))" radius={[4, 4, 0, 0]} barSize={16} />
          <Bar dataKey="PM10" fill="hsl(var(--aqi-very-poor))" radius={[4, 4, 0, 0]} barSize={16} />
        </BarChart>
      </ChartContainer>
    </Card>
  );
}
