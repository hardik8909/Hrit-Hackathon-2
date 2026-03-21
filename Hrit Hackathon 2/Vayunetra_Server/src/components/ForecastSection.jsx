import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ReferenceLine } from "recharts";
import { AlertTriangle, TrendingUp } from "lucide-react";
import { getWeather } from "../service/api"; // Axios instance

const chartConfig = {
  aqi: { label: "aqi", color: "hsl(var(--chart-1))" },
  high: { label: "high", color: "hsl(var(--chart-1))" },
};

// Custom dot for spikes
function CustomDot({ cx, cy, payload }) {
  if (payload.isSpike) {
    return <circle cx={cx} cy={cy} r={5} fill="hsl(var(--aqi-very-poor))" stroke="white" strokeWidth={2} />;
  }
  return <circle cx={cx} cy={cy} r={3} fill="hsl(var(--chart-1))" stroke="white" strokeWidth={1.5} />;
}

export function ForecastSection({ city = "Delhi" }) {
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchForecast() {
      try {
        const response = await getWeather(city);
        const data = response.data;

        // Generate 7-day mock forecast based on current data
        const baseAQI = data.current?.temperature || 100;
        const baseHigh = data.current?.feelslike || 120;

        const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        const formatted = daysOfWeek.map((day, idx) => {
          // simple variation: +- random
          const variation = Math.floor(Math.random() * 50) - 25;
          const aqi = Math.max(0, baseAQI + variation);
          const high = Math.max(aqi, baseHigh + variation);

          return {
            day,
            aqi,
            high,
            isSpike: aqi > 150,
          };
        });

        setForecastData(formatted);
      } catch (err) {
        console.error(err);
        setError(err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchForecast();
  }, [city]);

  if (loading) return <Card className="p-5">Loading forecast...</Card>;
  if (error) return <Card className="p-5 text-red-500">Error: {error}</Card>;

  const spikeDays = forecastData.filter((d) => d.isSpike);

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">7-Day Pollution Forecast - {city}</h3>
        </div>
        {spikeDays.length > 0 && (
          <span className="flex items-center gap-1 text-xs text-[hsl(var(--primary-foreground))] font-medium bg-[hsl(var(--aqi-very-poor))] px-2.5 py-1 rounded-full">
            <AlertTriangle className="w-3 h-3" /> Spike Expected
          </span>
        )}
      </div>

      <ChartContainer config={chartConfig} className="h-[280px] w-full mt-4">
        <AreaChart data={forecastData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="confidenceBand" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.15} />
              <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
          <XAxis dataKey="day" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
          <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
          <ReferenceLine y={200} stroke="hsl(var(--aqi-very-poor))" strokeDasharray="6 4" strokeOpacity={0.6} />
          <ReferenceLine y={150} stroke="hsl(var(--aqi-moderate))" strokeDasharray="6 4" strokeOpacity={0.4} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Area type="monotone" dataKey="high" stroke="none" fill="url(#confidenceBand)" fillOpacity={1} />
          <Area
            type="monotone"
            dataKey="aqi"
            stroke="hsl(var(--chart-1))"
            strokeWidth={2}
            fill="url(#confidenceBand)"
            fillOpacity={0.3}
            dot={<CustomDot />}
          />
        </AreaChart>
      </ChartContainer>

      {spikeDays.length > 0 &&
        spikeDays.map((spike) => (
          <div
            key={spike.day}
            className="mt-3 p-3 rounded-lg bg-[hsl(var(--aqi-very-poor))/0.05] border border-[hsl(var(--aqi-very-poor))/0.2]"
          >
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-3.5 h-3.5 text-[hsl(var(--aqi-very-poor))] mt-0.5 shrink-0" />
              <p className="text-xs text-muted-foreground">
                <span className="font-medium text-foreground">{spike.day}:</span> High pollution expected due to low wind
                speed and temperature inversion. Consider preemptive admin actions.
              </p>
            </div>
          </div>
        ))}
    </Card>
  );
}