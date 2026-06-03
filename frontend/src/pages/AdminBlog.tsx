import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Loader2, CheckCircle } from "lucide-react";
import { api } from "../lib/api";

export default function AdminBlog() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", slug: "", content: "", published: true });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  // Auto-generate slug from title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    setForm(f => ({ ...f, title, slug }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.slug || !form.content) return;
    
    setStatus("loading");
    try {
      await api.createPost(form);
      setStatus("success");
      setTimeout(() => {
        navigate("/blog");
      }, 2000);
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-4xl mx-auto">
      <Link 
        to="/admin"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8"
      >
        <ArrowLeft size={16} />
        Back to Dashboard
      </Link>

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Write a new Post</h1>
      </div>

      {status === "success" && (
        <div className="mb-8 p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-xl flex items-center gap-2 font-medium">
          <CheckCircle size={20} />
          Post created successfully! Redirecting to blog...
        </div>
      )}

      {status === "error" && (
        <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl flex items-center gap-2 font-medium">
          Failed to create post. Please check the backend connection.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 bg-secondary/10 border border-border/50 rounded-3xl p-6 md:p-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Title</label>
            <input 
              type="text" 
              required
              className="w-full bg-background border border-border/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
              placeholder="Post title..."
              value={form.title}
              onChange={handleTitleChange}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">URL Slug</label>
            <input 
              type="text" 
              required
              className="w-full bg-background border border-border/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors font-mono"
              placeholder="post-url-slug"
              value={form.slug}
              onChange={e => setForm(f => ({ ...f, slug: e.target.value }))}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">Content (Markdown supported)</label>
          <textarea 
            required
            rows={12}
            className="w-full bg-background border border-border/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors font-mono resize-y"
            placeholder="# Your awesome blog post starts here..."
            value={form.content}
            onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
          />
        </div>

        <div className="flex items-center gap-3">
          <input 
            type="checkbox" 
            id="published"
            checked={form.published}
            onChange={e => setForm(f => ({ ...f, published: e.target.checked }))}
            className="w-5 h-5 rounded border-border text-primary focus:ring-primary bg-background"
          />
          <label htmlFor="published" className="text-sm font-medium cursor-pointer">
            Publish immediately (make visible to public)
          </label>
        </div>

        <button 
          type="submit"
          disabled={status === "loading" || status === "success"}
          className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground font-medium py-3 rounded-xl hover:bg-primary/90 transition-all disabled:opacity-70"
        >
          {status === "loading" ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            <><Save size={20} /> Save Post</>
          )}
        </button>
      </form>
    </div>
  );
}
