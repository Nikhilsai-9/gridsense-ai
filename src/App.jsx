import { useEffect, useMemo, useState } from "react";
import { animate, motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  Bell,
  Brain,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Database,
  FileCheck2,
  Gauge,
  Github,
  Globe2,
  Cloud,
  Clock3,
  IndianRupee,
  Layers3,
  Linkedin,
  LineChart as LineChartIcon,
  LockKeyhole,
  Mail,
  Map,
  Network,
  Play,
  RefreshCcw,
  Route,
  Scale,
  SearchCheck,
  ShieldAlert,
  ShieldCheck,
  Siren,
  Sparkles,
  Target,
  TrendingUp,
  UserCheck,
  Zap,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Line,
  LineChart,
  ReferenceArea,
  ReferenceDot,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const rupee = new Intl.NumberFormat("en-IN");

const demandData = [
  { time: "6 AM", actual: 4.2, predicted: 4.4 },
  { time: "9 AM", actual: 5.8, predicted: 5.9 },
  { time: "12 PM", actual: 6.7, predicted: 6.8 },
  { time: "3 PM", actual: 6.1, predicted: 6.5 },
  { time: "6 PM", actual: 7.4, predicted: 8.1 },
  { time: "9 PM", actual: 8.0, predicted: 8.7 },
  { time: "12 AM", actual: 5.3, predicted: 5.7 },
];

const meterUsage = [
  { time: "8 AM", normal: 64, current: 66 },
  { time: "10 AM", normal: 68, current: 67 },
  { time: "12 PM", normal: 72, current: 71 },
  { time: "2 PM", normal: 76, current: 21 },
  { time: "4 PM", normal: 74, current: 23 },
  { time: "6 PM", normal: 79, current: 25 },
  { time: "8 PM", normal: 83, current: 27 },
];

const baseAlerts = [
  {
    meterId: "BES-2048",
    zone: "Zone C",
    issue: "Sudden 72% consumption drop",
    risk: "Critical",
    confidence: 94,
    loss: 18500,
    reason: "Possible bypass/tampering",
  },
  {
    meterId: "BES-1182",
    zone: "Zone B",
    issue: "Irregular night usage spike",
    risk: "High",
    confidence: 88,
    loss: 9200,
    reason: "Possible unauthorized load",
  },
  {
    meterId: "BES-9031",
    zone: "Zone D",
    issue: "Peer-group deviation",
    risk: "Medium",
    confidence: 76,
    loss: 4800,
    reason: "Manual review recommended",
  },
];

const simulatedAlert = {
  meterId: "BES-7710",
  zone: "Zone C",
  issue: "Consumption dropped 81% suddenly",
  risk: "Critical",
  confidence: 96,
  loss: 22300,
  reason: "Possible meter bypass after noon",
};

const baseZones = [
  {
    zone: "Zone A",
    status: "Normal",
    load: 54,
    risk: 22,
    anomalies: 0,
    action: "Continue monitoring",
  },
  {
    zone: "Zone B",
    status: "Peak Load Risk",
    load: 86,
    risk: 68,
    anomalies: 3,
    action: "Load balancing recommended",
  },
  {
    zone: "Zone C",
    status: "Theft Suspicion",
    load: 41,
    risk: 92,
    anomalies: 8,
    action: "Field inspection within 24 hours",
  },
  {
    zone: "Zone D",
    status: "Moderate Risk",
    load: 57,
    risk: 49,
    anomalies: 2,
    action: "Watchlist",
  },
  {
    zone: "Zone E",
    status: "Stable",
    load: 48,
    risk: 18,
    anomalies: 0,
    action: "No action required",
  },
];

const baseQueue = [
  {
    priority: "Critical",
    meterId: "BES-2048",
    zone: "Zone C",
    issue: "72% Drop",
    loss: 18500,
    confidence: 94,
    action: "Inspect in 24 hrs",
    status: "Pending",
  },
  {
    priority: "High",
    meterId: "BES-1182",
    zone: "Zone B",
    issue: "Night Spike",
    loss: 9200,
    confidence: 88,
    action: "Inspect this week",
    status: "Pending",
  },
  {
    priority: "Medium",
    meterId: "BES-9031",
    zone: "Zone D",
    issue: "Peer Deviation",
    loss: 4800,
    confidence: 76,
    action: "Manual Review",
    status: "Pending",
  },
];

const simulatedQueueCase = {
  priority: "Critical",
  meterId: "BES-7710",
  zone: "Zone C",
  issue: "81% Drop",
  loss: 22300,
  confidence: 96,
  action: "Inspect in 24 hrs",
  status: "Pending",
};

const revenueLossBase = [
  { zone: "Zone A", loss: 12000 },
  { zone: "Zone B", loss: 62000 },
  { zone: "Zone C", loss: 125000 },
  { zone: "Zone D", loss: 31000 },
  { zone: "Zone E", loss: 8000 },
];

const workflowSteps = [
  ["Smart meter data received", Database],
  ["AI predicts demand", LineChartIcon],
  ["Anomaly detected", ShieldAlert],
  ["Explanation generated", Brain],
  ["Officer approves inspection", UserCheck],
  ["Revenue recovery tracked", IndianRupee],
];

const explainabilityCards = [
  "72% sudden drop after 2 PM",
  "Nearby peer meters remained normal",
  "Historical pattern mismatch detected",
  "No holiday/seasonal reason found",
  "Risk score calculated from severity + confidence + zone risk",
];

const auditTimeline = [
  ["2:00 PM", "Smart meter reading received"],
  ["2:01 PM", "Pattern compared with 7-day history"],
  ["2:02 PM", "Peer-group deviation detected"],
  ["2:03 PM", "AI generated theft-risk alert"],
  ["2:05 PM", "Case moved to officer review queue"],
];

const navLinks = [
  ["Dashboard", "dashboard"],
  ["Forecast", "forecast"],
  ["Alerts", "alerts"],
  ["Revenue", "revenue"],
  ["Audit", "audit"],
];

const riskClass = {
  Critical: "bg-red-50 text-red-700 ring-red-200",
  High: "bg-orange-50 text-orange-700 ring-orange-200",
  Medium: "bg-amber-50 text-amber-700 ring-amber-200",
  Normal: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Stable: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  "Peak Load Risk": "bg-orange-50 text-orange-700 ring-orange-200",
  "Theft Suspicion": "bg-red-50 text-red-700 ring-red-200",
  "Moderate Risk": "bg-amber-50 text-amber-700 ring-amber-200",
};

const statusClass = {
  Pending: "bg-slate-100 text-slate-700",
  Approved: "bg-emerald-100 text-emerald-700",
  Rejected: "bg-slate-200 text-slate-700",
  Escalated: "bg-red-100 text-red-700",
  "Approved Inspection": "bg-emerald-100 text-emerald-700",
  "False Positive": "bg-slate-200 text-slate-700",
};

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function AnimatedNumber({ value, prefix = "", suffix = "", decimals = 0 }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(0, value, {
      duration: 0.95,
      ease: "easeOut",
      onUpdate: setDisplay,
    });
    return () => controls.stop();
  }, [value]);

  return (
    <span>
      {prefix}
      {display.toLocaleString("en-IN", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}

function Badge({ children, tone = "blue" }) {
  const tones = {
    blue: "border-blue-200 bg-blue-50 text-blue-700",
    green: "border-emerald-200 bg-emerald-50 text-emerald-700",
    orange: "border-orange-200 bg-orange-50 text-orange-700",
    red: "border-red-200 bg-red-50 text-red-700",
    slate: "border-slate-200 bg-slate-50 text-slate-700",
  };
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold", tones[tone])}>
      {children}
    </span>
  );
}

function SectionHeader({ eyebrow, title, children }) {
  return (
    <div className="mx-auto mb-8 flex max-w-7xl flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-3xl">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 md:text-4xl">{title}</h2>
      </div>
      {children ? <p className="max-w-xl text-sm leading-6 text-slate-600 md:text-base">{children}</p> : null}
    </div>
  );
}

function TopNavbar({ onSimulate, onReset }) {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => scrollToId("hero")}
          className="flex min-w-0 items-center gap-3 text-left"
          aria-label="Go to GridSense AI hero"
        >
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-navy-900 text-white shadow-soft">
            <Zap className="h-6 w-6 text-sky-300" />
          </span>
          <span className="min-w-0">
            <span className="block text-base font-black leading-5 text-slate-950">GridSense AI</span>
            <span className="hidden truncate text-xs font-semibold text-slate-500 sm:block">
              BESCOM Smart Meter Intelligence Console
            </span>
          </span>
        </button>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {navLinks.map(([label, id]) => (
            <button
              key={id}
              type="button"
              onClick={() => scrollToId(id)}
              className="rounded-full px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 xl:flex">
            <Badge tone="blue">
              <Database className="h-3.5 w-3.5" />
              Bangalore Synthetic Data
            </Badge>
            <Badge tone="green">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Precomputed AI Demo
            </Badge>
          </div>
          <button type="button" onClick={onSimulate} className="btn-primary" aria-label="Simulate theft detection">
            <Siren className="h-4 w-4" />
            <span className="hidden sm:inline">Simulate Theft</span>
          </button>
          <button type="button" onClick={onReset} className="btn-ghost" aria-label="Reset demo">
            <RefreshCcw className="h-4 w-4" />
            <span className="hidden sm:inline">Reset Demo</span>
          </button>
        </div>
      </div>
    </header>
  );
}

function Toast({ toast }) {
  if (!toast) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: -16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="fixed right-4 top-20 z-[60] max-w-sm rounded-3xl border border-red-200 bg-white p-4 shadow-command"
      role="status"
    >
      <div className="flex gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-red-50 text-red-600">
          <Bell className="h-5 w-5" />
        </span>
        <div>
          <p className="font-black text-slate-950">{toast.title}</p>
          <p className="mt-1 text-sm leading-5 text-slate-600">{toast.message}</p>
        </div>
      </div>
    </motion.div>
  );
}

function HeroVisual({ simulated }) {
  const zones = [
    ["Zone A", "Normal", "22", "left-[8%] top-[16%]", "green"],
    ["Zone B", "Peak Risk", "68", "right-[8%] top-[12%]", "orange"],
    ["Zone C", "Theft Risk", simulated ? "98" : "92", "left-[18%] bottom-[18%]", "red"],
    ["Zone D", "Watchlist", "49", "right-[16%] bottom-[24%]", "orange"],
  ];

  return (
    <div className="relative min-h-[520px] overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-5 shadow-command">
      <div className="grid-visual absolute inset-0 opacity-80" />
      <div className="absolute inset-x-8 top-8 rounded-[1.5rem] border border-blue-100 bg-white/80 p-4 shadow-soft backdrop-blur">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">AI risk command layer</p>
            <p className="mt-1 text-sm text-slate-600">Bengaluru feeder simulation across Peenya, Whitefield, KR Puram, Yelahanka, and Electronic City</p>
          </div>
          <Badge tone={simulated ? "red" : "orange"}>{simulated ? "Live Theft Alert" : "Zone C Watch"}</Badge>
        </div>
      </div>

      {zones.map(([zone, label, score, position, tone], index) => (
        <motion.div
          key={zone}
          className={cn(
            "absolute w-36 rounded-3xl border bg-white p-4 shadow-soft",
            position,
            tone === "green" && "border-emerald-200",
            tone === "orange" && "border-orange-200",
            tone === "red" && "border-red-200",
            simulated && zone === "Zone C" && "animate-riskPulse",
          )}
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: index * 0.35 }}
        >
          <p className="text-xs font-bold text-slate-500">{zone}</p>
          <p className="mt-1 text-sm font-black text-slate-950">{label}</p>
          <div className="mt-3 flex items-end justify-between">
            <span className={cn("text-3xl font-black", tone === "green" && "text-emerald-600", tone === "orange" && "text-orange-600", tone === "red" && "text-red-600")}>
              {score}
            </span>
            <span className={cn("h-3 w-3 rounded-full", tone === "green" && "bg-emerald-500", tone === "orange" && "bg-orange-500", tone === "red" && "bg-red-500")} />
          </div>
        </motion.div>
      ))}

      <div className="absolute left-1/2 top-1/2 grid h-28 w-28 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-blue-600 text-white shadow-blueGlow">
        <motion.span
          className="absolute inset-0 rounded-full border border-blue-300"
          animate={{ scale: [1, 1.45], opacity: [0.65, 0] }}
          transition={{ duration: 2.2, repeat: Infinity }}
        />
        <Brain className="h-12 w-12" />
      </div>

      <div className="absolute bottom-6 left-6 right-6 grid gap-3 rounded-[1.5rem] border border-slate-200 bg-white/90 p-4 shadow-soft backdrop-blur sm:grid-cols-3">
        <div>
          <p className="text-xs text-slate-500">Risk score</p>
          <p className="text-2xl font-black text-red-600">{simulated ? "98" : "92"}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Revenue impact</p>
          <p className="text-2xl font-black text-slate-950">₹{simulated ? "2.62L" : "2.4L"}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Priority</p>
          <p className="text-2xl font-black text-orange-600">24 hrs</p>
        </div>
      </div>
    </div>
  );
}

function Hero({ onSimulate, simulated }) {
  const featureCards = [
    {
      title: "Demand Forecasting",
      icon: LineChartIcon,
      copy: "Predict peak windows and feeder stress before load becomes an outage risk.",
    },
    {
      title: "Theft & Anomaly Detection",
      icon: ShieldAlert,
      copy: "Flag suspicious drops, spikes, bypass signals, and peer-group deviations.",
    },
    {
      title: "Revenue Recovery & Inspection Priority",
      icon: Target,
      copy: "Rank cases by estimated loss, confidence, and officer action urgency.",
    },
  ];

  return (
    <section id="hero" className="hero-bg border-b border-slate-200">
      <div className="mx-auto grid min-h-[calc(100vh-73px)] max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
          <Badge tone="blue">
            <Building2 className="h-3.5 w-3.5" />
            Theme 8 · BESCOM + Bengaluru/Karnataka localized
          </Badge>
          <h1 className="mt-5 text-5xl font-black tracking-normal text-slate-950 md:text-7xl">GridSense AI</h1>
          <p className="mt-5 max-w-3xl text-xl font-semibold leading-8 text-slate-700 md:text-2xl">
            AI-powered Smart Meter Intelligence & Revenue Recovery System for BESCOM officers
          </p>
          <p className="mt-4 text-lg font-black text-blue-700">
            Bengaluru-ready loss detection with instant demo results, explainable alerts, and inspection priorities.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={() => scrollToId("dashboard")} className="btn-primary">
              <Play className="h-4 w-4" />
              Launch Demo
            </button>
            <button type="button" onClick={onSimulate} className="btn-warning">
              <Siren className="h-4 w-4" />
              Simulate Theft
            </button>
          </div>

          <div className="mt-9 grid gap-4 md:grid-cols-3">
            {featureCards.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + index * 0.08 }}
                className="card p-5 transition hover:-translate-y-1 hover:shadow-command"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-blue-700">
                  <feature.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-black text-slate-950">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{feature.copy}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.55, delay: 0.1 }}>
          <HeroVisual simulated={simulated} />
        </motion.div>
      </div>
    </section>
  );
}

function ImpactMetrics({ simulated }) {
  const metrics = [
    ["Total Smart Meters", 12480, "", "", Gauge, "blue"],
    ["Predicted Peak Load", simulated ? 9.1 : 8.7, "", " MW", TrendingUp, "orange", 1],
    ["High-Risk Meters", simulated ? 21 : 18, "", "", ShieldAlert, "red"],
    ["Estimated Loss Detected", simulated ? 2.62 : 2.4, "₹", "L", IndianRupee, "green", 2],
    ["AI Confidence", simulated ? 94 : 92, "", "%", Brain, "blue"],
    ["Inspection Priority Cases", simulated ? 8 : 7, "", "", ClipboardCheck, "orange"],
  ];

  return (
    <section id="dashboard" className="section-pad bg-white">
      <SectionHeader eyebrow="Impact Metrics" title="Judge-ready problem and impact in one glance">
        Live synthetic Bengaluru-zone metrics show how GridSense AI turns BESCOM smart meter data into operational decisions for loss reduction.
      </SectionHeader>
      <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {metrics.map(([label, value, prefix, suffix, Icon, tone, decimals], index) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: index * 0.04 }}
            className="card p-5"
          >
            <span className={cn("grid h-11 w-11 place-items-center rounded-2xl", tone === "blue" && "bg-blue-50 text-blue-700", tone === "orange" && "bg-orange-50 text-orange-700", tone === "red" && "bg-red-50 text-red-700", tone === "green" && "bg-emerald-50 text-emerald-700")}>
              <Icon className="h-5 w-5" />
            </span>
            <p className="mt-5 text-sm font-semibold text-slate-500">{label}</p>
            <p className="mt-2 text-3xl font-black text-slate-950">
              <AnimatedNumber value={value} prefix={prefix} suffix={suffix} decimals={decimals || 0} />
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function DemoStoryTimeline() {
  return (
    <section className="section-pad bg-slate-50">
      <SectionHeader eyebrow="Demo Story" title="How the platform works from data to recovery">
        A six-step workflow makes the value clear in the first 10 seconds: local data, instant AI scoring, explainability, officer action, recovery.
      </SectionHeader>
      <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-6">
        {workflowSteps.map(([label, Icon], index) => (
          <div key={label} className="relative rounded-3xl border border-slate-200 bg-white p-5 shadow-soft">
            <div className="flex items-center justify-between">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-navy-900 text-white">
                <Icon className="h-5 w-5 text-sky-300" />
              </span>
              <span className="text-xs font-black text-blue-700">STEP {index + 1}</span>
            </div>
            <p className="mt-4 text-sm font-black leading-6 text-slate-950">{label}</p>
            {index < workflowSteps.length - 1 ? <ArrowRight className="absolute -right-3 top-1/2 hidden h-6 w-6 -translate-y-1/2 text-blue-300 lg:block" /> : null}
          </div>
        ))}
      </div>
    </section>
  );
}

function DemandForecast({ simulated }) {
  const data = useMemo(
    () =>
      demandData.map((point) => ({
        ...point,
        predicted: simulated && ["6 PM", "9 PM"].includes(point.time) ? point.predicted + 0.35 : point.predicted,
      })),
    [simulated],
  );

  return (
    <section id="forecast" className="section-pad bg-white">
      <SectionHeader eyebrow="Demand Forecasting" title="AI-based peak load prediction">
        Professional demand intelligence for Bengaluru feeder planning, evening peak preparation, and localized grid reliability.
      </SectionHeader>
      <div className="mx-auto grid max-w-7xl gap-6 xl:grid-cols-[1.5fr_0.8fr]">
        <div className="card p-5 md:p-6">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-xl font-black text-slate-950">Actual vs Predicted Demand</h3>
              <p className="mt-1 text-sm text-slate-500">Hourly load forecast in MW with 7 PM to 9 PM peak zone</p>
            </div>
            <div className="flex gap-2">
              <Badge tone="blue">Actual</Badge>
              <Badge tone="green">Predicted</Badge>
              <Badge tone="orange">Peak warning</Badge>
            </div>
          </div>
          <div className="h-[360px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={data} margin={{ top: 12, right: 16, bottom: 0, left: -18 }}>
                <CartesianGrid stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} domain={[3, 10]} unit=" MW" />
                <Tooltip content={<ChartTooltip />} />
                <ReferenceArea x1="6 PM" x2="9 PM" fill="#fb923c" fillOpacity={0.14} />
                <Line type="monotone" dataKey="actual" name="Actual demand" stroke="#2563eb" strokeWidth={4} dot={{ r: 4, fill: "#2563eb", strokeWidth: 0 }} />
                <Line type="monotone" dataKey="predicted" name="Predicted demand" stroke="#059669" strokeWidth={4} strokeDasharray="8 7" dot={{ r: 4, fill: "#059669", strokeWidth: 0 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-4">
          <div className="highlight-card p-6">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-600 text-white">
                <Sparkles className="h-6 w-6" />
              </span>
              <div>
                <h3 className="font-black text-slate-950">AI Insight Card</h3>
                <p className="text-sm text-slate-500">GridSense forecast engine</p>
              </div>
            </div>
            <p className="mt-5 text-lg font-bold leading-8 text-slate-800">
              GridSense predicts peak load between 7 PM and 9 PM in Zone B due to Bengaluru residential evening consumption.
              Recommended action: prepare load balancing and monitor feeder stress.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
            {[
              ["Forecast horizon", "24 hours", "blue"],
              ["Peak risk", "High", "orange"],
              ["Confidence", simulated ? "93%" : "91%", "green"],
            ].map(([label, value, tone]) => (
              <div key={label} className="card p-5">
                <p className="text-sm font-semibold text-slate-500">{label}</p>
                <p className={cn("mt-2 text-3xl font-black", tone === "blue" && "text-blue-700", tone === "orange" && "text-orange-600", tone === "green" && "text-emerald-600")}>
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-command">
      <p className="mb-2 text-sm font-black text-slate-950">{label}</p>
      {payload.map((item) => (
        <p key={item.dataKey} className="text-sm font-semibold text-slate-600">
          <span style={{ color: item.color }}>{item.name || item.dataKey}</span>: {item.value}
        </p>
      ))}
    </div>
  );
}

function AlertCard({ alert, index }) {
  const tone = alert.risk === "Critical" ? "red" : alert.risk === "High" ? "orange" : "amber";
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: index * 0.05 }}
      className={cn("card p-5", tone === "red" && "border-red-200", tone === "orange" && "border-orange-200", tone === "amber" && "border-amber-200")}
    >
      <div className="flex items-start justify-between gap-4">
        <span className={cn("grid h-12 w-12 shrink-0 place-items-center rounded-2xl", tone === "red" && "bg-red-50 text-red-700", tone === "orange" && "bg-orange-50 text-orange-700", tone === "amber" && "bg-amber-50 text-amber-700")}>
          <ShieldAlert className="h-6 w-6" />
        </span>
        <span className={cn("rounded-full px-3 py-1 text-xs font-black ring-1", riskClass[alert.risk])}>{alert.risk}</span>
      </div>
      <h3 className="mt-5 text-xl font-black text-slate-950">Meter ID: {alert.meterId}</h3>
      <p className="mt-1 text-sm font-semibold text-slate-500">{alert.zone} · {alert.issue}</p>
      <p className="mt-4 text-sm leading-6 text-slate-600">Reason: {alert.reason}</p>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs font-semibold text-slate-500">Estimated Loss</p>
          <p className="mt-1 text-xl font-black text-slate-950">₹{rupee.format(alert.loss)}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs font-semibold text-slate-500">Confidence</p>
          <p className="mt-1 text-xl font-black text-blue-700">{alert.confidence}%</p>
        </div>
      </div>
      <div className="mt-5">
        <div className="mb-2 flex justify-between text-xs font-bold text-slate-500">
          <span>AI confidence</span>
          <span>{alert.confidence}%</span>
        </div>
        <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
          <div className={cn("h-full rounded-full", tone === "red" ? "bg-red-500" : tone === "orange" ? "bg-orange-500" : "bg-amber-500")} style={{ width: `${alert.confidence}%` }} />
        </div>
      </div>
      <button type="button" onClick={() => scrollToId("investigation")} className="mt-5 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-black text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700">
        Review Case
      </button>
    </motion.article>
  );
}

function AnomalyAlerts({ alerts }) {
  return (
    <section id="alerts" className="section-pad bg-slate-50">
      <SectionHeader eyebrow="Anomaly & Theft Detection" title="AI Theft & Anomaly Alerts">
        Realistic synthetic BESCOM-style alerts show what officers need: reason, confidence, estimated loss, and next step.
      </SectionHeader>
      <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-3">
        {alerts.map((alert, index) => (
          <AlertCard key={alert.meterId} alert={alert} index={index} />
        ))}
      </div>
    </section>
  );
}

function ZoneRiskMap({ zones, simulated }) {
  return (
    <section id="zones" className="section-pad bg-white">
      <SectionHeader eyebrow="Smart Grid Zone Risk Map" title="Zone-level risk and inspection intelligence">
        Localized Bengaluru zones keep the demo grounded: Peenya, Whitefield, KR Puram, Yelahanka, and Electronic City feeder patterns.
      </SectionHeader>
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="relative min-h-[500px] overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50 p-5 shadow-soft">
          <div className="grid-visual absolute inset-0 opacity-75" />
          <div className="absolute left-[12%] top-[14%] h-24 w-24 rounded-full border-2 border-emerald-300 bg-emerald-100/70" />
          <div className="absolute right-[15%] top-[18%] h-28 w-28 rounded-full border-2 border-orange-300 bg-orange-100/70" />
          <div className={cn("absolute left-[32%] top-[43%] h-32 w-32 rounded-full border-2 border-red-300 bg-red-100/80 shadow-redGlow", simulated && "animate-riskPulse")} />
          <div className="absolute right-[22%] bottom-[18%] h-24 w-24 rounded-full border-2 border-amber-300 bg-amber-100/70" />
          <div className="absolute bottom-[13%] left-[12%] h-20 w-20 rounded-full border-2 border-emerald-300 bg-emerald-100/70" />
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 620 500" aria-hidden="true">
            <path d="M100 105 C210 80 360 105 500 120" stroke="#2563eb" strokeWidth="3" fill="none" strokeDasharray="9 10" />
            <path d="M500 120 C420 230 340 250 245 258" stroke="#2563eb" strokeWidth="3" fill="none" strokeDasharray="9 10" />
            <path d="M245 258 C335 330 415 390 485 400" stroke="#f97316" strokeWidth="3" fill="none" strokeDasharray="9 10" />
            <path d="M245 258 C145 315 110 365 92 410" stroke="#059669" strokeWidth="3" fill="none" strokeDasharray="9 10" />
          </svg>
          <div className="absolute left-1/2 top-1/2 grid h-24 w-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-navy-900 text-white shadow-command">
            <Zap className="h-10 w-10 text-sky-300" />
          </div>
          <div className="absolute bottom-5 left-5 right-5 rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-soft backdrop-blur">
            <h3 className="font-black text-slate-950">Bengaluru zone simulation</h3>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              The map combines local feeder load, anomaly severity, and inspection urgency into a BESCOM command-center view.
            </p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {zones.map((zone) => {
            const critical = zone.zone === "Zone C";
            const normal = zone.risk <= 40;
            const warning = zone.risk > 40 && zone.risk <= 70;
            return (
              <div
                key={zone.zone}
                className={cn(
                  "card p-5",
                  normal && "border-emerald-200",
                  warning && "border-orange-200",
                  critical && "border-red-200",
                  simulated && critical && "animate-riskPulse",
                )}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-black text-slate-950">{zone.zone}</h3>
                    <span className={cn("mt-2 inline-flex rounded-full px-3 py-1 text-xs font-black ring-1", riskClass[zone.status])}>
                      {zone.status}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className={cn("text-4xl font-black", normal && "text-emerald-600", warning && "text-orange-600", critical && "text-red-600")}>
                      {zone.risk}
                    </p>
                    <p className="text-xs font-semibold text-slate-500">risk score</p>
                  </div>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <InfoTile label="Load" value={`${zone.load}%`} />
                  <InfoTile label="Anomalies" value={zone.anomalies} />
                </div>
                <p className="mt-4 text-sm font-semibold leading-6 text-slate-700">{zone.action}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function InfoTile({ label, value }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <p className="text-xs font-semibold text-slate-500">{label}</p>
      <p className="mt-1 text-xl font-black text-slate-950">{value}</p>
    </div>
  );
}

function MeterInvestigation({ status, onStatus }) {
  return (
    <section id="investigation" className="section-pad bg-slate-50">
      <SectionHeader eyebrow="Individual Meter Investigation" title="Evidence package for officer decision">
        The system explains the alert before field action, keeping the workflow transparent for BESCOM officer verification.
      </SectionHeader>
      <div className="mx-auto grid max-w-7xl gap-6 xl:grid-cols-[0.75fr_1.25fr]">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-red-50 text-red-700">
              <LockKeyhole className="h-7 w-7" />
            </span>
            <span className={cn("rounded-full px-3 py-1 text-xs font-black", statusClass[status] || "bg-red-100 text-red-700")}>{status}</span>
          </div>
          <h3 className="mt-6 text-3xl font-black text-slate-950">Meter ID: BES-2048</h3>
          <p className="mt-2 font-semibold text-slate-600">Location: Peenya Industrial Area</p>
          <div className="mt-6 space-y-3">
            <InfoRow label="Current Status" value="High Risk" />
            <InfoRow label="AI Confidence" value="94%" />
            <InfoRow label="Estimated Revenue Loss" value="₹18,500" />
            <InfoRow label="Recommended Action" value="Field inspection within 24 hours" />
          </div>
        </div>
        <div className="card p-5 md:p-6">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-xl font-black text-slate-950">Usage Pattern Investigation</h3>
              <p className="text-sm text-slate-500">Historical normal usage vs current abnormal usage</p>
            </div>
            <Badge tone="red">Anomaly after 2:00 PM</Badge>
          </div>
          <div className="h-[310px] rounded-3xl bg-slate-50 p-3">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={meterUsage} margin={{ top: 18, right: 16, bottom: 0, left: -16 }}>
                <CartesianGrid stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} unit=" kWh" />
                <Tooltip content={<ChartTooltip />} />
                <Line type="monotone" dataKey="normal" name="Historical normal usage" stroke="#059669" strokeWidth={4} dot={false} />
                <Line type="monotone" dataKey="current" name="Current abnormal usage" stroke="#dc2626" strokeWidth={4} dot={{ r: 4, fill: "#dc2626", strokeWidth: 0 }} />
                <ReferenceDot x="2 PM" y={21} r={9} fill="#dc2626" stroke="#fecaca" strokeWidth={4} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-5 rounded-3xl border border-red-200 bg-red-50 p-5">
            <h4 className="font-black text-red-800">AI explanation</h4>
            <p className="mt-2 text-sm leading-7 text-slate-700">
              Consumption dropped by 72% after 2:00 PM while nearby peer meters continued normal usage. Historical
              pattern does not show this behavior, and no seasonal or holiday reason was detected. This indicates
              possible meter bypass or tampering.
            </p>
          </div>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={() => onStatus("Approved Inspection")} className="btn-primary">
              <ClipboardCheck className="h-4 w-4" />
              Approve Inspection
            </button>
            <button type="button" onClick={() => onStatus("False Positive")} className="btn-ghost">
              <CheckCircle2 className="h-4 w-4" />
              Mark False Positive
            </button>
            <button type="button" onClick={() => onStatus("Escalated")} className="btn-warning">
              <AlertTriangle className="h-4 w-4" />
              Escalate to Senior Officer
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl bg-slate-50 p-4">
      <span className="text-sm font-semibold text-slate-500">{label}</span>
      <span className="text-right text-sm font-black text-slate-950">{value}</span>
    </div>
  );
}

function RevenueImpact({ simulated }) {
  const data = useMemo(
    () => revenueLossBase.map((item) => (simulated && item.zone === "Zone C" ? { ...item, loss: item.loss + simulatedAlert.loss } : item)),
    [simulated],
  );
  const totalLoss = simulated ? 2.62 : 2.4;
  const recovery = simulated ? 2.02 : 1.8;

  return (
    <section id="revenue" className="section-pad bg-white">
      <SectionHeader eyebrow="Revenue Impact Engine" title="Converting anomalies into recovery potential">
        Loss detection becomes useful only when Bengaluru field teams know where inspection can recover the most revenue.
      </SectionHeader>
      <div className="mx-auto grid max-w-7xl gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <ImpactTile label="Total estimated loss detected" value={`₹${totalLoss}L`} icon={IndianRupee} tone="red" />
            <ImpactTile label="Potential recovery after inspection" value={`₹${recovery}L`} icon={Target} tone="green" />
            <ImpactTile label="Average loss per high-risk meter" value="₹13,300" icon={Gauge} tone="orange" />
            <ImpactTile label="Monthly projected savings" value="₹18.6L" icon={TrendingUp} tone="blue" />
          </div>
          <div className="highlight-card p-6">
            <p className="text-lg font-black leading-8 text-slate-900">
              GridSense AI converts raw meter readings into revenue recovery decisions by ranking theft-risk cases based
              on loss impact, confidence, and inspection urgency.
            </p>
          </div>
        </div>
        <div className="card p-5 md:p-6">
          <h3 className="text-xl font-black text-slate-950">Zones vs Estimated Loss</h3>
          <p className="mt-1 text-sm text-slate-500">Synthetic rupee values for demo prioritization</p>
          <div className="mt-5 h-[360px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 12, right: 16, bottom: 0, left: -10 }}>
                <CartesianGrid stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="zone" axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} tickFormatter={(value) => `₹${Math.round(value / 1000)}k`} />
                <Tooltip content={<RevenueTooltip />} />
                <Bar dataKey="loss" radius={[14, 14, 4, 4]}>
                  {data.map((entry) => (
                    <Cell key={entry.zone} fill={entry.zone === "Zone C" ? "#dc2626" : entry.zone === "Zone B" ? "#f97316" : "#2563eb"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}

function RevenueTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-command">
      <p className="font-black text-slate-950">{label}</p>
      <p className="text-sm font-semibold text-slate-600">Estimated Loss: ₹{rupee.format(payload[0].value)}</p>
    </div>
  );
}

function ImpactTile({ label, value, icon: Icon, tone }) {
  return (
    <div className="card p-5">
      <span className={cn("grid h-11 w-11 place-items-center rounded-2xl", tone === "red" && "bg-red-50 text-red-700", tone === "green" && "bg-emerald-50 text-emerald-700", tone === "orange" && "bg-orange-50 text-orange-700", tone === "blue" && "bg-blue-50 text-blue-700")}>
        <Icon className="h-5 w-5" />
      </span>
      <p className="mt-5 text-sm font-semibold text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-black text-slate-950">{value}</p>
    </div>
  );
}

function InspectionQueue({ rows, onDecision }) {
  return (
    <section id="queue" className="section-pad bg-slate-50">
      <SectionHeader eyebrow="Inspection Priority Queue" title="Practical officer workflow for BESCOM teams">
        Officers can approve, reject, or escalate Bengaluru-area cases while the system preserves the decision trail.
      </SectionHeader>
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-command">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1040px] border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-200 bg-navy-900 text-xs uppercase tracking-[0.16em] text-sky-100">
                <th className="px-5 py-4">Priority</th>
                <th className="px-5 py-4">Meter ID</th>
                <th className="px-5 py-4">Zone</th>
                <th className="px-5 py-4">Issue</th>
                <th className="px-5 py-4">Estimated Loss</th>
                <th className="px-5 py-4">AI Confidence</th>
                <th className="px-5 py-4">Recommended Action</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.meterId} className="border-b border-slate-100 transition hover:bg-blue-50/40">
                  <td className="px-5 py-4">
                    <span className={cn("rounded-full px-3 py-1 text-xs font-black ring-1", riskClass[row.priority])}>{row.priority}</span>
                  </td>
                  <td className="px-5 py-4 font-black text-slate-950">{row.meterId}</td>
                  <td className="px-5 py-4 font-semibold text-slate-600">{row.zone}</td>
                  <td className="px-5 py-4 text-slate-600">{row.issue}</td>
                  <td className="px-5 py-4 font-black text-slate-950">₹{rupee.format(row.loss)}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span className="font-black text-blue-700">{row.confidence}%</span>
                      <div className="h-2 w-20 overflow-hidden rounded-full bg-slate-100">
                        <div className="h-full rounded-full bg-blue-600" style={{ width: `${row.confidence}%` }} />
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm font-semibold text-slate-700">{row.action}</td>
                  <td className="px-5 py-4">
                    <span className={cn("rounded-full px-3 py-1 text-xs font-black", statusClass[row.status])}>{row.status}</span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-2">
                      <button type="button" onClick={() => onDecision(row.meterId, "Approved")} className="table-action bg-emerald-50 text-emerald-700 hover:bg-emerald-100">
                        Approve
                      </button>
                      <button type="button" onClick={() => onDecision(row.meterId, "Rejected")} className="table-action bg-slate-100 text-slate-700 hover:bg-slate-200">
                        Reject
                      </button>
                      <button type="button" onClick={() => onDecision(row.meterId, "Escalated")} className="table-action bg-red-50 text-red-700 hover:bg-red-100">
                        Escalate
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function ExplainabilityAudit() {
  return (
    <section id="audit" className="section-pad bg-white">
      <SectionHeader eyebrow="Explainability & Audit" title="Why AI Flagged This Case">
        Government systems need traceability. GridSense shows the evidence, formula, and timeline behind every alert.
      </SectionHeader>
      <div className="mx-auto grid max-w-7xl gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="card p-6">
          <div className="grid gap-4 md:grid-cols-2">
            {explainabilityCards.map((item, index) => (
              <div key={item} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-2xl bg-blue-600 text-sm font-black text-white">
                    {index + 1}
                  </span>
                  <p className="font-black text-slate-950">{item}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-3xl border border-blue-200 bg-blue-50 p-5">
            <h3 className="font-black text-blue-900">Simple risk formula</h3>
            <p className="mt-2 text-lg font-black text-slate-900">
              Risk Score = Anomaly Severity + AI Confidence + Zone Load Risk + Peer Deviation
            </p>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <Badge tone="green">
              <SearchCheck className="h-3.5 w-3.5" />
              Explainable
            </Badge>
            <Badge tone="blue">
              <RefreshCcw className="h-3.5 w-3.5" />
              Reversible
            </Badge>
            <Badge tone="orange">
              <UserCheck className="h-3.5 w-3.5" />
              Human verified
            </Badge>
            <Badge tone="slate">
              <FileCheck2 className="h-3.5 w-3.5" />
              Audit ready
            </Badge>
          </div>
        </div>
        <div className="card p-6">
          <div className="mb-6 flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-navy-900 text-white">
              <Route className="h-6 w-6 text-sky-300" />
            </span>
            <div>
              <h3 className="font-black text-slate-950">Audit timeline</h3>
              <p className="text-sm text-slate-500">Case BES-2048</p>
            </div>
          </div>
          <div className="space-y-4">
            {auditTimeline.map(([time, event], index) => (
              <div key={event} className="relative flex gap-4">
                <div className="flex flex-col items-center">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-blue-600 text-sm font-black text-white">
                    {index + 1}
                  </span>
                  {index < auditTimeline.length - 1 ? <span className="h-9 w-px bg-slate-200" /> : null}
                </div>
                <div className="pt-1">
                  <p className="text-sm font-black text-blue-700">{time}</p>
                  <p className="font-semibold text-slate-800">{event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HumanLoopReview() {
  const cards = [
    ["AI suggested decision", Brain, "Prioritize BES-2048 for field inspection based on theft risk and revenue impact."],
    ["Officer review pending", UserCheck, "Authorized BESCOM staff validate the recommendation before action."],
    ["Final decision recorded", FileCheck2, "Approval, rejection, or escalation is saved for audit and governance."],
    ["Model learns from feedback", Sparkles, "False positives and confirmed cases improve future ranking quality."],
  ];

  return (
    <section className="section-pad bg-slate-50">
      <SectionHeader eyebrow="Human-In-The-Loop Review" title="AI recommends. BESCOM officers decide.">
        The workflow is designed for BESCOM feasibility, accountability, and safe operational adoption in Karnataka.
      </SectionHeader>
      <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map(([title, Icon, copy]) => (
          <div key={title} className="card p-5">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-blue-700">
              <Icon className="h-6 w-6" />
            </span>
            <h3 className="mt-4 font-black text-slate-950">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{copy}</p>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-6 max-w-7xl rounded-[2rem] border border-orange-200 bg-orange-50 p-6">
        <p className="text-lg font-bold leading-8 text-slate-900">
          The AI does not directly punish or disconnect consumers. It only prioritizes suspicious cases for officer
          verification. Final action remains with authorized BESCOM staff.
        </p>
      </div>
    </section>
  );
}


function LocalReadinessSection() {
  const readiness = [
    ["Bengaluru localized", "Synthetic feeder zones map to Peenya, Whitefield, KR Puram, Yelahanka, and Electronic City patterns.", Map],
    ["Vercel-safe demo", "All AI outputs are precomputed in the frontend, so judge clicks return instantly without serverless timeout risk.", Clock3],
    ["Gemini-ready", "Gemini / Google AI Studio can generate officer-facing case summaries from anomaly evidence in a pilot.", Brain],
    ["Karnataka scale path", "The same risk scoring flow can extend to additional BESCOM circles and rural Karnataka feeders.", Cloud],
  ];

  return (
    <section className="section-pad bg-white">
      <SectionHeader eyebrow="Judge Feedback Upgrades" title="Localized, reliable, and Google AI-ready">
        Built to avoid the most common prototype penalties: unclear local relevance, slow cloud functions, and vague AI usage.
      </SectionHeader>
      <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-2 xl:grid-cols-4">
        {readiness.map(([title, copy, Icon]) => (
          <div key={title} className="card p-5">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-orange-50 text-orange-700">
              <Icon className="h-6 w-6" />
            </span>
            <h3 className="mt-4 font-black text-slate-950">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{copy}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
function ComplianceSection() {
  const items = [
    ["Works as a decision-support layer", Layers3],
    ["No modification to existing BESCOM systems", Network],
    ["Uses synthetic/masked data in prototype", Database],
    ["No raw PII required", ShieldCheck],
    ["Explainable and auditable outputs", FileCheck2],
    ["False positives routed to human review", Scale],
  ];
  return (
    <section className="section-pad bg-white">
      <SectionHeader eyebrow="Built for Real-World Deployment" title="Government-ready constraints handled upfront">
        Submission-ready architecture story: Bengaluru localization, instant precomputed demo results, masked data, human review, and auditable decisions.
      </SectionHeader>
      <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map(([item, Icon]) => (
          <div key={item} className="card flex items-center gap-4 p-5">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-emerald-50 text-emerald-700">
              <Icon className="h-6 w-6" />
            </span>
            <p className="font-black text-slate-950">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function PitchModeSection() {
  return (
    <section className="section-pad bg-slate-50">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-blue-200 bg-gradient-to-br from-blue-50 via-white to-emerald-50 p-6 shadow-soft md:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="eyebrow">Pitch Mode</p>
            <h2 className="mt-3 text-3xl font-black text-slate-950">30-second judge explanation</h2>
            <p className="mt-4 max-w-4xl text-lg font-semibold leading-8 text-slate-700">
              GridSense AI helps BESCOM detect theft and reduce losses by analyzing Bengaluru smart meter patterns. It
              forecasts demand, flags abnormal consumption, estimates revenue loss, explains every alert, and helps
              officers prioritize inspections. The demo is precomputed in the frontend so judges get instant results on
              Vercel, while Gemini can be used for explainable officer summaries in a production pilot.
            </p>
          </div>
          <button type="button" onClick={() => scrollToId("dashboard")} className="btn-primary shrink-0">
            <Play className="h-4 w-4" />
            Start Demo Flow
          </button>
        </div>
      </div>
    </section>
  );
}

function FinalImpact({ onSimulate }) {
  const impacts = [
    ["Reduce distribution losses", IndianRupee],
    ["Improve grid reliability", Zap],
    ["Detect theft faster", Siren],
    ["Prioritize field teams", Target],
    ["Support scalable smart-city energy planning", Map],
  ];
  return (
    <section id="impact" className="bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 p-6 text-white shadow-command md:p-8">
        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-orange-300">Final Impact</p>
            <h2 className="mt-4 text-4xl font-black tracking-normal md:text-5xl">From Smart Meters to Smart Decisions</h2>
            <p className="mt-5 text-lg font-semibold leading-8 text-slate-200">
              BESCOM already has valuable smart meter data across Bengaluru and Karnataka. GridSense AI turns that data
              into demand forecasts, theft alerts, inspection priorities, and revenue recovery decisions.
            </p>
            <p className="mt-5 rounded-3xl border border-orange-300/30 bg-orange-400/10 p-5 text-xl font-black leading-8 text-white">
              From smart meters to smart decisions — helping utilities detect loss, predict demand, and recover revenue.
            </p>
            <button type="button" onClick={onSimulate} className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-orange-400 px-5 py-3 text-sm font-black text-slate-950 shadow-orangeGlow transition hover:-translate-y-0.5 hover:bg-white">
              <Siren className="h-4 w-4" />
              Simulate Theft Detection
            </button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {impacts.map(([label, Icon]) => (
              <div key={label} className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur transition hover:-translate-y-1 hover:border-orange-300/40">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-blue-700">
                  <Icon className="h-6 w-6" />
                </span>
                <p className="mt-4 font-black">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SiteFooter() {
  const quickLinks = [
    ["Dashboard", "dashboard"],
    ["Demand Forecasting", "forecast"],
    ["Theft Detection", "alerts"],
    ["Zone Intelligence", "zones"],
    ["Inspection Queue", "queue"],
    ["Explainability", "audit"],
    ["Impact", "impact"],
  ];
  const techStack = ["React", "Tailwind CSS", "Recharts", "Framer Motion", "Lucide Icons", "Synthetic Data"];
  const projectLinks = [
    ["GitHub", "https://github.com/Nikhilsai-9", Github],
    ["LinkedIn", "https://www.linkedin.com/in/nikhilsai-kenguri-0b0976322", Linkedin],
    ["Portfolio", "https://nikhilsai-9.github.io/nikhilsai-portfolio/", Globe2],
    ["Email", "mailto:sainikhil1146@gmail.com", Mail],
  ];

  return (
    <footer className="site-footer relative overflow-hidden text-white">
      <div className="footer-grid absolute inset-0 opacity-35" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-300/70 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.35fr_0.8fr_0.9fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-blue-800 shadow-blueGlow">
                <Zap className="h-7 w-7 text-orange-500" />
              </span>
              <div>
                <p className="text-2xl font-black">GridSense AI</p>
                <p className="text-sm font-semibold text-sky-200">Smart Meter Intelligence & Revenue Recovery System for BESCOM</p>
              </div>
            </div>
            <p className="mt-6 max-w-xl text-sm leading-7 text-slate-300">
              Built for AI for Bharat Hackathon — Theme 8. GridSense AI localizes smart meter intelligence for
              Bengaluru/BESCOM operations, transforming meter data into theft alerts, demand forecasts, inspection
              priorities, and revenue recovery decisions.
            </p>
          </div>

          <div>
            <h3 className="footer-title">Quick Links</h3>
            <div className="mt-5 grid gap-3">
              {quickLinks.map(([label, id]) => (
                <button key={id} type="button" onClick={() => scrollToId(id)} className="footer-link text-left">
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="footer-title">Built With</h3>
            <div className="mt-5 flex flex-wrap gap-2">
              {techStack.map((item) => (
                <span key={item} className="rounded-full border border-white/10 bg-white/10 px-3 py-2 text-xs font-black text-slate-100 backdrop-blur transition hover:border-orange-300/50 hover:bg-orange-400/15">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="footer-title">Project Links</h3>
            <div className="mt-5 grid gap-3">
              {projectLinks.map(([label, href, Icon]) => (
                <a key={label} href={href} className="footer-link group inline-flex items-center gap-3" target={href.startsWith("mailto:") ? undefined : "_blank"} rel={href.startsWith("mailto:") ? undefined : "noreferrer"}>
                  <span className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/10 text-orange-300 transition group-hover:border-orange-300/50 group-hover:bg-orange-400/15">
                    <Icon className="h-4 w-4" />
                  </span>
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-6 border-t border-white/10 pt-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="rounded-3xl border border-orange-300/20 bg-orange-400/10 p-5 shadow-orangeGlow backdrop-blur">
            <div className="flex items-start gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-orange-300 text-slate-950">
                <BadgeCheck className="h-5 w-5" />
              </span>
              <div>
                <p className="font-black text-white">AI for Bharat Hackathon 2026</p>
                <p className="mt-1 text-sm font-semibold leading-6 text-orange-100">
                  Theme 8 — AI for Smart Meter Intelligence & Loss Detection by BESCOM, localized for Bengaluru/Karnataka
                </p>
                <p className="mt-2 text-xs font-bold uppercase tracking-[0.16em] text-sky-200">
                  Prototype uses synthetic data only.
                </p>
              </div>
            </div>
          </div>

          <div className="text-sm leading-7 text-slate-300 lg:text-right">
            <p className="font-semibold text-slate-200">
              © 2026 GridSense AI. Built for hackathon demonstration and decision-support research.
            </p>
            <p className="mt-2 text-xs leading-6 text-slate-400">
              Not an official BESCOM product. Prototype created using synthetic data for innovation challenge submission.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [simulated, setSimulated] = useState(false);
  const [queueRows, setQueueRows] = useState(baseQueue);
  const [investigationStatus, setInvestigationStatus] = useState("High Risk");
  const [toast, setToast] = useState(null);

  const alerts = useMemo(() => (simulated ? [simulatedAlert, ...baseAlerts] : baseAlerts), [simulated]);

  const zones = useMemo(
    () =>
      baseZones.map((zone) => {
        if (!simulated || zone.zone !== "Zone C") return zone;
        return {
          ...zone,
          load: 36,
          risk: 98,
          anomalies: 10,
          action: "Critical inspection dispatch recommended now",
        };
      }),
    [simulated],
  );

  const showToast = (title, message) => {
    setToast({ title, message });
    window.clearTimeout(window.__gridSenseToast);
    window.__gridSenseToast = window.setTimeout(() => setToast(null), 3600);
  };

  const handleSimulate = () => {
    setSimulated(true);
    setQueueRows((rows) => {
      if (rows.some((row) => row.meterId === simulatedQueueCase.meterId)) return rows;
      return [simulatedQueueCase, ...rows];
    });
    showToast("AI Alert", "Possible theft detected in Zone C — BES-7710");
  };

  const handleReset = () => {
    setSimulated(false);
    setQueueRows(baseQueue);
    setInvestigationStatus("High Risk");
    showToast("Demo Reset", "GridSense AI synthetic dashboard restored to baseline");
  };

  const updateQueueStatus = (meterId, status) => {
    setQueueRows((rows) => rows.map((row) => (row.meterId === meterId ? { ...row, status } : row)));
    showToast("Inspection Queue Updated", `${meterId} marked as ${status}`);
  };

  const updateInvestigation = (status) => {
    setInvestigationStatus(status);
    showToast("Officer Decision Recorded", `BES-2048 status updated to ${status}`);
    if (status === "Approved Inspection") updateQueueStatus("BES-2048", "Approved");
    if (status === "False Positive") updateQueueStatus("BES-2048", "Rejected");
    if (status === "Escalated") updateQueueStatus("BES-2048", "Escalated");
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <TopNavbar onSimulate={handleSimulate} onReset={handleReset} />
      <Toast toast={toast} />
      <main>
        <Hero onSimulate={handleSimulate} simulated={simulated} />
        <ImpactMetrics simulated={simulated} />
        <DemoStoryTimeline />
        <DemandForecast simulated={simulated} />
        <AnomalyAlerts alerts={alerts} />
        <ZoneRiskMap zones={zones} simulated={simulated} />
        <MeterInvestigation status={investigationStatus} onStatus={updateInvestigation} />
        <RevenueImpact simulated={simulated} />
        <InspectionQueue rows={queueRows} onDecision={updateQueueStatus} />
        <ExplainabilityAudit />
        <HumanLoopReview />
        <LocalReadinessSection />
        <ComplianceSection />
        <PitchModeSection />
        <FinalImpact onSimulate={handleSimulate} />
        <SiteFooter />
      </main>
    </div>
  );
}
