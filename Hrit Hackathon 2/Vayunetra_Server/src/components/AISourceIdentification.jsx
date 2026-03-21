import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Loader2, RefreshCw, AlertTriangle, CheckCircle } from "lucide-react";
import { useAIAnalysis } from "@/hooks/useAIAnalysis";
import { Progress } from "@/components/ui/progress";

const severityColors = {
  good: "text-[hsl(var(--aqi-good))]",
  moderate: "text-[hsl(var(--aqi-moderate))]",
  poor: "text-[hsl(var(--aqi-poor))]",
  "very-poor": "text-[hsl(var(--aqi-very-poor))]",
  severe: "text-[hsl(var(--aqi-severe))]",
};

const severityBg = {
  good: "bg-[hsl(var(--aqi-good))/0.1]",
  moderate: "bg-[hsl(var(--aqi-moderate))/0.1]",
  poor: "bg-[hsl(var(--aqi-poor))/0.1]",
  "very-poor": "bg-[hsl(var(--aqi-very-poor))/0.1]",
  severe: "bg-[hsl(var(--aqi-severe))/0.1]",
};

export function AISourceIdentification() {
  const { data, loading, error, analyze } = useAIAnalysis("source-identification");

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Brain className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">🧠 AI Pollution Source Identification</h3>
        </div>
        <Button size="sm" variant="outline" className="text-xs gap-1.5 h-7" onClick={analyze} disabled={loading}>
          {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <RefreshCw className="w-3 h-3" />}
          {loading ? "Analyzing..." : data ? "Re-analyze" : "Run AI Analysis"}
        </Button>
      </div>
      {!data && !loading && !error && (
        <div className="text-center py-8">
          <Brain className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">Click "Run AI Analysis" to identify pollution sources</p>
          <p className="text-xs text-muted-foreground mt-1">Uses explainable AI to determine why pollution is high in each ward</p>
        </div>
      )}
      {loading && (
        <div className="text-center py-8">
          <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">AI is analyzing ward-level pollution patterns...</p>
          <p className="text-xs text-muted-foreground mt-1">Considering traffic, weather, construction, and industrial factors</p>
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
          <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
            <p className="text-xs text-foreground"><span className="font-semibold">City Insight:</span> {data.cityInsight}</p>
          </div>
          <div className="space-y-3">
            {data.analyses?.map((a) => (
              <div key={a.wardId} className={`p-3 rounded-lg border border-border/50 ${severityBg[a.severity] || "bg-secondary/40"}`}>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">{a.wardName}</h4>
                    <p className={`text-xs font-medium ${severityColors[a.severity] || "text-muted-foreground"}`}>{a.primarySource}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1.5">
                      <Progress value={a.confidence} className="h-1.5 w-16" />
                      <span className="text-xs font-mono font-bold text-foreground">{a.confidence}%</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground">confidence</p>
                  </div>
                </div>
                <div className="space-y-1 mb-2">
                  {a.explanationFactors?.map((f, i) => (
                    <div key={i} className="flex items-start gap-1.5">
                      <CheckCircle className="w-3 h-3 text-primary mt-0.5 shrink-0" />
                      <p className="text-[11px] text-muted-foreground">{f}</p>
                    </div>
                  ))}
                </div>
                <p className="text-[11px] text-foreground/80 italic">💡 {a.recommendation}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
