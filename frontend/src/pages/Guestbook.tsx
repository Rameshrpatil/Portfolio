import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BookHeart, MessageSquarePlus, CircleCheck, AlertCircle } from "lucide-react";
import { api } from "../lib/api";
import { cn } from "@/lib/utils";
import SEO from "../components/SEO";

const FADE_UP = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

type Signature = {
  id: string;
  name: string;
  message: string;
  created_at: string;
  admin_reaction?: string;
};

export default function Guestbook() {
  const [signatures, setSignatures] = useState<Signature[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    fetchSignatures();
  }, []);

  const fetchSignatures = async () => {
    try {
      const data = await api.getGuestbookSignatures();
      setSignatures(data);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => 
    setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.message) {
      setErrMsg("Please fill in both fields.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrMsg("");

    try {
      await api.signGuestbook({ name: form.name, message: form.message });

      setStatus("success");
      setForm({ name: "", message: "" });
      fetchSignatures(); // Refresh the list
      
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error: any) {
      console.error(error);
      setStatus("error");
      setErrMsg(error.message || "Failed to sign guestbook. Please try again.");
    }
  };

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 max-w-5xl mx-auto">
      <SEO title="Guestbook | Ramesh Patil" description="Leave a public message, feedback, or say hello in Ramesh Patil's guestbook." />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={FADE_UP}
        className="mb-16"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
          <BookHeart size={16} />
          Guestbook
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Leave a mark</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Thank you for visiting! Feel free to leave a public message, feedback, or just say hello.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Signatures Feed */}
        <div className="lg:col-span-7 space-y-6">
          <h2 className="text-2xl font-bold mb-6">Recent Signatures</h2>
          
          {loading ? (
            <div className="flex justify-center p-12">
              <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
            </div>
          ) : signatures.length === 0 ? (
            <div className="bg-secondary/20 border border-border/50 rounded-3xl p-12 text-center text-muted-foreground">
              No signatures yet. Be the first to leave one!
            </div>
          ) : (
            <div className="space-y-4">
              {signatures.map((sig, idx) => (
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: idx * 0.05 } }
                  }}
                  key={sig.id}
                  className={`bg-secondary/20 border ${sig.admin_reaction ? 'border-primary/50 shadow-[0_0_15px_rgba(var(--primary),0.1)]' : 'border-border/50'} rounded-2xl p-6 hover:border-primary/30 transition-colors relative mt-4`}
                >
                  {/* Reaction Badge */}
                  {sig.admin_reaction && (
                    <div className="absolute -top-3 -right-2 md:-right-4 bg-background border border-primary/30 text-primary px-3 py-1.5 rounded-full text-xs font-semibold shadow-xl flex items-center gap-1.5 z-10">
                      <span className="text-base leading-none">{sig.admin_reaction}</span> by Ramesh
                    </div>
                  )}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                      {sig.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{sig.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(sig.created_at).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                      </div>
                    </div>
                  </div>
                  <p className="text-foreground text-sm leading-relaxed whitespace-pre-wrap pl-13">
                    {sig.message}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Signing Form */}
        <div className="lg:col-span-5 relative">
          <div className="sticky top-32 bg-secondary/30 border border-border/50 rounded-3xl p-6 md:p-8">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <MessageSquarePlus size={20} className="text-primary" />
              Sign the Guestbook
            </h3>

            {status === "success" && (
              <div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-500 p-4 rounded-xl mb-6 text-sm font-medium">
                <CircleCheck size={18} className="shrink-0" />
                Thanks for signing!
              </div>
            )}

            {status === "error" && errMsg && (
              <div className="flex items-center gap-2 bg-red-500/10 text-red-500 p-4 rounded-xl mb-6 text-sm font-medium">
                <AlertCircle size={18} className="shrink-0" />
                {errMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Name</label>
                <input 
                  className="w-full bg-background border border-border/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" 
                  type="text" 
                  placeholder="John Doe" 
                  value={form.name} 
                  onChange={set("name")}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Message</label>
                <textarea 
                  className="w-full bg-background border border-border/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none" 
                  rows={4} 
                  placeholder="Your message to the world..." 
                  value={form.message} 
                  onChange={set("message")}
                  required
                  maxLength={500}
                />
                <div className="text-xs text-muted-foreground text-right">
                  {form.message.length}/500
                </div>
              </div>
              <button 
                type="submit" 
                disabled={status === "loading"}
                className="w-full mt-2 flex items-center justify-center gap-2 bg-foreground text-background font-medium py-3 rounded-xl hover:bg-foreground/90 transition-transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {status === "loading" ? (
                  <div className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                ) : (
                  "Sign Guestbook"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
