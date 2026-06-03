import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Download, ArrowRight, MapPin, Briefcase, ChevronRight, TerminalSquare, Database, Cpu } from "lucide-react";
import resumeData from "../data/resume.json";
const { profile } = resumeData;
import { cn } from "@/lib/utils";
import SEO from "../components/SEO";

const FADE_IN = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen pt-20">
      <SEO title="Ramesh Patil | Applied AI & Backend Engineer" />
      {/* HERO SECTION */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center justify-center">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-background" />
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px]" />
          <div className="absolute -top-[30%] -right-[10%] w-[70%] h-[70%] rounded-full bg-primary/10 blur-[120px] mix-blend-screen" />
          <div className="absolute top-[40%] -left-[20%] w-[60%] h-[60%] rounded-full bg-blue-900/10 blur-[120px] mix-blend-screen" />
        </div>

        <div className="max-w-6xl mx-auto px-6 w-full relative z-10 py-12 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <motion.div
                custom={0}
                initial="hidden"
                animate="visible"
                variants={FADE_IN}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-medium mb-6 border border-emerald-500/20"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Open to opportunities
              </motion.div>

              <motion.h1
                custom={1}
                initial="hidden"
                animate="visible"
                variants={FADE_IN}
                className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-6"
              >
                {profile.name.split(" ")[0]}{" "}
                <span className="text-muted-foreground">{profile.name.split(" ").slice(1).join(" ")}</span>
              </motion.h1>

              <motion.div
                custom={2}
                initial="hidden"
                animate="visible"
                variants={FADE_IN}
                className="text-xl md:text-2xl text-primary font-medium mb-6"
              >
                Backend &amp; Applied AI Engineer
              </motion.div>

              <motion.p
                custom={3}
                initial="hidden"
                animate="visible"
                variants={FADE_IN}
                className="text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed"
              >
                <strong>2+ years</strong> designing and deploying scalable AI-powered systems, audio intelligence, and high-performance backend services. Specialising in <strong>deep learning inference, RAG architectures,</strong> and <strong>event-driven ML infrastructure</strong>.
              </motion.p>

              <motion.div
                custom={4}
                initial="hidden"
                animate="visible"
                variants={FADE_IN}
                className="flex flex-wrap gap-4 mb-10 text-sm text-muted-foreground font-medium"
              >
                <span className="flex items-center gap-1.5"><MapPin size={16} /> {profile.location}</span>
                <span className="flex items-center gap-1.5"><Briefcase size={16} /> Dynamisch IT Pvt. Ltd.</span>
              </motion.div>

              <motion.div
                custom={5}
                initial="hidden"
                animate="visible"
                variants={FADE_IN}
                className="flex flex-wrap items-center gap-4"
              >
                <Link
                  to="/contact"
                  className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-transform hover:scale-105 active:scale-95"
                >
                  <Mail size={18} />
                  Get in touch
                </Link>
                <a
                  href="/resume.pdf"
                  download="Ramesh_Patil_Resume.pdf"
                  className="flex items-center gap-2 bg-secondary text-secondary-foreground border border-border/50 px-6 py-3 rounded-full font-medium hover:bg-secondary/80 transition-transform hover:scale-105 active:scale-95"
                >
                  <Download size={18} />
                  Download CV
                </a>
              </motion.div>
            </div>

            {/* Right Content / Developer Card */}
            <motion.div
              custom={6}
              initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ delay: 0.6, duration: 0.8, type: "spring" }}
              className="relative perspective-[1000px] hidden md:block"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-2xl blur-2xl -z-10" />
              <div className="bg-background/40 backdrop-blur-xl border border-border/50 rounded-2xl overflow-hidden shadow-2xl">
                <div className="bg-muted/50 border-b border-border/50 px-4 py-3 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <div className="mx-auto text-xs font-mono text-muted-foreground flex items-center gap-2">
                    <TerminalSquare size={14} /> developer_profile.py
                  </div>
                </div>
                <div className="p-6 font-mono text-sm leading-relaxed">
                  <div className="text-purple-400">class <span className="text-yellow-400">SoftwareEngineer</span>:</div>
                  <div className="pl-4">
                    <div className="text-blue-400">def <span className="text-yellow-400">__init__</span>(self):</div>
                    <div className="pl-4 text-muted-foreground">
                      self.name = <span className="text-green-400">"{profile.name}"</span><br/>
                      self.role = <span className="text-green-400">"Backend & AI Engineer"</span><br/>
                      self.stack = [<br/>
                      <span className="pl-4">
                        <span className="text-green-400">"Python"</span>, <span className="text-green-400">"FastAPI"</span>, <span className="text-green-400">"Go"</span>,<br/>
                      </span>
                      <span className="pl-4">
                        <span className="text-green-400">"PyTorch"</span>, <span className="text-green-400">"Docker"</span>, <span className="text-green-400">"Milvus"</span><br/>
                      </span>
                      ]
                    </div>
                    <br/>
                    <div className="text-blue-400">def <span className="text-yellow-400">get_expertise</span>(self):</div>
                    <div className="pl-4 text-muted-foreground">
                      return [<br/>
                      <span className="pl-4 text-green-400">"Deep Learning Inference"</span>,<br/>
                      <span className="pl-4 text-green-400">"RAG Architectures"</span>,<br/>
                      <span className="pl-4 text-green-400">"Microservices"</span><br/>
                      ]
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* QUICK NAV / HIGHLIGHTS */}
      <section className="py-20 relative z-10 border-t border-border/30 bg-background/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-2xl font-bold">Highlights</h2>
            <div className="h-px bg-border/50 flex-grow" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { 
                num: "01", label: "EXPERIENCE", title: "Production AI Infrastructure", 
                desc: "Event-driven pipelines, ML observability, RAG systems, and Golang microservices.", 
                to: "/experience", icon: Database
              },
              { 
                num: "02", label: "PROJECTS", title: "Real-world Applications", 
                desc: "Agentic AI suites, ATS scorers, computer vision & geospatial segmentation.", 
                to: "/projects", icon: TerminalSquare
              },
              { 
                num: "03", label: "SKILLS", title: "Backend & ML Capabilities", 
                desc: "Python, FastAPI, PyTorch, Milvus, RabbitMQ, Celery, Docker, Postgres.", 
                to: "/skills", icon: Cpu
              },
            ].map((c, i) => (
              <Link 
                key={c.num} 
                to={c.to}
                className="group relative bg-secondary/30 border border-border/50 rounded-2xl p-6 hover:bg-secondary/50 transition-colors overflow-hidden"
              >
                <div className="absolute -right-10 -bottom-10 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                  <c.icon size={120} />
                </div>
                <div className="text-xs font-bold text-muted-foreground mb-4 tracking-wider">
                  {c.num} <span className="mx-2">/</span> {c.label}
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{c.title}</h3>
                <p className="text-sm text-muted-foreground mb-6 line-clamp-3">{c.desc}</p>
                
                <div className="flex items-center gap-2 text-sm font-medium text-primary mt-auto">
                  View Details
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
