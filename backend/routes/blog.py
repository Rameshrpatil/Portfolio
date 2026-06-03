from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from database import supabase

router = APIRouter(prefix="/blog", tags=["blog"])

@router.get("/")
async def get_posts():
    try:
        response = supabase.table("posts").select("*").eq("published", True).order("created_at", desc=True).execute()
        return response.data
    except Exception as e:
        print(f"Error fetching posts: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch posts")

@router.get("/{slug}")
async def get_post(slug: str):
    try:
        response = supabase.table("posts").select("*").eq("slug", slug).execute()
        if not response.data or len(response.data) == 0:
            raise HTTPException(status_code=404, detail="Post not found")
        return response.data[0]
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error fetching post: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch post")

class BlogPostCreate(BaseModel):
    title: str
    slug: str
    content: str
    published: bool = False

@router.post("/")
async def create_post(post: BlogPostCreate):
    try:
        data, count = supabase.table("posts").insert({
            "title": post.title,
            "slug": post.slug,
            "content": post.content,
            "published": post.published
        }).execute()
        return {"status": "success", "data": data[1][0] if len(data) > 1 and len(data[1]) > 0 else None}
    except Exception as e:
        print(f"Error creating post: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create post")
