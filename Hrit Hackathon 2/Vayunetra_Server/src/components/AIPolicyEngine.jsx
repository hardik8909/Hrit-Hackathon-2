import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Loader2, RefreshCw, AlertTriangle, Droplets, Truck, Building, Trees, Check, X } from "lucide-react";
import { useAIAnalysis } from "@/hooks/useAIAnalysis";
import { useState } from "react";

const iconMap = {
  droplets: Droplets,
  truck: Truck,
  building: Building,
  trees: Trees,
  shield: Shield,
};

const urgencyColors = {
  immediate: "bg-[hsl(var(--aqi-severe))] text-white",
  "within-24hrs": "bg-[hsl(var(--aqi-very-poor))] text-white",
  "within-48hrs": "bg-[hsl(var(--aqi-poor))] text-white",
  preventive: "bg-[hsl(var(--aqi-moderate))] text-foreground",
};

export function AIPolicyEngine() {
  const { data, loading, error, analyze } = useAIAnalysis("policy-recommendation");
  const [approved, setApproved] = useState(new Set());
  const [rejected, setRejected] = useState(new Set());

  const handleApprove = (id) => {
    setApproved((prev) => new Set(prev).add(id));
    setRejected((prev) => { const s = new Set(prev); s.delete(id); return s; });
  };
  const handleReject = (id) => {
    setRejected((prev) => new Set(prev).add(id));
    setApproved((prev) => { const s = new Set(prev); s.delete(id); return s; });
  };

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">🏛️ AI Policy Recommendation Engine</h3>
        </div>
        <Button size="sm" variant="outline" className="text-xs gap-1.5 h-7" onClick={() => { setApproved(new Set()); setRejected(new Set()); analyze(); }} disabled={loading}>
          {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <RefreshCw className="w-3 h-3" />}
          {loading ? "Generating..." : data ? "Regenerate" : "Generate Policies"}
        </Button>
      </div>
      {!data && !loading && !error && (
        <div className="text-center py-8">
          <Shield className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">Click "Generate Policies" for AI-driven governance actions</p>
          <p className="text-xs text-muted-foreground mt-1">Converts pollution patterns into actionable policy recommendations</p>
        </div>
      )}
      {loading && (
        <div className="text-center py-8">
          <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">AI is generating policy recommendations...</p>
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
          {data.complianceMetrics && (
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-lg bg-secondary/40 border border-border/50 text-center">
                <p className="text-lg font-bold text-foreground">{data.complianceMetrics.totalActions}</p>
                <p className="text-[10px] text-muted-foreground">Total Actions</p>
              </div>
              <div className="p-3 rounded-lg bg-[hsl(var(--aqi-very-poor))/0.05] border border-[hsl(var(--aqi-very-poor))/0.2] text-center">
                <p className="text-lg font-bold text-[hsl(var(--aqi-very-poor))]">{data.complianceMetrics.immediateActions}</p>
                <p className="text-[10px] text-muted-foreground">Immediate</p>
              </div>
              <div className="p-3 rounded-lg bg-[hsl(var(--aqi-moderate))/0.05] border border-[hsl(var(--aqi-moderate))/0.2] text-center">
                <p className="text-lg font-bold text-[hsl(var(--aqi-moderate))]">{data.complianceMetrics.preventiveActions}</p>
                <p className="text-[10px] text-muted-foreground">Preventive</p>
              </div>
            </div>
          )}
          <div className="space-y-3">
            {data.recommendations?.map((rec) => {
              const Icon = iconMap[rec.icon] || Shield;
              const isApproved = approved.has(rec.id);
              const isRejected = rejected.has(rec.id);
              return (
                <div key={rec.id} className={`p-4 rounded-lg border transition-colors ${isApproved ? "border-[hsl(var(--aqi-good))] bg-[hsl(var(--aqi-good))/0.05]" : isRejected ? "border-border/30 bg-muted/30 opacity-60" : "border-border/50 bg-secondary/40"}`}>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mt-0.5 shrink-0">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-foreground">{rec.title}</h4>
                        <p className="text-xs text-muted-foreground mt-0.5">{rec.description}</p>
                      </div>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${urgencyColors[rec.urgency] || urgencyColors.preventive}`}>
                      {rec.urgency?.replace("-", " ").toUpperCase()}
                    </span>
                  </div>
                  <p className="text-[11px] text-foreground/70 mb-2">📊 <span className="font-medium">Expected Impact:</span> {rec.expectedImpact}</p>
                  {rec.implementationSteps?.length > 0 && (
                    <div className="mb-2 space-y-1">
                      {rec.implementationSteps.map((step, i) => (
                        <p key={i} className="text-[10px] text-muted-foreground flex items-start gap-1">
                          <span className="font-bold text-primary">{i + 1}.</span> {step}
                        </p>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {rec.affectedWards?.map((w) => (
                        <span key={w} className="text-[10px] bg-muted px-1.5 py-0.5 rounded font-medium text-muted-foreground">{w}</span>
                      ))}
                    </div>
                    {!isApproved && !isRejected && (
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="default" className="h-7 text-xs px-3 gap-1" onClick={() => handleApprove(rec.id)}>
                          <Check className="w-3 h-3" /> Approve
                        </Button>
                        <Button size="sm" variant="outline" className="h-7 text-xs px-3 gap-1" onClick={() => handleReject(rec.id)}>
                          <X className="w-3 h-3" /> Reject
                        </Button>
                      </div>
                    )}
                    {isApproved && (
                      <span className="text-xs font-medium text-[hsl(var(--aqi-good))] flex items-center gap-1">
                        <Check className="w-3 h-3" /> Approved
                      </span>
                    )}
                    {isRejected && (
                      <span className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                        <X className="w-3 h-3" /> Rejected
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
            <p className="text-xs font-semibold text-foreground mb-1">📋 Overall Strategy</p>
            <p className="text-xs text-muted-foreground">{data.overallStrategy}</p>
          </div>
        </div>
      )}
    </Card>
  );
}
