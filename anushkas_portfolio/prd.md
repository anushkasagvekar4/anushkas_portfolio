AnushkaOS.dev
Product Requirements Document
Anushka Sagvekar  ·  AI Full Stack Developer  ·  v1.0

1. Product Overview
Product Name	AnushkaOS.dev
Version	1.0 (Phase 1) / 2.0 (Phase 2)
Owner	Anushka Sagvekar — AI Full Stack Developer
Type	Interactive AI-powered developer portfolio
Status	In Planning — Build starts Phase 1
Last Updated	April 2026

AnushkaOS.dev is an interactive portfolio product — not a static website. It operates as a command center showcasing Anushka's 35+ real-world applications, AI workflows, and engineering decisions. Every section demonstrates skills by doing, not just describing.

2. Problem Statement
Standard developer portfolios fail to convey depth. Recruiters see bullet points, not outcomes. Founders see tech stacks, not problem-solving. Clients see project names, not working systems. AnushkaOS.dev closes this gap by letting visitors experience the work directly.

Target User	What they need
Recruiters	Quick signal — can she ship? What has she actually built?
Startup founders	Evidence of outcome-driven AI product thinking
Clients (SMBs)	Proof of relevant domain work with live demos
Developer peers	Technical transparency — decisions, architecture, tradeoffs

3. Design System & Theme
3.1 Visual Language
Theme: Dev OS — inspired by Linear, Vercel dashboard, and terminal aesthetics. Clean, information-dense, professional dark. Not cyberpunk. Not glassmorphism.

Background	#0c0c10 — near-black page surface
Card surface	#111118
Borders	#1e1e28 — subtle, barely visible
Primary accent	#a78bfa — violet (signature color)
AI badge	#2dd4bf — teal
Full-stack badge	#fb923c — coral
Text primary	#f0f0f8
Text secondary	#6d6d80
Text hint	#3d3d55
Body font	Inter — all UI text
Mono font	JetBrains Mono — metrics, code, terminal elements

3.2 Layout Structure
•	Desktop: Persistent top nav + left icon sidebar (VS Code style) + main content
•	Mobile: Bottom tab bar replaces sidebar; chatbot becomes full-screen modal
•	Grid: 8px base unit — all spacing is a multiple of 8
•	Sections breathe at 120–160px vertical spacing

3.3 Responsiveness
Component	Desktop → Tablet → Mobile
Project cards	3-col → 2-col → 1-col
Metric strip	4-col → 2-col → 2-col
Sidebar	Icon sidebar → hidden → bottom tab bar
Workflow diagrams	Full width → horizontally scrollable
Chatbot	Inline panel → floating button → full-screen modal

Touch targets: minimum 44px on all interactive elements. No horizontal scroll on any page.

4. Tech Stack
4.1 Core Stack
Category	Tool & Reason
Framework	Next.js 14 (App Router) — already used, SSR + API routes
Styling	Tailwind CSS — already used, utility-first
Animations	Framer Motion — already used, scroll & micro-interactions
UI Components	Shadcn/ui — headless, unstyled, fast to customize
Icons	Lucide React — clean, consistent set
Database	MongoDB Atlas — projects, sessions, analytics
Deployment	Vercel — zero-config, edge functions, blob storage
Auth (admin)	Clerk — one-line setup, free tier

4.2 Phase 2 Additions (AI Layer)
Category	Tool & Reason
Primary AI	Gemini API — already integrated in production work
Fallback AI	OpenAI GPT-4o-mini — structured outputs, resume gen
AI SDK	Vercel AI SDK — useChat hook, streaming built-in
Vector store	MongoDB Atlas Vector Search — avoids Pinecone cost, same DB
Rate limiting	Upstash Redis — 10k requests/day free tier
Workflow viz	React Flow — interactive pipeline diagrams

5. Feature Specifications
5.1 Phase 1 — Core Portfolio (Ship in Week 1)

Feature	Description	Phase	Priority
Hero section	Terminal-style animated intro, name, title, metrics ticker, CTA to explore	Phase 1	P0
Impact metrics	35+ apps, ~70% manual work cut, 60-80% efficiency, ~40% perf improvement	Phase 1	P0
Project hub	Filter tabs (AI / Automation / Full-Stack / CRM), project cards with impact stat	Phase 1	P0
Case study pages	Per-project: Problem → Approach → Tech → Outcome → Impact metric	Phase 1	P0
Workflow showcase	Animated flow diagrams for voice-to-form, invoice extraction, email automation	Phase 1	P0
How I Think section	3–5 decision principles with real project examples each	Phase 1	P1
Build timeline	Month-by-month ship log — what was built and learned	Phase 1	P1
Contact section	Email, GitHub (anushkasagvekar4), LinkedIn — no form, direct links	Phase 1	P1
Dark OS theme	Full dark theme per design system — responsive across all breakpoints	Phase 1	P0
Admin panel	Protected route (Clerk) to update projects + metrics without code	Phase 1	P2

5.2 Projects to Showcase (Phase 1)
Each project card shows: name, category badge, stack pills, and one impact metric. Case study page expands all details.

Project 1 — Central AI Chatbot System
Company	AI Mishqat
Category	AI / Automation
Stack	MERN, Gemini API, Node.js
Problem	Manual quote generation and status updates consuming ~70% of team time
Approach	Built central chatbot integrating with internal systems for real-time data access
Outcome	~70% reduction in manual work. Automated quotes, status updates, and escalations
Key features	Workflow automation, role-based access, live data integration
Show in demo	Animated flow diagram: trigger → Gemini → action → response

Project 2 — Voice-to-Form System
Company	AI Mishqat
Category	AI / Automation
Stack	Gemini API (speech), Node.js, React
Problem	Manual data entry from spoken input causing errors and delays
Approach	Audio captured → Gemini transcription → structured JSON → form auto-populated
Outcome	~60% improvement in data entry speed. Near-zero transcription errors
Key features	Real-time transcription, field mapping, validation on output
Show in demo	Waveform → transcript → JSON → filled form animation

Project 3 — Invoice Extraction System
Company	AI Mishqat
Category	AI / Automation
Stack	Gemini API (vision), Node.js, MongoDB
Problem	Manual invoice processing — slow, error-prone, unscalable
Approach	PDF/image uploaded → Gemini vision extracts fields → structured data stored
Outcome	60-80% efficiency improvement in invoice processing pipeline
Key features	Multi-format support, field validation, export to structured JSON
Show in demo	PDF in → bounding box highlight → structured data out

Project 4 — CSV Auto-Mapping
Company	AI Mishqat
Category	AI / Automation
Stack	Gemini API, Node.js, React
Problem	Clients uploading CSVs with inconsistent column names — manual mapping required
Approach	AI reads headers → infers correct field mappings → user confirms → import runs
Outcome	Eliminated manual mapping step. Reduced data import errors significantly
Key features	Fuzzy header matching, confidence scoring, one-click confirm
Show in demo	Raw CSV → AI suggestion overlay → confirmed mapping → data loaded

Project 5 — Email Automation Pipeline
Company	AI Mishqat
Category	AI / Automation
Stack	Node.js, Gemini API, Nodemailer
Problem	Manual email sending for routine triggers — status updates, confirmations, follow-ups
Approach	Event trigger → AI classifies intent → selects template → personalises → sends
Outcome	60-80% reduction in manual email effort. Consistent messaging at scale
Key features	Trigger-based, template selection, personalisation, logging
Show in demo	Animated flow: event → classify → template → personalise → send

Project 6 — Exhibition Kiosk System
Company	AI Mishqat (Intern)
Category	Full Stack
Stack	MERN, Tailwind CSS, Nodemailer
Problem	Manual visitor registration and badge printing at exhibition events
Approach	Kiosk registration form → DB → auto badge generation → email confirmation
Outcome	Streamlined check-in flow. Reduced registration time per visitor
Key features	Registration, badge printing, email automation, admin dashboard
Show in demo	Screen recording or animated mockup of kiosk flow

Project 7 — Classic Pest Control CRM
Company	Personal / Freelance
Category	Full Stack / CRM
Stack	MERN Stack, Next.js, React-Bootstrap, Render
Problem	Pest control business needed digital booking, tracking, and quotations
Approach	Full CRM — customer portal, admin dashboard, online booking, quote system
Outcome	Complete operational system replacing manual processes end-to-end
Key features	Online booking, service tracking, quotation system, MongoDB storage
GitHub	Live / github link — deployed on Render
Show in demo	Dashboard walkthrough, booking flow, quote generation

Project 8 — Multi-Vendor Cake Shop
Company	SoloCraft / Freelance
Category	Full Stack / E-commerce
Stack	Next.js, Express.js, PostgreSQL, Redux, Cloudinary, Tailwind CSS
Problem	Multi-vendor cake ordering platform with separate access levels needed
Approach	3 separate dashboards — Super Admin, Shop Admin, Customer — with Redux state
Outcome	Scalable multi-vendor architecture with image management and auth
Key features	Role-based dashboards, REST APIs, Cloudinary uploads, cart + checkout
Status	In progress — actively building
Show in demo	Role switcher demo showing each dashboard view

5.3 Phase 2 — AI Integration Layer
Add after Phase 1 is live and stable.

Feature	Description	Phase	Priority
AI Chatbot	RAG-powered chatbot trained on resume + all projects. Gemini primary, GPT-4o-mini fallback	Phase 2	P0
'Hire Me For This' matcher	User describes problem → AI matches to relevant skills/projects → shows what Anushka would build	Phase 2	P0
Live AI playground	Sandboxed demo of invoice extraction or voice-to-form — visitor uses it directly	Phase 2	P1
Tech decision log	Per-project: 'Why Gemini over OpenAI?' 'Why MongoDB not PostgreSQL?' — real reasoning	Phase 2	P1
'What I'd do differently'	Each project has a flip card with honest retrospective — shows growth and maturity	Phase 2	P2
Visitor analytics	Track what people ask the chatbot — feeds content improvement decisions	Phase 2	P2

6. Key User Flows
Flow A — Recruiter
•	Lands on home → sees metrics ticker + hero
•	Scrolls to projects → filters by 'AI & Automation'
•	Clicks AI Chatbot project → reads case study → sees animated flow diagram
•	Phase 2: Opens chatbot → asks 'Do you know React?' → gets answer with project reference

Flow B — Startup Founder
•	Lands on home → sees 'built 35+ apps, 70% manual work cut'
•	Goes to Workflows section → sees animated invoice extraction pipeline
•	Phase 2: Types their problem → 'Hire Me For This' matcher shows relevant projects
•	Clicks Contact → reaches out directly

Flow C — Client
•	Finds site → looks at CRM / Full Stack filter
•	Sees Pest Control CRM → clicks into case study → sees dashboards, booking flow
•	Checks 'How I Think' → reads decision-making approach
•	Contacts via LinkedIn or email

7. Project Setup — Steps to Start
7.1 Repo & Config
•	Step 1 npx create-next-app@latest anushkaos --typescript --tailwind --app
•	Step 2 Install: framer-motion lucide-react clsx tailwind-merge
•	Step 3 Install Shadcn: npx shadcn@latest init — choose dark theme
•	Step 4 Set up .env.local: MONGODB_URI, CLERK_PUBLISHABLE_KEY, CLERK_SECRET_KEY
•	Step 5 Install: npm install mongodb @clerk/nextjs react-flow-renderer

7.2 Folder Structure
app/	Pages — (home), /projects, /projects/[slug], /workflows, /thinking, /admin
components/ui/	Shadcn base components
components/sections/	Hero, Metrics, ProjectHub, WorkflowViz, HowIThink, Contact
components/layout/	Navbar, Sidebar, Footer, PageWrapper
lib/db/	mongodb.ts — connection, project queries
lib/utils/	cn.ts, formatters, constants
data/	projects.ts — static project data (Phase 1), migrations to DB later
public/	og-image.png, favicon, project screenshots
styles/	globals.css — custom Tailwind tokens + font imports

7.3 Build Order (Phase 1 — Week by Week)
Day 1–2	Setup repo, design system, Tailwind config, font imports, global layout (Navbar, Sidebar, PageWrapper)
Day 3	Hero section + Metrics strip — static data, Framer Motion entrance animations
Day 4–5	Project hub — filter tabs, project cards, case study page template, all 8 projects written up
Day 6	Workflow showcase — React Flow diagrams for voice-to-form, invoice extraction, email automation
Day 7	How I Think, Build Timeline, Contact, Admin panel (Clerk gate), final responsive QA + deploy

8. MongoDB Schema (Phase 1)
Collection: projects
Field	Type & Notes
slug	string — URL identifier e.g. 'ai-chatbot-system'
title	string — display name
category	string[] — ['AI', 'Automation', 'Full Stack', 'CRM']
company	string — AI Mishqat / SoloCraft / Personal
stack	string[] — tech used
problem	string — 1–2 sentence problem statement
approach	string — what was built and how
outcome	string — measurable result
impactMetric	string — single headline stat e.g. '~70% manual work cut'
demoType	string — 'flow-diagram' | 'recording' | 'live' | 'screenshots'
featured	boolean — show on homepage
publishedAt	Date

Collection: analytics (Phase 2)
Field	Type & Notes
event	string — 'page_view' | 'project_click' | 'chat_query' | 'contact_click'
page	string — which page/section
sessionId	string
metadata	object — e.g. { projectSlug, query, filter }
ts	Date

9. Phase 1 Launch Checklist
•	Hero section live with metrics ticker and CTA
•	All 8 projects written up with full case study pages
•	Project hub with 3 filter tabs working
•	Workflow showcase — at least 3 animated flow diagrams
•	How I Think — minimum 3 principles with examples
•	Build timeline — filled from Sep 2025 to present
•	Contact section with GitHub + LinkedIn links
•	Fully responsive — tested on mobile, tablet, desktop
•	OG image set for social sharing
•	Deployed to Vercel on custom domain AnushkaOS.dev
•	Admin panel — Clerk protected, can update project data

10. Risks & Rules
Risk	Mitigation
Portfolio never launches — 'not ready'	Hard rule: ship Phase 1 by Day 7 even if imperfect
Phase 2 AI added before Phase 1 is stable	No AI work until all Phase 1 checklist items are done
Overbuilding the admin panel	MVP admin = just a protected form to edit project JSON. Nothing more
Slow page load killing first impression	Static project data in Phase 1. No DB calls on home page. Use Next.js SSG
Mobile layout breaking on real devices	Test on actual phone before launch, not just DevTools
Workflow diagrams too complex to read	Max 5 nodes per diagram. Labels outside boxes, not inside

AnushkaOS.dev — PRD v1.0
Anushka Sagvekar · anushkasagvekar1211@gmail.com · github: anushkasagvekar4

