import { AQIBubbleMap } from "@/components/AQIBubbleMap";
import { WardSummary } from "@/components/WardSummary";

const LiveAQIMap = () => {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-lg font-bold text-foreground">Live AQI Map</h1>
        <p className="text-sm text-muted-foreground">Real-time ward-level air quality visualization with interactive exploration</p>
      </div>
      <div className="flex gap-4 flex-col lg:flex-row">
        <AQIBubbleMap />
        <WardSummary />
      </div>
    </div>
  );
};

export default LiveAQIMap;
