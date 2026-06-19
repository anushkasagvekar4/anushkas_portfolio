import { Hero } from "@/components/sections/hero";
import { EngineeringHighlights } from "@/components/sections/engineering-highlights";
import { ProjectHub } from "@/components/sections/project-hub";
import { LogicStudio } from "@/components/sections/logic-studio";
import { Experience } from "@/components/sections/experience";
import { WhyIBuild } from "@/components/sections/why-i-build";
import { About } from "@/components/sections/about";
import { SkillsEducation } from "@/components/sections/skills-education";
import { Blog } from "@/components/sections/blog";
import { WorkflowViz } from "@/components/sections/workflow-viz";

export default function Home() {
  return (
    <div className="flex flex-col gap-32 pb-32">
      <Hero />
      <EngineeringHighlights />
      <ProjectHub />
      <LogicStudio />
      <Experience />
      <WhyIBuild />
      <About />
      <SkillsEducation />
      <Blog />
      <WorkflowViz />
    </div>
  );
}
