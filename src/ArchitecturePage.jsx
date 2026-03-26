import { useState } from "react";

// Glean design tokens (matching App.jsx)
const colors = {
  bg: "#F7F8FA",
  card: "#FFFFFF",
  border: "#E8EBF0",
  heading: "#1A1D26",
  body: "#4A5068",
  muted: "#8B90A0",
  primary: "#3B5EFB",
  primaryLight: "#EBF0FF",
  green: "#00875A",
  greenBg: "#E8F9EE",
  greenBorder: "#C3EDCF",
  amber: "#A66D00",
  amberBg: "#FFF8E6",
  amberBorder: "#FFE8A3",
  purple: "#6B47DC",
  purpleBg: "#F3EEFF",
  purpleBorder: "#DDD2FC",
  red: "#CF1124",
  redBg: "#FFEFEF",
};

const layerStyles = {
  data: { color: colors.green, bg: colors.greenBg, border: colors.greenBorder, label: "DATA LAYER — Search Index", tag: "Glean's foundation" },
  intelligence: { color: colors.primary, bg: colors.primaryLight, border: "#D4DDFF", label: "INTELLIGENCE LAYER — Enterprise Graph + RAG", tag: "The brain" },
  agents: { color: colors.purple, bg: colors.purpleBg, border: colors.purpleBorder, label: "AGENT LAYER — Orchestration & Reasoning", tag: "AI that acts" },
  surfaces: { color: colors.amber, bg: colors.amberBg, border: colors.amberBorder, label: "SURFACE LAYER — Glean Capital Intelligence UI", tag: "What the VC sees" },
};

const flowStepColors = {
  surfaces: { color: colors.amber, bg: colors.amberBg, border: colors.amberBorder, label: "SURFACE" },
  intelligence: { color: colors.primary, bg: colors.primaryLight, border: "#D4DDFF", label: "GRAPH" },
  data: { color: colors.green, bg: colors.greenBg, border: colors.greenBorder, label: "INDEX" },
  agents: { color: colors.purple, bg: colors.purpleBg, border: colors.purpleBorder, label: "AGENT" },
};

function LayerBox({ layerKey, items, gridCols = 4 }) {
  const s = layerStyles[layerKey];
  return (
    <div style={{ padding: 16, borderRadius: 12, border: `2px solid ${s.border}`, background: s.bg, marginBottom: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: s.color }} />
          <span style={{ fontSize: 12, fontWeight: 700, color: s.color, textTransform: "uppercase", letterSpacing: "0.5px" }}>{s.label}</span>
        </div>
        <span style={{ fontSize: 10, color: colors.muted }}>{s.tag}</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${gridCols}, 1fr)`, gap: 8 }}>
        {items.map(({ name, desc }) => (
          <div key={name} style={{ padding: 10, borderRadius: 8, background: "#FFFFFF", border: `1px solid ${s.border}` }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: s.color }}>{name}</div>
            <div style={{ fontSize: 9, color: colors.muted, marginTop: 3, lineHeight: 1.4 }}>{desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Arrow() {
  return (
    <div style={{ display: "flex", justifyContent: "center", margin: "4px 0" }}>
      <svg width="20" height="16" viewBox="0 0 20 16" fill="none"><path d="M10 0v12M10 12l-4-4M10 12l4-4" stroke={colors.border} strokeWidth="1.5" /></svg>
    </div>
  );
}

const flows = [
  {
    title: "Flow 1: Pre-Meeting Brief Generation",
    steps: [
      { layer: "surfaces", text: 'Calendar event triggers brief generation for "Meeting with Sarah Chen, NovaBio" tomorrow at 10am' },
      { layer: "intelligence", text: 'Entity Recognition extracts: Person="Sarah Chen", Company="NovaBio", Context="Series A diligence"' },
      { layer: "intelligence", text: "Graph Traversal finds all nodes connected to Sarah Chen + NovaBio: 6 emails, 3 meetings, 2 docs, 1 LinkedIn post, 1 warm intro" },
      { layer: "data", text: "Index Connectors retrieve full content from Gmail index, Calendar index, Google Drive index, LinkedIn index (all pre-crawled)" },
      { layer: "agents", text: 'Brief Agent runs RAG: retrieves relevant chunks, feeds to LLM with prompt "Generate pre-meeting briefing with relationship context, key topics, and suggested questions"' },
      { layer: "surfaces", text: "Meeting Brief tab renders: relationship timeline, key topics, open questions, competitive intel" },
    ],
  },
  {
    title: "Flow 2: Prism-Style Diligence Grid",
    steps: [
      { layer: "surfaces", text: 'User clicks "Run Diligence" on NovaBio deal room' },
      { layer: "agents", text: "Orchestrator spawns 6 parallel cell-agents: Market Size, Team, Technology, Traction, Competition, Thesis Fit" },
      { layer: "intelligence", text: 'Each agent calls Company Search tool independently — "Find all data related to NovaBio + [dimension]"' },
      { layer: "data", text: "Company Search queries the index: emails, docs, PitchBook data (CSV import), meeting transcripts, web search results" },
      { layer: "intelligence", text: "Graph enrichment: Team agent discovers Sarah Chen → Genentech → 3 publications → George Church (advisor). Competition agent finds Recursion mentioned in 2 emails." },
      { layer: "agents", text: "Each cell-agent scores 1-10 with written rationale and source citations. Column 2 agents can read Column 1 outputs for dependent analysis." },
      { layer: "surfaces", text: "Diligence Grid renders with overall 8.5/10 score, expandable rows, and source links" },
    ],
  },
  {
    title: 'Flow 3: Network Path-Finding ("Warm Intro")',
    steps: [
      { layer: "surfaces", text: 'User asks: "How can I get a warm intro to Sarah Chen at NovaBio?"' },
      { layer: "intelligence", text: "Graph Query: Find all paths from [You] to [Sarah Chen] with max depth=3, weighted by interaction recency and frequency" },
      { layer: "intelligence", text: "Activity Graph scores relationships: You↔Mike Langford = 95% (3 emails last week, board member). Mike↔Sarah = 85% (former Genentech colleagues, LinkedIn connected)." },
      { layer: "data", text: 'Index provides evidence: Mike\'s email from Feb 15 saying "You need to meet my former colleague Sarah"' },
      { layer: "agents", text: "Path Ranking Agent evaluates all paths, selects strongest: You → Mike Langford (Enzymatics) → Sarah Chen. Strength: 92%." },
      { layer: "surfaces", text: 'Network view renders visual path with "Request Intro" and "Draft Message" action buttons' },
    ],
  },
];

const glossary = [
  ["Index Connector", "Crawls and pre-indexes a data source for fast, comprehensive search (Glean's moat vs. federated/MCP)"],
  ["Federated Connector", "Makes live API calls to data sources on demand — slower, less comprehensive, can't cross-reference"],
  ["MCP (Model Context Protocol)", "Anthropic's open standard for connecting AI to tools. Glean supports MCP but also has deeper index connectors"],
  ["Enterprise Graph", "Knowledge Graph (company-wide) + Personal Graph (per-user) + Activity Graph (actions/interactions)"],
  ["RAG", "Retrieve relevant docs from index → Augment LLM context with them → Generate grounded answer"],
  ["Prism", "Parallelized agent grid: rows × columns, each cell = independent agent. Enables scale analysis."],
  ["Company Search", "Glean's core search primitive. Exists as a tool that agents call to retrieve context from the index."],
  ["ACL (Access Control List)", "Permission rules defining who can see what. Synced from source apps, enforced at query time."],
  ["Activity Graph", "Tracks actions (edits, views, sends) not just content. Powers 'how work gets done' intelligence."],
  ["Cloud Agnostic", "Glean works with any LLM provider (OpenAI, Anthropic, Google). Uses best model for each task."],
];

export default function ArchitecturePage({ onBack }) {
  const [activeFlow, setActiveFlow] = useState(null);

  const dataSources = ["Gmail", "Google Calendar", "Google Drive", "Slack", "Affinity/Attio (CRM)", "Harmonic", "PitchBook", "LinkedIn", "Granola (Call Notes)", "X/Twitter"];

  return (
    <div style={{ flex: 1, overflow: "auto", background: colors.bg, padding: "24px 32px" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        {/* Back button */}
        <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13, color: colors.muted, background: "none", border: "none", cursor: "pointer", marginBottom: 12, padding: 0 }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          Back to Prototype
        </button>

        <h1 style={{ fontSize: 22, fontWeight: 700, color: colors.heading, marginBottom: 4 }}>Glean Capital Intelligence — System Architecture</h1>
        <p style={{ fontSize: 13, color: colors.muted, marginBottom: 24 }}>How the VC product maps to Glean&apos;s platform primitives</p>

        {/* External Data Sources */}
        <div style={{ marginBottom: 12 }}>
          <h3 style={{ fontSize: 10, fontWeight: 700, color: colors.muted, textTransform: "uppercase", letterSpacing: "1px", marginBottom: 8 }}>External Data Sources</h3>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {dataSources.map((s) => (
              <span key={s} style={{ padding: "4px 10px", borderRadius: 8, fontSize: 11, fontWeight: 500, background: "#FFFFFF", border: `1px solid ${colors.border}`, color: colors.body }}>{s}</span>
            ))}
          </div>
        </div>

        <div style={{ textAlign: "center", fontSize: 10, color: colors.muted, margin: "8px 0" }}>
          Index Connectors (crawl, ingest, sync ACLs) ↓
        </div>

        {/* Stack Layers */}
        <LayerBox layerKey="data" items={[
          { name: "Document Index", desc: "Full-text search over all crawled content" },
          { name: "Entity Index", desc: "People, companies, deals, documents as typed entities" },
          { name: "ACL Store", desc: "Permission rules synced from every source app" },
          { name: "Activity Log", desc: "Every edit, view, share, send action with timestamps" },
        ]} />
        <Arrow />
        <LayerBox layerKey="intelligence" items={[
          { name: "Knowledge Graph", desc: "Company-wide map of docs, people, teams, projects and their relationships" },
          { name: "Personal Graph", desc: "Per-user: your projects, collaborators, work patterns. Powers personalization." },
          { name: "Activity Graph", desc: "Who did what, when, with whom. Interaction frequency, recency, sentiment." },
          { name: "Entity Recognition", desc: "Identifies people, companies, topics in content" },
          { name: "Relationship Mapping", desc: "Builds edges between entities automatically" },
          { name: "Semantic Search", desc: "Vector embeddings for meaning-based retrieval" },
          { name: "Permission Filtering", desc: "Results filtered by ACLs at query time" },
        ]} />
        <Arrow />
        <LayerBox layerKey="agents" items={[
          { name: "Company Search Tool", desc: "Agent calls index + graph to retrieve context (the core RAG primitive)" },
          { name: "LLM Reasoning", desc: "Cloud-agnostic: GPT-4, Claude, Gemini — best model for the task" },
          { name: "Agent Orchestrator", desc: "Spawns, coordinates, and aggregates parallel sub-agents (Prism)" },
          { name: "Action Tools", desc: "Draft emails, create docs, update CRM, schedule meetings" },
        ]} />
        <Arrow />
        <LayerBox layerKey="surfaces" items={[
          { name: "Think (Thesis)", desc: "AI-powered thesis writing with market signal aggregation and company matching" },
          { name: "Find (Pipeline)", desc: "Deal pipeline with Prism diligence grid and AI memo generation" },
          { name: "Pick+Win (Deal Room)", desc: "Full deal workspace with context timeline, competitive intel, meeting briefs" },
          { name: "Help (Portfolio)", desc: "Health monitoring, proactive network matching, board prep" },
        ]} />

        {/* Data Flow Examples */}
        <h2 style={{ fontSize: 18, fontWeight: 700, color: colors.heading, marginTop: 40, marginBottom: 8 }}>How Data Flows Through the Stack</h2>
        <p style={{ fontSize: 13, color: colors.muted, marginBottom: 16 }}>Click each flow to see how a real user action traverses all four layers:</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {flows.map((flow, fi) => (
            <div key={fi} style={{ borderRadius: 12, border: `1px solid ${colors.border}`, overflow: "hidden", background: "#FFFFFF" }}>
              <button
                onClick={() => setActiveFlow(activeFlow === fi ? null : fi)}
                style={{
                  width: "100%", padding: "14px 16px", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center",
                  background: activeFlow === fi ? "#FAFBFC" : "#FFFFFF", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, color: colors.heading,
                }}
              >
                {flow.title}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ transform: activeFlow === fi ? "rotate(180deg)" : "none", transition: "transform 0.15s" }}>
                  <path d="M4 6l4 4 4-4" stroke={colors.muted} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {activeFlow === fi && (
                <div style={{ padding: "12px 16px", borderTop: `1px solid ${colors.border}`, background: "#FAFBFC" }}>
                  {flow.steps.map((step, si) => {
                    const sc = flowStepColors[step.layer];
                    return (
                      <div key={si} style={{ display: "flex", gap: 12, marginBottom: si < flow.steps.length - 1 ? 12 : 0 }}>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                          <div style={{
                            width: 24, height: 24, borderRadius: "50%", background: sc.bg, border: `1.5px solid ${sc.border}`,
                            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: sc.color, flexShrink: 0,
                          }}>{si + 1}</div>
                          {si < flow.steps.length - 1 && <div style={{ width: 1, flex: 1, background: colors.border, marginTop: 4 }} />}
                        </div>
                        <div style={{ flex: 1, paddingBottom: 4 }}>
                          <span style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", color: sc.color }}>{sc.label}</span>
                          <p style={{ fontSize: 12, color: colors.body, marginTop: 2, lineHeight: 1.5 }}>{step.text}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Glossary */}
        <div style={{ marginTop: 40, padding: 20, borderRadius: 12, background: "#FFFFFF", border: `1px solid ${colors.border}` }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: colors.heading, marginBottom: 16 }}>Quick Reference: Key Terms</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 32px" }}>
            {glossary.map(([term, def]) => (
              <div key={term} style={{ display: "flex", gap: 8 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: colors.primary, whiteSpace: "nowrap", minWidth: 130 }}>{term}</span>
                <span style={{ fontSize: 11, color: colors.muted, lineHeight: 1.4 }}>{def}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ height: 40 }} />
      </div>
    </div>
  );
}
