import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { api } from "../lib/api";

export function useAnalytics() {
  const location = useLocation();

  useEffect(() => {
    // Only track non-admin routes to avoid polluting stats with our own usage
    if (!location.pathname.startsWith("/admin")) {
      api.trackAnalytics(
        location.pathname,
        document.referrer,
        navigator.userAgent
      );
    }
  }, [location.pathname]);
}
