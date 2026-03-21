import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Loader2, RefreshCw, AlertTriangle, ArrowUp, ArrowDown, Minus } from "lucide-react";
import { useAIAnalysis } from "@/hooks/useAIAnalysis";

const riskColors = {
  low: "bg-[hsl(var(--aqi-good))]",
  medium: "bg-[hsl(var(--aqi-moderate))]",
  high: "bg-[hsl(var(--aqi-poor))]",
  critical: "bg-[hsl(var(--aqi-severe))]",
};

const riskTextColors = {
  low: "text-[hsl(var(--aqi-good))]",
  medium: "text-[hsl(var(--aqi-moderate))]",
  high: "text-[hsl(var(--aqi-poor))]",
  critical: "text-[hsl(var(--aqi-severe))]",
};

const trendIcons = {
  improving: <ArrowDown className="w-4 h-4 text-[hsl(var(--aqi-good))]" />,
  worsening: <ArrowUp className="w-4 h-4 text-[hsl(var(--aqi-very-poor))]" />,
  stable: <Minus className="w-4 h-4 text-[hsl(var(--aqi-moderate))]" />,
  volatile: <AlertTriangle className="w-4 h-4 text-[hsl(var(--aqi-poor))]" />,
};

export function AIForecastInsight() {
  const { data, loading, error, analyze } = useAIAnalysis("forecast-insight");

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">🔮 AI Pollution Forecast Insights</h3>
        </div>
        <Button size="sm" variant="outline" className="text-xs gap-1.5 h-7" onClick={analyze} disabled={loading}>
          {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <RefreshCw className="w-3 h-3" />}
          {loading ? "Forecasting..." : data ? "Re-forecast" : "Generate Forecast"}
        </Button>
      </div>
      {!data && !loading && !error && (
        <div className="text-center py-8">
          <TrendingUp className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">Click "Generate Forecast" for AI-powered predictions</p>
          <p className="text-xs text-muted-foreground mt-1">Predicts AQI trends using weather, historical data, and seasonal patterns</p>
        </div>
      )}
      {loading && (
        <div className="text-center py-8">
          <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">AI is analyzing weather patterns and historical trends...</p>
        </div>
      )}
      {error && (
        <div className="text-center py-6">
          <AlertTriangle className="w-8 h-8 text-destructive mx-auto mb-2" />
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}
      {data?.forecastAnalysis && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-secondary/40 border border-border/50">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Weekly Trend</p>
              <div className="flex items-center gap-2">
                {trendIcons[data.forecastAnalysis.trend] || trendIcons.stable}
                <span className="text-sm font-bold text-foreground capitalize">{data.forecastAnalysis.trend}</span>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-[hsl(var(--aqi-very-poor))/0.05] border border-[hsl(var(--aqi-very-poor))/0.2]">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Peak Expected</p>
              <p className="text-sm font-bold text-foreground">{data.forecastAnalysis.peakDay} — AQI {data.forecastAnalysis.peakAQI}</p>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-[hsl(var(--aqi-poor))/0.05] border border-[hsl(var(--aqi-poor))/0.2]">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-3.5 h-3.5 text-[hsl(var(--aqi-poor))] mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-semibold text-foreground mb-0.5">Spike Cause</p>
                <p className="text-xs text-muted-foreground">{data.forecastAnalysis.spikeCause}</p>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-semibold text-foreground">Daily Breakdown</p>
            {data.forecastAnalysis.dailyInsights?.map((d) => (
              <div key={d.day} className="flex items-start gap-3 p-2 rounded-lg bg-secondary/30">
                <div className="flex items-center gap-2 w-20 shrink-0">
                  <div className={`w-2 h-2 rounded-full ${riskColors[d.riskLevel] || "bg-muted"}`} />
                  <span className="text-xs font-bold text-foreground">{d.day}</span>
                </div>
                <p className="text-[11px] text-muted-foreground flex-1">{d.insight}</p>
                <span className={`text-[10px] font-semibold capitalize ${riskTextColors[d.riskLevel] || "text-muted-foreground"}`}>
                  {d.riskLevel}
                </span>
              </div>
            ))}
          </div>
          <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
            <p className="text-xs font-semibold text-foreground mb-2">Preventive Actions</p>
            <div className="space-y-1.5">
              {data.forecastAnalysis.preventiveActions?.map((a, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-[10px] font-bold text-primary bg-primary/10 rounded-full w-4 h-4 flex items-center justify-center shrink-0">{i + 1}</span>
                  <p className="text-xs text-muted-foreground">{a}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="text-xs text-muted-foreground italic">{data.weekSummary}</p>
        </div>
      )}
    </Card>
  );
}
