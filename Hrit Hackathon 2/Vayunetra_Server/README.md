# 🌍 Vayunetra — Smart Air Quality & Health Advisory System

## 🚀 Overview
Vayunetra is an intelligent system designed to monitor air quality in real-time and provide personalized health advisories based on environmental conditions. It helps both citizens and government authorities take timely action during poor air quality situations.

---

## 🎯 Problem Statement
Air pollution is a major issue, especially in urban areas. People often lack real-time insights and actionable recommendations based on air quality data.

---

## 💡 Solution
Vayunetra analyzes air quality data (AQI) and generates:
- Health recommendations for citizens
- Alerts for authorities
- Smart decision suggestions using AI-based logic

---

## ⚙️ Features
- 📊 Real-time AQI monitoring
- 🧠 AI-based health recommendations
- 🚨 Alert system for critical pollution levels
- 🏛️ Admin dashboard for authorities
- 📡 Supabase integration for backend

---

## 🧠 AI Logic (Core Idea)
The system analyzes AQI values and generates recommendations:

| AQI Range | Advice |
|----------|--------|
| 0–50     | Air is Good |
| 51–100   | Moderate |
| 101–200  | Wear Mask |
| 200+     | Stay Indoors |

---

## 🏗️ Tech Stack
- Frontend: React + Vite + Tailwind CSS
- Backend: Java Spring boot 
- Language: TypeScript / JavaScript

---

## 🔄 Workflow
1. Fetch AQI data
2. Analyze using logic/AI
3. Generate recommendation
4. Display on dashboard
5. Send alerts (future scope)

---

## 🌐 Future Scope
- Integration with government systems
- Automated email/SMS alerts
- Predictive air quality analysis using ML

---

## 📌 How to Run
```bash
npm install
npm run dev
