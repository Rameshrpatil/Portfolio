import { useState } from "react";
import { motion } from "framer-motion";
import resumeData from "../data/resume.json";
const { profile } = resumeData;
import { Mail, Phone, MapPin, Link2, Send, CircleCheck, AlertCircle, Github } from "lucide-react";
import { api } from "../lib/api";
import SEO from "../components/SEO";

const FADE_UP = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errMsg, setErrMsg] = useState("");

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => 
    setForm(f => ({ ...f, [k]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) { 
      setErrMsg("Please fill in all fields."); 
      setStatus("error"); 
      return; 
    }
    
    setStatus("loading"); 
    setErrMsg("");
    
    try {
      await api.submitContact({
        name: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message
      });
      
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (error: any) {
      console.error(error);
      setStatus("error"); 
      setErrMsg(error.message || "Could not send. Please email directly at " + profile.email);
    }
  }

  const contacts = [
    { href: `mailto:${profile.email}`, icon: <Mail size={18}/>, label: "Email", val: profile.email },
    { href: `tel:${profile.phone.replace(/\s+/g, '')}`, icon: <Phone size={18}/>, label: "Phone", val: profile.phone },
    { href: profile.linkedin, icon: <Link2 size={18}/>, label: "LinkedIn", val: "linkedin.com/in/rameshrpatil" },
    { href: profile.github,   icon: <Github size={18}/>, label: "GitHub",   val: "github.com/Rameshrpatil" },
    { href: null, icon: <MapPin size={18}/>, label: "Location", val: profile.location },
  ];

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 max-w-5xl mx-auto">
      <SEO title="Contact | Ramesh Patil" description="Get in touch with Ramesh Patil for opportunities in Backend Engineering and Applied AI." />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={FADE_UP}
        className="mb-16"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
          <Mail size={16} />
          Contact
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Get in touch</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">Let's build something together.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Info Column */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={FADE_UP}
          className="lg:col-span-5 space-y-8"
        >
          <p className="text-lg text-muted-foreground leading-relaxed">
            I'm open to <strong>backend engineering, ML systems,</strong> and <strong>applied AI</strong> roles or collaborations. Feel free to reach out — I typically respond within 24 hours.
          </p>
          
          <div className="flex flex-col gap-4">
            {contacts.map((c, i) => c.href ? (
              <a 
                key={i} 
                href={c.href} 
                target={c.href.startsWith("http") ? "_blank" : undefined} 
                rel="noreferrer" 
                className="flex items-center gap-4 p-4 rounded-2xl bg-secondary/20 border border-border/50 hover:border-primary/50 hover:bg-secondary/40 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  {c.icon}
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground mb-0.5">{c.label}</div>
                  <div className="text-sm text-muted-foreground group-hover:text-primary transition-colors">{c.val}</div>
                </div>
              </a>
            ) : (
              <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-secondary/20 border border-border/50 cursor-default">
                <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center text-primary">
                  {c.icon}
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground mb-0.5">{c.label}</div>
                  <div className="text-sm text-muted-foreground">{c.val}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Form Column */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2, ease: "easeOut" } }
          }}
          className="lg:col-span-7"
        >
          {status === "success" ? (
            <div className="bg-secondary/20 border border-border/50 rounded-3xl p-8 md:p-12 text-center h-full flex flex-col justify-center items-center">
              <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mb-6 mx-auto">
                <CircleCheck size={32} />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Message sent successfully!</h2>
              <p className="text-muted-foreground mb-8">Thank you for reaching out. I'll get back to you as soon as possible.</p>
              
              <button 
                onClick={() => setStatus("idle")}
                className="text-primary font-medium hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <div className="bg-secondary/20 border border-border/50 rounded-3xl p-6 md:p-10">
              {status === "error" && errMsg && (
                <div className="flex items-center gap-2 bg-red-500/10 text-red-500 p-4 rounded-xl mb-6 text-sm font-medium">
                  <AlertCircle size={18} />
                  {errMsg}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-semibold text-foreground">Full name</label>
                    <input 
                      className="w-full bg-background border border-border/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" 
                      type="text" 
                      placeholder="Your full name" 
                      value={form.name} 
                      onChange={set("name")}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">Email</label>
                    <input 
                      className="w-full bg-background border border-border/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" 
                      type="email" 
                      placeholder="your@email.com" 
                      value={form.email} 
                      onChange={set("email")}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">Subject</label>
                    <input 
                      className="w-full bg-background border border-border/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" 
                      type="text" 
                      placeholder="What's this about?" 
                      value={form.subject} 
                      onChange={set("subject")}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">Message</label>
                  <textarea 
                    className="w-full bg-background border border-border/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none" 
                    rows={6} 
                    placeholder="Describe what you'd like to discuss..." 
                    value={form.message} 
                    onChange={set("message")}
                  />
                </div>
                
                <button 
                  type="submit" 
                  disabled={status === "loading"}
                  className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground font-medium py-3 rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? (
                    <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send size={18} /> Send message
                    </>
                  )}
                </button>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </main>
  );
}
