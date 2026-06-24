import { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
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
  IndianRupee,
  Info,
  Linkedin,
  LineChart as LineChartIcon,
  Mail,
  MapPinned,
  RefreshCcw,
  SearchCheck,
  ShieldAlert,
  ShieldCheck,
  Siren,
  UserCheck,
  Zap,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  ReferenceArea,
  ReferenceDot,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const money = new Intl.NumberFormat("en-IN");

const baseDemandData = [
  { time: "6 AM", actual: 4.2, predicted: 4.4 },
  { time: "9 AM", actual: 5.8, predicted: 5.9 },
  { time: "12 PM", actual: 6.7, predicted: 6.8 },
  { time: "3 PM", actual: 6.1, predicted: 6.5 },
  { time: "6 PM", actual: 7.4, predicted: 8.1 },
  { time: "9 PM", actual: 8.0, predicted: 8.7 },
  { time: "12 AM", actual: 5.3, predicted: 5.7 },
];

const baseAlerts = [
  {
    meterId: "BES-2048",
    zone: "Zone C",
    issue: "Sudden 72% consumption drop",
    risk: "Critical",
    confidence: 94,
    loss: 18500,
    reason: "Possible meter bypass or tampering",
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
    issue: "Peer group deviation",
    risk: "Medium",
    confidence: 76,
    loss: 4800,
    reason: "Manual review recommended",
  },
];

const liveAlert = {
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
    area: "Yelahanka",
    status: "Normal",
    load: 54,
    risk: 22,
    anomalies: 0,
    action: "Continue monitoring",
  },
  {
    zone: "Zone B",
    area: "Whitefield",
    status: "Peak Load Risk",
    load: 86,
    risk: 68,
    anomalies: 3,
    action: "Prepare load balancing",
  },
  {
    zone: "Zone C",
    area: "Peenya Industrial Area",
    status: "Theft Suspicion",
    load: 41,
    risk: 92,
    anomalies: 8,
    action: "Field inspection within 24 hours",
  },
  {
    zone: "Zone D",
    area: "KR Puram",
    status: "Moderate Risk",
    load: 57,
    risk: 49,
    anomalies: 2,
    action: "Keep on watchlist",
  },
  {
    zone: "Zone E",
    area: "Electronic City",
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

const liveQueueCase = {
  priority: "Critical",
  meterId: "BES-7710",
  zone: "Zone C",
  issue: "81% Drop",
  loss: 22300,
  confidence: 96,
  action: "Inspect in 24 hrs",
  status: "Pending",
};

const meterUsage = [
  { time: "8 AM", normal: 64, current: 66 },
  { time: "10 AM", normal: 68, current: 67 },
  { time: "12 PM", normal: 72, current: 71 },
  { time: "2 PM", normal: 76, current: 21 },
  { time: "4 PM", normal: 74, current: 23 },
  { time: "6 PM", normal: 79, current: 25 },
  { time: "8 PM", normal: 83, current: 27 },
];

const revenueLoss = [
  { zone: "Zone A", loss: 12000 },
  { zone: "Zone B", loss: 62000 },
  { zone: "Zone C", loss: 125000 },
  { zone: "Zone D", loss: 31000 },
  { zone: "Zone E", loss: 8000 },
];

const steps = [
  ["overview", "1", "Overview"],
  ["forecast", "2", "Demand Forecast"],
  ["alerts", "3", "Theft Alerts"],
  ["zones", "4", "Zone Status"],
  ["case", "5", "Meter Case"],
  ["queue", "6", "Inspection Queue"],
  ["explain", "7", "AI Explanation"],
];

const projectLinks = [
  ["GitHub", "https://github.com/Nikhilsai-9", Github],
  ["LinkedIn", "https://www.linkedin.com/in/nikhilsai-kenguri-0b0976322", Linkedin],
  ["Portfolio", "https://nikhilsai-9.github.io/nikhilsai-portfolio/", Globe2],
  ["Email", "mailto:sainikhil1146@gmail.com", Mail],
];

const techStack = ["React", "Tailwind CSS", "Recharts", "Lucide Icons", "Synthetic Data", "Vercel"];

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function riskTone(value) {
  if (value >= 71) return "danger";
  if (value >= 41) return "warning";
  return "safe";
}

function statusClass(status) {
  if (["Critical", "Theft Suspicion", "Escalated"].includes(status)) return "tag-danger";
  if (["High", "Medium", "Peak Load Risk", "Moderate Risk", "Pending"].includes(status)) return "tag-warning";
  if (["Approved", "Approved Inspection", "Normal", "Stable"].includes(status)) return "tag-safe";
  return "tag-neutral";
}

function Header({ onSimulate, onReset }) {
  return (
    <header className="gov-header">
      <div className="gov-strip">
        <span>Prototype for AI for Bharat Hackathon</span>
        <span>Theme 8: Smart Meter Intelligence and Loss Detection</span>
      </div>
      <div className="gov-nav">
        <button type="button" className="brand" onClick={() => scrollToId("overview")} aria-label="Go to overview">
          <span className="brand-icon">
            <Zap size={23} />
          </span>
          <span>
            <strong>GridSense AI</strong>
            <small>BESCOM Smart Meter Intelligence Dashboard</small>
          </span>
        </button>

        <div className="nav-actions">
          <button type="button" className="primary-btn" onClick={onSimulate}>
            <Siren size={16} />
            Simulate Theft
          </button>
          <button type="button" className="secondary-btn" onClick={onReset}>
            <RefreshCcw size={16} />
            Reset
          </button>
        </div>
      </div>
    </header>
  );
}

function Sidebar({ onSimulate }) {
  return (
    <aside className="left-sidebar" aria-label="Dashboard information and navigation">
      <div className="sidebar-card">
        <p className="sidebar-kicker">Dashboard Flow</p>
        <nav className="sidebar-nav" aria-label="Dashboard steps">
          {steps.map(([id, number, label]) => (
            <button key={id} type="button" onClick={() => scrollToId(id)}>
              <span>{number}</span>
              {label}
            </button>
          ))}
        </nav>
      </div>

      <div className="sidebar-card project-card">
        <div className="project-mark">
          <Zap size={22} />
        </div>
        <h3>GridSense AI</h3>
        <p>Smart Meter Intelligence and Revenue Recovery System for BESCOM.</p>
        <button type="button" className="primary-btn sidebar-demo-btn" onClick={onSimulate}>
          <Siren size={16} />
          Simulate Theft
        </button>
      </div>

      <div className="sidebar-card">
        <p className="sidebar-kicker">Hackathon Info</p>
        <div className="sidebar-info-list">
          <span><strong>AI for Bharat Hackathon 2026</strong></span>
          <span>Theme 8: Smart Meter Intelligence and Loss Detection by BESCOM</span>
          <span>Prototype uses synthetic data only.</span>
        </div>
      </div>

      <div className="sidebar-card">
        <p className="sidebar-kicker">Built With</p>
        <div className="stack-list">
          {techStack.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>

      <div className="sidebar-card">
        <p className="sidebar-kicker">Profile Links</p>
        <div className="profile-links">
          {projectLinks.map(([label, href, Icon]) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
            >
              <Icon size={16} />
              {label}
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
}

function Notice({ simulated }) {
  if (!simulated) return null;
  return (
    <div className="notice" role="status">
      <Bell size={18} />
      <div>
        <strong>Live Alert: Possible theft detected in Zone C - BES-7710</strong>
        <span>High-risk count, estimated loss, and inspection queue have been updated.</span>
      </div>
    </div>
  );
}

function Section({ id, step, title, intro, icon: Icon, children }) {
  return (
    <section id={id} className="section">
      <div className="section-heading">
        <div>
          <p className="step-label">Step {step}</p>
          <h2>{title}</h2>
          {intro ? <p>{intro}</p> : null}
        </div>
        <span className="section-icon">{Icon ? <Icon size={24} /> : <Info size={24} />}</span>
      </div>
      {children}
    </section>
  );
}

function MetricCard({ label, value, note, icon: Icon, tone = "blue" }) {
  return (
    <div className={`metric-card metric-${tone}`}>
      <div className="metric-top">
        <span>{Icon ? <Icon size={22} /> : null}</span>
      </div>
      <p>{label}</p>
      <strong>{value}</strong>
      {note ? <small>{note}</small> : null}
    </div>
  );
}

function Overview({ simulated, onSimulate }) {
  const highRisk = simulated ? 21 : 18;
  const loss = simulated ? "Rs 2.62L" : "Rs 2.40L";
  const confidence = simulated ? "94%" : "92%";

  return (
    <Section
      id="overview"
      step="1"
      title="Simple Dashboard Overview"
      intro="This first screen tells officers what is happening, where risk is high, and what needs action."
      icon={Gauge}
    >
      <div className="overview-grid">
        <div className="intro-panel">
          <span className="public-badge">
            <Building2 size={16} />
            Government-style decision support dashboard
          </span>
          <h1>Smart meter data made clear for action.</h1>
          <p>
            GridSense AI helps electricity utility officers detect abnormal usage, estimate revenue loss, predict demand,
            and prioritize field inspections. The prototype uses synthetic data only.
          </p>
          <div className="intro-actions">
            <button type="button" className="primary-btn" onClick={onSimulate}>
              <Siren size={16} />
              Run Live Demo
            </button>
            <button type="button" className="secondary-btn" onClick={() => scrollToId("alerts")}>
              View Alerts
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        <div className="status-panel">
          <h3>Current System Status</h3>
          <div className="status-row">
            <span>AI Model</span>
            <strong className="safe-text">Online</strong>
          </div>
          <div className="status-row">
            <span>Data Type</span>
            <strong>Synthetic Demo</strong>
          </div>
          <div className="status-row">
            <span>Main Risk Area</span>
            <strong className="danger-text">Zone C</strong>
          </div>
          <div className="status-row">
            <span>Recommended Action</span>
            <strong>Inspect within 24 hrs</strong>
          </div>
        </div>
      </div>

      <div className="metric-grid">
        <MetricCard label="Smart Meters" value="12,480" note="simulated meters" icon={Gauge} />
        <MetricCard label="Peak Load Forecast" value={simulated ? "9.1 MW" : "8.7 MW"} note="evening peak" icon={LineChartIcon} tone="orange" />
        <MetricCard label="High-Risk Meters" value={highRisk} note="needs attention" icon={ShieldAlert} tone="red" />
        <MetricCard label="Estimated Loss" value={loss} note="detected cases" icon={IndianRupee} tone="green" />
        <MetricCard label="AI Confidence" value={confidence} note="overall confidence" icon={Brain} />
        <MetricCard label="Inspection Cases" value={simulated ? 8 : 7} note="priority queue" icon={ClipboardCheck} tone="orange" />
      </div>
    </Section>
  );
}

function DemandForecast({ simulated }) {
  const data = useMemo(
    () =>
      baseDemandData.map((item) =>
        simulated && ["6 PM", "9 PM"].includes(item.time)
          ? { ...item, predicted: Number((item.predicted + 0.4).toFixed(1)) }
          : item,
      ),
    [simulated],
  );

  return (
    <Section
      id="forecast"
      step="2"
      title="Demand Forecasting"
      intro="The line chart shows actual demand and predicted demand. Officers can prepare before peak load happens."
      icon={LineChartIcon}
    >
      <div className="two-column">
        <div className="chart-card">
          <div className="card-title-row">
            <div>
              <h3>Actual vs Predicted Electricity Demand</h3>
              <p>Hourly demand in MW. The highlighted area shows evening peak risk.</p>
            </div>
          </div>
          <div className="chart-height">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 20, right: 28, left: 0, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#dbe3ef" />
                <XAxis dataKey="time" stroke="#475569" fontSize={12} />
                <YAxis stroke="#475569" fontSize={12} domain={[3, 10]} tickFormatter={(value) => `${value} MW`} />
                <Tooltip />
                <ReferenceArea x1="6 PM" x2="9 PM" fill="#fed7aa" fillOpacity={0.38} />
                <Line type="monotone" dataKey="actual" stroke="#1d4ed8" strokeWidth={3} dot={{ r: 4 }} name="Actual demand" />
                <Line type="monotone" dataKey="predicted" stroke="#059669" strokeWidth={3} strokeDasharray="7 6" dot={{ r: 4 }} name="Predicted demand" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="plain-card blue-left">
          <h3>AI Insight</h3>
          <p>
            GridSense predicts a peak load between 7 PM and 9 PM in Zone B due to evening residential usage.
          </p>
          <div className="mini-list">
            <span>Forecast horizon: 24 hours</span>
            <span>Peak risk: High</span>
            <span>Confidence: 91%</span>
          </div>
          <strong>Recommended action: prepare load balancing and monitor feeder stress.</strong>
        </div>
      </div>
    </Section>
  );
}

function Alerts({ alerts }) {
  return (
    <Section
      id="alerts"
      step="3"
      title="Theft and Anomaly Alerts"
      intro="Each alert explains the meter, issue, risk level, confidence score, and possible revenue loss."
      icon={ShieldAlert}
    >
      <div className="alert-grid">
        {alerts.map((alert) => (
          <article key={alert.meterId} className={`alert-card ${riskTone(alert.confidence)}`}>
            <div className="alert-head">
              <span className="alert-icon">
                <ShieldAlert size={20} />
              </span>
              <span className={statusClass(alert.risk)}>{alert.risk}</span>
            </div>
            <h3>Meter ID: {alert.meterId}</h3>
            <p>{alert.zone} | {alert.issue}</p>
            <p><strong>Reason:</strong> {alert.reason}</p>
            <div className="alert-info">
              <div>
                <span>Estimated Loss</span>
                <strong>Rs {money.format(alert.loss)}</strong>
              </div>
              <div>
                <span>AI Confidence</span>
                <strong>{alert.confidence}%</strong>
              </div>
            </div>
            <div className="confidence-bar" aria-label={`AI confidence ${alert.confidence}%`}>
              <span style={{ width: `${alert.confidence}%` }} />
            </div>
            <button type="button" className="review-btn" onClick={() => scrollToId("case")}>
              Review Case
            </button>
          </article>
        ))}
      </div>
    </Section>
  );
}

function ZoneStatus({ zones, simulated }) {
  return (
    <Section
      id="zones"
      step="4"
      title="Zone-Level Risk Status"
      intro="A simple zone view helps officers understand which area is normal, which area has peak load risk, and which area needs inspection."
      icon={MapPinned}
    >
      <div className="zone-grid">
        {zones.map((zone) => (
          <article key={zone.zone} className={`zone-card ${riskTone(zone.risk)} ${simulated && zone.zone === "Zone C" ? "zone-live" : ""}`}>
            <div className="zone-title">
              <div>
                <h3>{zone.zone}</h3>
                <p>{zone.area}</p>
              </div>
              <span className={statusClass(zone.status)}>{zone.status}</span>
            </div>
            <div className="zone-stats">
              <div>
                <span>Load</span>
                <strong>{zone.load}%</strong>
              </div>
              <div>
                <span>Risk Score</span>
                <strong>{zone.risk}</strong>
              </div>
              <div>
                <span>Anomalies</span>
                <strong>{zone.anomalies}</strong>
              </div>
            </div>
            <p className="zone-action">{zone.action}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

function MeterCase({ status, onStatus }) {
  return (
    <Section
      id="case"
      step="5"
      title="Individual Meter Investigation"
      intro="This section shows why one meter was flagged and what action an officer can take."
      icon={SearchCheck}
    >
      <div className="two-column case-layout">
        <div className="plain-card">
          <h3>Meter BES-2048</h3>
          <div className="detail-list">
            <span><strong>Location:</strong> Peenya Industrial Area</span>
            <span><strong>Current Status:</strong> {status}</span>
            <span><strong>AI Confidence:</strong> 94%</span>
            <span><strong>Estimated Loss:</strong> Rs 18,500</span>
            <span><strong>Recommended Action:</strong> Field inspection within 24 hours</span>
          </div>
          <div className="decision-actions">
            <button type="button" className="safe-btn" onClick={() => onStatus("Approved Inspection")}>Approve Inspection</button>
            <button type="button" className="secondary-btn" onClick={() => onStatus("False Positive")}>False Positive</button>
            <button type="button" className="danger-btn" onClick={() => onStatus("Escalated")}>Escalate</button>
          </div>
        </div>

        <div className="chart-card">
          <h3>Usage Pattern</h3>
          <p>Normal usage is compared with current abnormal usage.</p>
          <div className="chart-height small">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={meterUsage} margin={{ top: 16, right: 24, left: 0, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#dbe3ef" />
                <XAxis dataKey="time" stroke="#475569" fontSize={12} />
                <YAxis stroke="#475569" fontSize={12} />
                <Tooltip />
                <Line type="monotone" dataKey="normal" stroke="#1d4ed8" strokeWidth={3} name="Normal usage" />
                <Line type="monotone" dataKey="current" stroke="#dc2626" strokeWidth={3} name="Current usage" />
                <ReferenceDot x="2 PM" y={21} r={7} fill="#dc2626" stroke="#ffffff" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="explanation-box">
        <Brain size={20} />
        <p>
          Consumption dropped by 72% after 2:00 PM while nearby peer meters continued normal usage. Historical pattern
          does not show this behavior, and no seasonal reason was detected. This indicates possible meter bypass or
          tampering.
        </p>
      </div>
    </Section>
  );
}

function RevenueImpact({ simulated }) {
  const totalLoss = simulated ? "Rs 2.62L" : "Rs 2.40L";
  const recovery = simulated ? "Rs 1.96L" : "Rs 1.80L";

  return (
    <section className="section compact-section" id="revenue">
      <div className="section-heading">
        <div>
          <p className="step-label">Financial View</p>
          <h2>Revenue Loss Estimation</h2>
          <p>The dashboard converts suspicious readings into estimated loss and recovery priority.</p>
        </div>
        <span className="section-icon"><IndianRupee size={24} /></span>
      </div>

      <div className="two-column">
        <div className="metric-grid compact">
          <MetricCard label="Loss Detected" value={totalLoss} note="current cases" icon={IndianRupee} tone="red" />
          <MetricCard label="Potential Recovery" value={recovery} note="after inspection" icon={CheckCircle2} tone="green" />
          <MetricCard label="Avg Loss Per Case" value="Rs 13,300" note="high-risk meters" icon={BarChart3} tone="orange" />
          <MetricCard label="Projected Monthly Saving" value="Rs 18.6L" note="if scaled" icon={Gauge} />
        </div>
        <div className="chart-card">
          <h3>Zone-wise Estimated Loss</h3>
          <div className="chart-height small">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueLoss} margin={{ top: 16, right: 22, left: 0, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#dbe3ef" />
                <XAxis dataKey="zone" stroke="#475569" fontSize={12} />
                <YAxis stroke="#475569" fontSize={12} tickFormatter={(value) => `${Math.round(value / 1000)}k`} />
                <Tooltip formatter={(value) => [`Rs ${money.format(value)}`, "Estimated loss"]} />
                <Bar dataKey="loss" radius={[6, 6, 0, 0]}>
                  {revenueLoss.map((entry) => (
                    <Cell key={entry.zone} fill={entry.zone === "Zone C" ? "#dc2626" : "#2563eb"} />
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

function InspectionQueue({ rows, onDecision }) {
  return (
    <Section
      id="queue"
      step="6"
      title="Inspection Priority Queue"
      intro="This is the officer workflow. AI recommends cases, but the final decision remains with authorized staff."
      icon={ClipboardCheck}
    >
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Priority</th>
              <th>Meter ID</th>
              <th>Zone</th>
              <th>Issue</th>
              <th>Loss</th>
              <th>Confidence</th>
              <th>Action</th>
              <th>Status</th>
              <th>Decision</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.meterId}>
                <td><span className={statusClass(row.priority)}>{row.priority}</span></td>
                <td>{row.meterId}</td>
                <td>{row.zone}</td>
                <td>{row.issue}</td>
                <td>Rs {money.format(row.loss)}</td>
                <td>{row.confidence}%</td>
                <td>{row.action}</td>
                <td><span className={statusClass(row.status)}>{row.status}</span></td>
                <td>
                  <div className="table-buttons">
                    <button type="button" onClick={() => onDecision(row.meterId, "Approved")}>Approve</button>
                    <button type="button" onClick={() => onDecision(row.meterId, "Rejected")}>Reject</button>
                    <button type="button" onClick={() => onDecision(row.meterId, "Escalated")}>Escalate</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}

function Explainability() {
  const reasons = [
    "72% sudden drop after 2 PM",
    "Nearby peer meters remained normal",
    "Historical pattern mismatch detected",
    "No holiday or seasonal reason found",
    "Risk score uses severity, confidence, zone load, and peer deviation",
  ];

  return (
    <Section
      id="explain"
      step="7"
      title="Explainable AI and Audit Trail"
      intro="For public systems, officers must know why AI made a recommendation. This section makes the decision transparent."
      icon={FileCheck2}
    >
      <div className="two-column">
        <div className="plain-card">
          <h3>Why AI Flagged BES-2048</h3>
          <div className="reason-list">
            {reasons.map((reason) => (
              <div key={reason}>
                <CheckCircle2 size={18} />
                <span>{reason}</span>
              </div>
            ))}
          </div>
          <div className="formula">
            Risk Score = Anomaly Severity + AI Confidence + Zone Load Risk + Peer Deviation
          </div>
        </div>

        <div className="plain-card">
          <h3>Audit Timeline</h3>
          <ol className="timeline">
            <li><strong>2:00 PM</strong><span>Smart meter reading received</span></li>
            <li><strong>2:01 PM</strong><span>Pattern compared with 7-day history</span></li>
            <li><strong>2:02 PM</strong><span>Peer-group deviation detected</span></li>
            <li><strong>2:03 PM</strong><span>AI generated theft-risk alert</span></li>
            <li><strong>2:05 PM</strong><span>Case moved to officer review queue</span></li>
          </ol>
        </div>
      </div>

      <div className="public-note">
        <ShieldCheck size={22} />
        <p>
          The AI does not directly punish or disconnect consumers. It only prioritizes suspicious cases for officer
          verification. Final action remains with authorized staff.
        </p>
      </div>
    </Section>
  );
}

function Footer() {
  const quickLinks = [
    ["Dashboard", "overview"],
    ["Demand Forecasting", "forecast"],
    ["Theft Detection", "alerts"],
    ["Zone Intelligence", "zones"],
    ["Meter Case", "case"],
    ["Inspection Queue", "queue"],
    ["Explainability", "explain"],
  ];

  return (
    <footer className="simple-footer">
      <div className="footer-inner">
        <div className="footer-brand-block">
          <div className="footer-logo">
            <Zap size={24} />
          </div>
          <div>
            <strong>GridSense AI</strong>
            <span>Smart Meter Intelligence and Revenue Recovery System for BESCOM</span>
          </div>
          <p>
            Built for AI for Bharat Hackathon - Theme 8. GridSense AI transforms smart meter data into theft alerts,
            demand forecasts, inspection priorities, explainable decisions, and revenue recovery actions.
          </p>
        </div>

        <div className="footer-column">
          <h3>Dashboard</h3>
          {quickLinks.map(([label, id]) => (
            <button key={id} type="button" onClick={() => scrollToId(id)}>
              {label}
            </button>
          ))}
        </div>

        <div className="footer-column">
          <h3>Built With</h3>
          <div className="footer-stack">
            {techStack.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>

        <div className="footer-column">
          <h3>Project Links</h3>
          {projectLinks.map(([label, href, Icon]) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
            >
              <Icon size={16} />
              {label}
            </a>
          ))}
        </div>
      </div>

      <div className="footer-bottom">
        <div>
          <strong>AI for Bharat Hackathon 2026</strong>
          <span>Theme 8 - AI for Smart Meter Intelligence and Loss Detection by BESCOM</span>
          <span>Prototype uses synthetic data only.</span>
        </div>
        <p>
          (C) 2026 GridSense AI. Not an official BESCOM product. Built for hackathon demonstration and decision-support
          research.
        </p>
      </div>
    </footer>
  );
}

export default function App() {
  const [simulated, setSimulated] = useState(false);
  const [queueRows, setQueueRows] = useState(baseQueue);
  const [caseStatus, setCaseStatus] = useState("High Risk");

  const alerts = useMemo(() => (simulated ? [liveAlert, ...baseAlerts] : baseAlerts), [simulated]);

  const zones = useMemo(
    () =>
      baseZones.map((zone) => {
        if (!simulated || zone.zone !== "Zone C") return zone;
        return {
          ...zone,
          load: 36,
          risk: 98,
          anomalies: 10,
          action: "Dispatch inspection team immediately",
        };
      }),
    [simulated],
  );

  const handleSimulate = () => {
    setSimulated(true);
    setQueueRows((rows) => (rows.some((row) => row.meterId === liveQueueCase.meterId) ? rows : [liveQueueCase, ...rows]));
    setTimeout(() => scrollToId("alerts"), 150);
  };

  const handleReset = () => {
    setSimulated(false);
    setQueueRows(baseQueue);
    setCaseStatus("High Risk");
    setTimeout(() => scrollToId("overview"), 150);
  };

  const updateDecision = (meterId, status) => {
    setQueueRows((rows) => rows.map((row) => (row.meterId === meterId ? { ...row, status } : row)));
    if (meterId === "BES-2048") {
      if (status === "Approved") setCaseStatus("Approved Inspection");
      if (status === "Rejected") setCaseStatus("False Positive");
      if (status === "Escalated") setCaseStatus("Escalated");
    }
  };

  const updateCaseStatus = (status) => {
    setCaseStatus(status);
    const queueStatus =
      status === "Approved Inspection" ? "Approved" : status === "False Positive" ? "Rejected" : "Escalated";
    setQueueRows((rows) => rows.map((row) => (row.meterId === "BES-2048" ? { ...row, status: queueStatus } : row)));
  };

  return (
    <div className="app-shell">
      <Header onSimulate={handleSimulate} onReset={handleReset} />
      <div className="dashboard-shell">
        <Sidebar onSimulate={handleSimulate} />
        <main className="page">
          <Notice simulated={simulated} />
          <Overview simulated={simulated} onSimulate={handleSimulate} />
          <DemandForecast simulated={simulated} />
          <Alerts alerts={alerts} />
          <ZoneStatus zones={zones} simulated={simulated} />
          <MeterCase status={caseStatus} onStatus={updateCaseStatus} />
          <RevenueImpact simulated={simulated} />
          <InspectionQueue rows={queueRows} onDecision={updateDecision} />
          <Explainability />
        </main>
      </div>
      <Footer />
    </div>
  );
}
