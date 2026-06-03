from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import json
import os
import copy

router = APIRouter(prefix="/settings", tags=["settings"])

# Path to the JSON file
RESUME_FILE_PATH = os.path.join(os.path.dirname(__file__), "..", "..", "frontend", "src", "data", "resume.json")

class ProfileUpdate(BaseModel):
    name: str
    title: str
    tagline: str
    summary: str
    email: str
    phone: str
    linkedin: str
    github: str
    location: str

@router.get("/portfolio")
async def get_portfolio_data():
    try:
        with open(RESUME_FILE_PATH, "r") as f:
            data = json.load(f)
        return {"status": "success", "profile": data.get("profile", {})}
    except Exception as e:
        print(f"Error reading portfolio data: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to read portfolio data")

@router.post("/portfolio")
async def update_portfolio_data(update: ProfileUpdate):
    try:
        # 1. Read existing data
        with open(RESUME_FILE_PATH, "r") as f:
            data = json.load(f)
            
        # 2. Update profile while keeping other fields intact
        # We use dict() instead of dict directly if model is pydantic v2 (model_dump) or v1 (dict)
        profile_dict = update.dict() if hasattr(update, "dict") else update.model_dump()
        
        # Keep existing initials if not provided, or regenerate them
        initials = "".join([part[0] for part in profile_dict["name"].split() if part])
        profile_dict["initials"] = initials.upper()
        
        data["profile"] = profile_dict
        
        # 3. Write back to file
        with open(RESUME_FILE_PATH, "w") as f:
            json.dump(data, f, indent=2)
            
        return {"status": "success", "message": "Portfolio details updated!"}
    except Exception as e:
        print(f"Error updating portfolio data: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to write portfolio data")
