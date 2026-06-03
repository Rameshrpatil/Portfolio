import { motion } from "framer-motion";
import { Code2, Cpu, Database, LayoutTemplate, Activity } from "lucide-react";
import resumeData from "../data/resume.json";
const { skills, skillProficiency } = resumeData;
import SEO from "../components/SEO";

const STAGGER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const FADE_UP = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export default function Skills() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-5xl mx-auto">
      <SEO title="Skills | Ramesh Patil" description="Technical skills including Deep Learning, Backend Engineering, Cloud Infrastructure, and Python." />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={FADE_UP}
        className="mb-16"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
          <Cpu size={16} />
          Technical Arsenal
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Skills Dashboard</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">A comprehensive overview of my technical capabilities spanning Deep Learning, Backend Engineering, and Cloud Infrastructure.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Radar/Bar Chart Approximation with Progress Bars */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={STAGGER}
          className="space-y-12"
        >
          <div className="flex items-center gap-2 font-semibold text-xl mb-6">
            <Activity className="text-primary" /> Proficiency Overview
          </div>
          
          {Object.entries(skillProficiency).map(([category, items]) => (
            <motion.div key={category} variants={FADE_UP} className="space-y-4">
              <h3 className="font-semibold text-muted-foreground text-sm uppercase tracking-wider">{category}</h3>
              <div className="space-y-3">
                {items.map((skill, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-sm mb-1.5 font-medium">
                      <span>{skill.name}</span>
                      <span className="text-primary">{skill.pct}%</span>
                    </div>
                    <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 + idx * 0.1, ease: "easeOut" }}
                        className="h-full bg-primary rounded-full relative"
                      >
                        <div className="absolute inset-0 bg-white/20 w-full h-full animate-[shimmer_2s_infinite]" />
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Categorized Tool Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={STAGGER}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-fit"
        >
          {Object.entries(skills).map(([category, details], idx) => (
            <motion.div
              key={category}
              variants={FADE_UP}
              className="bg-secondary/20 border border-border/50 rounded-2xl p-6 hover:bg-secondary/40 transition-colors group relative overflow-hidden"
            >
              <div className="absolute -right-4 -top-4 text-6xl opacity-[0.03] group-hover:opacity-10 transition-opacity">
                {details.icon}
              </div>
              <div className="text-2xl mb-4">{details.icon}</div>
              <h3 className="font-bold text-foreground mb-2">{category}</h3>
              <p className="text-xs text-muted-foreground mb-4 line-clamp-2">{details.desc}</p>
              <div className="flex flex-wrap gap-2">
                {details.items.slice(0, 4).map((item, i) => (
                  <span key={i} className="text-xs font-medium bg-background border border-border/50 px-2.5 py-1 rounded-md">
                    {item}
                  </span>
                ))}
                {details.items.length > 4 && (
                  <span className="text-xs font-medium bg-primary/10 text-primary px-2.5 py-1 rounded-md">
                    +{details.items.length - 4} more
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
