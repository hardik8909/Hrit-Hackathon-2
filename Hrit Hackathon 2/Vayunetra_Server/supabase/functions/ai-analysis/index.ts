import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { type, wardData, forecastData } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    let systemPrompt = "";
    let userPrompt = "";

    switch (type) {
      case "source-identification": {
        systemPrompt = `You are VayuNetra's Explainable AI engine for pollution source identification in Faridabad, India.
You analyze ward-level AQI data and identify the most likely pollution sources with confidence scores and explanation factors.

RULES:
- Return valid JSON only, no markdown
- For each ward, identify the primary pollution source
- Provide a confidence score (0-100)
- List 2-3 explanation factors
- Consider: time of day patterns, wind speed, seasonal effects, proximity to roads/construction/industries
- Be specific to Faridabad context (NCR region, industrial city)

Return format:
{
  "analyses": [
    {
      "wardId": "w1",
      "wardName": "Sector 15",
      "primarySource": "Vehicular Traffic",
      "confidence": 72,
      "explanationFactors": ["High traffic corridor during peak hours", "Low wind dispersion today"],
      "severity": "good|moderate|poor|very-poor|severe",
      "recommendation": "Brief actionable recommendation"
    }
  ],
  "cityInsight": "One sentence overall city pollution insight"
}`;
        userPrompt = `Analyze the following ward-level AQI data for Faridabad and identify pollution sources with explainable reasoning:

${JSON.stringify(wardData, null, 2)}

Current conditions: Temperature 34°C, Humidity 45%, Wind Speed 8 km/h from NW, Visibility 3.2 km.
Time: Late morning. Season: Pre-monsoon summer.`;
        break;
      }

      case "forecast-insight": {
        systemPrompt = `You are VayuNetra's Predictive ML engine for pollution forecasting in Faridabad.
You analyze forecast data and provide detailed insights about upcoming pollution trends.

RULES:
- Return valid JSON only, no markdown
- Identify spike days and explain why they might occur
- Provide preventive action suggestions
- Consider weather patterns, seasonal trends, and local factors

Return format:
{
  "forecastAnalysis": {
    "trend": "improving|worsening|stable|volatile",
    "peakDay": "day name",
    "peakAQI": number,
    "spikeCause": "Explanation of why spike is expected",
    "preventiveActions": ["action1", "action2", "action3"],
    "dailyInsights": [
      { "day": "Mon", "insight": "Brief insight for this day", "riskLevel": "low|medium|high|critical" }
    ]
  },
  "weekSummary": "One paragraph summary of the week's pollution outlook"
}`;
        userPrompt = `Analyze this 7-day pollution forecast for Faridabad and provide detailed insights:

${JSON.stringify(forecastData, null, 2)}

Current weather: Temperature 34°C, Humidity 45%, Wind 8 km/h NW. Season: Pre-monsoon.`;
        break;
      }

      case "health-risk": {
        systemPrompt = `You are VayuNetra's Health Risk Assessment engine. You map AQI levels to specific health risks for different population groups in Faridabad.

RULES:
- Return valid JSON only, no markdown
- Provide specific, actionable health advice
- Tailor recommendations to Indian urban context
- Be deterministic and evidence-based

Return format:
{
  "overallRisk": "low|moderate|high|very-high|emergency",
  "shouldGoOutside": true|false,
  "outsideExplanation": "Why or why not",
  "groups": {
    "children": { "riskLevel": "low|moderate|high|critical", "advice": ["advice1", "advice2"], "precautions": ["precaution1"] },
    "elderly": { "riskLevel": "...", "advice": ["..."], "precautions": ["..."] },
    "asthma": { "riskLevel": "...", "advice": ["..."], "precautions": ["..."] },
    "general": { "riskLevel": "...", "advice": ["..."], "precautions": ["..."] },
    "outdoor_workers": { "riskLevel": "...", "advice": ["..."], "precautions": ["..."] }
  },
  "emergencyActions": ["action if AQI is severe"],
  "generalPrecautions": ["checklist item 1", "checklist item 2"]
}`;
        userPrompt = `Assess health risks based on the following ward-level AQI data for Faridabad:

${JSON.stringify(wardData, null, 2)}

Average City AQI: ${Math.round(wardData.reduce((s: number, w: any) => s + w.aqi, 0) / wardData.length)}
Worst Ward: ${wardData.sort((a: any, b: any) => b.aqi - a.aqi)[0]?.name} (AQI ${wardData.sort((a: any, b: any) => b.aqi - a.aqi)[0]?.aqi})
Temperature: 34°C, Humidity: 45%`;
        break;
      }

      case "policy-recommendation": {
        systemPrompt = `You are vayNetra's Policy Recommendation Engine (Decision Intelligence). You convert pollution patterns into actionable governance policy suggestions for Faridabad municipal authorities.

RULES:
- Return valid JSON only, no markdown
- Provide specific, implementable policy actions
- Include urgency levels and affected wards
- Consider Indian municipal governance context
- Actions should be practical for city administration

Return format:
{
  "recommendations": [
    {
      "id": "p1",
      "title": "Action title",
      "category": "traffic|construction|industrial|emergency|preventive",
      "urgency": "immediate|within-24hrs|within-48hrs|preventive",
      "affectedWards": ["ward names"],
      "description": "Detailed description of what to do",
      "expectedImpact": "Expected AQI reduction or benefit",
      "implementationSteps": ["step1", "step2"],
      "icon": "droplets|truck|building|trees|shield"
    }
  ],
  "overallStrategy": "One paragraph strategic recommendation",
  "complianceMetrics": { "totalActions": number, "immediateActions": number, "preventiveActions": number }
}`;
        userPrompt = `Generate policy recommendations based on the following ward AQI data and forecast for Faridabad:

Current Ward Data:
${JSON.stringify(wardData, null, 2)}

7-Day Forecast:
${JSON.stringify(forecastData, null, 2)}

Current conditions: Temp 34°C, Humidity 45%, Wind 8 km/h NW, Visibility 3.2 km.
Key concerns: ${wardData.filter((w: any) => w.aqi > 200).map((w: any) => `${w.name} (AQI ${w.aqi})`).join(", ")} are in critical zones.`;
        break;
      }

      default:
        return new Response(JSON.stringify({ error: "Invalid analysis type" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        stream: false,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again shortly." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits in Settings → Workspace → Usage." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI analysis failed" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const aiResult = await response.json();
    const content = aiResult.choices?.[0]?.message?.content || "";

    // Parse the JSON from AI response
    let parsed;
    try {
      // Try to extract JSON from potential markdown code blocks
      const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/);
      parsed = JSON.parse(jsonMatch ? jsonMatch[1].trim() : content.trim());
    } catch {
      console.error("Failed to parse AI response:", content);
      return new Response(JSON.stringify({ error: "Failed to parse AI analysis", raw: content }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true, data: parsed, type }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Analysis error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
