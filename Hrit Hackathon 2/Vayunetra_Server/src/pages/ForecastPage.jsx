import { ForecastSection } from "@/components/ForecastSection";

const ForecastPage = () => {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-lg font-bold text-foreground">Pollution Forecast</h1>
        <p className="text-sm text-muted-foreground">ML-powered 7-day AQI prediction with confidence intervals</p>
      </div>
      <ForecastSection />
    </div>
  );
};

export default ForecastPage;
