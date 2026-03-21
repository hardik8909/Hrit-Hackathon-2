import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Globe, Calendar } from "lucide-react";
import { wards } from "@/data/mock-data";
import { useState } from "react";
import { generateReport } from "../service/api";

const avgAqi = Math.round(wards.reduce((s, w) => s + w.aqi, 0) / wards.length);

const sections = [
  { label: "AQI Summary", checked: true },
  { label: "Ward Analysis", checked: true },
  { label: "Health Advisory", checked: true },
  { label: "Admin Actions", checked: true },
  { label: "Pollution Source Analysis", checked: true },
  { label: "Forecast Data", checked: true },
];

const ReportsPage = () => {
  const [checkedSections, setCheckedSections] = useState(
    sections.map((s) => s.checked)
  );
  const [loading, setLoading] = useState(false);

  const toggleSection = (i) => {
    setCheckedSections((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      return next;
    });
  };

  const handleGenerateReport = async () => {
    try {
      setLoading(true);
      const response = await generateReport({
        city: "Faridabad",
        dateRange: "Feb 21 - Feb 28, 2026",
        sections: sections.filter((_, i) => checkedSections[i]).map((s) => s.label),
        wards: wards.map((w) => w.id), // assuming each ward has an id
      });

      // Download PDF
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "AirQualityReport.pdf";
      link.click();
    } catch (err) {
      console.error(err);
      alert("Failed to generate report");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-lg font-bold text-foreground">Report Generation</h1>
        <p className="text-sm text-muted-foreground">
          Generate comprehensive PDF reports for stakeholders and regulatory compliance
        </p>
      </div>

      <div className="flex gap-4 flex-col lg:flex-row">
        {/* Report Preview */}
        <Card className="p-5 flex-1">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Report Preview</h3>
          </div>
          <div className="p-5 rounded-lg border border-border">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-base font-bold text-foreground">
                  VayuNetra Air Quality Report
                </h4>
                <p className="text-xs text-muted-foreground">
                  Faridabad Municipal Corporation
                </p>
              </div>
              <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-muted text-muted-foreground">
                Draft
              </span>
            </div>

            {/* Report Stats */}
            <div className="grid grid-cols-2 gap-4 mb-4 border-t border-border pt-4">
              <div>
                <p className="text-xs text-muted-foreground">Report Period</p>
                <p className="text-sm font-semibold text-foreground">
                  Feb 21 - Feb 28, 2026
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">City Average AQI</p>
                <p className="text-sm font-semibold text-foreground">{avgAqi}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4 border-t border-border pt-4">
              <div>
                <p className="text-xs text-muted-foreground">Wards Monitored</p>
                <p className="text-sm font-semibold text-foreground">{wards.length}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Actions Taken</p>
                <p className="text-sm font-semibold text-foreground">12</p>
              </div>
            </div>

            {/* Included Sections */}
            <div className="border-t border-border pt-4">
              <p className="text-xs text-muted-foreground mb-2">Included Sections</p>
              <div className="flex flex-wrap gap-1.5">
                {sections.filter((_, i) => checkedSections[i]).map((s) => (
                  <span
                    key={s.label}
                    className="text-[10px] bg-muted px-2 py-1 rounded font-medium text-muted-foreground"
                  >
                    {s.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="mt-4 p-3 rounded-lg bg-primary/5 border border-primary/20">
              <p className="text-xs text-muted-foreground">
                This report will contain {checkedSections.filter(Boolean).length} sections
                with data from {wards.length} wards including AQI trends, pollutant
                breakdowns, health advisories, and administrative actions taken during the
                reporting period.
              </p>
            </div>
          </div>
        </Card>

        {/* Report Configuration */}
        <Card className="p-5 w-full lg:w-[280px] shrink-0">
          <h3 className="text-sm font-semibold text-foreground mb-4">
            Report Configuration
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-muted-foreground mb-2">City</p>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border text-sm">
                <Globe className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="font-medium text-foreground">Faridabad</span>
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-2">Date Range</p>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border text-sm">
                <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="font-medium text-foreground">Last 7 Days</span>
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-3">Include Sections</p>
              <div className="space-y-2.5">
                {sections.map((s, i) => (
                  <label
                    key={s.label}
                    className="flex items-center gap-2.5 cursor-pointer"
                    onClick={() => toggleSection(i)}
                  >
                    <div
                      className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                        checkedSections[i] ? "bg-primary border-primary" : "border-border"
                      }`}
                    >
                      {checkedSections[i] && (
                        <svg
                          className="w-3 h-3 text-primary-foreground"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-xs text-foreground">{s.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <Button
            className="w-full mt-5 gap-1.5 text-xs"
            onClick={handleGenerateReport}
            disabled={loading}
          >
            <Download className="w-3.5 h-3.5" />
            {loading ? "Generating..." : "Generate PDF Report"}
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default ReportsPage;