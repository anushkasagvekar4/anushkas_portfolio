import { Hero } from "@/components/sections/hero";
import { Experience } from "@/components/sections/experience";
import { ProjectHub } from "@/components/sections/project-hub";
import { WorkflowViz } from "@/components/sections/workflow-viz";
import { SkillsEducation } from "@/components/sections/skills-education";
import { LogicStudio } from "@/components/sections/logic-studio";

export default function Home() {
  return (
    <div className="flex flex-col gap-24">
      <Hero />
      <Experience />
      <ProjectHub />
      <LogicStudio />
      <SkillsEducation />
      <WorkflowViz />
      {/* Additional sections will be added here */}
    </div>
  );
}
