import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";
import { api } from "../lib/api";
import { LogOut, LayoutDashboard, MessageSquare, BookOpen, Settings, Mail, MailOpen, Activity, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import SEO from "../components/SEO";

type Message = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  created_at: string;
};

type AnalyticsStats = {
  total_views: number;
  unique_visitors: number;
  chart_data: { name: string; views: number }[];
};

export default function Admin() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loadingMsgs, setLoadingMsgs] = useState(true);
  
  const [stats, setStats] = useState<AnalyticsStats | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetchMessages();
    fetchStats();
    
    // Real-time polling every 5 seconds
    const interval = setInterval(() => {
      fetchStats();
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const fetchMessages = async () => {
    setLoadingMsgs(true);
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: false });
      
    if (!error && data) {
      setMessages(data);
    }
    setLoadingMsgs(false);
  };

  const fetchStats = async () => {
    try {
      const data = await api.getAnalyticsStats();
      setStats(data);
      setErrorMsg("");
    } catch (e: any) {
      console.error("Failed to fetch stats", e);
      setErrorMsg(e.toString());
    }
  };

  const toggleMessageStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'unread' ? 'read' : 'unread';
    const { error } = await supabase
      .from("messages")
      .update({ status: newStatus })
      .eq("id", id);
      
    if (!error) {
      setMessages(messages.map(m => m.id === id ? { ...m, status: newStatus } : m));
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-6xl mx-auto">
      <SEO title="Admin Dashboard | Ramesh Patil" />
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <LayoutDashboard size={16} />
            Admin Dashboard
          </div>
          <h1 className="text-3xl font-bold">Welcome back, {user?.email}</h1>
        </div>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-secondary text-foreground rounded-xl hover:bg-secondary/80 transition-colors text-sm font-medium border border-border/50"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="bg-secondary/20 border border-border/50 rounded-3xl p-6 hover:border-primary/50 transition-colors group cursor-pointer lg:col-span-1">
          <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
            <MessageSquare size={24} />
          </div>
          <h2 className="text-xl font-bold mb-2">Inbox ({messages.filter(m => m.status === 'unread').length})</h2>
          <p className="text-sm text-muted-foreground">Manage your contact form submissions.</p>
        </div>

        <div 
          onClick={() => navigate("/admin/blog")}
          className="bg-secondary/20 border border-border/50 rounded-3xl p-6 hover:border-primary/50 transition-colors group cursor-pointer lg:col-span-1"
        >
          <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
            <BookOpen size={24} />
          </div>
          <h2 className="text-xl font-bold mb-2">Blog Posts</h2>
          <p className="text-sm text-muted-foreground">Draft, publish, and manage your articles.</p>
        </div>

        <div 
          onClick={() => navigate("/admin/settings")}
          className="bg-secondary/20 border border-border/50 rounded-3xl p-6 hover:border-primary/50 transition-colors group cursor-pointer lg:col-span-1"
        >
          <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
            <Settings size={24} />
          </div>
          <h2 className="text-xl font-bold mb-2">Settings</h2>
          <p className="text-sm text-muted-foreground">Configure your portfolio details and CV.</p>
        </div>
      </div>

      {/* Analytics Dashboard */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Activity size={20} className="text-primary"/> Traffic Analytics
        </h2>
        
        {errorMsg && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-xl mb-6">
            Error loading stats: {errorMsg}
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-secondary/10 border border-border/50 rounded-2xl p-6">
            <div className="flex items-center gap-3 text-muted-foreground mb-2">
              <Activity size={18} /> Total Page Views
            </div>
            <div className="text-4xl font-bold">{stats?.total_views || 0}</div>
          </div>
          <div className="bg-secondary/10 border border-border/50 rounded-2xl p-6">
            <div className="flex items-center gap-3 text-muted-foreground mb-2">
              <Users size={18} /> Unique Visitors (Today)
            </div>
            <div className="text-4xl font-bold">{stats?.unique_visitors || 0}</div>
          </div>
        </div>

        <div className="bg-secondary/10 border border-border/50 rounded-3xl p-6 h-[400px]">
          <h3 className="font-semibold mb-6">Top Pages</h3>
          {stats && stats.chart_data.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.chart_data} layout="vertical" margin={{ left: 50, right: 20 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} style={{ fill: "currentColor", fontSize: 12, opacity: 0.7 }} />
                <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} contentStyle={{ backgroundColor: '#1c1c1c', border: '1px solid #333', borderRadius: '12px' }} />
                <Bar dataKey="views" radius={[0, 4, 4, 0]}>
                  {stats.chart_data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? "#b8620a" : "#7c5cff"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
             <div className="w-full h-full flex items-center justify-center text-muted-foreground">
               No data available yet.
             </div>
          )}
        </div>
      </div>

      {/* Messages Section */}
      <div>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <MessageSquare size={20} className="text-primary"/> Recent Messages
        </h2>
        
        {loadingMsgs ? (
          <div className="text-muted-foreground">Loading messages...</div>
        ) : messages.length === 0 ? (
          <div className="bg-secondary/20 border border-border/50 rounded-3xl p-12 text-center text-muted-foreground">
            No messages yet.
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`bg-secondary/10 border ${msg.status === 'unread' ? 'border-primary/30' : 'border-border/50'} rounded-2xl p-6 relative`}
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                  <div>
                    <h3 className="font-bold text-lg flex items-center gap-2">
                      {msg.name} 
                      {msg.status === 'unread' && <span className="bg-primary/20 text-primary text-xs px-2 py-0.5 rounded-full">New</span>}
                    </h3>
                    <a href={`mailto:${msg.email}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {msg.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-xs text-muted-foreground">
                      {new Date(msg.created_at).toLocaleString()}
                    </div>
                    <button 
                      onClick={() => toggleMessageStatus(msg.id, msg.status)}
                      className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
                      title={msg.status === 'unread' ? "Mark as read" : "Mark as unread"}
                    >
                      {msg.status === 'unread' ? <MailOpen size={16} /> : <Mail size={16} />}
                    </button>
                  </div>
                </div>
                
                {msg.subject && (
                  <div className="text-sm font-semibold mb-2">Subject: {msg.subject}</div>
                )}
                <div className="bg-background rounded-xl p-4 text-sm text-foreground whitespace-pre-wrap border border-border/30">
                  {msg.message}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
