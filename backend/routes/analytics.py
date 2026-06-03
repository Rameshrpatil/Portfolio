from fastapi import APIRouter, Request, HTTPException
from pydantic import BaseModel
from typing import Optional
from database import supabase
import hashlib
from datetime import datetime

router = APIRouter(prefix="/metrics", tags=["metrics"])

class TrackEvent(BaseModel):
    path: str
    referrer: Optional[str] = None
    user_agent: Optional[str] = None

@router.post("/track")
async def track_pageview(event: TrackEvent, request: Request):
    try:
        # We create a daily rotating hash for session_id. 
        # This keeps the user completely anonymous while letting us count unique visitors for the day.
        ip = request.client.host if request.client else "unknown"
        date_str = datetime.utcnow().strftime("%Y-%m-%d")
        raw_string = f"{ip}-{event.user_agent}-{date_str}"
        session_id = hashlib.sha256(raw_string.encode()).hexdigest()[:16]

        data = {
            "path": event.path,
            "referrer": event.referrer,
            "user_agent": event.user_agent,
            "session_id": session_id
        }

        # Using service role key bypasses RLS
        supabase.table("analytics").insert(data).execute()
        return {"status": "recorded"}

    except Exception as e:
        import traceback
        traceback.print_exc()
        # We don't want to crash the frontend if analytics fails
        return {"status": "error", "message": "Failed to track"}

@router.get("/stats")
async def get_stats():
    try:
        res = supabase.table("analytics").select("*").execute()
        data = res.data
        
        # Calculate some basic aggregations
        total_views = len(data)
        unique_visitors = len(set([row["session_id"] for row in data]))
        
        page_views = {}
        for row in data:
            path = row["path"]
            page_views[path] = page_views.get(path, 0) + 1
            
        # Format for Recharts
        chart_data = [{"name": k, "views": v} for k, v in page_views.items()]
        # Sort by views
        chart_data.sort(key=lambda x: x["views"], reverse=True)
        
        return {
            "total_views": total_views,
            "unique_visitors": unique_visitors,
            "chart_data": chart_data
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to fetch stats")
