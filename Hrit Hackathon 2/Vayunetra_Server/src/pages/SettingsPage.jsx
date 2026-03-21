import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Bell, Settings2, Shield, Database, Globe, RefreshCw, Smartphone } from "lucide-react";
import { useState } from "react";

const SettingsPage = () => {
  const [aqiAlerts, setAqiAlerts] = useState(true);
  const [healthUpdates, setHealthUpdates] = useState(true);
  const [adminAlerts, setAdminAlerts] = useState(false);
  const [dailyDigest, setDailyDigest] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-lg font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground">Configure your VayuNetra dashboard preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Notification Preferences</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground">AQI Threshold Alerts</p>
                <p className="text-xs text-muted-foreground">Get notified when AQI exceeds safe limits</p>
              </div>
              <Switch checked={aqiAlerts} onCheckedChange={setAqiAlerts} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground">Health Advisory Updates</p>
                <p className="text-xs text-muted-foreground">Receive health guidance notifications</p>
              </div>
              <Switch checked={healthUpdates} onCheckedChange={setHealthUpdates} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground">Admin Action Alerts</p>
                <p className="text-xs text-muted-foreground">Notifications for new action recommendations</p>
              </div>
              <Switch checked={adminAlerts} onCheckedChange={setAdminAlerts} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground">Daily Digest</p>
                <p className="text-xs text-muted-foreground">Morning summary of air quality</p>
              </div>
              <Switch checked={dailyDigest} onCheckedChange={setDailyDigest} />
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <Settings2 className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Display Settings</h3>
          </div>
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground">Dark Mode</p>
                <p className="text-xs text-muted-foreground">Toggle dark theme for the dashboard</p>
              </div>
              <Switch checked={darkMode} onCheckedChange={setDarkMode} />
            </div>
            <div>
              <p className="text-sm text-foreground">Language</p>
              <p className="text-xs text-muted-foreground mb-2">Select your preferred language</p>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border text-sm w-fit">
                <Globe className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="font-medium text-foreground">English</span>
                <svg className="w-3 h-3 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
            <div>
              <p className="text-sm text-foreground">Install as App</p>
              <p className="text-xs text-muted-foreground mb-2">Add VayuNetra to your home screen</p>
              <Button variant="outline" size="sm" className="text-xs gap-1.5">
                <Smartphone className="w-3.5 h-3.5" /> Install PWA
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Data & Privacy</h3>
          </div>
          <div className="space-y-3">
            {[
              { label: "Data Source", value: "CPCB + Municipal IoT", isBadge: true },
              { label: "Last Data Sync", value: "2 minutes ago" },
              { label: "API Status", value: "Online", isOnline: true },
              { label: "Sensor Network", value: "24/24 Active" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <span className="text-sm text-foreground">{item.label}</span>
                {item.isBadge ? (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{item.value}</span>
                ) : item.isOnline ? (
                  <span className="text-sm text-[hsl(var(--aqi-good))] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[hsl(var(--aqi-good))]" />
                    {item.value}
                  </span>
                ) : (
                  <span className="text-sm text-muted-foreground">{item.value}</span>
                )}
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <Database className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">System Information</h3>
          </div>
          <div className="space-y-3">
            {[
              { label: "Platform Version", value: "v2.1.0" },
              { label: "ML Model", value: "AQI-Forecast v3.2", mono: true },
              { label: "Prediction Accuracy", value: "91.4%" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <span className="text-sm text-foreground">{item.label}</span>
                <span className={`text-sm text-muted-foreground ${item.mono ? "font-mono" : ""}`}>{item.value}</span>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4 text-xs gap-1.5">
            <RefreshCw className="w-3.5 h-3.5" /> Check for Updates
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage;
