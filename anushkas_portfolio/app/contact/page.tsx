import { Mail } from "lucide-react";

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function ContactPage() {
  return (
    <section className="flex flex-col gap-12 py-12 min-h-[60vh] justify-center">
      <div className="flex flex-col gap-2 relative z-10">
        <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl lg:text-7xl">
          Let's build <span className="text-primary italic">something</span>.
        </h1>
        <p className="text-lg text-muted-foreground mt-4 max-w-xl">
          Interested in AI automation, full-stack systems, or collaborating on a complex problem? Reach out directly.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 max-w-4xl relative z-10">
        <a 
          href="mailto:anushkasagvekar1211@gmail.com"
          className="flex flex-col gap-4 rounded-3xl border border-border bg-card/50 p-6 transition-all hover:border-primary/50 hover:bg-card hover:-translate-y-1"
        >
          <Mail size={24} className="text-primary" />
          <div>
            <div className="font-bold text-foreground">Email</div>
            <div className="text-sm font-mono text-muted-foreground break-all">anushkasagvekar1211@gmail.com</div>
          </div>
        </a>

        <a 
          href="https://github.com/anushkasagvekar4"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col gap-4 rounded-3xl border border-border bg-card/50 p-6 transition-all hover:border-foreground/50 hover:bg-card hover:-translate-y-1"
        >
          <GithubIcon className="text-foreground" />
          <div>
            <div className="font-bold text-foreground">GitHub</div>
            <div className="text-sm font-mono text-muted-foreground">anushkasagvekar4</div>
          </div>
        </a>

        <a 
          href="https://linkedin.com/in/anushka-sagvekar" 
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col gap-4 rounded-3xl border border-border bg-card/50 p-6 transition-all hover:border-[#60a5fa]/50 hover:bg-card hover:-translate-y-1"
        >
          <LinkedinIcon className="text-[#60a5fa]" />
          <div>
            <div className="font-bold text-foreground">LinkedIn</div>
            <div className="text-sm font-mono text-muted-foreground">/in/anushka-sagvekar</div>
          </div>
        </a>
      </div>

      {/* Decorative Terminal Element */}
      <div className="mt-8 rounded-2xl border border-border bg-[#0c0c10] p-6 max-w-2xl font-mono text-sm shadow-xl relative z-10">
        <div className="flex gap-2 mb-4">
          <div className="h-3 w-3 rounded-full bg-destructive/80" />
          <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
          <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
        </div>
        <div className="text-muted-foreground">
          <span className="text-primary">~</span> ssh root@anushkaos.dev<br/>
          password: <span className="text-muted-foreground/30">********</span><br/>
          <span className="text-[#2dd4bf]">Welcome back, Admin. System is running at optimal efficiency. 🚀</span>
        </div>
      </div>
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] max-w-3xl bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
}
