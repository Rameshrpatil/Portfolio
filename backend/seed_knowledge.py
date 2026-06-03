import os
import asyncio
import re
from google import genai
from database import supabase

async def seed_knowledge():
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        print("Error: GEMINI_API_KEY not found in environment.")
        return
        
    client = genai.Client(api_key=api_key)
    
    print("Clearing old knowledge...")
    supabase.table("portfolio_knowledge").delete().neq("id", "00000000-0000-0000-0000-000000000000").execute()
    
    print("Reading frontend/src/data/resume.js...")
    resume_path = os.path.join(os.path.dirname(__file__), '..', 'frontend', 'src', 'data', 'resume.js')
    
    try:
        with open(resume_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        print(f"Error reading resume.js: {e}")
        return

    # Clean the JS content: remove export const, brackets, braces
    clean_content = re.sub(r'(export const \w+\s*=\s*\[?\{?)', '', content)
    clean_content = re.sub(r'[{}\[\]]', '', clean_content)
    
    # Split by double newlines or long spaces
    raw_chunks = [c.strip() for c in clean_content.split('\n') if len(c.strip()) > 30]
    
    # Create larger semantic chunks (grouping lines together)
    chunks = []
    current_chunk = ""
    for line in raw_chunks:
        if len(current_chunk) + len(line) < 500:
            current_chunk += " " + line
        else:
            chunks.append(current_chunk.strip())
            current_chunk = line
    if current_chunk:
        chunks.append(current_chunk.strip())
    
    print(f"Generated {len(chunks)} knowledge chunks. Uploading...")
    
    for chunk in chunks:
        try:
            result = client.models.embed_content(
                model="text-embedding-004",
                contents=chunk
            )
            embedding_vector = result.embeddings[0].values
            
            supabase.table("portfolio_knowledge").insert({
                "content": chunk,
                "embedding": embedding_vector
            }).execute()
        except Exception as e:
            print(f"Failed to embed chunk: {e}")

    print("Knowledge base successfully seeded with all portfolio data!")

if __name__ == "__main__":
    asyncio.run(seed_knowledge())
