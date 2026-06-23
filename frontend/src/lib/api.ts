// Central API Client to communicate with the FastAPI backend

const API_BASE_URL = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : "http://localhost:8000/api";

export const api = {
  // Contact Form
  submitContact: async (data: { name: string; email: string; subject: string; message: string }) => {
    const res = await fetch(`${API_BASE_URL}/contact/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to submit contact form");
    return res.json();
  },

  // Guestbook
  getGuestbookSignatures: async () => {
    const res = await fetch(`${API_BASE_URL}/guestbook/`);
    if (!res.ok) throw new Error("Failed to fetch signatures");
    return res.json();
  },
  
  signGuestbook: async (data: { name: string; message: string }) => {
    const res = await fetch(`${API_BASE_URL}/guestbook/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to sign guestbook");
    return res.json();
  },

  reactToGuestbook: async (id: string, reaction: string) => {
    const res = await fetch(`${API_BASE_URL}/guestbook/${id}/react`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reaction }),
    });
    if (!res.ok) throw new Error("Failed to add reaction to guestbook");
    return res.json();
  },

  // Blog
  getPosts: async () => {
    const res = await fetch(`${API_BASE_URL}/blog/`);
    if (!res.ok) throw new Error("Failed to fetch blog posts");
    return res.json();
  },

  getPostBySlug: async (slug: string) => {
    const res = await fetch(`${API_BASE_URL}/blog/${slug}`);
    if (!res.ok) throw new Error("Failed to fetch blog post");
    return res.json();
  },

  createPost: async (data: { title: string; slug: string; content: string; published: boolean }) => {
    const res = await fetch(`${API_BASE_URL}/blog/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create post");
    return res.json();
  },

  askAssistant: async (message: string, history: any[]) => {
    const res = await fetch(`${API_BASE_URL}/assistant/ask`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, history }),
    });
    if (!res.ok) throw new Error("Failed to get AI response");
    return res.json();
  },

  // Analytics
  trackAnalytics: async (path: string, referrer?: string, userAgent?: string) => {
    try {
      await fetch(`${API_BASE_URL}/metrics/track`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path, referrer, user_agent: userAgent }),
      });
    } catch (err) {
      // Silently fail for analytics to not disturb UX
    }
  },

  getAnalyticsStats: async () => {
    const res = await fetch(`${API_BASE_URL}/metrics/stats`, { cache: "no-store" });
    if (!res.ok) throw new Error(`Failed to fetch analytics: ${res.statusText}`);
    return res.json();
  },

  // Settings
  getPortfolioDetails: async () => {
    const res = await fetch(`${API_BASE_URL}/settings/portfolio`);
    if (!res.ok) throw new Error("Failed to fetch portfolio details");
    return res.json();
  },

  updatePortfolioDetails: async (data: any) => {
    const res = await fetch(`${API_BASE_URL}/settings/portfolio`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update portfolio details");
    return res.json();
  }
};
