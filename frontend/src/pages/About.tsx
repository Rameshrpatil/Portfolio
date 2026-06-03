import { motion } from "framer-motion";
import { User, GraduationCap, MapPin, Mail, Award, Quote, Compass } from "lucide-react";
import resumeData from "../data/resume.json";
const { profile, education, stats, endorsements } = resumeData;
import SEO from "../components/SEO";

const FADE_UP = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function About() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-5xl mx-auto">
      <SEO title="About Me | Ramesh Patil" description="Learn more about Ramesh Patil's journey in software engineering and AI." />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={FADE_UP}
        className="mb-16 text-center"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
          <User size={16} />
          About Me
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">The Engineer Behind the Code</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          {profile.summary}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={FADE_UP}
          className="md:col-span-1 space-y-8"
        >
          {/* Quick Info Card */}
          <div className="bg-secondary/20 border border-border/50 rounded-2xl p-6">
            <h3 className="font-bold text-lg mb-4 border-b border-border/50 pb-2">Quick Info</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="text-primary" size={18} />
                <span>{profile.location}</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Mail className="text-primary" size={18} />
                <a href={`mailto:${profile.email}`} className="hover:text-primary transition-colors">{profile.email}</a>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Award className="text-primary" size={18} />
                <span>{stats[0].value} {stats[0].label}</span>
              </li>
            </ul>
          </div>

          {/* Education Card */}
          <div className="bg-secondary/20 border border-border/50 rounded-2xl p-6">
            <h3 className="font-bold text-lg mb-4 border-b border-border/50 pb-2 flex items-center gap-2">
              <GraduationCap className="text-primary" size={20} /> Education
            </h3>
            <div className="space-y-6">
              {education.map((edu, idx) => (
                <div key={idx} className="space-y-1">
                  <h4 className="font-semibold text-foreground text-sm leading-tight">{edu.degree}</h4>
                  <div className="text-xs text-primary font-medium">{edu.school}</div>
                  <div className="text-xs text-muted-foreground flex justify-between">
                    <span>{edu.period}</span>
                    <span className="font-medium">{edu.score}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hobbies Card */}
          <div className="bg-secondary/20 border border-border/50 rounded-2xl p-6">
            <h3 className="font-bold text-lg mb-4 border-b border-border/50 pb-2 flex items-center gap-2">
              <Compass className="text-primary" size={20} /> Beyond the Screen
            </h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full border border-primary/20 hover:bg-primary hover:text-primary-foreground transition-colors cursor-default">🏔️ Trekking</span>
              <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full border border-primary/20 hover:bg-primary hover:text-primary-foreground transition-colors cursor-default">🏀 Basketball</span>
              <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full border border-primary/20 hover:bg-primary hover:text-primary-foreground transition-colors cursor-default">🏊‍♂️ Swimming</span>
              <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full border border-primary/20 hover:bg-primary hover:text-primary-foreground transition-colors cursor-default">🏍️ Bike Riding</span>
            </div>
            <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
              When I'm not architecting systems, you can find me hiking rugged nature trails, playing competitive basketball, swimming to stay refreshed, or enjoying the open road on a long bike ride.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={FADE_UP}
          className="md:col-span-2 space-y-8"
        >
          {/* Detailed Bio / Story */}
          <div className="bg-secondary/20 border border-border/50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-6 text-foreground">My Career Journey</h3>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                My journey into software engineering started with a deep fascination for robotics and intelligent systems, leading me to pursue a degree in Computer Engineering with Honors in Robotics. I quickly realized that true intelligence requires robust, scalable backends to support it.
              </p>
              <p>
                At Dynamisch IT, I transition seamlessly between building high-performance Go microservices and architecting complex RAG pipelines in Python. I thrive on the challenge of taking cutting-edge ML models and embedding them into production-ready, event-driven systems that can handle real-world scale and latency requirements.
              </p>
              <p>
                Whether it's optimizing vector search to sub-100ms latency or designing drift detection systems that automatically trigger retraining, my goal is always to build systems that are not just intelligent, but reliable and observable.
              </p>
            </div>
          </div>

          {/* Endorsements / Testimonials */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {endorsements.map((end, idx) => (
              <div key={idx} className="bg-primary/5 border border-primary/20 rounded-2xl p-6 relative">
                <Quote className="absolute top-4 right-4 text-primary/20" size={40} />
                <p className="text-sm italic text-muted-foreground mb-4 relative z-10">"{end.text}"</p>
                <div className="flex flex-col">
                  <span className="font-semibold text-foreground text-sm">{end.author}</span>
                  <span className="text-xs text-primary">{end.role}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
