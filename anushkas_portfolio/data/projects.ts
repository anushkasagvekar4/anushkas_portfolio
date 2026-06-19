export type ArchitectureNote = {
  problem: string;
  constraint: string;
  decision: string;
  tradeoff: string;
  scalingConcern: string;
};

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
  architecture?: ArchitectureNote;
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
    architecture: {
      problem: "Quote generation and status updates were handled manually by the team. Every client query required a staff member to look up data, compose a response, and send it, consuming 70% of operational bandwidth.",
      constraint: "The system needed to access live business data, not just static FAQs. A simple rule-based chatbot wouldn't work; it had to query internal databases in real-time and produce structured, accurate outputs.",
      decision: "Built a central integration layer between Gemini API and internal MongoDB collections. The chatbot fetches live data per query and formats it with Gemini, turning it into a live business intelligence layer.",
      tradeoff: "This tightly couples the chatbot to the database schema. Any change requires updating the prompt context. Chose this over embeddings to reduce infra complexity and hit production faster.",
      scalingConcern: "High query volumes could trigger excessive DB reads. Next step is a Redis cache for frequently requested data shapes with a short TTL."
    }
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
    architecture: {
      problem: "Field staff were verbally describing service details and then re-typing everything into forms manually. This transcription step was a redundant, error-prone middle layer.",
      constraint: "Audio input is unstructured. 'Client has ants in the kitchen' can't be mapped to fields by a simple parser. The system needed to understand intent, not just text.",
      decision: "Used Gemini as a structured extraction engine. The prompt instructs Gemini to return a typed JSON object conforming to the target form schema, allowing the form to auto-populate directly.",
      tradeoff: "Requires a well-crafted prompt tied to the form schema. Chose this schema-coupling for accuracy over a more abstract system that would be harder to debug.",
      scalingConcern: "Large audio files could block the UI during processing. Next step is an async queue (BullMQ) to handle transcription in the background."
    }
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
    architecture: {
      problem: "Finance ops required manually reading PDF invoices and identifying fields. Invoices varied by vendor, making template-based OCR impossible to scale.",
      constraint: "Vendor layouts differed significantly—some were structured forms, others free-text. A traditional OCR + regex approach would require maintaining one template per vendor.",
      decision: "Leveraged Gemini Vision's multi-modal capability. The system understands layout context like a human reader, finding 'Total Amount' regardless of where it appears on the page.",
      tradeoff: "Gemini Vision has higher latency than local OCR. Chose to offset this with optimistic UI updates, prioritizing extraction accuracy over raw speed.",
      scalingConcern: "High volume could exhaust Gemini rate limits. Implementing a job queue with concurrency limits to throttle API calls during peak loads."
    }
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
    architecture: {
      problem: "A pest control business managed bookings and quotes via notebooks and Excel. Scheduling conflicts were common and quotation tracking was non-existent.",
      constraint: "The system had to model a messy real-world business workflow exactly, matching specific service types and approval flows used by the business.",
      decision: "Built a dual-portal system. A customer-facing portal for booking requests eliminated status-update phone calls, while an admin dashboard centralized operations.",
      tradeoff: "Doubled development scope to build the customer portal. Accepted this because the business's biggest pain point was manual customer communication.",
      scalingConcern: "Booking history will grow rapidly. Introducing time-based archiving and composite indexing on customerId + status for fast dashboard queries."
    }
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
    architecture: {
      problem: "A multi-vendor platform requires three distinct user experiences (Super Admin, Shop Admin, Customer) and absolute data isolation between vendor accounts.",
      constraint: "Data isolation had to be enforced at the API level—a shop admin must never access another shop's orders or inventory.",
      decision: "Selected PostgreSQL for its relational integrity. Multi-tenant data (products → shop → orders) is fundamentally relational, and foreign keys prevent orphan records.",
      tradeoff: "Added schema migration overhead compared to MongoDB. Accepted this for the guaranteed data correctness required in financial transactions.",
      scalingConcern: "High vendor volume will increase Cloudinary costs and CDN latency. Moving to signed upload tokens with per-shop storage quotas."
    }
  },
];
