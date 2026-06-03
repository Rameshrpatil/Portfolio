import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, Calendar, ArrowRight } from "lucide-react";
import { api } from "../lib/api";
import SEO from "../components/SEO";

const FADE_UP = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

type Post = {
  id: string;
  title: string;
  slug: string;
  content: string;
  published: boolean;
  created_at: string;
};

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const data = await api.getPosts();
      setPosts(data);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 max-w-5xl mx-auto">
      <SEO title="Blog | Ramesh Patil" description="Thoughts on backend architecture, applied AI, machine learning, and software engineering." />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={FADE_UP}
        className="mb-16"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
          <BookOpen size={16} />
          Writings
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Blog</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Thoughts on backend architecture, applied AI, machine learning, and software engineering.
        </p>
      </motion.div>

      <div className="space-y-8">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
        ) : posts.length === 0 ? (
          <div className="bg-secondary/20 border border-border/50 rounded-3xl p-12 text-center text-muted-foreground">
            No posts published yet. Check back soon!
          </div>
        ) : (
          posts.map((post, idx) => (
            <motion.div
              key={post.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: idx * 0.1 } }
              }}
            >
              <Link 
                to={`/blog/${post.slug}`}
                className="group block bg-secondary/20 border border-border/50 rounded-3xl p-6 md:p-8 hover:border-primary/50 transition-colors relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-primary/50 group-hover:bg-primary transition-colors" />
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <h2 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground shrink-0">
                    <Calendar size={14} />
                    {new Date(post.created_at).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-6 line-clamp-2 leading-relaxed">
                  {/* Extract a simple snippet by removing markdown and slicing */}
                  {post.content.replace(/[#*`_\[\]]/g, '').slice(0, 150)}...
                </p>

                <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                  Read article <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))
        )}
      </div>
    </main>
  );
}
