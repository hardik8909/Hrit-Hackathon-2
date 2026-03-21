import { useEffect, useState } from "react";
import { getWeather } from "../service/api"; // ✅ import from your api.js

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Droplets, FileText, MessageCircle, Mail } from "lucide-react";

export function AdminActions() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = async () => {
    try {
      setLoading(true);
      const res = await getWeather("delhi"); // ✅ cleaner call
      setWeather(res.data);
    } catch (err) {
      setError("Failed to fetch weather data.");
    } finally {
      setLoading(false);
    }
  };

  const generateRecommendation = () => {
    if (!weather) return "Loading weather data...";

    const temp = weather.current.temperature;

    if (temp > 35) return "Increase water sprinkling on roads to reduce dust.";
    if (temp > 30) return "Encourage tree plantation and reduce vehicle usage.";
    return "Air quality conditions are stable.";
  };

  return (
    <div className="flex gap-4 flex-col lg:flex-row">
      <div className="flex-1 space-y-4">
        <h3 className="text-sm font-semibold text-foreground">
          Weather Based Recommendation
        </h3>

        {loading && <p>Loading weather data...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {weather && (
          <Card className="p-4">
            <div className="flex items-start gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Droplets className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-foreground">
                  {weather.location.name}, {weather.location.country}
                </h4>
                <p className="text-xs text-muted-foreground">
                  Temperature: {weather.current.temperature}°C
                </p>
                <p className="text-xs text-muted-foreground">
                  Feels Like: {weather.current.feelslike}°C
                </p>
                <p className="text-xs text-muted-foreground">
                  Condition: {weather.current.weatherDescriptions?.[0]}
                </p>
                <p className="text-xs mt-2 font-medium">
                  Recommendation: {generateRecommendation()}
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>

      <div className="w-full lg:w-[240px] shrink-0 space-y-4">
        <h3 className="text-sm font-semibold text-foreground">Action Controls</h3>
        <Card className="p-4">
          <div className="space-y-2">
            <Button className="w-full justify-center gap-2 text-xs h-9">
              <FileText className="w-3.5 h-3.5" />
              Export Report (PDF)
            </Button>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="text-xs h-9 gap-1">
                <MessageCircle className="w-3.5 h-3.5" />
                WhatsApp
              </Button>
              <Button variant="outline" className="text-xs h-9 gap-1">
                <Mail className="w-3.5 h-3.5" />
                Email
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}