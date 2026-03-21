import { StatsCards } from "@/components/StatsCards";
import { AQIBubbleMap } from "@/components/AQIBubbleMap";
import { WardSummary } from "@/components/WardSummary";
import { ComparisonChart } from "@/components/ComparisonChart";
import { PollutionSourcesChart } from "@/components/PollutionSourcesChart";
import { HealthAdvisory } from "@/components/HealthAdvisory";
import { ForecastSection } from "@/components/ForecastSection";
import { AdminActions } from "@/components/AdminActions";

const Index = () => {
  return (
    <div className="space-y-5">
      <StatsCards />
      <div className="flex gap-4 flex-col lg:flex-row">
        <AQIBubbleMap />
        <WardSummary />
      </div>
      <div>
        <h2 className="text-base font-bold text-foreground mb-3">City & Ward Comparison</h2>
        <div className="flex gap-4 flex-col lg:flex-row">
          <ComparisonChart />
          <PollutionSourcesChart />
        </div>
      </div>
      <div>
        <h2 className="text-base font-bold text-foreground mb-3">Citizen Health Advisory</h2>
        <HealthAdvisory />
      </div>
      <div>
        <h2 className="text-base font-bold text-foreground mb-3">7-Day Pollution Forecast</h2>
        <ForecastSection />
      </div>
      <div>
        <h2 className="text-base font-bold text-foreground mb-3">Administrator Action Engine</h2>
        <AdminActions />
      </div>
    </div>
  );
};

export default Index;
