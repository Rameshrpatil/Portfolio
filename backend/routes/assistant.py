import os
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from google import genai
from google.genai import types

router = APIRouter(prefix="/assistant", tags=["assistant"])

# We initialize the client if the key is available
api_key = os.environ.get("GEMINI_API_KEY")
client = genai.Client(api_key=api_key) if api_key else None

class ChatRequest(BaseModel):
    message: str
    history: list[dict] = []

# This is the system prompt that primes the AI to act as Ramesh
SYSTEM_INSTRUCTION = """
You are Ramesh Patil's AI Assistant. You are a helpful, professional, and friendly virtual assistant embedded in his portfolio website.
Your goal is to answer questions from recruiters and engineers about Ramesh's background, skills, and experience.

Here is Ramesh's profile information:
- Name: Ramesh Rangarao Patil
- Title: Software Engineer (Backend & Applied AI Engineer)
- Experience: 2+ years designing and deploying production-grade ML systems, GenAI infrastructure, and scalable microservices backends.
- Core Skills: Python, FastAPI, ML inference, vector search, RAG architectures, agentic orchestration, ML observability.
- Email: patilrameshrangarao@gmail.com
- Location: Pune, Maharashtra, India

Guidelines:
1. Speak in the first person as the AI assistant ("I am Ramesh's AI assistant...").
2. Refer to Ramesh in the third person.
3. Keep your answers concise, professional, and directly relevant to the user's question.
4. If asked something outside of Ramesh's professional background, politely redirect the conversation back to his skills and experience.
5. If someone wants to hire him, encourage them to use the Contact form or email him directly.
"""

@router.post("/ask")
async def ask_assistant(req: ChatRequest):
    if not client:
        raise HTTPException(status_code=500, detail="GEMINI_API_KEY is not configured in the backend.")
    
    try:
        # Convert frontend history to GenAI history format
        # frontend history format: [{role: "user" | "model", parts: [{text: "..."}]}]
        formatted_history = []
        for msg in req.history:
            role = "user" if msg["role"] == "user" else "model"
            text = msg["parts"][0]["text"]
            formatted_history.append(types.Content(role=role, parts=[types.Part.from_text(text=text)]))
        
        # 1. Embed the user's query
        query_embedding_res = client.models.embed_content(
            model="gemini-embedding-2",
            contents=req.message
        )
        query_vector = query_embedding_res.embeddings[0].values
        
        # 2. Retrieve relevant context from Supabase pgvector
        # Note: We must import supabase from database
        from database import supabase
        
        rpc_res = supabase.rpc("match_documents", {
            "query_embedding": query_vector,
            "match_threshold": 0.5, # minimum similarity score
            "match_count": 3 # return top 3 chunks
        }).execute()
        
        retrieved_context = "\n".join([item["content"] for item in rpc_res.data]) if rpc_res.data else "No specific context found."
        
        # 3. Augment the system prompt
        augmented_system_instruction = SYSTEM_INSTRUCTION + "\n\n### RELEVANT KNOWLEDGE BASE CONTEXT ###\n" + retrieved_context

        # 4. Generate the response
        chat = client.chats.create(
            model="gemini-2.5-flash",
            config=types.GenerateContentConfig(
                system_instruction=augmented_system_instruction,
                temperature=0.7,
            ),
            history=formatted_history
        )
        
        response = chat.send_message(req.message)
        return {"response": response.text}
        
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail="Failed to generate AI response")
