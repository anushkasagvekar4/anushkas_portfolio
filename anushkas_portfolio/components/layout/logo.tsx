import Link from "next/link";

/**
 * Brand logo. The Yellowtail script is reserved exclusively for the name —
 * everywhere else the site uses the Editorial/Swiss grotesk.
 */
export function Logo({
  className = "",
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const scale = {
    sm: "text-2xl",
    md: "text-3xl",
    lg: "text-5xl md:text-6xl",
  }[size];

  return (
    <Link
      href="/"
      aria-label="Anushka Sagvekar — home"
      className={`group inline-flex items-end leading-none ${className}`}
    >
      <span className={`font-script ${scale} text-foreground`}>Anushka</span>
      <span className="mb-1 ml-0.5 h-1.5 w-1.5 rounded-full bg-primary transition-transform group-hover:scale-150" />
    </Link>
  );
}
