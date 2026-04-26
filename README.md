# GridSense AI

**Smart Meter Intelligence & Revenue Recovery System for BESCOM**

GridSense AI is a polished React/Vite prototype for **AI for Bharat Hackathon** under **Theme 8: AI for Smart Meter Intelligence & Loss Detection by BESCOM**. It is localized for Bengaluru/BESCOM operations and demonstrates how smart meter readings can become theft alerts, demand forecasts, inspection priorities, and revenue recovery decisions.

## Problem Statement

Electricity distribution utilities receive large volumes of smart meter readings, but officers still need faster ways to identify abnormal usage, power theft, feeder stress, and revenue loss risk. Manual review is slow, false positives can be costly, and high-impact theft cases may remain hidden inside raw meter data.

For Bengaluru and Karnataka utilities, the problem is also local: dense residential evening peaks, industrial feeder patterns, and zone-specific loss risks require practical field prioritization instead of generic analytics.

## Proposed Solution

GridSense AI acts as an intelligent decision-support dashboard on top of existing smart meter systems. It uses synthetic Bengaluru-style meter data to demonstrate:

- Hourly electricity demand forecasting
- Theft and anomaly detection
- Bengaluru zone-level grid risk scoring
- Estimated revenue loss and recovery potential
- Inspection priority queue for officers
- Explainable AI evidence for each alert
- Audit-ready human review workflow

The prototype is intentionally frontend-first and precomputed for demo reliability. Judges get instant results on Vercel because no long-running serverless AI function is required during the live click path.

## Key Features

- **Bengaluru Localization:** Simulated zones are framed around Peenya, Whitefield, KR Puram, Yelahanka, and Electronic City feeder patterns.
- **Demand Forecasting:** Predicts peak load windows and feeder stress using hourly demand patterns.
- **AI Theft & Anomaly Alerts:** Flags sudden drops, irregular spikes, peer-group deviations, and possible bypass/tampering behavior.
- **Zone Intelligence:** Shows zone-level risk, load, anomalies, and recommended action.
- **Meter Investigation Panel:** Explains why a specific meter was flagged with usage charts and anomaly points.
- **Revenue Impact Engine:** Estimates detected loss, potential recovery, average loss per high-risk meter, and monthly projected savings.
- **Inspection Priority Queue:** Lets officers approve, reject, or escalate cases.
- **Explainability & Audit:** Shows the reason, formula, and timeline behind an AI decision.
- **Human-in-the-Loop Review:** Keeps final action with authorized BESCOM officers.
- **Vercel-Safe Demo:** Precomputed frontend AI outputs avoid 60-second serverless timeout risk.
- **Synthetic Data Only:** No personal, consumer, or official BESCOM data is used.

## Google AI Usage

The prototype uses simulated AI logic for safe, instant demonstration. In a production pilot, **Gemini / Google AI Studio** can generate officer-facing explanations from structured anomaly evidence, such as:

- Why a meter was flagged
- What peer-group deviation was detected
- Estimated revenue loss summary
- Recommended inspection priority
- Human-review note for audit trail

This keeps the live hackathon demo reliable while showing a clear Google AI integration path.

## Tech Stack

- React.js
- Vite
- Tailwind CSS
- Recharts
- Framer Motion
- Lucide React icons
- Gemini / Google AI Studio ready
- Synthetic/mock frontend data

## Demo Workflow

1. Open the GridSense AI dashboard.
2. Show the Bengaluru/BESCOM impact metrics and revenue loss problem.
3. Show the demand forecasting chart and peak load prediction.
4. Click **Simulate Theft**.
5. A new Zone C anomaly appears for meter `BES-7710`.
6. High-risk meter count, estimated loss, Zone C risk, and inspection queue update instantly.
7. Show why `BES-2048` was flagged using explainability cards and the audit timeline.
8. Approve an inspection from the priority queue.
9. Explain that the system is localized, human-in-the-loop, auditable, and deployable without modifying existing BESCOM systems.

## How to Run Locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, usually:

```txt
http://localhost:5173
```

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Deployment Note

This project is ready to deploy on Vercel.

Recommended Vercel settings:

- Framework preset: **Vite**
- Build command: `npm run build`
- Output directory: `dist`

The core demo is frontend-only and precomputed, so it does not depend on a slow backend request or Vercel serverless function during judging.

## Synthetic Data Disclaimer

This prototype uses synthetic/mock smart meter, demand, anomaly, revenue, and inspection data for hackathon demonstration only. It does not contain real consumer data, raw PII, or official BESCOM operational records.

GridSense AI is not an official BESCOM product. It is a hackathon prototype designed to demonstrate an explainable AI decision-support workflow for smart meter intelligence and revenue recovery.

## Repository

GitHub: [https://github.com/Nikhilsai-9/gridsense-ai](https://github.com/Nikhilsai-9/gridsense-ai)
