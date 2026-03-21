import { wards, mlInsights } from "@/data/mock-data";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Brain } from "lucide-react";

const dotColor = {
  good: "bg-aqi-good",
  moderate: "bg-aqi-moderate",
  poor: "bg-aqi-poor",
  "very-poor": "bg-aqi-very-poor",
  severe: "bg-aqi-severe",
};

export function MLInsightsTable() {
  return (
    <Card className="p-5">
      <div className="flex items-center gap-2 mb-4">
        <Brain className="w-4 h-4 text-primary" />
        <h3 className="text-sm font-semibold text-foreground">ML Source Attribution</h3>
      </div>
      <div className="rounded-lg border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary/50">
              <TableHead className="text-xs font-semibold">Ward</TableHead>
              <TableHead className="text-xs font-semibold">AQI</TableHead>
              <TableHead className="text-xs font-semibold">Primary Source</TableHead>
              <TableHead className="text-xs font-semibold">Confidence</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {wards.map((ward) => {
              const insight = mlInsights[ward.id];
              return (
                <TableRow key={ward.id} className="hover:bg-secondary/30">
                  <TableCell className="text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${dotColor[ward.level]}`} />
                      {ward.name}
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm font-semibold">{ward.aqi}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{insight?.source ?? "—"}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={insight?.confidence ?? 0} className="h-1.5 w-20" />
                      <span className="text-xs font-mono text-muted-foreground">{insight?.confidence ?? 0}%</span>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
