from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Import routes
from routes import contact, guestbook, blog, assistant, analytics, settings

app = FastAPI(
    title="Portfolio API",
    description="Backend API for Ramesh Patil's Portfolio",
    version="1.0.0"
)

# Configure CORS for the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow all mobile apps and webviews
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(contact.router, prefix="/api")
app.include_router(guestbook.router, prefix="/api")
app.include_router(blog.router, prefix="/api")
app.include_router(assistant.router, prefix="/api")
app.include_router(analytics.router, prefix="/api")
app.include_router(settings.router, prefix="/api")

@app.get("/")
async def root():
    return {"message": "Welcome to the Portfolio API! Check /docs for documentation."}
