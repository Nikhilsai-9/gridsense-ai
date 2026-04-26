# GridSense AI

**Smart Meter Intelligence & Revenue Recovery System for BESCOM**

GridSense AI is a polished React/Vite prototype for **AI for Bharat Hackathon** under **Theme 8: AI for Smart Meter Intelligence & Loss Detection by BESCOM**. It is designed as a decision-support platform for BESCOM officers and now includes stronger Karnataka-localized data grounding, a BESCOM-style tariff engine, a carbon impact view, and a browser-native scenario simulator.

## Problem Statement

Utilities already receive smart meter readings at scale, but raw telemetry alone does not tell officers where to act first. Power theft, tampering, feeder stress, and revenue leakage are hidden inside large volumes of data, while manual review is slow and often too late for practical recovery.

For Bengaluru and Karnataka distribution settings, the problem is also local:

- residential evening peaks create feeder stress
- semi-rural pump and irrigation demand can distort normal load patterns
- rooftop solar changes midday behavior
- field teams need ranked inspections, not just charts

## Proposed Solution

GridSense AI works as an intelligent decision-support layer on top of existing BESCOM-style infrastructure. The prototype demonstrates how synthetic meter data can be converted into:

- demand forecasting
- theft and anomaly detection
- zone-level risk scoring
- explainable AI officer summaries
- revenue impact estimation
- inspection prioritization
- tariff and carbon scenario planning

The app remains frontend-first and Vercel-safe. All live demo interactions are precomputed in the browser, so judges get instant feedback without waiting on long-running hosted AI calls.

## What Is New In This Version

- **Karnataka Data Layer:** Added `public/data/karnataka_village_sample.csv` with irrigation ramps, noon solar support, and evening domestic peaks.
- **BESCOM Tariff Engine:** Added slab-based monthly savings calculations in [tariffEngine.js](/C:/Users/saini/Documents/Codex/2026-04-24/you-are-a-senior-full-stack-2/src/lib/tariffEngine.js).
- **Carbon Impact Panel:** Added CO2 savings using an India grid emission factor model.
- **Scenario Simulator:** Added slider-based solar, battery, and shiftable-load controls with instant rupee recalculation.
- **AI Officer Summary:** Added a structured in-browser summary flow that mirrors a production Gemini-style prompt contract.
- **CI + Tests:** Added Vitest coverage for tariff logic and a GitHub Actions workflow.

## Key Features

- **Bengaluru Localization:** Zones are framed around Peenya, Whitefield, KR Puram, Yelahanka, and Electronic City style feeder patterns.
- **Karnataka CSV Profile:** The dashboard now references a localized feeder sample rather than generic dashboard-only mock values.
- **Demand Forecasting:** Predicts peak load windows and feeder stress using hourly demand patterns.
- **Theft and Anomaly Detection:** Flags sudden drops, irregular spikes, peer-group deviations, and bypass-style risk.
- **AI Officer Summary:** Uses a structured BESCOM/Gemini-ready prompt contract for explainable case summaries.
- **Revenue Impact Engine:** Estimates detected loss, recovery potential, and savings opportunity.
- **Scenario Lab:** Models monthly outcomes from solar capacity, battery size, and flexible load improvements.
- **Carbon Signal:** Converts energy savings into CO2 avoided and rough tree-equivalent impact.
- **Inspection Queue:** Lets officers approve, reject, or escalate cases.
- **Explainability and Audit:** Preserves the reason, formula, and event timeline behind a flag.
- **Human-in-the-Loop Workflow:** Final decisions remain with authorized officers.

## Google AI Usage

The current prototype uses **simulated AI logic** for reliable frontend-only judging. A production version can connect the prompt contract in [prompts.js](/C:/Users/saini/Documents/Codex/2026-04-24/you-are-a-senior-full-stack-2/src/lib/prompts.js) to **Gemini / Google AI Studio** for:

- officer-facing case summaries
- structured JSON explanations
- inspection recommendation notes
- audit-friendly reasoning outputs

This keeps the live demo fast while showing a clear Google AI integration path.

## Tech Stack

- React.js
- Vite
- Tailwind CSS
- Recharts
- Framer Motion
- Lucide React
- Vitest
- GitHub Actions
- Synthetic frontend data + localized CSV sample

## Demo Workflow

1. Open the GridSense AI dashboard.
2. Show the impact metrics and explain BESCOM's loss-detection challenge.
3. Show the demand forecast and the Karnataka feeder sample curve.
4. Click **Simulate Theft**.
5. Show the new alert, updated queue, and stronger Zone C risk state.
6. Open the AI officer summary and explain how the case is described in structured operational language.
7. Move to the **Scenario Simulator** and change solar, battery, or shiftable load.
8. Show how monthly bill savings and carbon impact update instantly.
9. End on the human-in-the-loop and deployment-readiness sections.

## How to Run Locally

```bash
npm install
npm run dev
```

Open the Vite URL, usually:

```txt
http://localhost:5173
```

Run tests:

```bash
npm run test
```

Create a production build:

```bash
npm run build
```

## Deployment Note

This project is ready to deploy on Vercel.

- Framework preset: `Vite`
- Build command: `npm run build`
- Output directory: `dist`

The main demo path is frontend-only and precomputed, so it avoids judge-facing timeout risk.

## Verification

- `npm run test` passes
- `npm run build` passes
- GitHub Actions workflow added at [.github/workflows/ci.yml](/C:/Users/saini/Documents/Codex/2026-04-24/you-are-a-senior-full-stack-2/.github/workflows/ci.yml)

## Synthetic Data Disclaimer

This prototype uses synthetic and masked demonstration data only. It does not include real customer records, raw PII, or official BESCOM operational telemetry.

GridSense AI is not an official BESCOM product. It is a hackathon prototype built to demonstrate explainable AI-assisted decision support for smart meter intelligence and revenue recovery.

## Repository

GitHub: [https://github.com/Nikhilsai-9/gridsense-ai](https://github.com/Nikhilsai-9/gridsense-ai)
