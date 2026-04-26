# GridSense AI — Smart Meter Intelligence & Revenue Recovery System for BESCOM

## Theme

Theme 8 — AI for Smart Meter Intelligence & Loss Detection by BESCOM

## Description

GridSense AI is an AI-powered smart meter intelligence and revenue recovery platform designed for BESCOM and localized for Bengaluru/Karnataka electricity distribution scenarios. The system uses smart meter consumption patterns to predict localized electricity demand, detect abnormal usage, identify possible theft/tampering cases, estimate revenue loss, and help officers prioritize field inspections.

The platform works as a decision-support layer without modifying existing BESCOM systems. It uses synthetic smart meter data for the prototype and demonstrates hourly demand forecasting, anomaly detection, zone-level risk scoring, explainable AI alerts, estimated revenue loss, and a human review workflow.

The live demo is designed to be reliable for judges: AI outputs are precomputed in the frontend so interactions such as Simulate Theft update instantly on Vercel without waiting for long-running serverless functions. Gemini / Google AI Studio is positioned for production use to generate officer-facing explanation summaries from structured anomaly evidence.

Key features include demand forecasting, theft and anomaly detection, revenue impact estimation, inspection priority queue, explainable AI alerts, Bengaluru zone-level risk map, Vercel-safe instant demo interactions, and human-in-the-loop review.

The prototype demonstrates a realistic flow: smart meter data is received, AI predicts peak demand, an anomaly is detected, the system explains the reason, estimates revenue loss, and recommends an inspection action. This helps BESCOM reduce power theft, improve grid planning, minimize false positives, and make faster data-driven decisions.

Live Demo: ADD_VERCEL_LINK_HERE

GitHub Repository: https://github.com/Nikhilsai-9/gridsense-ai
