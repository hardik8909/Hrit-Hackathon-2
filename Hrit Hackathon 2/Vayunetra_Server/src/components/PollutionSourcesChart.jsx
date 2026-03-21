import { pollutionSources } from "@/data/mock-data";
import { Card } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { PieChart, Pie, Cell } from "recharts";

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-3))",
  "hsl(var(--aqi-very-poor))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

const chartConfig = Object.fromEntries(
  pollutionSources.map((s, i) => [s.name, { label: s.name, color: COLORS[i] }])
);

export function PollutionSourcesChart() {
  return (
    <Card className="p-5 w-full lg:w-[340px] shrink-0">
      <h3 className="text-sm font-semibold text-foreground mb-1">Pollution Cause Breakdown</h3>
      <p className="text-xs text-muted-foreground mb-4">Contribution by source</p>
      <ChartContainer config={chartConfig} className="h-[220px] w-full">
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent />} />
          <Pie data={pollutionSources} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={80} strokeWidth={2} stroke="hsl(var(--card))">
            {pollutionSources.map((_, i) => (
              <Cell key={i} fill={COLORS[i]} />
            ))}
          </Pie>
        </PieChart>
      </ChartContainer>
      <div className="flex flex-wrap gap-3 mt-2 justify-center">
        {pollutionSources.map((s, i) => (
          <div key={s.name} className="flex items-center gap-1.5 text-xs">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
            <span className="text-muted-foreground">{s.name}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
