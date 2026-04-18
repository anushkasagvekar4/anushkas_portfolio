import { Hero } from "@/components/sections/hero";
import { Experience } from "@/components/sections/experience";
import { ProjectHub } from "@/components/sections/project-hub";

export default function Home() {
  return (
    <div className="flex flex-col gap-24">
      <Hero />
      <Experience />
      <ProjectHub />
      {/* Additional sections will be added here */}
    </div>
  );
}
