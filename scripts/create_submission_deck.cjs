const fs = require("fs");
const path = require("path");
const pptxgen = require("pptxgenjs");
const { PDFDocument, StandardFonts, rgb } = require("pdf-lib");
const { Canvas } = require("skia-canvas");

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, "submission-deck");
const PREVIEW_DIR = path.join(OUT_DIR, "previews");
fs.mkdirSync(PREVIEW_DIR, { recursive: true });

const pptxPath = path.join(OUT_DIR, "GridSense_AI_Prototype_Submission.pptx");
const pdfPath = path.join(OUT_DIR, "GridSense_AI_Prototype_Submission.pdf");

const C = {
  navy: "071A3D",
  navy2: "0B2A5B",
  blue: "2563EB",
  sky: "38BDF8",
  orange: "F97316",
  amber: "F59E0B",
  green: "059669",
  red: "DC2626",
  slate: "475569",
  slate2: "64748B",
  light: "F8FAFC",
  line: "E2E8F0",
  white: "FFFFFF",
  black: "0F172A",
};

let SHAPE;

const slides = [
  {
    title: "GridSense AI",
    subtitle: "Bengaluru-Localized Smart Meter Intelligence & Revenue Recovery System for BESCOM",
    kicker: "Solution Challenge 2026 - Build with AI",
    type: "cover",
    bullets: [
      "Team: CEREBRIX LABS",
      "Team Lead: Nikhil Sai",
      "Theme 8: AI for Smart Meter Intelligence & Loss Detection by BESCOM",
    ],
  },
  {
    title: "Problem Statement",
    subtitle: "Bengaluru utilities need fast, explainable loss detection from smart meter data.",
    type: "problem",
    bullets: [
      "Power theft and tampering create revenue leakage across dense Bengaluru feeder zones.",
      "Evening peak demand in residential and industrial areas is hard to anticipate from raw readings alone.",
      "Manual anomaly review is slow and can create false positives.",
      "BESCOM officers need inspection priorities, not another raw-data dashboard.",
    ],
    metrics: [
      ["12,480", "smart meters simulated"],
      ["18", "high-risk meters"],
      ["INR 2.4L", "estimated loss detected"],
    ],
  },
  {
    title: "Brief About the Solution",
    subtitle: "GridSense AI converts Bengaluru smart meter patterns into demand, theft, and revenue decisions.",
    type: "pillars",
    pillars: [
      ["Forecast Demand", "Predict hourly load and evening peak-risk windows for BESCOM zones."],
      ["Detect Theft", "Flag abnormal drops, spikes, peer deviations, and tampering signals."],
      ["Recover Revenue", "Rank inspection cases by confidence, loss impact, urgency, and tariff savings."],
    ],
  },
  {
    title: "Opportunities and USP",
    subtitle: "Different from a normal dashboard: it explains and prioritizes action.",
    type: "comparison",
    left: [
      "Shows historical readings",
      "Requires manual anomaly search",
      "Limited explainability",
      "No revenue-priority workflow",
    ],
    right: [
      "Predicts demand and grid stress",
      "Detects theft-risk patterns automatically",
      "Explains why a case was flagged",
      "Creates BESCOM officer inspection priorities",
    ],
  },
  {
    title: "Features Offered",
    subtitle: "Submission-ready capabilities demonstrated in the prototype.",
    type: "features",
    features: [
      ["Demand Forecasting", "Actual vs predicted load with peak warning zone."],
      ["Theft Alerts", "Critical, high, and medium risk meter anomalies."],
      ["Karnataka Data Layer", "CSV-backed feeder profile with irrigation, solar, and evening domestic load patterns."],
      ["Bengaluru Zone Map", "Peenya, Whitefield, KR Puram, Yelahanka, and Electronic City style zones."],
      ["Tariff + Carbon Engine", "Monthly savings and CO2 impact from BESCOM-style optimization scenarios."],
      ["Inspection Queue", "Approve, reject, or escalate Bengaluru-area cases."],
      ["Explainability", "Reason, formula, audit timeline, and officer summary prompt contract."],
    ],
  },
  {
    title: "Process Flow Diagram",
    subtitle: "Smart meter data to BESCOM officer action in one auditable workflow.",
    type: "flow",
    flow: [
      "Smart meter data received",
      "AI predicts Bengaluru demand",
      "Anomaly detected",
      "Explanation generated",
      "Officer approves inspection",
      "Revenue recovery tracked",
    ],
  },
  {
    title: "Architecture Diagram",
    subtitle: "Frontend-first, Vercel-safe decision-support layer on top of existing BESCOM systems.",
    type: "architecture",
    layers: [
      ["Data Layer", "Synthetic meter readings, Karnataka CSV load sample, zone load, peer groups"],
      ["AI Layer", "Precomputed forecasting, anomaly scoring, Gemini-ready explanation summaries"],
      ["App Layer", "React dashboard, tariff engine, scenario simulator, officer workflow"],
      ["Cloud Layer", "Vercel static prototype now; Firebase/GCP-ready storage for pilot"],
    ],
  },
  {
    title: "Technologies Used",
    subtitle: "Modern frontend prototype with Google AI-ready architecture.",
    type: "tech",
    tech: [
      "React",
      "Vite",
      "Tailwind CSS",
      "Recharts",
      "Framer Motion",
      "Lucide Icons",
      "Vitest + GitHub Actions",
      "Gemini API / Google AI Studio ready",
      "Firebase / Google Cloud ready",
      "Synthetic Bengaluru smart meter data + Karnataka CSV sample",
    ],
    note: "Google AI model/service: Gemini is proposed for explainable alert summaries and officer-facing inspection recommendations. The live prototype keeps AI outputs precomputed in the frontend so Vercel judging clicks respond instantly without serverless timeout risk.",
  },
  {
    title: "Snapshots of the MVP",
    subtitle: "Core screens implemented in the live prototype.",
    type: "mvp",
    screens: [
      ["Command Dashboard", "Bengaluru impact metrics, simulate theft, live risk state"],
      ["Demand + Karnataka Data", "Actual vs predicted load plus localized feeder profile"],
      ["AI Alerts + Summary", "Meter risk, confidence, estimated loss, localized reason"],
      ["Scenario Lab", "Tariff savings, carbon impact, and officer actions"],
    ],
  },
  {
    title: "Implementation Cost and Future Development",
    subtitle: "Feasible as a staged pilot and scalable across zones.",
    type: "future",
    cost: [
      ["Prototype", "INR 0 cloud spend - static Vercel frontend with precomputed synthetic data"],
      ["Pilot", "Masked BESCOM connector, Gemini API, Firebase/GCP storage, officer login"],
      ["Scale", "Bengaluru circle rollouts, GIS map integration, model feedback loops"],
    ],
    future: [
      "Gemini assistant for officer case summaries",
      "Firebase ingestion pipeline for masked meter events",
      "Google Maps / BESCOM zone visualization",
      "Live BESCOM tariff and subsidy configuration management",
      "Model feedback loop from inspection outcomes",
      "Role-based audit dashboard for senior officers",
    ],
  },
  {
    title: "Submission Links and Demo Details",
    subtitle: "Ready for prototype submission. Replace placeholders after deployment/video upload.",
    type: "links",
    links: [
      ["GitHub Repository", "https://github.com/Nikhilsai-9/gridsense-ai"],
      ["Live Prototype", "ADD_VERCEL_LINK_HERE"],
      ["Demo Video", "ADD_DEMO_VIDEO_LINK_HERE"],
      ["Portfolio", "https://nikhilsai-9.github.io/nikhilsai-portfolio/"],
      ["Email", "sainikhil1146@gmail.com"],
    ],
    disclaimer: "Prototype uses synthetic Bengaluru-style data only. Not an official BESCOM product. Built for hackathon demonstration and decision-support research.",
  },
];

function addBg(slide, dark = false) {
  slide.background = { color: dark ? C.navy : C.light };
  if (dark) {
    slide.addShape(SHAPE.rect, { x: 0, y: 0, w: 13.333, h: 7.5, fill: { color: C.navy }, line: { color: C.navy } });
    slide.addShape(SHAPE.rect, { x: 8.7, y: -0.4, w: 5, h: 8.2, fill: { color: C.navy2, transparency: 5 }, line: { color: C.navy2, transparency: 100 }, rotate: 8 });
  } else {
    slide.addShape(SHAPE.rect, { x: 0, y: 0, w: 13.333, h: 7.5, fill: { color: C.light }, line: { color: C.light } });
    slide.addShape(SHAPE.rect, { x: 0, y: 0, w: 13.333, h: 0.12, fill: { color: C.orange }, line: { color: C.orange } });
  }
}

function addHeader(slide, n, title, subtitle) {
  slide.addText("GRID SENSE AI | SOLUTION CHALLENGE 2026", {
    x: 0.6, y: 0.32, w: 5.6, h: 0.2, fontSize: 8, bold: true, color: C.blue, charSpace: 1.5,
  });
  slide.addText(String(n).padStart(2, "0"), {
    x: 12.1, y: 0.28, w: 0.62, h: 0.32, fontSize: 12, bold: true, align: "center", color: C.white,
    fill: { color: C.navy }, margin: 0.02, breakLine: false,
  });
  slide.addText(title, {
    x: 0.6, y: 0.72, w: 8.8, h: 0.45, fontSize: 25, bold: true, color: C.black, margin: 0,
  });
  slide.addText(subtitle, {
    x: 0.62, y: 1.2, w: 10.9, h: 0.34, fontSize: 12.5, color: C.slate, margin: 0,
  });
}

function addFooter(slide) {
  slide.addText("Synthetic data only | Decision-support prototype | Not an official BESCOM product", {
    x: 0.6, y: 7.12, w: 8.2, h: 0.18, fontSize: 7.8, color: C.slate2, margin: 0,
  });
  slide.addText("github.com/Nikhilsai-9/gridsense-ai", {
    x: 10.05, y: 7.12, w: 2.7, h: 0.18, fontSize: 7.8, color: C.blue, align: "right", margin: 0,
  });
}

function card(slide, x, y, w, h, title, body, color = C.blue) {
    slide.addShape(SHAPE.roundRect, {
    x, y, w, h,
    rectRadius: 0.08,
    fill: { color: C.white },
    line: { color: "D9E2F2" },
    shadow: { type: "outer", color: "DDE6F4", opacity: 0.35, blur: 1, angle: 45, distance: 1 },
  });
  slide.addShape(SHAPE.rect, { x, y, w: 0.12, h, fill: { color }, line: { color } });
  slide.addText(title, { x: x + 0.28, y: y + 0.22, w: w - 0.44, h: 0.24, fontSize: 12, bold: true, color: C.black, margin: 0 });
  slide.addText(body, { x: x + 0.28, y: y + 0.58, w: w - 0.44, h: h - 0.72, fontSize: 9.5, color: C.slate, fit: "shrink", breakLine: false, margin: 0 });
}

function bulletList(slide, bullets, x, y, w, color = C.slate) {
  bullets.forEach((b, i) => {
    slide.addShape(SHAPE.ellipse, { x, y: y + i * 0.53 + 0.08, w: 0.12, h: 0.12, fill: { color: C.orange }, line: { color: C.orange } });
    slide.addText(b, { x: x + 0.24, y: y + i * 0.53, w, h: 0.36, fontSize: 12, color, margin: 0, fit: "shrink" });
  });
}

function addCover(slide, spec) {
  addBg(slide, true);
  slide.addShape(SHAPE.ellipse, { x: 9.3, y: 0.85, w: 2.4, h: 2.4, fill: { color: C.orange, transparency: 10 }, line: { color: C.orange, transparency: 100 } });
  slide.addText("⚡", { x: 9.86, y: 1.28, w: 1.2, h: 1.0, fontSize: 46, align: "center", color: C.white, margin: 0 });
  slide.addText(spec.kicker.toUpperCase(), { x: 0.75, y: 0.72, w: 5.8, h: 0.3, fontSize: 9, bold: true, color: C.sky, charSpace: 1.7, margin: 0 });
  slide.addText(spec.title, { x: 0.72, y: 1.48, w: 7.4, h: 0.75, fontSize: 42, bold: true, color: C.white, margin: 0 });
  slide.addShape(SHAPE.rect, { x: 0.76, y: 2.43, w: 1.25, h: 0.08, fill: { color: C.orange }, line: { color: C.orange } });
  slide.addText(spec.subtitle, { x: 0.75, y: 2.75, w: 7.5, h: 0.88, fontSize: 19, bold: true, color: "DDEBFF", fit: "shrink", margin: 0 });
  bulletList(slide, spec.bullets, 0.82, 4.25, 7.1, "E2E8F0");
  slide.addShape(SHAPE.roundRect, { x: 8.3, y: 4.62, w: 4.05, h: 1.42, rectRadius: 0.12, fill: { color: "FFFFFF", transparency: 8 }, line: { color: "FFFFFF", transparency: 85 } });
  slide.addText("Prototype promise", { x: 8.62, y: 4.9, w: 2.5, h: 0.22, fontSize: 10, bold: true, color: C.orange, margin: 0 });
  slide.addText("Detect loss. Predict demand. Prioritize inspections.", { x: 8.62, y: 5.24, w: 3.25, h: 0.42, fontSize: 13, bold: true, color: C.white, fit: "shrink", margin: 0 });
}

function createDeck() {
  const pptx = new pptxgen();
  SHAPE = pptx.ShapeType;
  pptx.author = "CEREBRIX LABS";
  pptx.subject = "GridSense AI prototype submission";
  pptx.title = "GridSense AI - Prototype Submission";
  pptx.company = "CEREBRIX LABS";
  pptx.lang = "en-US";
  pptx.layout = "LAYOUT_WIDE";
  pptx.theme = {
    headFontFace: "Aptos Display",
    bodyFontFace: "Aptos",
    lang: "en-US",
  };

  slides.forEach((spec, idx) => {
    const slide = pptx.addSlide();
    if (spec.type === "cover") {
      addCover(slide, spec);
      return;
    }
    addBg(slide);
    addHeader(slide, idx + 1, spec.title, spec.subtitle);
    addFooter(slide);

    if (spec.type === "problem") {
      bulletList(slide, spec.bullets, 0.78, 2.05, 6.2);
      spec.metrics.forEach((m, i) => card(slide, 7.45, 1.92 + i * 1.32, 4.4, 0.95, m[0], m[1], [C.blue, C.red, C.orange][i]));
    }

    if (spec.type === "pillars") {
      spec.pillars.forEach((p, i) => card(slide, 0.78 + i * 4.12, 2.1, 3.55, 2.35, p[0], p[1], [C.blue, C.red, C.green][i]));
      slide.addText("Decision-support layer: works with existing systems, avoids direct punishment, and keeps officer approval in the loop.", { x: 0.9, y: 5.25, w: 10.9, h: 0.55, fontSize: 16, bold: true, color: C.navy, align: "center", fit: "shrink", margin: 0 });
    }

    if (spec.type === "comparison") {
      slide.addText("Typical meter dashboard", { x: 0.9, y: 1.95, w: 4.8, h: 0.28, fontSize: 15, bold: true, color: C.slate, align: "center", margin: 0 });
      slide.addText("GridSense AI", { x: 7.1, y: 1.95, w: 4.8, h: 0.28, fontSize: 15, bold: true, color: C.blue, align: "center", margin: 0 });
      spec.left.forEach((t, i) => card(slide, 0.9, 2.42 + i * 0.82, 4.8, 0.55, "", t, C.slate2));
      spec.right.forEach((t, i) => card(slide, 7.1, 2.42 + i * 0.82, 4.8, 0.55, "", t, i === 1 ? C.red : C.blue));
      slide.addShape(SHAPE.chevron, { x: 6.08, y: 3.35, w: 0.8, h: 1.0, fill: { color: C.orange }, line: { color: C.orange } });
    }

    if (spec.type === "features") {
      spec.features.forEach((f, i) => {
        const col = i % 3;
        const row = Math.floor(i / 3);
        card(slide, 0.72 + col * 4.16, 1.95 + row * 1.72, 3.65, 1.22, f[0], f[1], [C.blue, C.red, C.green, C.orange, C.navy2, C.sky][i]);
      });
    }

    if (spec.type === "flow") {
      spec.flow.forEach((f, i) => {
        const x = 0.72 + (i % 3) * 4.15;
        const y = 2.05 + Math.floor(i / 3) * 1.85;
        card(slide, x, y, 3.55, 1.15, `Step ${i + 1}`, f, i === 2 ? C.red : i === 5 ? C.green : C.blue);
        if (i < spec.flow.length - 1 && i % 3 !== 2) {
          slide.addShape(SHAPE.chevron, { x: x + 3.65, y: y + 0.35, w: 0.35, h: 0.35, fill: { color: C.orange }, line: { color: C.orange } });
        }
      });
    }

    if (spec.type === "architecture") {
      spec.layers.forEach((layer, i) => {
        card(slide, 0.9 + i * 3.0, 2.1, 2.52, 2.1, layer[0], layer[1], [C.slate2, C.orange, C.blue, C.green][i]);
        if (i < spec.layers.length - 1) {
          slide.addShape(SHAPE.chevron, { x: 3.43 + i * 3.0, y: 2.9, w: 0.35, h: 0.35, fill: { color: C.orange }, line: { color: C.orange } });
        }
      });
      slide.addText("Existing BESCOM systems remain unchanged. GridSense AI sits above them as an explainable decision-support layer.", { x: 1.15, y: 5.2, w: 10.5, h: 0.46, fontSize: 15, bold: true, color: C.navy, align: "center", fit: "shrink", margin: 0 });
    }

    if (spec.type === "tech") {
      spec.tech.forEach((t, i) => {
        const x = 0.85 + (i % 3) * 3.95;
        const y = 1.95 + Math.floor(i / 3) * 0.72;
        slide.addShape(SHAPE.roundRect, { x, y, w: 3.25, h: 0.42, rectRadius: 0.08, fill: { color: i >= 6 ? "FFF7ED" : C.white }, line: { color: i >= 6 ? "FED7AA" : "CBD5E1" } });
        slide.addText(t, { x: x + 0.16, y: y + 0.1, w: 2.9, h: 0.16, fontSize: 10, bold: true, color: i >= 6 ? C.orange : C.black, align: "center", margin: 0 });
      });
      slide.addShape(SHAPE.roundRect, { x: 0.9, y: 5.05, w: 11.2, h: 0.75, rectRadius: 0.08, fill: { color: "EFF6FF" }, line: { color: "BFDBFE" } });
      slide.addText(spec.note, { x: 1.15, y: 5.22, w: 10.65, h: 0.36, fontSize: 10.5, bold: true, color: C.navy, fit: "shrink", margin: 0 });
    }

    if (spec.type === "mvp") {
      spec.screens.forEach((s, i) => {
        const x = 0.82 + (i % 2) * 6.05;
        const y = 1.92 + Math.floor(i / 2) * 2.05;
        slide.addShape(SHAPE.roundRect, { x, y, w: 5.35, h: 1.55, rectRadius: 0.08, fill: { color: C.white }, line: { color: "CBD5E1" } });
        slide.addShape(SHAPE.rect, { x, y, w: 5.35, h: 0.34, fill: { color: i === 2 ? C.red : i === 3 ? C.green : C.blue }, line: { color: i === 2 ? C.red : i === 3 ? C.green : C.blue } });
        slide.addText(s[0], { x: x + 0.22, y: y + 0.48, w: 2.8, h: 0.22, fontSize: 12, bold: true, color: C.black, margin: 0 });
        slide.addText(s[1], { x: x + 0.22, y: y + 0.82, w: 4.8, h: 0.34, fontSize: 9.5, color: C.slate, fit: "shrink", margin: 0 });
        slide.addShape(SHAPE.rect, { x: x + 3.75, y: y + 0.58, w: 1.1, h: 0.12, fill: { color: "CBD5E1" }, line: { color: "CBD5E1" } });
        slide.addShape(SHAPE.rect, { x: x + 3.75, y: y + 0.85, w: 0.72 + i * 0.16, h: 0.12, fill: { color: C.orange }, line: { color: C.orange } });
      });
    }

    if (spec.type === "future") {
      spec.cost.forEach((c, i) => card(slide, 0.82 + i * 4.08, 1.95, 3.55, 1.15, c[0], c[1], [C.green, C.orange, C.blue][i]));
      slide.addText("Future Development", { x: 0.9, y: 4.02, w: 3.8, h: 0.26, fontSize: 15, bold: true, color: C.black, margin: 0 });
      bulletList(slide, spec.future, 0.92, 4.55, 10.8);
    }

    if (spec.type === "links") {
      spec.links.forEach((l, i) => card(slide, 0.9, 1.82 + i * 0.72, 8.3, 0.48, l[0], l[1], i === 1 ? C.orange : C.blue));
      slide.addShape(SHAPE.roundRect, { x: 9.65, y: 1.85, w: 2.7, h: 2.4, rectRadius: 0.1, fill: { color: C.navy }, line: { color: C.navy } });
      slide.addText("AI for Bharat Hackathon 2026", { x: 9.92, y: 2.25, w: 2.15, h: 0.28, fontSize: 12, bold: true, color: C.white, align: "center", margin: 0 });
      slide.addText("Theme 8: Smart Meter Intelligence & Loss Detection by BESCOM", { x: 9.92, y: 2.78, w: 2.15, h: 0.55, fontSize: 9.5, color: "DDEBFF", align: "center", fit: "shrink", margin: 0 });
      slide.addText(spec.disclaimer, { x: 1.0, y: 5.82, w: 10.9, h: 0.32, fontSize: 10.5, bold: true, color: C.red, align: "center", fit: "shrink", margin: 0 });
    }
  });
  return pptx;
}

function hexToRgb(hex) {
  const n = parseInt(hex, 16);
  return { r: ((n >> 16) & 255) / 255, g: ((n >> 8) & 255) / 255, b: (n & 255) / 255 };
}

function summaryItems(spec) {
  if (spec.bullets) return spec.bullets;
  if (spec.metrics) return spec.metrics.map((m) => `${m[0]} - ${m[1]}`);
  if (spec.pillars) return spec.pillars.map((p) => `${p[0]}: ${p[1]}`);
  if (spec.left && spec.right) {
    return [
      "Typical dashboard: " + spec.left.join("; "),
      "GridSense AI: " + spec.right.join("; "),
    ];
  }
  if (spec.features) return spec.features.map((f) => `${f[0]}: ${f[1]}`);
  if (spec.flow) return spec.flow.map((f, i) => `Step ${i + 1}: ${f}`);
  if (spec.layers) return spec.layers.map((l) => `${l[0]}: ${l[1]}`);
  if (spec.tech) return [...spec.tech, spec.note];
  if (spec.screens) return spec.screens.map((s) => `${s[0]}: ${s[1]}`);
  if (spec.cost) return [...spec.cost.map((c) => `${c[0]}: ${c[1]}`), ...spec.future.map((f) => `Future: ${f}`)];
  if (spec.links) return [...spec.links.map((l) => `${l[0]}: ${l[1]}`), spec.disclaimer];
  return [];
}

function splitTitleBody(value) {
  const text = String(value);
  const index = text.indexOf(": ");
  if (index === -1) return ["", text];
  return [text.slice(0, index), text.slice(index + 2)];
}

function wrapPdfText(font, text, size, maxWidth, maxLines = 3) {
  const words = String(text).split(" ");
  const lines = [];
  let line = "";
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (font.widthOfTextAtSize(test, size) > maxWidth && line) {
      lines.push(line);
      line = word;
      if (lines.length >= maxLines) break;
    } else {
      line = test;
    }
  }
  if (line && lines.length < maxLines) lines.push(line);
  return lines;
}

function drawPdfCard(page, fonts, item, x, top, w, h, colorHex) {
  const pageH = 540;
  const y = pageH - top - h;
  const bg = hexToRgb("FFFFFF");
  const line = hexToRgb("CBD5E1");
  const accent = hexToRgb(colorHex);
  page.drawRectangle({ x, y, width: w, height: h, color: rgb(bg.r, bg.g, bg.b), borderColor: rgb(line.r, line.g, line.b), borderWidth: 1 });
  page.drawRectangle({ x, y, width: 6, height: h, color: rgb(accent.r, accent.g, accent.b) });
  const [title, body] = splitTitleBody(item);
  const titleText = title || body;
  page.drawText(titleText, { x: x + 18, y: y + h - 22, size: 11, font: fonts.bold, color: rgb(0.06, 0.09, 0.16), maxWidth: w - 34 });
  if (title) {
    const lines = wrapPdfText(fonts.regular, body, 9.2, w - 34, 3);
    lines.forEach((lineText, i) => {
      page.drawText(lineText, { x: x + 18, y: y + h - 42 - i * 12, size: 9.2, font: fonts.regular, color: rgb(0.29, 0.36, 0.45) });
    });
  }
}

async function createPdf() {
  const pdf = await PDFDocument.create();
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const regular = await pdf.embedFont(StandardFonts.Helvetica);
  const pageW = 960;
  const pageH = 540;

  slides.forEach((spec, idx) => {
    const page = pdf.addPage([pageW, pageH]);
    const dark = idx === 0;
    const bg = dark ? hexToRgb(C.navy) : hexToRgb(C.light);
    page.drawRectangle({ x: 0, y: 0, width: pageW, height: pageH, color: rgb(bg.r, bg.g, bg.b) });
    if (!dark) {
      const orange = hexToRgb(C.orange);
      page.drawRectangle({ x: 0, y: pageH - 8, width: pageW, height: 8, color: rgb(orange.r, orange.g, orange.b) });
    }
    const textColor = dark ? rgb(1, 1, 1) : rgb(0.06, 0.09, 0.16);
    const subColor = dark ? rgb(0.86, 0.91, 1) : rgb(0.29, 0.36, 0.45);
    page.drawText(idx === 0 ? "SOLUTION CHALLENGE 2026 - BUILD WITH AI" : "GRID SENSE AI | SOLUTION CHALLENGE 2026", {
      x: 48, y: pageH - 58, size: 8, font: bold, color: dark ? rgb(0.22, 0.74, 0.97) : rgb(0.15, 0.39, 0.92),
    });
    page.drawText(spec.title, { x: 48, y: pageH - 112, size: idx === 0 ? 40 : 26, font: bold, color: textColor });
    page.drawText(spec.subtitle || "", { x: 48, y: pageH - 148, size: idx === 0 ? 16 : 12, font: regular, color: subColor, maxWidth: 760 });
    const body = summaryItems(spec);
    if (idx === 0) {
      body.slice(0, 5).forEach((b, i) => {
        page.drawText(`- ${b}`, { x: 64, y: pageH - 205 - i * 34, size: 14, font: regular, color: subColor, maxWidth: 810 });
      });
    } else {
      body.slice(0, 8).forEach((item, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        drawPdfCard(page, { bold, regular }, item, 64 + col * 420, 190 + row * 82, 390, 62, [C.blue, C.orange, C.green, C.red][i % 4]);
      });
    }
    if (spec.metrics) {
      spec.metrics.forEach((m, i) => {
        page.drawText(m[0], { x: 650, y: pageH - 205 - i * 58, size: 22, font: bold, color: rgb(0.15, 0.39, 0.92) });
        page.drawText(m[1], { x: 650, y: pageH - 228 - i * 58, size: 10, font: regular, color: subColor });
      });
    }
    if (idx > 0) {
      page.drawText("Synthetic data only | Not an official BESCOM product", { x: 48, y: 24, size: 8, font: regular, color: rgb(0.39, 0.45, 0.55) });
    }
  });

  fs.writeFileSync(pdfPath, await pdf.save({ useObjectStreams: true }));
}

async function createPreviews() {
  for (const [idx, spec] of slides.entries()) {
    const canvas = new Canvas(1600, 900);
    const ctx = canvas.getContext("2d");
    const dark = idx === 0;
    ctx.fillStyle = dark ? `#${C.navy}` : `#${C.light}`;
    ctx.fillRect(0, 0, 1600, 900);
    if (!dark) {
      ctx.fillStyle = `#${C.orange}`;
      ctx.fillRect(0, 0, 1600, 16);
    }
    ctx.fillStyle = dark ? "#ffffff" : `#${C.black}`;
    ctx.font = idx === 0 ? "bold 76px Arial" : "bold 48px Arial";
    ctx.fillText(spec.title, 90, idx === 0 ? 210 : 145);
    ctx.font = idx === 0 ? "bold 30px Arial" : "24px Arial";
    ctx.fillStyle = dark ? "#dbeafe" : `#${C.slate}`;
    wrapCanvasText(ctx, spec.subtitle || "", 90, idx === 0 ? 280 : 195, 1260, idx === 0 ? 38 : 30);
    const body = summaryItems(spec);
    if (idx === 0) {
      ctx.font = "25px Arial";
      ctx.fillStyle = "#e2e8f0";
      body.slice(0, 5).forEach((b, i) => {
        wrapCanvasText(ctx, `- ${b}`, 110, 340 + i * 58, 1260, 31);
      });
    } else {
      body.slice(0, 8).forEach((item, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        drawCanvasCard(ctx, item, 110 + col * 675, 315 + row * 145, 620, 108, [`#${C.blue}`, `#${C.orange}`, `#${C.green}`, `#${C.red}`][i % 4]);
      });
    }
    const buffer = await canvas.toBuffer("png");
    fs.writeFileSync(path.join(PREVIEW_DIR, `slide-${String(idx + 1).padStart(2, "0")}.png`), buffer);
  }
}

function drawCanvasCard(ctx, item, x, y, w, h, color) {
  ctx.fillStyle = "#ffffff";
  ctx.strokeStyle = "#cbd5e1";
  ctx.lineWidth = 2;
  roundedRect(ctx, x, y, w, h, 18);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = color;
  roundedRect(ctx, x, y, 12, h, 10);
  ctx.fill();
  const [title, body] = splitTitleBody(item);
  ctx.fillStyle = `#${C.black}`;
  ctx.font = "bold 21px Arial";
  wrapCanvasText(ctx, title || body, x + 28, y + 34, w - 48, 25);
  if (title) {
    ctx.fillStyle = `#${C.slate}`;
    ctx.font = "17px Arial";
    wrapCanvasText(ctx, body, x + 28, y + 66, w - 48, 21);
  }
}

function roundedRect(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

function wrapCanvasText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = String(text).split(" ");
  let line = "";
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line, x, y);
      line = word;
      y += lineHeight;
    } else {
      line = test;
    }
  }
  if (line) ctx.fillText(line, x, y);
}

(async () => {
  const pptx = createDeck();
  await pptx.writeFile({ fileName: pptxPath });
  await createPdf();
  await createPreviews();
  const pptxSize = fs.statSync(pptxPath).size;
  const pdfSize = fs.statSync(pdfPath).size;
  console.log(`PPTX: ${pptxPath} (${pptxSize} bytes)`);
  console.log(`PDF: ${pdfPath} (${pdfSize} bytes)`);
  console.log(`Previews: ${PREVIEW_DIR}`);
})();
