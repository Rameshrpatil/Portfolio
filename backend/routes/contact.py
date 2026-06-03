from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from database import supabase

router = APIRouter(prefix="/contact", tags=["contact"])

class ContactMessage(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str

@router.post("/")
async def submit_contact_form(msg: ContactMessage):
    try:
        data, count = supabase.table("messages").insert({
            "name": msg.name,
            "email": msg.email,
            "subject": msg.subject,
            "message": msg.message
        }).execute()
        return {"status": "success", "message": "Message received"}
    except Exception as e:
        print(f"Error inserting message: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to send message")
