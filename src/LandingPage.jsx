import { useState } from "react";
import {
  Zap,
  Shield,
  BarChart3,
  Brain,
  IndianRupee,
  Globe2,
  Eye,
  FileCheck2,
  Clock,
  MapPin,
  AlertTriangle,
  ChevronRight,
  Sun,
  Moon,
  Github,
  Linkedin,
  Mail,
  Users,
  TrendingUp,
  Leaf,
  CheckCircle2,
  ArrowRight,
  Play,
} from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Theft & Anomaly Detection",
    description: "AI-powered detection flags sudden consumption drops, irregular spikes, peer-group deviations, and bypass-style risks with 94%+ accuracy.",
    highlight: "Real-time alerts"
  },
  {
    icon: BarChart3,
    title: "Demand Forecasting",
    description: "Predict peak load windows and feeder stress using hourly demand patterns. Optimize distribution across Bengaluru zones.",
    highlight: "24-hour predictions"
  },
  {
    icon: MapPin,
    title: "Zone-Level Risk Scoring",
    description: "Comprehensive risk assessment for each zone (Peenya, Whitefield, KR Puram, Yelahanka, Electronic City) with actionable insights.",
    highlight: "5-zone coverage"
  },
  {
    icon: Brain,
    title: "AI Officer Summaries",
    description: "Structured, explainable AI summaries for officers. Mirror production Gemini-style prompt contracts for audit-friendly outputs.",
    highlight: "Gemini-ready"
  },
  {
    icon: IndianRupee,
    title: "Revenue Recovery Engine",
    description: "Estimate detected loss, recovery potential, and savings opportunity. Calculate BESCOM-style tariff with slab-based monthly savings.",
    highlight: "₹ Crores potential"
  },
  {
    icon: ClipboardCheck,
    title: "Inspection Prioritization",
    description: "Ranked inspection queue lets officers approve, reject, or escalate cases. Human-in-the-loop workflow ensures accountability.",
    highlight: "Smart queue"
  },
  {
    icon: TrendingUp,
    title: "Scenario Simulator",
    description: "Model monthly outcomes from solar capacity, battery size, and flexible load improvements with instant rupee recalculation.",
    highlight: "What-if analysis"
  },
  {
    icon: Leaf,
    title: "Carbon Impact View",
    description: "Convert energy savings into CO2 avoided using India grid emission factor model. Track tree-equivalent environmental impact.",
    highlight: "Green metrics"
  },
];

const stats = [
  { value: "94%", label: "Detection Accuracy" },
  { value: "₹2.3Cr", label: "Revenue at Risk" },
  { value: "5", label: "Bengaluru Zones" },
  { value: "24/7", label: "Real-time Monitoring" },
];

const techStack = [
  { name: "React", color: "from-cyan-500 to-blue-500" },
  { name: "Vite", color: "from-purple-500 to-pink-500" },
  { name: "Tailwind CSS", color: "from-teal-500 to-emerald-500" },
  { name: "Recharts", color: "from-orange-500 to-red-500" },
  { name: "Framer Motion", color: "from-violet-500 to-purple-500" },
  { name: "Lucide Icons", color: "from-blue-500 to-indigo-500" },
];

const requirements = [
  "Smart meter infrastructure with hourly readings",
  "BESCOM backend data feeds (feeder-level telemetry)",
  "Historical consumption data (minimum 7 days)",
  "Peer group definitions by zone/feeder",
  "Officer authentication & role-based access",
  "Field inspection workflow integration",
  "Gemini/AI Studio API for production summaries (optional)",
  "Vercel deployment for cloud hosting",
];

export default function LandingPage({ onEnterDashboard, darkMode, onToggleDarkMode }) {
  const [activeFeature, setActiveFeature] = useState(null);

  return (
    <div className={`landing-page ${darkMode ? 'dark' : 'light'}`}>
      {/* Animated Background */}
      <div className="landing-bg">
        <div className="grid-pattern" />
        <div className="gradient-orb gradient-orb-1" />
        <div className="gradient-orb gradient-orb-2" />
        <div className="gradient-orb gradient-orb-3" />
      </div>

      {/* Navigation */}
      <nav className="landing-nav">
        <div className="nav-container">
          <button className="brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="brand-icon">
              <Zap size={24} />
            </div>
            <div className="brand-text">
              <strong>GridSense AI</strong>
              <span>BESCOM Smart Meter Intelligence</span>
            </div>
          </button>

          <div className="nav-links">
            <a href="#features">Features</a>
            <a href="#requirements">Requirements</a>
            <a href="#tech">Tech Stack</a>
            <a href="#contact">Contact</a>
          </div>

          <div className="nav-actions">
            <button 
              className="theme-toggle"
              onClick={onToggleDarkMode}
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className="primary-btn" onClick={onEnterDashboard}>
              Launch Dashboard
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-badge">
            <span className="badge-dot" />
            AI for Bharat Hackathon 2026 • Theme 8
          </div>
          
          <h1 className="hero-title">
            <span className="title-line">Smart Meter</span>
            <span className="title-line accent">Intelligence</span>
            <span className="title-line">& Revenue Recovery</span>
          </h1>
          
          <p className="hero-description">
            GridSense AI transforms raw smart meter telemetry into actionable intelligence. 
            Detect theft, predict demand, prioritize inspections, and recover revenue—all with 
            explainable AI that officers can trust.
          </p>

          <div className="hero-cta">
            <button className="cta-primary" onClick={onEnterDashboard}>
              <Play size={20} />
              Explore Dashboard
            </button>
            <a href="#features" className="cta-secondary">
              Learn More
              <ChevronRight size={18} />
            </a>
          </div>

          <div className="hero-stats">
            {stats.map((stat, i) => (
              <div key={i} className="stat-card">
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="hero-preview">
          <div className="preview-frame">
            <div className="preview-header">
              <div className="preview-dots">
                <span /><span /><span />
              </div>
              <span className="preview-title">GridSense AI Dashboard</span>
            </div>
            <div className="preview-content">
              <div className="preview-metrics">
                <div className="preview-metric">
                  <span className="metric-icon"><AlertTriangle /></span>
                  <span className="metric-value">12</span>
                  <span className="metric-label">Active Alerts</span>
                </div>
                <div className="preview-metric">
                  <span className="metric-icon"><TrendingUp /></span>
                  <span className="metric-value">₹2.3Cr</span>
                  <span className="metric-label">At Risk</span>
                </div>
                <div className="preview-metric">
                  <span className="metric-icon"><Shield /></span>
                  <span className="metric-value">94%</span>
                  <span className="metric-label">Accuracy</span>
                </div>
              </div>
              <div className="preview-chart">
                <div className="chart-bars">
                  {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 88, 72].map((h, i) => (
                    <div 
                      key={i} 
                      className="chart-bar" 
                      style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="section-container">
          <div className="section-header">
            <span className="section-badge">Core Capabilities</span>
            <h2 className="section-title">
              Everything you need for<br />
              <span className="accent-text">smart meter intelligence</span>
            </h2>
            <p className="section-description">
              A complete decision-support platform built for BESCOM officers.
              From anomaly detection to revenue recovery.
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature, i) => (
              <div 
                key={i}
                className={`feature-card ${activeFeature === i ? 'active' : ''}`}
                onMouseEnter={() => setActiveFeature(i)}
                onMouseLeave={() => setActiveFeature(null)}
              >
                <div className="feature-icon">
                  <feature.icon size={28} />
                </div>
                <div className="feature-content">
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
                <span className="feature-highlight">{feature.highlight}</span>
                <div className="feature-glow" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section id="requirements" className="requirements-section">
        <div className="section-container">
          <div className="requirements-wrapper">
            <div className="requirements-content">
              <span className="section-badge">Implementation</span>
              <h2 className="section-title">
                System <span className="accent-text">Requirements</span>
              </h2>
              <p className="section-description">
                To deploy GridSense AI in production, you'll need the following infrastructure and integrations.
              </p>
              
              <ul className="requirements-list">
                {requirements.map((req, i) => (
                  <li key={i}>
                    <CheckCircle2 size={20} />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="requirements-visual">
              <div className="viz-card">
                <div className="viz-header">
                  <Globe2 size={24} />
                  <span>BESCOM Integration</span>
                </div>
                <div className="viz-flow">
                  <div className="flow-node source">
                    <BarChart3 size={20} />
                    <span>Smart Meters</span>
                  </div>
                  <div className="flow-arrow">
                    <ChevronRight size={24} />
                  </div>
                  <div className="flow-node processor">
                    <Brain size={20} />
                    <span>GridSense AI</span>
                  </div>
                  <div className="flow-arrow">
                    <ChevronRight size={24} />
                  </div>
                  <div className="flow-node target">
                    <Users size={20} />
                    <span>Officers</span>
                  </div>
                </div>
                <div className="viz-stats">
                  <div className="viz-stat">
                    <span className="viz-stat-value">Real-time</span>
                    <span className="viz-stat-label">Data Flow</span>
                  </div>
                  <div className="viz-stat">
                    <span className="viz-stat-value">Instant</span>
                    <span className="viz-stat-label">Alerts</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section id="tech" className="tech-section">
        <div className="section-container">
          <div className="section-header">
            <span className="section-badge">Built With</span>
            <h2 className="section-title">
              Modern <span className="accent-text">tech stack</span>
            </h2>
            <p className="section-description">
              Powered by React, optimized for Vercel, ready for production.
            </p>
          </div>

          <div className="tech-grid">
            {techStack.map((tech, i) => (
              <div 
                key={i} 
                className="tech-card"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className={`tech-badge ${tech.color}`}>
                  {tech.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="section-container">
          <div className="contact-wrapper">
            <div className="contact-content">
              <h2>Ready to transform BESCOM operations?</h2>
              <p>
                GridSense AI is a prototype for AI for Bharat Hackathon 2026.
                Connect with us to learn more about production deployment.
              </p>
              <div className="contact-links">
                <a href="https://github.com/Nikhilsai-9/gridsense-ai" target="_blank" rel="noreferrer">
                  <Github size={20} />
                  View on GitHub
                </a>
                <a href="https://www.linkedin.com/in/nikhilsai-kenguri-0b0976322" target="_blank" rel="noreferrer">
                  <Linkedin size={20} />
                  Connect on LinkedIn
                </a>
                <a href="mailto:sainikhil1146@gmail.com">
                  <Mail size={20} />
                  Get in Touch
                </a>
              </div>
            </div>

            <button className="cta-primary large" onClick={onEnterDashboard}>
              Launch Dashboard
              <ArrowRight size={22} />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-container">
          <div className="footer-brand">
            <Zap size={24} />
            <div>
              <strong>GridSense AI</strong>
              <span>AI for Bharat Hackathon 2026 • Theme 8</span>
            </div>
          </div>
          <p className="footer-disclaimer">
            This is a hackathon prototype. Not an official BESCOM product.
            Built for AI-driven smart meter intelligence demonstration.
          </p>
        </div>
      </footer>
    </div>
  );
}
