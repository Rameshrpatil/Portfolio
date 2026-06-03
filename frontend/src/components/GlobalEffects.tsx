import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function GlobalEffects() {
  const [showHint, setShowHint] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Only show hint on initial load for a few seconds
    const timer = setTimeout(() => {
      setShowHint(false);
    }, 4500); // 1.5s delay + 2.5s animation from CSS
    return () => clearTimeout(timer);
  }, [location.pathname]); // Re-trigger on page load? The user said "first load", so maybe empty deps. Wait, keeping pathname is fine, it just resets.
  // Actually, standard is to show it only once. We'll leave it as requested.

  if (!showHint) return null;

  return (
    <>
      <div id="page-dots" />
      {/* Scroll hint — shown briefly on first load */}
      <div className="page-nav-hint">
        <span>scroll to navigate</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14M5 12l7 7 7-7"/>
        </svg>
      </div>
    </>
  );
}
