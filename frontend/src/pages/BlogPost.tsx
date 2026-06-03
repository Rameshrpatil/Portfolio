import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, ArrowLeft, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { api } from "../lib/api";
import SEO from "../components/SEO";

type Post = {
  id: string;
  title: string;
  slug: string;
  content: string;
  published: boolean;
  created_at: string;
};

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      api.getPostBySlug(slug)
        .then(data => setPost(data))
        .catch(() => navigate("/blog", { replace: true }))
        .finally(() => setLoading(false));
    }
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex justify-center items-center">
        <SEO title="Loading..." />
        <Loader2 className="animate-spin text-primary w-10 h-10" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-6 max-w-3xl mx-auto text-center">
        <SEO title="Post Not Found | Ramesh Patil" />
        <h1 className="text-3xl font-bold mb-4">Post not found</h1>
        <button onClick={() => navigate("/blog")} className="text-primary hover:underline flex items-center justify-center gap-2 mx-auto">
          <ArrowLeft size={16} /> Back to blog
        </button>
      </div>
    );
  }

  return (
    <article className="min-h-screen pt-32 pb-20 px-6 max-w-4xl mx-auto">
      <SEO 
        title={`${post.title} | Ramesh Patil`} 
        description={post.content.substring(0, 150) + "..."} 
        type="article"
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link 
          to="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-10"
        >
          <ArrowLeft size={16} />
          Back to Blog
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-foreground leading-tight">
          {post.title}
        </h1>
        
        <div className="flex items-center gap-3 text-sm text-muted-foreground font-medium mb-12 pb-12 border-b border-border/50">
          <Calendar size={16} />
          {new Date(post.created_at).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
        </div>

        {/* Markdown Renderer with Tailwind Typography */}
        <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-primary hover:prose-a:text-primary/80 prose-pre:bg-secondary/50 prose-pre:border prose-pre:border-border/50 prose-img:rounded-2xl">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </motion.div>
    </article>
  );
}
