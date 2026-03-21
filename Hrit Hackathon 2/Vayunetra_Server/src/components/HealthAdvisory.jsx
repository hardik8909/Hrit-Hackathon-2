import { wards, getAQILevel, getAQILabel } from "@/data/mock-data";
import { Card } from "@/components/ui/card";
import { Heart, ShieldAlert, ShieldCheck, Baby, Users, Stethoscope, Accessibility } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const avgAqi = Math.round(wards.reduce((s, w) => s + w.aqi, 0) / wards.length);
const level = getAQILevel(avgAqi);
const isSafe = avgAqi <= 100;

const precautions = [
  { text: "Wear N95 mask outdoors", checked: false },
  { text: "Avoid outdoor exercise", checked: false },
  { text: "Keep windows closed", checked: false },
  { text: "Use air purifier indoors", checked: false },
  { text: "Stay hydrated", checked: false },
  { text: "Protect eyes from irritation", checked: false },
];

export function HealthAdvisory() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <Card className="p-5">
        <div className="flex items-center gap-2 mb-4">
          <Heart className="w-4 h-4 text-[hsl(var(--aqi-very-poor))]" />
          <h3 className="text-sm font-semibold text-foreground">Should I Go Outside Today?</h3>
        </div>
        <div className="flex flex-col items-center text-center py-4">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-3 ${isSafe ? "bg-[hsl(var(--aqi-good))/0.15]" : "bg-[hsl(var(--aqi-very-poor))/0.15]"}`}>
            {isSafe ? (
              <ShieldCheck className="w-10 h-10 text-[hsl(var(--aqi-good))]" />
            ) : (
              <ShieldAlert className="w-10 h-10 text-[hsl(var(--aqi-very-poor))]" />
            )}
          </div>
          <p className={`text-3xl font-bold mb-2 ${isSafe ? "text-[hsl(var(--aqi-good))]" : "text-[hsl(var(--aqi-very-poor))]"}`}>
            {isSafe ? "YES" : "NO"}
          </p>
          <p className="text-xs text-muted-foreground max-w-[220px]">
            AQI is above safe thresholds. Prolonged outdoor exposure is not recommended.
          </p>
          <span className="text-[10px] text-muted-foreground mt-3 px-2.5 py-1 rounded-full border border-border">
            Based on AQI {avgAqi} - {getAQILabel(level)}
          </span>
        </div>
      </Card>
      <Card className="p-5">
        <h3 className="text-sm font-semibold text-foreground mb-3">Risk Category Advice</h3>
        <Tabs defaultValue="general" className="mt-1">
          <TabsList className="h-9 w-full grid grid-cols-2 gap-2 bg-transparent p-0">
            <TabsTrigger value="child" className="text-xs h-8 gap-1.5 border border-border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:border-primary rounded-lg">
              <Baby className="w-3.5 h-3.5" /> Child
            </TabsTrigger>
            <TabsTrigger value="elderly" className="text-xs h-8 gap-1.5 border border-border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:border-primary rounded-lg">
              <Accessibility className="w-3.5 h-3.5" /> Elderly
            </TabsTrigger>
          </TabsList>
          <TabsList className="h-9 w-full grid grid-cols-2 gap-2 bg-transparent p-0 mt-2">
            <TabsTrigger value="asthma" className="text-xs h-8 gap-1.5 border border-border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:border-primary rounded-lg">
              <Stethoscope className="w-3.5 h-3.5" /> Asthma
            </TabsTrigger>
            <TabsTrigger value="general" className="text-xs h-8 gap-1.5 border border-border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:border-primary rounded-lg">
              <Users className="w-3.5 h-3.5" /> General
            </TabsTrigger>
          </TabsList>
          <TabsContent value="child" className="mt-3">
            <div className="p-3 rounded-lg bg-muted/50 border border-border/50">
              <p className="text-xs text-muted-foreground leading-relaxed">
                Keep children indoors during peak hours. Avoid playgrounds near roads. Use N95 masks for school commute.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="elderly" className="mt-3">
            <div className="p-3 rounded-lg bg-muted/50 border border-border/50">
              <p className="text-xs text-muted-foreground leading-relaxed">
                Avoid all outdoor activities. Use air purifiers indoors. Consult doctor if experiencing respiratory issues.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="asthma" className="mt-3">
            <div className="p-3 rounded-lg bg-muted/50 border border-border/50">
              <p className="text-xs text-muted-foreground leading-relaxed">
                Keep rescue inhaler available. Stay indoors during peak hours. Monitor symptoms closely.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="general" className="mt-3">
            <div className="p-3 rounded-lg bg-muted/50 border border-border/50">
              <p className="text-xs text-muted-foreground leading-relaxed">
                Limit prolonged outdoor exertion. Use public transport over walking. Keep windows closed during peak pollution hours (8-11 AM).
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
      <Card className="p-5">
        <h3 className="text-sm font-semibold text-foreground mb-3">Precautions Checklist</h3>
        <div className="space-y-2.5">
          {precautions.map((p) => (
            <label key={p.text} className="flex items-center gap-2.5 cursor-pointer">
              <div className="w-4 h-4 rounded border border-border flex items-center justify-center shrink-0" />
              <span className="text-xs text-foreground">{p.text}</span>
            </label>
          ))}
        </div>
      </Card>
    </div>
  );
}
