export function getAQILevel(aqi) {
  if (aqi <= 50) return "good"
  if (aqi <= 100) return "moderate"
  if (aqi <= 200) return "poor"
  if (aqi <= 300) return "very-poor"
  return "severe"
}

export function getAQILabel(level) {
  const map = {
    good: "Good",
    moderate: "Moderate",
    poor: "Poor",
    "very-poor": "Very Poor",
    severe: "Severe",
  }
  return map[level]
}

export function getAQIColor(level) {
  const map = {
    good: "bg-aqi-good text-white",
    moderate: "bg-aqi-moderate text-foreground",
    poor: "bg-aqi-poor text-white",
    "very-poor": "bg-aqi-very-poor text-white",
    severe: "bg-aqi-severe text-white",
  }
  return map[level]
}

export function getAQIColorHex(level) {
  const map = {
    good: "#4ade80",
    moderate: "#facc15",
    poor: "#fb923c",
    "very-poor": "#ef4444",
    severe: "#7f1d1d",
  }
  return map[level]
}

export const wards = [
  { id: "w1", name: "Sector 15", code: "FBD-W01", aqi: 42, level: "good", pm25: 18, pm10: 35, no2: 22, so2: 8, o3: 30, lat: 28.39, lng: 77.32 },
  { id: "w2", name: "NIT Faridabad", code: "FBD-W02", aqi: 85, level: "moderate", pm25: 45, pm10: 78, no2: 35, so2: 12, o3: 40, lat: 28.38, lng: 77.31 },
  { id: "w3", name: "Ballabgarh", code: "FBD-W03", aqi: 165, level: "poor", pm25: 95, pm10: 145, no2: 55, so2: 28, o3: 65, lat: 28.34, lng: 77.32 },
  { id: "w4", name: "Sector 37", code: "FBD-W04", aqi: 220, level: "very-poor", pm25: 135, pm10: 198, no2: 72, so2: 38, o3: 85, lat: 28.41, lng: 77.30 },
  { id: "w5", name: "Old Faridabad", code: "FBD-W05", aqi: 310, level: "severe", pm25: 195, pm10: 280, no2: 95, so2: 55, o3: 110, lat: 28.37, lng: 77.30 },
  { id: "w6", name: "Sector 21", code: "FBD-W06", aqi: 72, level: "moderate", pm25: 38, pm10: 62, no2: 28, so2: 10, o3: 35, lat: 28.40, lng: 77.33 },
  { id: "w7", name: "Tigaon", code: "FBD-W07", aqi: 148, level: "poor", pm25: 82, pm10: 125, no2: 48, so2: 22, o3: 58, lat: 28.35, lng: 77.34 },
  { id: "w8", name: "Badhkal", code: "FBD-W08", aqi: 55, level: "moderate", pm25: 28, pm10: 48, no2: 20, so2: 9, o3: 32, lat: 28.42, lng: 77.31 },
]

export const hourlyTrend = Array.from({ length: 24 }, (_, i) => ({
  hour: `${String(i).padStart(2, "0")}:00`,
  aqi: Math.floor(80 + Math.sin(i / 3) * 40 + Math.random() * 20),
}))

export const forecastData = [
  { day: "Mon", aqi: 135, low: 110, high: 160, isSpike: false },
  { day: "Tue", aqi: 142, low: 120, high: 165, isSpike: false },
  { day: "Wed", aqi: 128, low: 105, high: 150, isSpike: false },
  { day: "Thu", aqi: 245, low: 210, high: 280, isSpike: true },
  { day: "Fri", aqi: 198, low: 170, high: 225, isSpike: false },
  { day: "Sat", aqi: 165, low: 140, high: 190, isSpike: false },
  { day: "Sun", aqi: 148, low: 125, high: 170, isSpike: false },
]

export const pollutionSources = [
  { name: "Traffic", value: 32, fill: "#3b82f6" },
  { name: "Construction", value: 25, fill: "#f97316" },
  { name: "Industry", value: 20, fill: "#ef4444" },
  { name: "Biomass", value: 13, fill: "#a855f7" },
  { name: "Weather", value: 10, fill: "#06b6d4" },
]

export const recommendations = [
  {
    id: "r1",
    icon: "droplets",
    title: "Deploy water sprinklers on NH-48",
    wards: ["Old Faridabad", "Sector 37"],
    severity: "severe",
    reason: "PM10 levels exceeding 250 due to road dust resuspension",
  },
  {
    id: "r2",
    icon: "truck",
    title: "Restrict heavy vehicles tomorrow",
    wards: ["Ballabgarh", "Tigaon"],
    severity: "very-poor",
    reason: "NOx levels rising from diesel exhaust in industrial corridor",
  },
  {
    id: "r3",
    icon: "building",
    title: "Suspend construction activities",
    wards: ["Sector 37", "Old Faridabad"],
    severity: "severe",
    reason: "Construction dust contributing 40% to local PM2.5",
  },
  {
    id: "r4",
    icon: "trees",
    title: "Activate green corridor protocol",
    wards: ["NIT Faridabad", "Sector 21"],
    severity: "moderate",
    reason: "Preventive measure against forecasted pollution spike",
  },
]

export const mlInsights = {
  w1: { source: "Vehicular Traffic", confidence: 65 },
  w2: { source: "Road Dust", confidence: 71 },
  w3: { source: "Construction Dust", confidence: 72 },
  w4: { source: "Industrial Emissions", confidence: 78 },
  w5: { source: "Biomass Burning + Inversion", confidence: 85 },
  w6: { source: "Vehicular Traffic", confidence: 68 },
  w7: { source: "Agricultural Residue", confidence: 74 },
  w8: { source: "Road Dust", confidence: 62 },
}
