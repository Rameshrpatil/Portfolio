import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";
import { api } from "../lib/api";
import { Settings, Save, AlertCircle, CheckCircle2, ArrowLeft, UserCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SEO from "../components/SEO";

export default function AdminSettings() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });
  
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [portfolio, setPortfolio] = useState({
    name: "", title: "", tagline: "", summary: "", 
    email: "", phone: "", linkedin: "", github: "", location: ""
  });

  useEffect(() => {
    api.getPortfolioDetails().then(res => {
      if (res.profile) setPortfolio(res.profile);
    }).catch(err => console.error(err));
  }, []);

  const handleUpdateAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg({ type: "", text: "" });

    try {
      const updates: any = {};
      if (email !== user?.email) updates.email = email;
      if (password) {
        if (password !== confirmPassword) throw new Error("Passwords do not match");
        updates.password = password;
      }

      if (Object.keys(updates).length === 0) {
        setMsg({ type: "info", text: "No auth changes made." });
        setLoading(false);
        return;
      }

      const { error } = await supabase.auth.updateUser(updates);
      if (error) throw error;

      setMsg({ type: "success", text: "Security settings updated successfully!" });
      setPassword(""); setConfirmPassword("");
    } catch (err: any) {
      setMsg({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePortfolio = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg({ type: "", text: "" });

    try {
      await api.updatePortfolioDetails(portfolio);
      setMsg({ type: "success", text: "Portfolio details saved! Refresh the page to see changes." });
    } catch (err: any) {
      setMsg({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-4xl mx-auto">
      <SEO title="Admin Settings | Ramesh Patil" />
      
      <button onClick={() => navigate("/admin")} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8">
        <ArrowLeft size={16} /> Back to Dashboard
      </button>

      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
          <Settings size={16} /> Configuration
        </div>
        <h1 className="text-3xl font-bold">Admin Settings</h1>
      </div>

      {msg.text && (
        <div className={`flex items-center gap-2 p-4 rounded-xl mb-6 text-sm font-medium ${
          msg.type === "error" ? "bg-red-500/10 text-red-500" :
          msg.type === "success" ? "bg-emerald-500/10 text-emerald-500" :
          "bg-blue-500/10 text-blue-500"
        }`}>
          {msg.type === "error" ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
          {msg.text}
        </div>
      )}

      <div className="grid grid-cols-1 gap-8">
        {/* Portfolio Settings */}
        <div className="bg-secondary/20 border border-border/50 rounded-3xl p-8">
          <h2 className="text-xl font-bold mb-6 border-b border-border/50 pb-4 flex items-center gap-2"><UserCircle size={20}/> Portfolio Details</h2>
          <form onSubmit={handleUpdatePortfolio} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold">Full Name</label>
                <input value={portfolio.name} onChange={e => setPortfolio({...portfolio, name: e.target.value})} className="w-full bg-background border border-border/50 rounded-xl px-4 py-3 text-sm focus:border-primary transition-colors" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">Job Title</label>
                <input value={portfolio.title} onChange={e => setPortfolio({...portfolio, title: e.target.value})} className="w-full bg-background border border-border/50 rounded-xl px-4 py-3 text-sm focus:border-primary transition-colors" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">Tagline</label>
                <input value={portfolio.tagline} onChange={e => setPortfolio({...portfolio, tagline: e.target.value})} className="w-full bg-background border border-border/50 rounded-xl px-4 py-3 text-sm focus:border-primary transition-colors" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">Location</label>
                <input value={portfolio.location} onChange={e => setPortfolio({...portfolio, location: e.target.value})} className="w-full bg-background border border-border/50 rounded-xl px-4 py-3 text-sm focus:border-primary transition-colors" required />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold">About Summary</label>
              <textarea value={portfolio.summary} onChange={e => setPortfolio({...portfolio, summary: e.target.value})} rows={4} className="w-full bg-background border border-border/50 rounded-xl px-4 py-3 text-sm focus:border-primary transition-colors" required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold">Public Email</label>
                <input value={portfolio.email} onChange={e => setPortfolio({...portfolio, email: e.target.value})} className="w-full bg-background border border-border/50 rounded-xl px-4 py-3 text-sm focus:border-primary transition-colors" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">Phone</label>
                <input value={portfolio.phone} onChange={e => setPortfolio({...portfolio, phone: e.target.value})} className="w-full bg-background border border-border/50 rounded-xl px-4 py-3 text-sm focus:border-primary transition-colors" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">LinkedIn URL</label>
                <input value={portfolio.linkedin} onChange={e => setPortfolio({...portfolio, linkedin: e.target.value})} className="w-full bg-background border border-border/50 rounded-xl px-4 py-3 text-sm focus:border-primary transition-colors" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">GitHub URL</label>
                <input value={portfolio.github} onChange={e => setPortfolio({...portfolio, github: e.target.value})} className="w-full bg-background border border-border/50 rounded-xl px-4 py-3 text-sm focus:border-primary transition-colors" required />
              </div>
            </div>

            <button type="submit" disabled={loading} className="bg-primary text-primary-foreground font-medium px-6 py-3 rounded-xl hover:bg-primary/90 transition-transform active:scale-95 disabled:opacity-50">
              {loading ? "Saving..." : "Save Portfolio Details"}
            </button>
          </form>
        </div>

        {/* Security Settings */}
        <div className="bg-secondary/20 border border-border/50 rounded-3xl p-8">
          <h2 className="text-xl font-bold mb-6 border-b border-border/50 pb-4 flex items-center gap-2"><Settings size={20}/> Security & Authentication</h2>
          <form onSubmit={handleUpdateAuth} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold">Admin Login Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-background border border-border/50 rounded-xl px-4 py-3 text-sm focus:border-primary transition-colors" required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold">New Password (optional)</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Leave blank to keep current" className="w-full bg-background border border-border/50 rounded-xl px-4 py-3 text-sm focus:border-primary transition-colors" minLength={6} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">Confirm New Password</label>
                <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirm your new password" className="w-full bg-background border border-border/50 rounded-xl px-4 py-3 text-sm focus:border-primary transition-colors" minLength={6} />
              </div>
            </div>

            <button type="submit" disabled={loading} className="bg-secondary text-foreground font-medium px-6 py-3 rounded-xl hover:bg-secondary/80 transition-transform active:scale-95 disabled:opacity-50">
              {loading ? "Saving..." : "Update Security Settings"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
