import { useState } from "react";
import ArchitecturePage from "./ArchitecturePage.jsx";

// ── Glean Design Tokens ──
// Primary: #3B5EFB, Background: #F7F8FA, Border: #E8EBF0
// Text: heading #1A1D26, body #4A5068, muted #8B90A0

// ── Data ──
const initialDeals = [
  { id: 1, name: "Aether AI", stage: "IC Review", sector: "Vertical AI / Legal", score: 92, founder: "Sarah Chen", thesis: "Vertical AI for Legal", founded: "2023", hq: "San Francisco, CA", employees: "45", totalFunding: "$18.2M (Seed + A)", lastRound: "Series A, $15M, Jan 2026", revenue: "$2.8M ARR", keyPeople: "Sarah Chen (CEO), David Park (CTO), Lisa Wang (VP Eng)" },
  { id: 2, name: "Nomad Robotics", stage: "Diligence", sector: "Robotics / Logistics", score: 78, founder: "Marcus Johnson", thesis: "Autonomous Operations", founded: "2022", hq: "Pittsburgh, PA", employees: "32", totalFunding: "$9.5M (Seed)", lastRound: "Seed, $9.5M, Aug 2025", revenue: "$800K ARR", keyPeople: "Marcus Johnson (CEO), Raj Patel (CTO), Amy Liu (COO)" },
  { id: 3, name: "Lattice Bio", stage: "First Meeting", sector: "Biotech / AI", score: 85, founder: "Priya Patel", thesis: "AI-Native Drug Discovery", founded: "2024", hq: "Cambridge, MA", employees: "18", totalFunding: "$4M (Pre-Seed)", lastRound: "Pre-Seed, $4M, Nov 2025", revenue: "Pre-revenue", keyPeople: "Priya Patel (CEO), James Liu (CSO), Maria Santos (Head of ML)" },
  { id: 4, name: "Covalent Data", stage: "Term Sheet", sector: "Data Infra", score: 88, founder: "James Wright", thesis: "Modern Data Stack", founded: "2022", hq: "New York, NY", employees: "58", totalFunding: "$14M (Seed + Bridge)", lastRound: "Bridge, $4M, Sep 2025", revenue: "$5.1M ARR", keyPeople: "James Wright (CEO), Ana Rivera (CTO), Tom Harris (VP Sales)" },
  { id: 5, name: "Flux Energy", stage: "Sourcing", sector: "Climate / Energy", score: 65, founder: "Ana Rodrigues", thesis: "Energy Transition", founded: "2023", hq: "Austin, TX", employees: "12", totalFunding: "$2.5M (Pre-Seed)", lastRound: "Pre-Seed, $2.5M, Jun 2025", revenue: "Pre-revenue", keyPeople: "Ana Rodrigues (CEO), Ben Carter (CTO)" },
];

const prismColumns = ["Last Interaction", "Key Risks", "Relationship Strength", "Thesis Alignment", "Next Action"];
const prismData = {
  1: ["IC prep call with Sarah on Mar 16. Updated financials show 3.2x ARR growth.", "Competitor Ironclad raised Series C. Need to assess differentiation.", "Strong. 4 touchpoints in 30 days. Intro'd by Vanta CEO.", "High. Directly maps to Vertical AI for Legal thesis.", "Schedule 3 reference calls. Prep IC memo by Friday."],
  2: ["Marcus demo'd warehouse picking on Mar 11. 40% faster than Locus.", "Hardware dependency on single Shenzhen supplier. Lead time risk.", "Moderate. 2 touchpoints in 30 days. Stanford AI Lab network.", "Medium. Adjacent to Autonomous Ops thesis but hardware-heavy.", "Request supplier diversification plan. Connect to FleetOps."],
  3: ["Intro meeting with Priya on Mar 17. Broad Institute spinout, 3 Nature pubs.", "Very early. No revenue. Long regulatory timeline.", "New. First meeting. LP Dr. Kim flagged research 3 months ago.", "High. Core to AI-Native Drug Discovery thesis.", "Send bio thesis doc. Schedule deep-dive next week."],
  4: ["Term sheet sent Mar 18. James countered on pro-rata and board seat.", "Competitive round. Benchmark also has term sheet out.", "Very strong. 8 touchpoints in 60 days. Partner Mike's classmate.", "High. Fits Modern Data Stack thesis. Unique data lineage approach.", "Mike calls James tonight. Prepare portfolio intro package."],
  5: ["Cold inbound from Ana via LinkedIn on Mar 10. Claims 2 utility LOIs.", "Unverified traction. Capital-intensive model. No warm reference.", "Weak. Single cold inbound. No network connection.", "Medium. Energy Transition thesis but limited sector expertise.", "Verify utility LOIs. Search network for energy advisors."],
};

const thesesData = [
  { id: "t1", name: "Vertical AI for Legal", signals: 8,
    draft: "We believe the legal industry is ripe for vertical AI disruption. Legal workflows are document-heavy, repetitive, and high-value, making them ideal candidates for LLM-powered automation. Contract review, due diligence, and regulatory compliance represent a combined TAM of $50B+ by 2030. We are looking for teams that combine deep legal domain expertise with cutting-edge ML capabilities, particularly in areas like contract analysis, litigation prediction, and compliance monitoring.",
    companies: [
      { name: "Aether AI", stage: "IC Review", match: 95, reason: "Contract review automation. $2.8M ARR, 3.2x growth. Strong founder from Ironclad.", inPipeline: true },
      { name: "LegalMind", stage: "New", match: 82, reason: "AI-powered regulatory compliance monitoring. Pre-revenue but strong technical team from Google DeepMind.", inPipeline: false },
      { name: "ClauseHound", stage: "New", match: 78, reason: "Template automation for mid-market law firms. $400K ARR, growing 2x. Niche but defensible.", inPipeline: false },
    ],
    posts: [
      { author: "Jake Heller", platform: "LinkedIn", date: "Mar 15", snippet: "The legal AI market is about to have its ChatGPT moment. Contract review is just the beginning..." },
      { author: "Sarah Chen", platform: "X", date: "Mar 12", snippet: "Just shipped our new clause detection model. 94% accuracy on non-standard terms across 12 jurisdictions." },
    ],
    similarTheses: [
      { fund: "a16z", name: "AI for Professional Services", overlap: "68%" },
      { fund: "Bessemer", name: "Legal Tech 3.0", overlap: "82%" },
    ],
    experts: [
      { name: "Prof. Daniel Katz", role: "Illinois Tech, Computational Legal Studies", connection: "2nd degree, via LP Stanford Law" },
      { name: "Maria Torres", role: "Former CLO, Stripe", connection: "1st degree, portfolio network" },
    ],
  },
  { id: "t2", name: "Modern Data Stack", signals: 5,
    draft: "The modern data stack is entering a consolidation phase where point solutions (ingestion, transformation, orchestration, observability) are merging into integrated platforms. We believe the next wave of winners will own the data lineage and quality layer, providing end-to-end visibility that current tools lack. Key signals: rising demand for real-time data lineage, regulatory pressure (EU AI Act) requiring data provenance, and enterprise frustration with tool sprawl.",
    companies: [
      { name: "Covalent Data", stage: "Term Sheet", match: 92, reason: "Real-time data lineage. $5.1M ARR. Unique approach vs. Atlan, Monte Carlo.", inPipeline: true },
      { name: "Graphite Analytics", stage: "New", match: 75, reason: "Data quality monitoring with lineage integration. Seed stage, $1.2M ARR. Strong enterprise traction.", inPipeline: false },
    ],
    posts: [
      { author: "Benn Stancil", platform: "Substack", date: "Mar 14", snippet: "The data stack is collapsing. Point solutions are dying. The winners will own the full pipeline..." },
    ],
    similarTheses: [
      { fund: "Redpoint", name: "Data Infrastructure", overlap: "74%" },
    ],
    experts: [
      { name: "Tristan Handy", role: "Founder, dbt Labs", connection: "2nd degree, via Mike (Partner)" },
    ],
  },
  { id: "t3", name: "AI-Native Drug Discovery", signals: 11,
    draft: "AI-native drug discovery represents a paradigm shift where computational approaches are not layered onto traditional pharma workflows but instead form the foundation of the R&D process. We target teams with both strong ML capabilities and wet lab access, as pure computational plays have struggled to translate in-silico results to clinical outcomes. Key areas: protein structure prediction, molecular dynamics simulation, and clinical trial optimization.",
    companies: [
      { name: "Lattice Bio", stage: "First Meeting", match: 90, reason: "Broad Institute spinout. 3 Nature publications. Unique protein folding approach with wet lab.", inPipeline: true },
      { name: "MolecularOS", stage: "New", match: 80, reason: "AI-driven clinical trial optimization. Partnership with 2 top-10 pharma companies. Series A ready.", inPipeline: false },
      { name: "SynthBio Labs", stage: "New", match: 72, reason: "Synthetic biology meets ML for drug candidate generation. Very early but compelling science.", inPipeline: false },
      { name: "PharmaGraph", stage: "New", match: 68, reason: "Knowledge graph for drug interactions. $600K ARR from hospital systems.", inPipeline: false },
    ],
    posts: [
      { author: "Daphne Koller", platform: "LinkedIn", date: "Mar 16", snippet: "Excited to see the next generation of AI-native biotech companies. The integration of wet lab and compute is key." },
      { author: "Dr. Priya Patel", platform: "X", date: "Mar 11", snippet: "Our latest paper on protein folding dynamics is out in Nature. Thrilled with the results." },
      { author: "a16z Bio Team", platform: "LinkedIn", date: "Mar 9", snippet: "Why we think AI-native drug discovery will produce the first $100B biotech company within a decade." },
    ],
    similarTheses: [
      { fund: "a16z Bio", name: "AI-First Pharma", overlap: "91%" },
      { fund: "Arch Venture", name: "Computational Biology", overlap: "76%" },
      { fund: "Lux Capital", name: "Atoms + Bits in Bio", overlap: "70%" },
    ],
    experts: [
      { name: "Dr. Daphne Koller", role: "CEO, insitro", connection: "2nd degree, via LP Stanford" },
      { name: "Dr. Kim, Samsung Ventures", role: "LP, biotech focus", connection: "1st degree, LP" },
      { name: "Prof. David Baker", role: "UW, protein design pioneer", connection: "3rd degree" },
    ],
  },
  { id: "t4", name: "Autonomous Operations", signals: 3,
    draft: "We track opportunities in autonomous systems applied to physical operations: warehousing, manufacturing, logistics, and field services. The thesis is that advances in perception, manipulation, and planning (driven by foundation models) are crossing the threshold from R&D curiosity to production deployment. We prefer software-heavy approaches that can leverage commodity hardware over full-stack robotics plays.",
    companies: [
      { name: "Nomad Robotics", stage: "Diligence", match: 85, reason: "Warehouse picking system. 40% faster than Locus in pilot. Hardware risk is key concern.", inPipeline: true },
      { name: "AutoField", stage: "New", match: 70, reason: "Autonomous inspection drones for infrastructure. $500K ARR from utility companies.", inPipeline: false },
    ],
    posts: [
      { author: "Pieter Abbeel", platform: "X", date: "Mar 13", snippet: "Foundation models for robotics are finally working. The next 2 years will be transformative for warehouse automation." },
    ],
    similarTheses: [
      { fund: "Lux Capital", name: "Frontier Robotics", overlap: "65%" },
    ],
    experts: [
      { name: "Ken Goldberg", role: "UC Berkeley, Robotics Lab", connection: "2nd degree, via portfolio FleetOps CTO" },
    ],
  },
];

const dealTimeline = [
  { date: "Mar 18", sources: ["Gmail"], text: "Term sheet counter-proposal received from James. Requesting full pro-rata rights and observer seat instead of board seat." },
  { date: "Mar 17", sources: ["Google Docs"], text: "Investment memo v3 updated by Associate Kim. Added competitive analysis section comparing Atlan, Monte Carlo, Metaphor." },
  { date: "Mar 16", sources: ["Calendar", "Granola"], text: "Technical deep-dive with James and CTO Rivera. Covered data lineage architecture, real-time processing, SOC 2 compliance." },
  { date: "Mar 14", sources: ["Affinity"], text: "Deal stage moved to Term Sheet. Valuation range set at $45-50M pre-money. Lead allocation: $8M." },
  { date: "Mar 12", sources: ["Gmail"], text: "Reference call with VP Eng at Snowflake (customer). Rated data lineage tool as best evaluated. Cut incident response 60%." },
  { date: "Mar 10", sources: ["Calendar", "Granola"], text: "Partner meeting with James. Discussed GTM strategy, hiring plan for next 12 months, Series A milestones." },
];

const netPaths = [
  { nodes: ["You (Partner)", "David Kim, CEO @ Vanta", "James Wright, CEO @ Covalent"], via: "Board member, Former co-founder" },
  { nodes: ["Mike (Partner)", "James Wright, CEO @ Covalent"], via: "Stanford MBA '14 classmates" },
  { nodes: ["LP: Samsung Ventures", "Ana Rivera, CTO @ Covalent"], via: "Co-investor in prior Seed" },
];

const portfolioData = [
  { name: "Vanta", invested: "Series A, $6M", moic: "3.2x", status: "Healthy", challenges: "Struggling to hire senior ML engineers. Enterprise pipeline slower than forecast in Q1.", intros: "Connect to Covalent Data (integration partner), Aether AI (shared legal compliance)." },
  { name: "FleetOps", invested: "Seed, $3M", moic: "1.8x", status: "Watch", challenges: "Warehouse pilot with Target stalled. Procurement delays.", intros: "LP Jennifer Park (ex-Target board). Nomad Robotics for tech partnership." },
  { name: "Meridian Health", invested: "Series A, $8M", moic: "1.2x", status: "Alert", challenges: "FDA submission slipped 6 weeks. 14 months runway at current spend.", intros: "Lattice Bio (regulatory exp). Sarah Chen at Aether knows FDA reviewers." },
  { name: "Cobalt Security", invested: "Seed, $2.5M", moic: "5.1x", status: "Healthy", challenges: "Scaling sales team. Need VP Sales with enterprise security background.", intros: "Tom Harris at Covalent Data (former Palo Alto Networks)." },
];

const searchResults = [
  { name: "QuantumLeap AI", sector: "Quantum Computing / ML", source: "PitchBook", funding: "$6M Seed" },
  { name: "Quantum Circuits Inc", sector: "Quantum Hardware", source: "Harmonic", funding: "$22M Series A" },
  { name: "QuarkData", sector: "Data Infrastructure", source: "PitchBook", funding: "$3M Pre-Seed" },
  { name: "Quanta Health", sector: "Healthcare AI", source: "Harmonic", funding: "$8M Seed" },
];

// ── Icons ──
const Icons = {
  thesis: () => <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5"/><path d="M7 10l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  pipeline: () => <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/><rect x="11" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/><rect x="3" y="11" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/><rect x="11" y="11" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/></svg>,
  dealroom: () => <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M2 8h16" stroke="currentColor" strokeWidth="1.5"/><path d="M7 4V8" stroke="currentColor" strokeWidth="1.5"/></svg>,
  portfolio: () => <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 10l3-6h8l3 6-3 6H6L3 10z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><circle cx="10" cy="10" r="2" stroke="currentColor" strokeWidth="1.5"/></svg>,
  network: () => <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="5" r="2" stroke="currentColor" strokeWidth="1.5"/><circle cx="5" cy="14" r="2" stroke="currentColor" strokeWidth="1.5"/><circle cx="15" cy="14" r="2" stroke="currentColor" strokeWidth="1.5"/><path d="M10 7v2M8 11l-2 2M12 11l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  search: () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5"/><path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  send: () => <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M12 2L6 8M12 2l-4 10-2-4-4-2 10-4z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  chevron: ({ open }) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ transform: open ? "rotate(90deg)" : "rotate(0)", transition: "transform 0.15s" }}><path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  plus: () => <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 3v8M3 7h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  analyst: () => <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3" y="3" width="14" height="14" rx="3" stroke="currentColor" strokeWidth="1.5"/><circle cx="10" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.2"/><path d="M6 15c0-2.2 1.8-4 4-4s4 1.8 4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>,
  fileExcel: () => <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="1" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.2"/><path d="M4 4l6 6M10 4l-6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>,
  fileWord: () => <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="1" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.2"/><path d="M4 4l1.5 6L7 6l1.5 4L10 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>,
  request: () => <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1v8M4 6l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M2 10v2a1 1 0 001 1h8a1 1 0 001-1v-2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>,
};

const agentsData = [
  { id: "a1", name: "Portfolio Health Check", description: "Sends casual check-in emails to 5 portfolio CEOs per week, analyzes responses, and surfaces what they need help with.", schedule: "Weekly, Monday 9am", status: "Active", lastRun: "Mar 17", result: "Sent 5 emails. 3 responded. Vanta CEO flagged hiring bottleneck. FleetOps needs intro to Target procurement." },
  { id: "a2", name: "Company Fundraise Tracker", description: "Monitors PitchBook, Harmonic, news, and SEC filings for fundraising activity at tracked companies. Sends text alerts for updates.", schedule: "Continuous", status: "Active", lastRun: "Mar 18", result: "Alert: Ironclad (Aether competitor) closed $40M Series C at $350M valuation. Alert: Atlan (Covalent competitor) raised $50M Series B." },
  { id: "a3", name: "Meeting Scheduler", description: "Emails a contact's EA to find mutual availability and books the meeting. Handles back-and-forth scheduling automatically.", schedule: "On demand", status: "Ready", lastRun: "Mar 15", result: "Scheduled meeting with Sarah Chen (Aether AI) for Mar 21 at 2pm. Sent calendar invite to both parties." },
  { id: "a4", name: "IC Prep Brief", description: "24 hours before any IC meeting, generates a comprehensive brief for each deal on the agenda: key metrics, recent interactions, open risks, and recommended questions.", schedule: "24h before IC", status: "Active", lastRun: "Mar 14", result: "Generated briefs for 3 deals ahead of Friday IC. Flagged Nomad Robotics supplier concentration risk as critical discussion point." },
  { id: "a5", name: "LP Activity Digest", description: "Weekly digest of all LP interactions across the fund: emails, meetings, document shares. Flags any LP that hasn't been contacted in 60+ days.", schedule: "Weekly, Friday 4pm", status: "Active", lastRun: "Mar 14", result: "2 LPs flagged as overdue for contact: Samsung Ventures (68 days), Foundry Group (72 days). Draft outreach emails prepared." },
];

const reachoutsData = [
  { connector: "David Kim (Vanta CEO)", target: "James Wright (Covalent Data)", reason: "Active deal, champion reference", status: "Intro sent, awaiting response", statusColor: "yellow" },
  { connector: "LP Jennifer Park", target: "VP Supply Chain, Target", reason: "Portfolio: FleetOps pilot", status: "Meeting scheduled Mar 22", statusColor: "green" },
  { connector: "Mike (Partner)", target: "Dr. Elena Vasquez, FDA", reason: "Portfolio: Meridian Health", status: "Waiting on Mike", statusColor: "yellow" },
  { connector: "Sarah Chen (Aether AI)", target: "GC at Stripe", reason: "Thesis: Vertical AI for Legal", status: "Declined, not available", statusColor: "red" },
];

// ── Shared Components ──
function Badge({ text, color }) {
  const colors = {
    blue: { bg: "#EBF0FF", text: "#3B5EFB", border: "#D4DDFF" },
    green: { bg: "#E8F9EE", text: "#00875A", border: "#C3EDCF" },
    yellow: { bg: "#FFF8E6", text: "#A66D00", border: "#FFE8A3" },
    red: { bg: "#FFEFEF", text: "#CF1124", border: "#FFD4D4" },
    gray: { bg: "#F2F3F7", text: "#5A5F72", border: "#E0E2EA" },
    purple: { bg: "#F3EEFF", text: "#6B47DC", border: "#DDD2FC" },
  };
  const c = colors[color] || colors.gray;
  return <span style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}`, padding: "2px 8px", borderRadius: 12, fontSize: 11, fontWeight: 500, whiteSpace: "nowrap" }}>{text}</span>;
}

function StageBadge({ stage }) {
  const m = { "Term Sheet": "green", "IC Review": "blue", "Diligence": "yellow", "First Meeting": "gray", "Sourcing": "gray" };
  return <Badge text={stage} color={m[stage] || "gray"} />;
}

function SourceBadge({ source }) {
  const m = { Gmail: "red", "Google Docs": "blue", Calendar: "green", Granola: "yellow", Affinity: "purple", PitchBook: "blue", Harmonic: "purple", LinkedIn: "blue", X: "gray", Substack: "yellow" };
  return <Badge text={source} color={m[source] || "gray"} />;
}

function GleanLogo() {
  return <svg width="28" height="28" viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="8" fill="#3B5EFB"/><text x="16" y="22" textAnchor="middle" fill="white" fontSize="18" fontWeight="700" fontFamily="system-ui">g</text></svg>;
}

function Sidebar({ activeView, setActiveView }) {
  const items = [
    { key: "thesis", icon: Icons.thesis, label: "Think" },
    { key: "pipeline", icon: Icons.pipeline, label: "Find" },
    { key: "dealroom", icon: Icons.dealroom, label: "Pick+Win" },
    { key: "portfolio", icon: Icons.portfolio, label: "Help" },
    { key: "network", icon: Icons.network, label: "Connect" },
    { key: "analyst", icon: Icons.analyst, label: "Analyst" },
  ];
  return (
    <div style={{ width: 72, background: "#FFFFFF", borderRight: "1px solid #E8EBF0", display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 14, height: "100%" }}>
      <div style={{ marginBottom: 20 }}><GleanLogo /></div>
      <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2, width: "100%" }}>
        {items.map(({ key, icon: Icon, label }) => {
          const active = activeView === key;
          return (
            <div key={key} style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
              {active && <div style={{ position: "absolute", left: 0, top: 4, bottom: 16, width: 3, borderRadius: "0 3px 3px 0", background: "#3B5EFB" }} />}
              <button onClick={() => setActiveView(key)} style={{
                width: 40, height: 40, borderRadius: 10, border: "none", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                background: active ? "#EBF0FF" : "transparent",
                color: active ? "#3B5EFB" : "#8B90A0", transition: "all 0.15s",
              }}><Icon /></button>
              <span style={{ fontSize: 9, fontWeight: 600, color: active ? "#3B5EFB" : "#B0B5C3", marginTop: 1, letterSpacing: "0.3px" }}>{label}</span>
            </div>
          );
        })}
      </nav>
      <div style={{ padding: "12px 0", marginBottom: 8 }}>
        <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#3B5EFB", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 12, fontWeight: 600 }}>DV</div>
      </div>
    </div>
  );
}

function ChatBar({ placeholder }) {
  return (
    <div style={{ borderTop: "1px solid #E8EBF0", padding: "12px 20px", background: "#FFFFFF", flexShrink: 0 }}>
      <div style={{ display: "flex", gap: 8, alignItems: "center", background: "#F7F8FA", borderRadius: 12, border: "1px solid #E8EBF0", padding: "4px 4px 4px 16px" }}>
        <span style={{ color: "#8B90A0" }}><Icons.search /></span>
        <input type="text" placeholder={placeholder} style={{ flex: 1, border: "none", background: "transparent", outline: "none", fontSize: 13, color: "#1A1D26", padding: "8px 0" }} />
        <button style={{ background: "#3B5EFB", border: "none", borderRadius: 8, padding: "8px 16px", color: "white", fontSize: 13, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}><Icons.send /> Ask</button>
      </div>
    </div>
  );
}

function MaterialCard({ title, summary, recipients }) {
  return (
    <div style={{ background: "#FFFFFF", border: "1px solid #E8EBF0", borderRadius: 12, padding: 16, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: "#1A1D26" }}>{title}</span>
        <button style={{ background: "#3B5EFB", border: "none", borderRadius: 8, padding: "5px 12px", color: "white", fontSize: 11, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}><Icons.send /> Send</button>
      </div>
      <div style={{ background: "#F7F8FA", borderRadius: 8, padding: 10, fontSize: 12, color: "#4A5068", lineHeight: 1.5 }}>{summary}</div>
      <p style={{ fontSize: 11, color: "#B0B5C3", marginTop: 8, marginBottom: 0 }}>To: {recipients}</p>
    </div>
  );
}

// ── THESIS VIEW ──
function ThesisView({ addToPipeline }) {
  const [expanded, setExpanded] = useState(null);
  const [drafts, setDrafts] = useState(() => Object.fromEntries(thesesData.map(t => [t.id, t.draft])));
  const [movedToPipeline, setMovedToPipeline] = useState({});

  const handleMoveToPipeline = (thesisId, companyName) => {
    setMovedToPipeline(p => ({ ...p, [`${thesisId}-${companyName}`]: true }));
    addToPipeline(companyName);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1A1D26", margin: 0 }}>Thesis Engine</h2>
        <p style={{ fontSize: 13, color: "#8B90A0", marginTop: 4, marginBottom: 20 }}>Investment theses as living documents. Click to expand, edit drafts, and promote companies to Pipeline.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {thesesData.map((t) => {
            const isOpen = expanded === t.id;
            return (
              <div key={t.id} style={{ background: "#FFFFFF", border: `1px solid ${isOpen ? "#3B5EFB" : "#E8EBF0"}`, borderRadius: 12, boxShadow: "0 1px 3px rgba(0,0,0,0.04)", overflow: "hidden", transition: "border-color 0.15s" }}>
                {/* Header (always visible) */}
                <button onClick={() => setExpanded(isOpen ? null : t.id)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: 16, border: "none", background: "transparent", cursor: "pointer", textAlign: "left" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ color: isOpen ? "#3B5EFB" : "#8B90A0" }}><Icons.chevron open={isOpen} /></span>
                    <span style={{ fontSize: 14, fontWeight: 600, color: "#1A1D26" }}>{t.name}</span>
                  </div>
                  <div style={{ display: "flex", gap: 6 }}>
                    <Badge text={`${t.companies.length} companies`} color="blue" />
                    <Badge text={`${t.signals} new signals`} color={t.signals > 5 ? "green" : "yellow"} />
                  </div>
                </button>

                {/* Expanded content */}
                {isOpen && (
                  <div style={{ padding: "0 16px 16px", borderTop: "1px solid #F0F1F5" }}>
                    {/* Editable draft */}
                    <div style={{ marginTop: 12, marginBottom: 14 }}>
                      <p style={{ fontSize: 10, color: "#8B90A0", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 6 }}>Thesis Draft</p>
                      <textarea
                        value={drafts[t.id]}
                        onChange={e => setDrafts(d => ({ ...d, [t.id]: e.target.value }))}
                        style={{ width: "100%", minHeight: 90, padding: 12, border: "1px solid #E8EBF0", borderRadius: 8, fontSize: 13, color: "#4A5068", lineHeight: 1.6, resize: "vertical", outline: "none", fontFamily: "inherit", background: "#FAFBFC" }}
                      />
                    </div>

                    {/* Suggested Experts */}
                    {t.experts && t.experts.length > 0 && (
                      <div style={{ marginBottom: 14 }}>
                        <p style={{ fontSize: 10, color: "#8B90A0", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 6 }}>Suggested Experts from Network</p>
                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                          {t.experts.map((ex, ei) => (
                            <div key={ei} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", background: "#F7F8FA", borderRadius: 8, border: "1px solid #E8EBF0" }}>
                              <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#3B5EFB", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 10, fontWeight: 600, flexShrink: 0 }}>{ex.name.split(" ").map(n => n[0]).join("").slice(0,2)}</div>
                              <div>
                                <div style={{ fontSize: 12, fontWeight: 600, color: "#1A1D26" }}>{ex.name}</div>
                                <div style={{ fontSize: 11, color: "#8B90A0" }}>{ex.role}</div>
                                <div style={{ fontSize: 10, color: "#B0B5C3" }}>{ex.connection}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Companies matching thesis */}
                    <p style={{ fontSize: 10, color: "#8B90A0", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 8 }}>Companies Matching Thesis</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 14 }}>
                      {t.companies.map((co, ci) => {
                        const moved = co.inPipeline || movedToPipeline[`${t.id}-${co.name}`];
                        return (
                          <div key={ci} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", background: "#F7F8FA", borderRadius: 8 }}>
                            <div style={{ width: 36, height: 36, borderRadius: 8, background: moved ? "#E8F9EE" : "#EBF0FF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: moved ? "#00875A" : "#3B5EFB", flexShrink: 0 }}>{co.match}%</div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                                <span style={{ fontSize: 13, fontWeight: 600, color: "#1A1D26" }}>{co.name}</span>
                                {moved && <Badge text="In Pipeline" color="green" />}
                              </div>
                              <p style={{ fontSize: 12, color: "#8B90A0", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{co.reason}</p>
                            </div>
                            {!moved && (
                              <button onClick={() => handleMoveToPipeline(t.id, co.name)} style={{ background: "#3B5EFB", border: "none", borderRadius: 8, padding: "6px 12px", color: "white", fontSize: 11, fontWeight: 500, cursor: "pointer", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 4 }}>
                                <Icons.plus /> Add to Pipeline
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Network Posts + Similar Theses side by side */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                      {/* Network Posts */}
                      {t.posts && t.posts.length > 0 && (
                        <div>
                          <p style={{ fontSize: 10, color: "#8B90A0", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 6 }}>Network Posts</p>
                          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                            {t.posts.map((post, pi) => (
                              <div key={pi} style={{ padding: "8px 10px", background: "#F7F8FA", borderRadius: 8, border: "1px solid #E8EBF0" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                                  <span style={{ fontSize: 12, fontWeight: 600, color: "#1A1D26" }}>{post.author}</span>
                                  <SourceBadge source={post.platform} />
                                  <span style={{ fontSize: 10, color: "#B0B5C3" }}>{post.date}</span>
                                </div>
                                <p style={{ fontSize: 12, color: "#4A5068", lineHeight: 1.4, margin: 0 }}>{post.snippet}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Similar Theses */}
                      {t.similarTheses && t.similarTheses.length > 0 && (
                        <div>
                          <p style={{ fontSize: 10, color: "#8B90A0", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 6 }}>Similar Theses at Other Funds</p>
                          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                            {t.similarTheses.map((st, si) => (
                              <div key={si} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 10px", background: "#F7F8FA", borderRadius: 8, border: "1px solid #E8EBF0" }}>
                                <div>
                                  <span style={{ fontSize: 12, fontWeight: 600, color: "#1A1D26" }}>{st.fund}</span>
                                  <span style={{ fontSize: 12, color: "#8B90A0", marginLeft: 6 }}>{st.name}</span>
                                </div>
                                <Badge text={`${st.overlap} overlap`} color={parseInt(st.overlap) > 80 ? "green" : parseInt(st.overlap) > 70 ? "yellow" : "gray"} />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <ChatBar placeholder="Ask about theses, market signals, or sourcing..." />
    </div>
  );
}

// ── PIPELINE VIEW ──
function PipelineView({ deals, openDealTab }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const filtered = searchQuery.length > 1 ? searchResults.filter(r => r.name.toLowerCase().includes(searchQuery.toLowerCase())) : [];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1A1D26", margin: 0 }}>Pipeline</h2>
        <p style={{ fontSize: 13, color: "#8B90A0", marginTop: 4, marginBottom: 16 }}>AI-scored pipeline powered by Prism. Click any company to open in Deal Room.</p>

        {/* Search bar for adding companies */}
        <div style={{ position: "relative", marginBottom: 16 }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center", background: "#FFFFFF", borderRadius: 12, border: "1px solid #E8EBF0", padding: "4px 4px 4px 14px", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
            <span style={{ color: "#8B90A0" }}><Icons.search /></span>
            <input
              type="text" placeholder="Search PitchBook, Harmonic, etc. to add a company..."
              value={searchQuery}
              onChange={e => { setSearchQuery(e.target.value); setShowDropdown(true); }}
              onFocus={() => setShowDropdown(true)}
              style={{ flex: 1, border: "none", background: "transparent", outline: "none", fontSize: 13, color: "#1A1D26", padding: "8px 0" }}
            />
            <button style={{ background: "#F7F8FA", border: "1px solid #E8EBF0", borderRadius: 8, padding: "7px 14px", fontSize: 12, fontWeight: 500, color: "#4A5068", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, whiteSpace: "nowrap" }}>
              <Icons.plus /> Add Manually
            </button>
          </div>
          {/* Dropdown */}
          {showDropdown && searchQuery.length > 1 && (
            <div style={{ position: "absolute", top: "100%", left: 0, right: 0, marginTop: 4, background: "#FFFFFF", border: "1px solid #E8EBF0", borderRadius: 12, boxShadow: "0 4px 16px rgba(0,0,0,0.08)", zIndex: 20, overflow: "hidden" }}>
              {filtered.length > 0 ? filtered.map((r, i) => (
                <button key={i} onClick={() => { setSearchQuery(""); setShowDropdown(false); }}
                  style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px", border: "none", borderBottom: i < filtered.length - 1 ? "1px solid #F0F1F5" : "none", background: "transparent", cursor: "pointer", textAlign: "left" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#F7F9FF"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#1A1D26" }}>{r.name}</div>
                    <div style={{ fontSize: 12, color: "#8B90A0", marginTop: 2 }}>{r.sector} · {r.funding}</div>
                  </div>
                  <SourceBadge source={r.source} />
                </button>
              )) : (
                <div style={{ padding: "12px 16px", fontSize: 13, color: "#8B90A0" }}>No results for "{searchQuery}"</div>
              )}
              <button onClick={() => { setSearchQuery(""); setShowDropdown(false); }}
                style={{ width: "100%", display: "flex", alignItems: "center", gap: 6, padding: "10px 16px", border: "none", borderTop: "1px solid #E8EBF0", background: "#F7F8FA", cursor: "pointer", fontSize: 12, color: "#3B5EFB", fontWeight: 500 }}>
                <Icons.plus /> Add "{searchQuery}" manually
              </button>
            </div>
          )}
        </div>

        {/* Pipeline table */}
        <div style={{ overflowX: "auto", borderRadius: 12, border: "1px solid #E8EBF0", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <table style={{ width: "100%", fontSize: 12, borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#F7F8FA" }}>
                <th style={{ textAlign: "left", padding: "10px 14px", fontWeight: 600, color: "#8B90A0", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.5px", position: "sticky", left: 0, background: "#F7F8FA", zIndex: 1, minWidth: 140 }}>Company</th>
                {prismColumns.map(col => <th key={col} style={{ textAlign: "left", padding: "10px 14px", fontWeight: 600, color: "#8B90A0", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.5px", minWidth: 180 }}>{col}</th>)}
              </tr>
            </thead>
            <tbody>
              {deals.map((d) => (
                <tr key={d.id} onClick={() => openDealTab(d.id)} style={{ borderTop: "1px solid #F0F1F5", cursor: "pointer" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#F7F9FF"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <td style={{ padding: "10px 14px", position: "sticky", left: 0, background: "inherit", zIndex: 1 }}>
                    <div style={{ fontWeight: 600, color: "#3B5EFB", fontSize: 13 }}>{d.name}</div>
                    <div style={{ display: "flex", gap: 6, marginTop: 4, alignItems: "center" }}><StageBadge stage={d.stage} /><span style={{ fontSize: 11, color: "#B0B5C3" }}>{d.score}/100</span></div>
                  </td>
                  {(prismData[d.id] || []).map((cell, i) => (
                    <td key={i} style={{ padding: "10px 14px", color: "#4A5068", lineHeight: 1.5, verticalAlign: "top" }}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: 11, color: "#B0B5C3", marginTop: 10 }}>Powered by Glean Prism · {deals.length * 5} cells analyzed in 4.2s across Gmail, Affinity, Google Docs, Calendar</p>
      </div>
      <ChatBar placeholder="Ask about your pipeline, compare companies, or request analysis..." />
    </div>
  );
}

// ── DEAL ROOM VIEW ──
function DealRoomView({ openTabs, activeDealTab, setActiveDealTab, closeDealTab, removeDeal, deals }) {
  const deal = deals.find(d => d.id === activeDealTab);
  if (openTabs.length === 0) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", flexDirection: "column", color: "#B0B5C3" }}>
        <div style={{ width: 48, height: 48, borderRadius: 12, background: "#F7F8FA", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12, color: "#8B90A0" }}><Icons.dealroom /></div>
        <p style={{ fontSize: 15, fontWeight: 500, margin: 0 }}>No deals open</p>
        <p style={{ fontSize: 13, marginTop: 4 }}>Click a company in Pipeline to open it here.</p>
      </div>
    );
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ display: "flex", borderBottom: "1px solid #E8EBF0", background: "#F7F8FA", padding: "8px 12px 0", overflowX: "auto", gap: 2, flexShrink: 0 }}>
        {openTabs.map(id => {
          const d = deals.find(x => x.id === id);
          const active = id === activeDealTab;
          return (
            <button key={id} onClick={() => setActiveDealTab(id)} style={{
              display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", fontSize: 12, fontWeight: active ? 600 : 400,
              background: active ? "#FFFFFF" : "transparent", color: active ? "#1A1D26" : "#8B90A0",
              border: active ? "1px solid #E8EBF0" : "1px solid transparent", borderBottom: active ? "1px solid #FFFFFF" : "1px solid transparent",
              borderRadius: "8px 8px 0 0", cursor: "pointer", whiteSpace: "nowrap", marginBottom: -1,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: active ? "#3B5EFB" : "#D0D3DC" }} />
              {d?.name}
              <span onClick={e => { e.stopPropagation(); closeDealTab(id); }} style={{ marginLeft: 4, color: "#B0B5C3", cursor: "pointer", fontSize: 14 }}>&times;</span>
            </button>
          );
        })}
      </div>
      {deal && (
        <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1A1D26", margin: 0 }}>{deal.name}</h2>
                <StageBadge stage={deal.stage} /><Badge text={`Score: ${deal.score}`} color="blue" />
              </div>
              <p style={{ fontSize: 13, color: "#8B90A0", margin: 0 }}>{deal.sector} · {deal.founder} · Thesis: {deal.thesis}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 2 }}>
              <select defaultValue={deal.stage} style={{ background: "#FFFFFF", border: "1px solid #E8EBF0", borderRadius: 8, padding: "7px 14px", fontSize: 12, fontWeight: 600, color: "#1A1D26", cursor: "pointer", appearance: "auto", minWidth: 160 }}>
                <option value="Sourcing">Sourcing</option>
                <option value="First Meeting">First Meeting</option>
                <option value="Diligence">Diligence</option>
                <option value="IC Review">IC Review</option>
                <option value="Term Sheet">Term Sheet</option>
                <option value="Closed Won">Closed Won</option>
                <option value="Passed">Passed</option>
                <option value="Lost">Lost</option>
              </select>
              <span style={{ fontSize: 10, color: "#B0B5C3" }}>Pushes to Affinity</span>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 10, marginBottom: 20 }}>
            {[["Founded", deal.founded], ["HQ", deal.hq], ["Employees", deal.employees], ["Sector", deal.sector],
              ["Total Funding", deal.totalFunding], ["Last Round", deal.lastRound], ["Revenue", deal.revenue], ["Key People", deal.keyPeople],
            ].map(([label, val], i) => (
              <div key={i} style={{ background: "#F7F8FA", borderRadius: 10, padding: "10px 14px", gridColumn: i >= 4 ? "span 2" : "span 1" }}>
                <p style={{ fontSize: 10, color: "#8B90A0", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", margin: 0, marginBottom: 3 }}>{label}</p>
                <p style={{ fontSize: 12, color: "#1A1D26", margin: 0, lineHeight: 1.4 }}>{val}</p>
              </div>
            ))}
          </div>
          <div style={{ background: "#EBF0FF", border: "1px solid #D4DDFF", borderRadius: 12, padding: 16, marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#3B5EFB" }}>✦ AI Brief</span>
              <span style={{ fontSize: 11, color: "#7B8FDB" }}>Generated from 14 sources</span>
            </div>
            <p style={{ fontSize: 13, color: "#2D3A6E", lineHeight: 1.6, margin: 0 }}>Covalent Data is in active term sheet negotiation. James countered today on pro-rata rights and board seat structure. The deal is competitive; Benchmark also has a term sheet out. Strongest leverage: the relationship through Partner Mike (Stanford classmates) and 7 portfolio companies as potential customers. Three reference calls completed, all positive. Recommended: Mike calls James tonight re board seat, send portfolio intro package tomorrow morning.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
            <div>
              <h3 style={{ fontSize: 14, fontWeight: 600, color: "#1A1D26", margin: "0 0 10px" }}>Interaction Timeline</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {dealTimeline.map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <span style={{ fontSize: 11, color: "#B0B5C3", width: 44, flexShrink: 0, paddingTop: 2 }}>{item.date}</span>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#3B5EFB", marginTop: 5, flexShrink: 0 }} />
                    <div style={{ background: "#FFFFFF", border: "1px solid #E8EBF0", borderRadius: 10, padding: "8px 12px", flex: 1 }}>
                      <div style={{ marginBottom: 4, display: "flex", gap: 4 }}>{(item.sources || [item.source]).map((s, si) => <SourceBadge key={si} source={s} />)}</div>
                      <p style={{ fontSize: 12, color: "#4A5068", lineHeight: 1.5, margin: 0 }}>{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 style={{ fontSize: 14, fontWeight: 600, color: "#1A1D26", margin: "0 0 10px" }}>Relationship Paths</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {netPaths.map((np, i) => (
                  <div key={i} style={{ background: "#FFFFFF", border: "1px solid #E8EBF0", borderRadius: 10, padding: "10px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap", fontSize: 12 }}>
                        {np.nodes.map((node, j) => (
                          <span key={j} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                            {j > 0 && <span style={{ color: "#3B5EFB", fontWeight: 600 }}>→</span>}
                            <span style={{ fontWeight: 500, color: "#1A1D26" }}>{node}</span>
                          </span>
                        ))}
                      </div>
                      <p style={{ fontSize: 11, color: "#8B90A0", margin: "4px 0 0" }}>via: {np.via}</p>
                    </div>
                    <button style={{ background: "#3B5EFB", border: "none", borderRadius: 6, padding: "5px 10px", color: "white", fontSize: 10, fontWeight: 500, cursor: "pointer", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 3, flexShrink: 0 }}><Icons.request /> Request</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: "#1A1D26", margin: "0 0 10px" }}>Materials</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            <div style={{ background: "#FFFFFF", border: "1px solid #E8EBF0", borderRadius: 12, padding: 16, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#1A1D26" }}>Investment Memo</span>
                <div style={{ display: "flex", gap: 4 }}>
                  <button style={{ background: "#EBF0FF", border: "1px solid #D4DDFF", borderRadius: 6, padding: "4px 8px", color: "#3B5EFB", fontSize: 10, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: 3 }}><Icons.fileWord /> Word</button>
                  <button style={{ background: "#3B5EFB", border: "none", borderRadius: 6, padding: "4px 8px", color: "white", fontSize: 10, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: 3 }}><Icons.send /> Send</button>
                </div>
              </div>
              <div style={{ background: "#F7F8FA", borderRadius: 8, padding: 10, fontSize: 12, color: "#4A5068", lineHeight: 1.5 }}>3-page memo: thesis fit, market analysis, competitive landscape, team assessment, financials, key risks, IC recommendation. Synthesized from 14 interactions and 8 documents.</div>
              <p style={{ fontSize: 11, color: "#B0B5C3", marginTop: 8, marginBottom: 0 }}>To: ic@acmeventures.com</p>
            </div>
            <div style={{ background: "#FFFFFF", border: "1px solid #E8EBF0", borderRadius: 12, padding: 16, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#1A1D26" }}>Financial Model</span>
                <div style={{ display: "flex", gap: 4 }}>
                  <button style={{ background: "#E8F9EE", border: "1px solid #C3EDCF", borderRadius: 6, padding: "4px 8px", color: "#00875A", fontSize: 10, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: 3 }}><Icons.fileExcel /> Excel</button>
                  <button style={{ background: "#3B5EFB", border: "none", borderRadius: 6, padding: "4px 8px", color: "white", fontSize: 10, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: 3 }}><Icons.send /> Send</button>
                </div>
              </div>
              <div style={{ background: "#F7F8FA", borderRadius: 8, padding: 10, fontSize: 12, color: "#4A5068", lineHeight: 1.5 }}>DCF and scenario analysis. Revenue projections from disclosed ARR ($5.1M), growth rate from references (est. 3x), comparable multiples from PitchBook.</div>
              <p style={{ fontSize: 11, color: "#B0B5C3", marginTop: 8, marginBottom: 0 }}>To: dealteam@acmeventures.com</p>
            </div>
            <div style={{ background: "#FFFFFF", border: "1px solid #E8EBF0", borderRadius: 12, padding: 16, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#1A1D26" }}>Term Sheet</span>
                <div style={{ display: "flex", gap: 4 }}>
                  <button style={{ background: "#EBF0FF", border: "1px solid #D4DDFF", borderRadius: 6, padding: "4px 8px", color: "#3B5EFB", fontSize: 10, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: 3 }}><Icons.fileWord /> Word</button>
                  <button style={{ background: "#3B5EFB", border: "none", borderRadius: 6, padding: "4px 8px", color: "white", fontSize: 10, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: 3 }}><Icons.send /> Send</button>
                </div>
              </div>
              <div style={{ background: "#F7F8FA", borderRadius: 8, padding: 10, fontSize: 12, color: "#4A5068", lineHeight: 1.5 }}>Standard Acme Series A template. Pre-filled: $8M lead, $45M pre-money, 1 board seat, standard pro-rata, ROFR, information rights.</div>
              <p style={{ fontSize: 11, color: "#B0B5C3", marginTop: 8, marginBottom: 0 }}>To: counsel@lawfirm.com</p>
            </div>
          </div>
        </div>
      )}
      <ChatBar placeholder={`Ask anything about ${deal?.name || "this deal"}...`} />
    </div>
  );
}

// ── PORTFOLIO VIEW ──
function PortfolioView() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1A1D26", margin: 0 }}>Portfolio</h2>
        <p style={{ fontSize: 13, color: "#8B90A0", marginTop: 4, marginBottom: 20 }}>Fund-level metrics and portfolio company intelligence.</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12, marginBottom: 24 }}>
          {[["DPI", "0.8x"], ["TVPI", "2.4x"], ["MOIC (Gross)", "3.1x"], ["Net IRR", "28.4%"]].map(([label, val]) => (
            <div key={label} style={{ background: "#FFFFFF", border: "1px solid #E8EBF0", borderRadius: 12, padding: 16, textAlign: "center", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <p style={{ fontSize: 10, color: "#8B90A0", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", margin: 0, marginBottom: 4 }}>{label}</p>
              <p style={{ fontSize: 22, fontWeight: 700, color: "#1A1D26", margin: 0 }}>{val}</p>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
          {portfolioData.map((co, i) => (
            <div key={i} style={{ background: "#FFFFFF", border: "1px solid #E8EBF0", borderRadius: 12, padding: 16, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: "#1A1D26" }}>{co.name}</span>
                <Badge text={co.status} color={co.status === "Healthy" ? "green" : co.status === "Watch" ? "yellow" : "red"} />
                <span style={{ fontSize: 12, color: "#8B90A0" }}>{co.invested}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: "#3B5EFB" }}>MOIC: {co.moic}</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
                <div style={{ background: "#F7F8FA", borderRadius: 8, padding: 12 }}>
                  <p style={{ fontSize: 10, color: "#8B90A0", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", margin: 0, marginBottom: 4 }}>Challenges (Last 90 Days)</p>
                  <p style={{ fontSize: 12, color: "#4A5068", lineHeight: 1.5, margin: 0 }}>{co.challenges}</p>
                </div>
                <div style={{ background: "#F7F8FA", borderRadius: 8, padding: 12 }}>
                  <p style={{ fontSize: 10, color: "#8B90A0", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", margin: 0, marginBottom: 8 }}>Suggested Introductions</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {co.intros.split(". ").filter(Boolean).map((intro, j) => (
                      <div key={j} style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10 }}>
                        <p style={{ fontSize: 12, color: "#4A5068", lineHeight: 1.4, margin: 0, flex: 1 }}>{intro.endsWith(".") ? intro : intro + "."}</p>
                        <button style={{ background: "#3B5EFB", border: "none", borderRadius: 6, padding: "5px 10px", color: "white", fontSize: 10, fontWeight: 500, cursor: "pointer", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 3, flexShrink: 0, marginTop: 0 }}><Icons.request /> Request</button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div style={{ background: "#F7F8FA", borderRadius: 8, padding: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                    <p style={{ fontSize: 10, color: "#8B90A0", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", margin: 0 }}>Last Board Deck</p>
                    <button style={{ background: "#FFF8E6", border: "1px solid #FFE8A3", borderRadius: 6, padding: "3px 8px", color: "#A66D00", fontSize: 10, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: 3 }}>Open in PPT</button>
                  </div>
                  <p style={{ fontSize: 12, color: "#4A5068", lineHeight: 1.4, margin: 0 }}>{co.name} Q4 2025 Board Update. Last updated {i === 0 ? "Feb 28" : i === 1 ? "Mar 1" : i === 2 ? "Jan 15" : "Mar 5"}.</p>
                </div>
                <div style={{ background: "#F7F8FA", borderRadius: 8, padding: 12 }}>
                  <p style={{ fontSize: 10, color: "#8B90A0", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", margin: 0, marginBottom: 4 }}>Last Interaction</p>
                  <p style={{ fontSize: 12, color: "#4A5068", lineHeight: 1.4, margin: 0 }}>{i === 0 ? "Email from CEO David Kim on Mar 16 re: ML hiring pipeline and Q2 enterprise targets." : i === 1 ? "Call with CEO on Mar 11 re: Target pilot delays and alternative retail partners." : i === 2 ? "Board call on Mar 8. FDA timeline update and burn rate discussion." : "Email from CEO on Mar 14 re: VP Sales candidate shortlist and comp benchmarks."}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: "#1A1D26", margin: "0 0 10px" }}>Fund Materials</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div style={{ background: "#FFFFFF", border: "1px solid #E8EBF0", borderRadius: 12, padding: 16, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#1A1D26" }}>Fund Financial Model</span>
              <div style={{ display: "flex", gap: 6 }}>
                <button style={{ background: "#E8F9EE", border: "1px solid #C3EDCF", borderRadius: 8, padding: "5px 10px", color: "#00875A", fontSize: 11, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}><Icons.fileExcel /> Open in Excel</button>
                <button style={{ background: "#3B5EFB", border: "none", borderRadius: 8, padding: "5px 12px", color: "white", fontSize: 11, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}><Icons.send /> Send</button>
              </div>
            </div>
            <div style={{ background: "#F7F8FA", borderRadius: 8, padding: 10, fontSize: 12, color: "#4A5068", lineHeight: 1.5 }}>Fund-level model: deployment schedule, reserve allocation, fee waterfall, projected returns under base/upside/downside scenarios. Updated with Q1 2026 marks.</div>
            <p style={{ fontSize: 11, color: "#B0B5C3", marginTop: 8, marginBottom: 0 }}>To: ops@acmeventures.com</p>
          </div>
          <div style={{ background: "#FFFFFF", border: "1px solid #E8EBF0", borderRadius: 12, padding: 16, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#1A1D26" }}>LP Update Memo</span>
              <div style={{ display: "flex", gap: 6 }}>
                <button style={{ background: "#EBF0FF", border: "1px solid #D4DDFF", borderRadius: 8, padding: "5px 10px", color: "#3B5EFB", fontSize: 11, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}><Icons.fileWord /> Open in Word</button>
                <button style={{ background: "#3B5EFB", border: "none", borderRadius: 8, padding: "5px 12px", color: "white", fontSize: 11, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}><Icons.send /> Send</button>
              </div>
            </div>
            <div style={{ background: "#F7F8FA", borderRadius: 8, padding: 10, fontSize: 12, color: "#4A5068", lineHeight: 1.5 }}>Quarterly LP letter: fund performance, portfolio highlights, new investments (Covalent in term sheet), markups/markdowns, market outlook.</div>
            <p style={{ fontSize: 11, color: "#B0B5C3", marginTop: 8, marginBottom: 0 }}>To: ir@acmeventures.com</p>
          </div>
        </div>
      </div>
      <ChatBar placeholder="Ask about portfolio, fund metrics, or LP reporting..." />
    </div>
  );
}

// ── NETWORK VIEW ──
function NetworkView() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1A1D26", margin: 0 }}>Relationship Graph</h2>
        <p style={{ fontSize: 13, color: "#8B90A0", marginTop: 4, marginBottom: 20 }}>Your fund's collective network, built from the activity graph.</p>
        <div style={{ background: "#FFFFFF", border: "1px solid #E8EBF0", borderRadius: 12, padding: 16, marginBottom: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center", background: "#F7F8FA", borderRadius: 10, border: "1px solid #E8EBF0", padding: "4px 4px 4px 14px" }}>
            <span style={{ color: "#8B90A0" }}><Icons.search /></span>
            <input type="text" placeholder='Try: "Who knows the CTO of Stripe?" or "Shortest path to Sequoia"' style={{ flex: 1, border: "none", background: "transparent", outline: "none", fontSize: 13, color: "#1A1D26", padding: "8px 0" }} />
            <button style={{ background: "#3B5EFB", border: "none", borderRadius: 8, padding: "8px 20px", color: "white", fontSize: 13, fontWeight: 500, cursor: "pointer" }}>Search</button>
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
            {["Anytime", "Who from", "Connection type"].map(f => (
              <button key={f} style={{ background: "#F7F8FA", border: "1px solid #E8EBF0", borderRadius: 20, padding: "5px 14px", fontSize: 11, color: "#4A5068", cursor: "pointer", fontWeight: 500 }}>{f} ▾</button>
            ))}
          </div>
        </div>
        {/* Reachouts Launched */}
        <h3 style={{ fontSize: 14, fontWeight: 600, color: "#1A1D26", margin: "0 0 10px" }}>Reachouts Launched</h3>
        <div style={{ borderRadius: 12, border: "1px solid #E8EBF0", overflow: "hidden", marginBottom: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <table style={{ width: "100%", fontSize: 12, borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#F7F8FA" }}>
                {["Asked For Intro", "Intro Target", "Reason", "Status"].map(h => (
                  <th key={h} style={{ textAlign: "left", padding: "9px 14px", fontWeight: 600, color: "#8B90A0", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.5px" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {reachoutsData.map((r, i) => (
                <tr key={i} style={{ borderTop: "1px solid #F0F1F5" }}>
                  <td style={{ padding: "9px 14px", fontWeight: 500, color: "#1A1D26" }}>{r.connector}</td>
                  <td style={{ padding: "9px 14px", color: "#4A5068" }}>{r.target}</td>
                  <td style={{ padding: "9px 14px", color: "#4A5068" }}>{r.reason}</td>
                  <td style={{ padding: "9px 14px" }}><Badge text={r.status} color={r.statusColor} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 style={{ fontSize: 14, fontWeight: 600, color: "#1A1D26", margin: "0 0 10px" }}>Network Visualization</h3>
        <div style={{ background: "#F7F8FA", border: "1px solid #E8EBF0", borderRadius: 12, padding: 32, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg viewBox="0 0 600 280" style={{ width: "100%", maxWidth: 540 }}>
            <line x1="300" y1="45" x2="140" y2="140" stroke="#D4DDFF" strokeWidth="2" />
            <line x1="300" y1="45" x2="460" y2="140" stroke="#D4DDFF" strokeWidth="2" />
            <line x1="300" y1="45" x2="300" y2="160" stroke="#3B5EFB" strokeWidth="2.5" opacity="0.5" />
            <line x1="140" y1="140" x2="80" y2="240" stroke="#E8EBF0" strokeWidth="1.5" />
            <line x1="140" y1="140" x2="200" y2="240" stroke="#D4DDFF" strokeWidth="2" />
            <line x1="460" y1="140" x2="400" y2="240" stroke="#E8EBF0" strokeWidth="1.5" />
            <line x1="460" y1="140" x2="520" y2="240" stroke="#D4DDFF" strokeWidth="2" />
            <line x1="300" y1="160" x2="200" y2="240" stroke="#E8EBF0" strokeWidth="1.5" />
            <line x1="300" y1="160" x2="400" y2="240" stroke="#E8EBF0" strokeWidth="1.5" />
            <circle cx="300" cy="45" r="22" fill="#3B5EFB" /><text x="300" y="49" textAnchor="middle" fill="white" fontSize="10" fontWeight="700" fontFamily="system-ui">YOU</text>
            <circle cx="140" cy="140" r="17" fill="#5B7BFC" /><text x="140" y="144" textAnchor="middle" fill="white" fontSize="9" fontWeight="600" fontFamily="system-ui">Mike</text>
            <circle cx="460" cy="140" r="17" fill="#5B7BFC" /><text x="460" y="144" textAnchor="middle" fill="white" fontSize="9" fontWeight="600" fontFamily="system-ui">Sarah</text>
            <circle cx="300" cy="160" r="15" fill="#8BA4FD" /><text x="300" y="164" textAnchor="middle" fill="white" fontSize="8" fontWeight="600" fontFamily="system-ui">Kim</text>
            <circle cx="80" cy="240" r="13" fill="#E8EBF0" /><text x="80" y="244" textAnchor="middle" fill="#4A5068" fontSize="7" fontWeight="500" fontFamily="system-ui">LP: Park</text>
            <circle cx="200" cy="240" r="13" fill="#B5C6FE" /><text x="200" y="244" textAnchor="middle" fill="white" fontSize="7" fontWeight="600" fontFamily="system-ui">James</text>
            <circle cx="400" cy="240" r="13" fill="#B5C6FE" /><text x="400" y="244" textAnchor="middle" fill="white" fontSize="7" fontWeight="600" fontFamily="system-ui">Rivera</text>
            <circle cx="520" cy="240" r="13" fill="#B5C6FE" /><text x="520" y="244" textAnchor="middle" fill="white" fontSize="7" fontWeight="600" fontFamily="system-ui">Priya</text>
          </svg>
        </div>
        <p style={{ fontSize: 11, color: "#B0B5C3", marginTop: 10, textAlign: "center" }}>Built from activity graph: email, meetings, document collaboration, CRM interactions across all firm members.</p>
      </div>
      <ChatBar placeholder="Search your network, find paths, or explore relationships..." />
    </div>
  );
}

// ── ANALYST VIEW ──
function AnalystView() {
  const [expandedAgent, setExpandedAgent] = useState(null);
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1A1D26", margin: 0 }}>Analyst</h2>
        <p style={{ fontSize: 13, color: "#8B90A0", marginTop: 4, marginBottom: 20 }}>Pre-built agents that work autonomously on your behalf. Configure schedules, triggers, and outputs.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {agentsData.map((agent) => {
            const isOpen = expandedAgent === agent.id;
            return (
              <div key={agent.id} style={{ background: "#FFFFFF", border: `1px solid ${isOpen ? "#3B5EFB" : "#E8EBF0"}`, borderRadius: 12, boxShadow: "0 1px 3px rgba(0,0,0,0.04)", overflow: "hidden", transition: "border-color 0.15s" }}>
                <button onClick={() => setExpandedAgent(isOpen ? null : agent.id)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: 16, border: "none", background: "transparent", cursor: "pointer", textAlign: "left" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1 }}>
                    <span style={{ color: isOpen ? "#3B5EFB" : "#8B90A0" }}><Icons.chevron open={isOpen} /></span>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: agent.status === "Active" ? "#EBF0FF" : "#F2F3F7", display: "flex", alignItems: "center", justifyContent: "center", color: agent.status === "Active" ? "#3B5EFB" : "#8B90A0", flexShrink: 0 }}>
                      <Icons.analyst />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: "#1A1D26" }}>{agent.name}</span>
                      <div style={{ fontSize: 12, color: "#8B90A0", marginTop: 2 }}>{agent.schedule}</div>
                    </div>
                  </div>
                  <Badge text={agent.status} color={agent.status === "Active" ? "green" : "gray"} />
                </button>

                {isOpen && (
                  <div style={{ padding: "0 16px 16px", borderTop: "1px solid #F0F1F5" }}>
                    <div style={{ marginTop: 12, marginBottom: 14 }}>
                      <p style={{ fontSize: 13, color: "#4A5068", lineHeight: 1.6, margin: 0 }}>{agent.description}</p>
                    </div>

                    <div style={{ background: "#F7F8FA", borderRadius: 10, padding: 14, marginBottom: 12 }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                        <p style={{ fontSize: 10, color: "#8B90A0", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", margin: 0 }}>Last Run: {agent.lastRun}</p>
                      </div>
                      <p style={{ fontSize: 12, color: "#4A5068", lineHeight: 1.5, margin: 0 }}>{agent.result}</p>
                    </div>

                    <div style={{ display: "flex", gap: 8 }}>
                      <button style={{ background: "#3B5EFB", border: "none", borderRadius: 8, padding: "7px 16px", color: "white", fontSize: 12, fontWeight: 500, cursor: "pointer" }}>Run Now</button>
                      <button style={{ background: "#FFFFFF", border: "1px solid #E8EBF0", borderRadius: 8, padding: "7px 16px", color: "#4A5068", fontSize: 12, fontWeight: 500, cursor: "pointer" }}>Configure</button>
                      {agent.status === "Active" ? (
                        <button style={{ background: "#FFFFFF", border: "1px solid #E8EBF0", borderRadius: 8, padding: "7px 16px", color: "#CF1124", fontSize: 12, fontWeight: 500, cursor: "pointer" }}>Pause</button>
                      ) : (
                        <button style={{ background: "#E8F9EE", border: "1px solid #C3EDCF", borderRadius: 8, padding: "7px 16px", color: "#00875A", fontSize: 12, fontWeight: 500, cursor: "pointer" }}>Activate</button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: 20, background: "#FFFFFF", border: "1px dashed #D4DDFF", borderRadius: 12, padding: 20, textAlign: "center", cursor: "pointer" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, color: "#3B5EFB" }}>
            <Icons.plus />
            <span style={{ fontSize: 13, fontWeight: 500 }}>Create Custom Agent</span>
          </div>
          <p style={{ fontSize: 12, color: "#8B90A0", marginTop: 6, marginBottom: 0 }}>Build a new agent with custom triggers, data sources, and actions.</p>
        </div>
      </div>
      <ChatBar placeholder="Describe what you want an agent to do..." />
    </div>
  );
}

// ── MAIN APP ──
export default function GleanCapPrototype() {
  const [activeView, setActiveView] = useState("thesis");
  const [deals, setDeals] = useState(initialDeals);
  const [openTabs, setOpenTabs] = useState([4]);
  const [activeDealTab, setActiveDealTab] = useState(4);

  const openDealTab = (id) => {
    if (!openTabs.includes(id)) setOpenTabs([...openTabs, id]);
    setActiveDealTab(id);
    setActiveView("dealroom");
  };
  const closeDealTab = (id) => {
    const t = openTabs.filter(x => x !== id);
    setOpenTabs(t);
    if (activeDealTab === id) setActiveDealTab(t[t.length - 1] || null);
  };
  const removeDeal = (id) => { closeDealTab(id); };
  const addToPipeline = (name) => {
    // In a real app this would create a proper deal entry
    console.log(`Added ${name} to pipeline`);
  };

  const views = {
    thesis: <ThesisView addToPipeline={addToPipeline} />,
    pipeline: <PipelineView deals={deals} openDealTab={openDealTab} />,
    dealroom: <DealRoomView openTabs={openTabs} activeDealTab={activeDealTab} setActiveDealTab={setActiveDealTab} closeDealTab={closeDealTab} removeDeal={removeDeal} deals={deals} />,
    portfolio: <PortfolioView />,
    network: <NetworkView />,
    analyst: <AnalystView />,
    architecture: <ArchitecturePage onBack={() => setActiveView("thesis")} />,
  };

  return (
    <div style={{ display: "flex", height: "100vh", background: "#F7F8FA", fontFamily: "'Inter', 'Polysans', system-ui, -apple-system, sans-serif", overflow: "hidden" }}>
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", background: "#FAFBFC", position: "relative" }}>
        {activeView !== "architecture" && (
          <button
            onClick={() => setActiveView("architecture")}
            style={{
              position: "absolute", top: 12, right: 20, zIndex: 50,
              display: "flex", alignItems: "center", gap: 6,
              padding: "6px 12px", borderRadius: 8,
              background: "#FFFFFF", border: "1px solid #E8EBF0",
              fontSize: 12, fontWeight: 500, color: "#4A5068",
              cursor: "pointer", boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="5" width="5" height="4" rx="0.5" stroke="#3B5EFB" strokeWidth="1.2"/><rect x="8" y="5" width="5" height="4" rx="0.5" stroke="#3B5EFB" strokeWidth="1.2"/><path d="M7 2v3M3.5 9v2M10.5 9v2M3.5 11h7" stroke="#3B5EFB" strokeWidth="1.2" strokeLinecap="round"/></svg>
            Architecture
          </button>
        )}
        {views[activeView]}
      </div>
    </div>
  );
}
