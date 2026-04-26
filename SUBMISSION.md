# GridSense AI - Smart Meter Intelligence & Revenue Recovery System for BESCOM

## Theme

Theme 8 - AI for Smart Meter Intelligence & Loss Detection by BESCOM

## Description

GridSense AI is an AI-powered smart meter intelligence and revenue recovery platform designed for BESCOM and localized for Bengaluru/Karnataka electricity distribution scenarios. It converts smart meter signals into practical officer workflows: demand forecasting, theft-risk identification, explainable alerts, inspection prioritization, and revenue impact estimation.

The latest prototype adds stronger local grounding through a Karnataka feeder sample CSV, BESCOM-style slab tariff calculations, carbon impact estimation, and a browser-native scenario simulator. These additions make the demo more regionally relevant and more useful as a decision-support tool rather than only a visual dashboard.

The platform works as a decision-support layer without modifying existing BESCOM systems. It uses synthetic and masked prototype data to demonstrate hourly demand forecasting, anomaly detection, zone-level risk scoring, estimated revenue loss, officer-facing AI summaries, and a human review workflow.

The live demo is intentionally reliable for judging. AI analysis is simulated in the frontend and streamed directly in the browser, so interactions remain instant on Vercel without dependence on slow serverless inference. A production version can connect the structured prompt contract to Gemini / Google AI Studio for secure officer-facing explanations.

Key features include:

- demand forecasting
- theft and anomaly detection
- Bengaluru zone-level risk map
- Karnataka feeder data context
- BESCOM-style tariff savings engine
- carbon impact estimation
- inspection priority queue
- explainable AI officer summaries
- human-in-the-loop review
- scenario simulator for solar, battery, and flexible load decisions

The prototype demonstrates a realistic flow: smart meter data is received, AI predicts peak demand, an anomaly is detected, the system explains the case, estimates revenue loss, recommends an inspection action, and allows officers to compare tariff and sustainability outcomes under different grid-improvement scenarios.

Live Demo: ADD_VERCEL_LINK_HERE

GitHub Repository: https://github.com/Nikhilsai-9/gridsense-ai
