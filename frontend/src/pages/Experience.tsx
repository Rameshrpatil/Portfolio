import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import resumeData from "../data/resume.json";
const { experience } = resumeData;
import { cn } from "@/lib/utils";
import SEO from "../components/SEO";

const FADE_UP = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Experience() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-4xl mx-auto">
      <SEO title="Experience | Ramesh Patil" description="Ramesh Patil's professional experience in building scalable ML infrastructure and high-performance backend systems." />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={FADE_UP}
        className="mb-16"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
          <Briefcase size={16} />
          Career Journey
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Experience</h1>
        <p className="text-lg text-muted-foreground">My professional journey in building scalable ML infrastructure and high-performance backend systems.</p>
      </motion.div>

      <div className="relative">
        {/* Timeline line */}
        <motion.div 
          initial={{ height: 0 }}
          animate={{ height: "100%" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute left-4 md:left-8 top-0 w-0.5 bg-border/50"
        />

        <div className="flex flex-col gap-12">
          {experience.map((exp, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={FADE_UP}
              className="relative pl-12 md:pl-24"
            >
              {/* Timeline Dot */}
              <div className={cn(
                "absolute left-[11px] md:left-[27px] top-1.5 w-3.5 h-3.5 rounded-full border-2 bg-background z-10",
                exp.current ? "border-primary shadow-[0_0_10px_rgba(var(--primary),0.5)]" : "border-muted-foreground"
              )} />
              
              <div className="bg-secondary/20 border border-border/50 rounded-2xl p-6 md:p-8 hover:bg-secondary/40 transition-colors">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-1">{exp.role}</h2>
                    <div className="text-lg text-primary font-medium">{exp.company}</div>
                  </div>
                  <div className="flex flex-col gap-2 text-sm text-muted-foreground font-medium shrink-0">
                    <span className="flex items-center gap-1.5"><Calendar size={16} /> {exp.period}</span>
                    <span className="flex items-center gap-1.5"><MapPin size={16} /> {exp.location}</span>
                  </div>
                </div>

                <div className="space-y-6">
                  {exp.projects.map((project, pIdx) => (
                    <div key={pIdx} className="space-y-3">
                      <h3 className="text-foreground font-semibold flex items-center gap-2 before:content-[''] before:w-1.5 before:h-1.5 before:bg-primary before:rounded-full">
                        {project.name}
                      </h3>
                      <ul className="space-y-2 pl-4">
                        {project.bullets.map((bullet, bIdx) => (
                          <li key={bIdx} className="text-muted-foreground text-sm leading-relaxed relative pl-4 before:content-[''] before:absolute before:left-0 before:top-2 before:w-1 before:h-1 before:bg-muted-foreground/50 before:rounded-full">
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
