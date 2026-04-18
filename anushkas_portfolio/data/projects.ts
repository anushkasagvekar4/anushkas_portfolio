export type Project = {
  id: string;
  title: string;
  category: "AI" | "Automation" | "Full Stack" | "CRM";
  company: string;
  stack: string[];
  problem: string;
  approach: string;
  outcome: string;
  impactMetric: string;
  slug: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: "1",
    title: "Central AI Chatbot System",
    category: "AI",
    company: "AI Mishqat",
    stack: ["MERN", "Gemini API", "Node.js"],
    problem: "Manual quote generation and status updates consuming ~70% of team time.",
    approach: "Built central chatbot integrating with internal systems for real-time data access.",
    outcome: "~70% reduction in manual work. Automated quotes and escalations.",
    impactMetric: "~70% work cut",
    slug: "central-ai-chatbot",
    featured: true,
  },
  {
    id: "2",
    title: "Voice-to-Form System",
    category: "AI",
    company: "AI Mishqat",
    stack: ["Gemini API", "Node.js", "React"],
    problem: "Manual data entry from spoken input causing errors and delays.",
    approach: "Audio captured → Gemini transcription → structured JSON → form auto-populated.",
    outcome: "~60% improvement in data entry speed. Near-zero transcription errors.",
    impactMetric: "60% speedup",
    slug: "voice-to-form",
    featured: true,
  },
  {
    id: "3",
    title: "Invoice Extraction System",
    category: "Automation",
    company: "AI Mishqat",
    stack: ["Gemini Vision", "Node.js", "MongoDB"],
    problem: "Manual invoice processing — slow, error-prone, unscalable.",
    approach: "PDF uploaded → Gemini vision extracts fields → structured data stored.",
    outcome: "60-80% efficiency improvement in invoice processing pipeline.",
    impactMetric: "80% efficiency",
    slug: "invoice-extraction",
    featured: true,
  },
  {
    id: "4",
    title: "Classic Pest Control CRM",
    category: "CRM",
    company: "Personal",
    stack: ["MERN Stack", "Next.js", "React-Bootstrap"],
    problem: "Pest control business needed digital booking, tracking, and quotations.",
    approach: "Full CRM — customer portal, admin dashboard, online booking, quote system.",
    outcome: "Complete operational system replacing manual processes end-to-end.",
    impactMetric: "Full Ops Sync",
    slug: "pest-control-crm",
    featured: true,
  },
  {
    id: "5",
    title: "Multi-Vendor Cake Shop",
    category: "Full Stack",
    company: "SoloCraft",
    stack: ["Next.js", "PostgreSQL", "Redux", "Cloudinary"],
    problem: "Multi-vendor platform with separate access levels needed.",
    approach: "3 separate dashboards — Super Admin, Shop Admin, Customer.",
    outcome: "Scalable multi-vendor architecture with image management and auth.",
    impactMetric: "3-way Auth",
    slug: "cake-shop-ecommerce",
  },
];
