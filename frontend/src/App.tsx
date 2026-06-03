import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import GlobalEffects from "./components/GlobalEffects";
import AIAssistant from "./components/AIAssistant";

import Home from "./pages/Home";
import About from "./pages/About";
import Experience from "./pages/Experience";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import Guestbook from "./pages/Guestbook";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import AdminBlog from "./pages/AdminBlog";
import AdminSettings from "./pages/AdminSettings";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import "./index.css";

const PAGES = ["/", "/about", "/experience", "/projects", "/skills", "/blog", "/guestbook", "/contact"];

function ScrollManager() {
  const location = useLocation();
  useEffect(() => {
    setTimeout(() => {
      if (location.state?.direction === -1) {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "instant" });
      } else {
        window.scrollTo({ top: 0, behavior: "instant" });
      }
    }, 10);
  }, [location.pathname, location.state]);
  return null;
}

function PageScrollNavigator() {
  const navigate = useNavigate();
  const location = useLocation();
  const lastScrollTime = useRef(0);
  const scrollAccum = useRef(0);
  const touchStartY = useRef(0);
  const isNavigating = useRef(false);

  useEffect(() => {
    const THRESHOLD = 80;
    const COOLDOWN  = 1000;

    function tryNavigate(direction: number) {
      const now = Date.now();
      if (isNavigating.current) return;
      if (now - lastScrollTime.current < COOLDOWN) return;

      const cur = PAGES.indexOf(location.pathname);
      // Disable auto-scroll for pages not in the main flow (like /admin, /login, /blog/post-slug)
      if (cur === -1) return;

      const next = cur + direction;
      if (next < 0 || next >= PAGES.length) return;

      const atTop    = window.scrollY <= 0;
      const atBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 8;

      if (direction === 1 && !atBottom) return;
      if (direction === -1 && !atTop) return;

      lastScrollTime.current = now;
      scrollAccum.current = 0;
      isNavigating.current = true;
      navigate(PAGES[next], { state: { direction } });
      setTimeout(() => { isNavigating.current = false; }, COOLDOWN);
    }

    let wheelTimer: NodeJS.Timeout;
    function onWheel(e: WheelEvent) {
      scrollAccum.current += e.deltaY;
      if (Math.abs(scrollAccum.current) >= THRESHOLD) {
        tryNavigate(scrollAccum.current > 0 ? 1 : -1);
      }
      clearTimeout(wheelTimer);
      wheelTimer = setTimeout(() => { scrollAccum.current = 0; }, 300);
    }

    function onTouchStart(e: TouchEvent) {
      touchStartY.current = e.touches[0].clientY;
    }
    function onTouchEnd(e: TouchEvent) {
      const delta = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(delta) >= 60) tryNavigate(delta > 0 ? 1 : -1);
    }

    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowDown") tryNavigate(1);
      if (e.key === "ArrowUp")   tryNavigate(-1);
    }

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKey);
    };
  }, [location.pathname, navigate]);

  return null;
}

const queryClient = new QueryClient();

import { HelmetProvider } from "react-helmet-async";
import { useAnalytics } from "./hooks/useAnalytics";

// A small wrapper to use the location hook
function AnalyticsTracker() {
  useAnalytics();
  return null;
}

export default function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BrowserRouter>
            <ScrollManager />
            <AnalyticsTracker />
            <PageScrollNavigator />
            <GlobalEffects />
            <div className="min-h-screen bg-background text-foreground flex flex-col font-sans overflow-x-hidden selection:bg-primary/30 selection:text-primary-foreground">
            <Navbar />
            <div className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/experience" element={<Experience />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/skills" element={<Skills />} />
                <Route path="/guestbook" element={<Guestbook />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                
                {/* Admin Routes */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/admin/blog" element={<AdminBlog />} />
                  <Route path="/admin/settings" element={<AdminSettings />} />
                </Route>
              </Routes>
            </div>
            <AIAssistant />
            <Footer />
          </div>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
    </HelmetProvider>
  );
}
