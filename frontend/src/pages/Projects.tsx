import { motion } from "framer-motion";
import { FolderGit2, ExternalLink, Github } from "lucide-react";
import resumeData from "../data/resume.json";
const { workProjects, personalProjects } = resumeData;
import { cn } from "@/lib/utils";
import SEO from "../components/SEO";

const FADE_UP = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Projects() {
  const ProjectCard = ({ project, idx }: { project: any, idx: number }) => (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: idx * 0.1 } }
      }}
      className="flex flex-col bg-secondary/20 border border-border/50 rounded-2xl overflow-hidden hover:border-primary/50 transition-colors group"
    >
      <div className="h-2 w-full" style={{ backgroundColor: project.color }} />
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{project.title}</h3>
            <div className="text-sm font-medium" style={{ color: project.color }}>{project.subtitle}</div>
          </div>
          <div className="flex gap-2 text-muted-foreground">
            <button className="hover:text-primary transition-colors"><Github size={20} /></button>
            <button className="hover:text-primary transition-colors"><ExternalLink size={20} /></button>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed flex-grow">
          {project.desc}
        </p>

        <div className="space-y-4 mb-6">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Key Highlights</div>
          <ul className="space-y-2">
            {project.highlights.map((h: string, i: number) => (
              <li key={i} className="text-sm text-foreground flex items-center gap-2 before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full" style={{ "--tw-bg-opacity": 1, "before:backgroundColor": project.color } as any}>
                <span className="w-1.5 h-1.5 rounded-full inline-block shrink-0" style={{ backgroundColor: project.color }} />
                {h}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-border/50">
          {project.tags.map((tag: string, i: number) => (
            <span key={i} className="text-xs font-medium bg-background border border-border/50 px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-6xl mx-auto">
      <SEO title="Projects | Ramesh Patil" description="Explore the backend, ML, and AI projects built by Ramesh Patil." />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={FADE_UP}
        className="mb-16"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
          <FolderGit2 size={16} />
          Portfolio
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Featured Projects</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">A selection of my recent work spanning agentic AI, computer vision, and scalable ML applications.</p>
      </motion.div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
          Professional Experience (POCs & Production)
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {workProjects.map((project, idx) => (
            <ProjectCard key={idx} project={project} idx={idx} />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
          Personal & R&D Projects
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {personalProjects.map((project, idx) => (
            <ProjectCard key={idx} project={project} idx={idx} />
          ))}
        </div>
      </div>
    </div>
  );
}
