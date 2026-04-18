import { Hero } from "@/components/sections/hero";
import { Experience } from "@/components/sections/experience";
import { ProjectHub } from "@/components/sections/project-hub";
import { WorkflowViz } from "@/components/sections/workflow-viz";

export default function Home() {
  return (
    <div className="flex flex-col gap-24">
      <Hero />
      <Experience />
      <ProjectHub />
      <WorkflowViz />
      {/* Additional sections will be added here */}
    </div>
  );
}
