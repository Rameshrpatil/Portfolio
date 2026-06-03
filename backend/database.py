import os
from dotenv import load_dotenv
from supabase import create_client, Client

# Try loading from multiple possible .env locations
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', '.env'))  # Local root
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '.env'))       # Local backend (Render Root)
load_dotenv(dotenv_path='/etc/secrets/.env')                                   # Render Secret Files

url: str = os.environ.get("VITE_SUPABASE_URL") or os.environ.get("SUPABASE_URL")
# Try service role, then anon key, then generic supabase_key
key: str = (os.environ.get("SUPABASE_SERVICE_ROLE_KEY") or 
            os.environ.get("VITE_SUPABASE_ANON_KEY") or 
            os.environ.get("SUPABASE_KEY"))

if not url or not key:
    print(f"DEBUG ENV VARS: {list(os.environ.keys())}")
    raise ValueError("Missing Supabase credentials in environment variables")

if key == os.environ.get("VITE_SUPABASE_ANON_KEY"):
    print("WARNING: Using ANON_KEY. You will hit RLS errors. Please add SUPABASE_SERVICE_ROLE_KEY to your .env file.")

supabase: Client = create_client(url, key)
