import { MapPin, Clock, User, PanelLeft } from "lucide-react";
import { wards, getAQILabel, getAQILevel } from "@/data/mock-data";
import { useEffect, useState } from "react";

export function TopBar() {
  const avgAqi = Math.round(wards.reduce((s, w) => s + w.aqi, 0) / wards.length);
  const level = getAQILevel(avgAqi);
  const label = getAQILabel(level);

  const badgeColor = {
    good: "bg-[hsl(var(--aqi-good))]",
    moderate: "bg-[hsl(var(--aqi-moderate))]",
    poor: "bg-[hsl(var(--aqi-poor))]",
    "very-poor": "bg-[hsl(var(--aqi-very-poor))]",
    severe: "bg-[hsl(var(--aqi-severe))]",
  };

  const [time, setTime] = useState(new Date());

  // role state
  const [role, setRole] = useState("Admin");

  const toggleRole = () => {
    setRole(role === "Admin" ? "Citizen" : "Admin");
  };

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const timeStr = time.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });

  return (
    <header className="h-14 bg-card border-b border-border flex items-center justify-between px-5">
      
      <div className="flex items-center gap-4">
        <button className="p-1.5 rounded-md hover:bg-muted transition-colors">
          <PanelLeft className="w-4 h-4 text-muted-foreground" />
        </button>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border text-sm">
          <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="font-medium text-foreground">Faridabad</span>
          <svg className="w-3 h-3 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        <span className={`text-xs font-bold px-3 py-1 rounded-full text-white ${badgeColor[level]}`}>
          AQI {avgAqi} - {label}
        </span>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-3.5 h-3.5" />
          <span className="font-mono">{timeStr}</span>
          <div className="w-2 h-2 rounded-full bg-[hsl(var(--aqi-good))] animate-pulse" />
        </div>

        {/* ROLE SWITCH */}
        <div
          onClick={toggleRole}
          className="flex items-center gap-2 cursor-pointer hover:bg-muted px-2 py-1 rounded-md"
        >
          <User className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">{role}</span>
        </div>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
          {role === "Admin" ? "AD" : "CT"}
        </div>
      </div>
    </header>
  );
}