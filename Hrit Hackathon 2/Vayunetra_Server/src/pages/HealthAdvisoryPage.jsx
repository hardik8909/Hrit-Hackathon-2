import { HealthAdvisory } from "@/components/HealthAdvisory";

const HealthAdvisoryPage = () => {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-lg font-bold text-foreground">Health Advisory</h1>
        <p className="text-sm text-muted-foreground">Personalized health guidance based on current air quality conditions</p>
      </div>
      <HealthAdvisory />
    </div>
  );
};

export default HealthAdvisoryPage;
