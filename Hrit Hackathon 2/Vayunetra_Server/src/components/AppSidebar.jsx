import { LayoutDashboard, Map, Heart, TrendingUp, Shield, FileText, Settings, Wind } from "lucide-react";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/" },
  { label: "Live AQI Map", icon: Map, to: "/live-aqi-map" },
  { label: "Health Advisory", icon: Heart, to: "/health-advisory" },
  { label: "Forecast", icon: TrendingUp, to: "/forecast" },
  { label: "Admin Actions", icon: Shield, to: "/admin-actions" },
  { label: "Reports", icon: FileText, to: "/reports" },
  { label: "Settings", icon: Settings, to: "/settings" },
];

export function AppSidebar() {
  return (
    <aside className="fixed left-0 top-0 bottom-0 w-[200px] bg-[hsl(var(--sidebar-background))] text-[hsl(var(--sidebar-foreground))] flex flex-col z-20">
      <div className="px-5 py-5 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-[hsl(var(--sidebar-primary))] flex items-center justify-center">
          <Wind className="w-4 h-4 text-[hsl(var(--sidebar-primary-foreground))]" />
        </div>
        <div>
          <h1 className="text-sm font-bold text-[hsl(var(--sidebar-primary-foreground))]">VayuNetra</h1>
          <p className="text-[10px] text-[hsl(var(--sidebar-muted))]">Air Intelligence Platform</p>
        </div>
      </div>
      <nav className="flex-1 px-3 mt-2">
        <p className="text-[10px] uppercase tracking-wider text-[hsl(var(--sidebar-muted))] px-3 mb-2 font-medium">Navigation</p>
        <div className="space-y-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.label}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-[hsl(var(--sidebar-accent))] text-[hsl(var(--sidebar-accent-foreground))]"
                      : "text-[hsl(var(--sidebar-muted))] hover:bg-[hsl(var(--sidebar-accent))] hover:text-[hsl(var(--sidebar-accent-foreground))]"
                  )
                }
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </NavLink>
            );
          })}
        </div>
      </nav>
      <div className="px-5 py-4 border-t border-[hsl(var(--sidebar-border))]">
        <p className="text-[10px] text-[hsl(var(--sidebar-muted))]">Powered by ML & IoT Sensors</p>
        <p className="text-[10px] text-[hsl(var(--sidebar-muted))]">v2.1.0 - CPCB Integrated</p>
      </div>
    </aside>
  );
}
