# GridSense AI

**Smart Meter Intelligence & Revenue Recovery System for BESCOM**

GridSense AI is a polished React/Vite hackathon prototype built for **AI for Bharat Hackathon** under **Theme 8: AI for Smart Meter Intelligence & Loss Detection by BESCOM**.

The platform demonstrates how BESCOM officers can use AI-assisted smart meter intelligence to forecast electricity demand, detect possible theft or tampering, estimate revenue loss, prioritize inspections, and review explainable alerts through a human-in-the-loop workflow.

## Problem Statement

Electricity distribution utilities receive large volumes of smart meter readings, but officers still need faster ways to identify abnormal usage, power theft, feeder stress, and revenue loss risk. Manual review is slow, false positives can be costly, and high-impact theft cases may remain hidden inside raw meter data.

BESCOM needs a decision-support layer that converts smart meter data into clear operational actions without replacing existing infrastructure.

## Proposed Solution

GridSense AI acts as an intelligent command dashboard on top of existing smart meter systems. It uses synthetic smart meter data to demonstrate:

- Hourly electricity demand forecasting
- Theft and anomaly detection
- Zone-level grid risk scoring
- Estimated revenue loss and recovery potential
- Inspection priority queue for officers
- Explainable AI evidence for each alert
- Audit-ready human review workflow

The prototype is designed to feel like a realistic government + startup SaaS platform for field operations and revenue recovery.

## Key Features

- **Demand Forecasting:** Predicts peak load windows and feeder stress using hourly demand patterns.
- **AI Theft & Anomaly Alerts:** Flags sudden drops, irregular spikes, peer-group deviations, and possible bypass/tampering behavior.
- **Zone Intelligence:** Shows zone-level risk, load, anomalies, and recommended action.
- **Meter Investigation Panel:** Explains why a specific meter was flagged with usage charts and anomaly points.
- **Revenue Impact Engine:** Estimates detected loss, potential recovery, average loss per high-risk meter, and monthly projected savings.
- **Inspection Priority Queue:** Lets officers approve, reject, or escalate cases.
- **Explainability & Audit:** Shows the reason, formula, and timeline behind an AI decision.
- **Human-in-the-Loop Review:** Keeps final action with authorized BESCOM officers.
- **Pitch Mode:** Includes a short judge-friendly explanation inside the website.
- **Synthetic Data Only:** No personal, consumer, or official BESCOM data is used.

## Tech Stack

- React.js
- Vite
- Tailwind CSS
- Recharts
- Framer Motion
- Lucide React icons
- Synthetic/mock frontend data

## Demo Workflow

1. Open the GridSense AI dashboard.
2. Show the impact metrics and explain the BESCOM revenue loss problem.
3. Show the demand forecasting chart and peak load prediction.
4. Click **Simulate Theft**.
5. A new Zone C anomaly appears for meter `BES-7710`.
6. High-risk meter count, estimated loss, Zone C risk, and inspection queue update.
7. Show why `BES-2048` was flagged using explainability cards and the audit timeline.
8. Approve an inspection from the priority queue.
9. Explain that the system is human-in-the-loop, auditable, and deployable without modifying existing BESCOM systems.

## How to Run Locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
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

## Synthetic Data Disclaimer

This prototype uses synthetic/mock smart meter, demand, anomaly, revenue, and inspection data for hackathon demonstration only. It does not contain real consumer data, raw PII, or official BESCOM operational records.

GridSense AI is not an official BESCOM product. It is a hackathon prototype designed to demonstrate an explainable AI decision-support workflow for smart meter intelligence and revenue recovery.

## Repository

GitHub: [https://github.com/Nikhilsai-9/gridsense-ai](https://github.com/Nikhilsai-9/gridsense-ai)
