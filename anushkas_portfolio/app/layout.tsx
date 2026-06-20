import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Yellowtail } from "next/font/google";
import "./globals.css";
import { MainLayout } from "@/components/layout/main-layout";
import { ThemeProvider } from "@/components/theme-provider";
import { Preloader } from "@/components/preloader";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

// Brush-script display font for headings (Rockybilly-style look)
const yellowtail = Yellowtail({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-script",
});

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
const title = "Anushka Sagvekar — Product & AI Systems Engineer";
const description =
  "Product & AI Systems Engineer. Built 35+ production systems across AI workflow automation, operational tooling, and scalable full-stack platforms. Based in Mumbai.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: [
    "Anushka Sagvekar",
    "AI Systems Engineer",
    "Full Stack Developer",
    "AI Automation",
    "Next.js",
    "Mumbai",
  ],
  authors: [{ name: "Anushka Sagvekar" }],
  alternates: { canonical: "/" },
  icons: { icon: "/image.png", apple: "/image.png" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Anushka Sagvekar",
    title,
    description,
    images: [{ url: "/image.png", width: 1200, height: 630, alt: "Anushka Sagvekar" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth" data-scroll-behavior="smooth">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${yellowtail.variable} font-sans bg-background text-foreground min-h-screen selection:bg-primary/20`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <Preloader />
          <MainLayout>{children}</MainLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
