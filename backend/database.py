import os
from dotenv import load_dotenv
from supabase import create_client, Client

# Load environment variables from the parent directory's .env file
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', '.env'))

url: str = os.environ.get("VITE_SUPABASE_URL")
# Use the Service Role Key to bypass RLS from our trusted backend
key: str = os.environ.get("SUPABASE_SERVICE_ROLE_KEY") or os.environ.get("VITE_SUPABASE_ANON_KEY")

if not url or not key:
    raise ValueError("Missing Supabase credentials in .env file")

if key == os.environ.get("VITE_SUPABASE_ANON_KEY"):
    print("WARNING: Using ANON_KEY. You will hit RLS errors. Please add SUPABASE_SERVICE_ROLE_KEY to your .env file.")

supabase: Client = create_client(url, key)
