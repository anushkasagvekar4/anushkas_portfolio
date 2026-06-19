// Shared content for the aesthetic-direction demos.
// Real portfolio content so each demo is judged on the actual site, not lorem.

export const PERSON = {
  kicker: "Product & AI Systems Engineer · Mumbai",
  name: "Anushka Sagvekar",
  headline: "Building systems that make operations invisible.",
  emphasis: "invisible.",
  blurb:
    "I build AI automation pipelines, operational platforms, and internal tools that remove manual work from real business processes.",
};

export type Metric = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  sub: string;
};

export const METRICS: Metric[] = [
  { value: 35, suffix: "+", label: "Systems shipped", sub: "production, end-to-end" },
  { value: 70, prefix: "~", suffix: "%", label: "Manual work cut", sub: "AI Chatbot System" },
  { value: 80, suffix: "%", label: "Efficiency gain", sub: "Invoice Extraction" },
  { value: 40, prefix: "~", suffix: "%", label: "Perf improved", sub: "system-wide" },
];

// Nodes + edges for the signature "systems drawing themselves" diagram.
// Coordinates are in a 0–800 x 0–360 viewBox.
export const SYSTEM_NODES = [
  { id: "in", x: 70, y: 180, label: "Input" },
  { id: "parse", x: 280, y: 90, label: "Parse" },
  { id: "route", x: 280, y: 270, label: "Route" },
  { id: "ai", x: 500, y: 180, label: "AI Engine" },
  { id: "out", x: 730, y: 180, label: "Output" },
];

export const SYSTEM_EDGES: [string, string][] = [
  ["in", "parse"],
  ["in", "route"],
  ["parse", "ai"],
  ["route", "ai"],
  ["ai", "out"],
];

export const DEMOS = [
  {
    slug: "editorial-organic",
    name: "Editorial × Organic",
    tagline: "Swiss impact · human warmth",
  },
  {
    slug: "refined-dark",
    name: "Refined Dark",
    tagline: "Premium engineer · quietly impressive",
  },
  {
    slug: "editorial",
    name: "Editorial / Swiss",
    tagline: "Big type · art-directed · memorable",
  },
  {
    slug: "organic",
    name: "Organic / Handcrafted",
    tagline: "Warm · textured · personal",
  },
] as const;
