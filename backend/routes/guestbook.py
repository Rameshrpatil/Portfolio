from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from database import supabase

router = APIRouter(prefix="/guestbook", tags=["guestbook"])

class GuestbookSignature(BaseModel):
    name: str
    message: str

class GuestbookReaction(BaseModel):
    reaction: str

@router.get("/")
async def get_signatures():
    try:
        response = supabase.table("guestbook").select("*").order("created_at", desc=True).execute()
        return response.data
    except Exception as e:
        print(f"Error fetching signatures: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch guestbook signatures")

@router.post("/")
async def sign_guestbook(signature: GuestbookSignature):
    try:
        # Check if user (by name) already has a signature
        existing = supabase.table("guestbook").select("*").ilike("name", signature.name).execute()
        
        if existing.data:
            # Update the existing signature message and timestamp
            data, count = supabase.table("guestbook").update({
                "message": signature.message,
                "created_at": "now()"
            }).eq("id", existing.data[0]["id"]).execute()
        else:
            # Insert new signature
            data, count = supabase.table("guestbook").insert({
                "name": signature.name,
                "message": signature.message
            }).execute()
            
        return {"status": "success"}
    except Exception as e:
        print(f"Error signing guestbook: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to sign guestbook")

@router.patch("/{id}/react")
async def react_guestbook(id: str, payload: GuestbookReaction):
    try:
        data, count = supabase.table("guestbook").update({
            "admin_reaction": payload.reaction
        }).eq("id", id).execute()
        return {"status": "success", "reaction": payload.reaction}
    except Exception as e:
        print(f"Error reacting to guestbook: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to add reaction")
