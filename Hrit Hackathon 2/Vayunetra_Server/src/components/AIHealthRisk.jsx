import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Loader2, RefreshCw, AlertTriangle, ShieldCheck, ShieldAlert } from "lucide-react";
import { useAIAnalysis } from "@/hooks/useAIAnalysis";

const riskBadge = {
  low: "bg-[hsl(var(--aqi-good))/0.15] text-[hsl(var(--aqi-good))]",
  moderate: "bg-[hsl(var(--aqi-moderate))/0.15] text-[hsl(var(--aqi-moderate))]",
  high: "bg-[hsl(var(--aqi-poor))/0.15] text-[hsl(var(--aqi-poor))]",
  "very-high": "bg-[hsl(var(--aqi-very-poor))/0.15] text-[hsl(var(--aqi-very-poor))]",
  critical: "bg-[hsl(var(--aqi-severe))/0.15] text-[hsl(var(--aqi-severe))]",
  emergency: "bg-[hsl(var(--aqi-severe))/0.15] text-[hsl(var(--aqi-severe))]",
};

const groupLabels = {
  children: { label: "Children", emoji: "👶" },
  elderly: { label: "Elderly", emoji: "🧓" },
  asthma: { label: "Asthma Patients", emoji: "🫁" },
  general: { label: "General Population", emoji: "👥" },
  outdoor_workers: { label: "Outdoor Workers", emoji: "👷" },
};

export function AIHealthRisk() {
  const { data, loading, error, analyze } = useAIAnalysis("health-risk");

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Heart className="w-4 h-4 text-[hsl(var(--aqi-very-poor))]" />
          <h3 className="text-sm font-semibold text-foreground">❤️ AI Health Risk Assessment</h3>
        </div>
        <Button size="sm" variant="outline" className="text-xs gap-1.5 h-7" onClick={analyze} disabled={loading}>
          {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <RefreshCw className="w-3 h-3" />}
          {loading ? "Assessing..." : data ? "Re-assess" : "Assess Health Risks"}
        </Button>
      </div>
      {!data && !loading && !error && (
        <div className="text-center py-8">
          <Heart className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">Click "Assess Health Risks" for personalized advisories</p>
          <p className="text-xs text-muted-foreground mt-1">Maps AQI to health risks for children, elderly, asthma patients & more</p>
        </div>
      )}
      {loading && (
        <div className="text-center py-8">
          <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">AI is mapping AQI data to health risk profiles...</p>
        </div>
      )}
      {error && (
        <div className="text-center py-6">
          <AlertTriangle className="w-8 h-8 text-destructive mx-auto mb-2" />
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}
      {data && (
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 rounded-lg border border-border">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 ${data.shouldGoOutside ? "bg-[hsl(var(--aqi-good))/0.15]" : "bg-[hsl(var(--aqi-very-poor))/0.15]"}`}>
              {data.shouldGoOutside
                ? <ShieldCheck className="w-7 h-7 text-[hsl(var(--aqi-good))]" />
                : <ShieldAlert className="w-7 h-7 text-[hsl(var(--aqi-very-poor))]" />
              }
            </div>
            <div>
              <p className={`text-2xl font-bold ${data.shouldGoOutside ? "text-[hsl(var(--aqi-good))]" : "text-[hsl(var(--aqi-very-poor))]"}`}>
                {data.shouldGoOutside ? "YES" : "NO"}
              </p>
              <p className="text-xs text-muted-foreground">{data.outsideExplanation}</p>
            </div>
            <span className={`ml-auto text-[10px] font-bold px-2.5 py-1 rounded-full ${riskBadge[data.overallRisk] || riskBadge.moderate}`}>
              {data.overallRisk?.toUpperCase()} RISK
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Object.entries(data.groups || {}).map(([key, group]) => {
              const info = groupLabels[key] || { label: key, emoji: "👤" };
              return (
                <div key={key} className="p-3 rounded-lg bg-secondary/40 border border-border/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-foreground">{info.emoji} {info.label}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${riskBadge[group.riskLevel] || riskBadge.moderate}`}>
                      {group.riskLevel?.toUpperCase()}
                    </span>
                  </div>
                  <div className="space-y-1">
                    {group.advice?.map((a, i) => (
                      <p key={i} className="text-[11px] text-muted-foreground">• {a}</p>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
            <p className="text-xs font-semibold text-foreground mb-2">✅ General Precautions</p>
            <div className="space-y-1.5">
              {data.generalPrecautions?.map((p, i) => (
                <label key={i} className="flex items-center gap-2 cursor-pointer">
                  <div className="w-3.5 h-3.5 rounded border border-primary bg-primary/10 flex items-center justify-center shrink-0">
                    <svg className="w-2.5 h-2.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <span className="text-[11px] text-muted-foreground">{p}</span>
                </label>
              ))}
            </div>
          </div>
          {data.emergencyActions?.length > 0 && (
            <div className="p-3 rounded-lg bg-[hsl(var(--aqi-severe))/0.05] border border-[hsl(var(--aqi-severe))/0.2]">
              <p className="text-xs font-semibold text-[hsl(var(--aqi-severe))] mb-2">🚨 Emergency Actions</p>
              {data.emergencyActions.map((a, i) => (
                <p key={i} className="text-[11px] text-muted-foreground">⚠️ {a}</p>
              ))}
            </div>
          )}
        </div>
      )}
    </Card>
  );
}
