import os
import traceback
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Dict

# LangChain / LangGraph imports
from langchain_google_genai import ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings
from langchain_core.messages import HumanMessage, AIMessage, SystemMessage
from langchain_core.tools import tool
from langgraph.prebuilt import create_react_agent
from nemoguardrails import RailsConfig
from nemoguardrails.integrations.langchain.runnable_rails import RunnableRails

router = APIRouter(prefix="/assistant", tags=["assistant"])

api_key = os.environ.get("GEMINI_API_KEY")

class ChatRequest(BaseModel):
    message: str
    history: List[Dict] = []

SYSTEM_INSTRUCTION = """
You are Ramesh Patil's AI Assistant. You are a helpful, professional, and friendly virtual assistant embedded in his portfolio website.
Your goal is to answer questions from recruiters and engineers about Ramesh's background, skills, and experience.

Here is Ramesh's profile information:
- Name: Ramesh Rangarao Patil
- Title: Software Engineer (AI/ML)
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
6. Always use the `search_portfolio_knowledge` tool first if you need specific details about his projects, experience, or resume before answering.
"""

@tool
def search_portfolio_knowledge(query: str) -> str:
    """Search Ramesh's resume and portfolio knowledge base for specific details about his experience, projects, or skills."""
    if not api_key:
        return "Error: GEMINI_API_KEY is not configured."
        
    try:
        from database import supabase
        embeddings = GoogleGenerativeAIEmbeddings(model="models/gemini-embedding-2")
        query_vector = embeddings.embed_query(query)
        
        rpc_res = supabase.rpc("match_documents", {
            "query_embedding": query_vector,
            "match_threshold": 0.5,
            "match_count": 3
        }).execute()
        
        if not rpc_res.data:
            return "No specific context found in the knowledge base."
            
        retrieved_context = "\n---\n".join([item["content"] for item in rpc_res.data])
        return retrieved_context
    except Exception as e:
        traceback.print_exc()
        return f"Error retrieving knowledge: {str(e)}"

# Initialize Agent
if api_key:
    if "GOOGLE_API_KEY" not in os.environ:
        os.environ["GOOGLE_API_KEY"] = api_key
    os.environ["NEMOGUARDRAILS_LLM_FRAMEWORK"] = "langchain"

    llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash", temperature=0.7)
    agent_executor = create_react_agent(llm, tools=[search_portfolio_knowledge], prompt=SYSTEM_INSTRUCTION)
    
    try:
        config = RailsConfig.from_path(os.path.join(os.path.dirname(__file__), '..', 'nemo_config'))
        guardrails = RunnableRails(config, runnable=agent_executor)
    except Exception as e:
        print(f"Error initializing guardrails: {e}")
        guardrails = agent_executor
else:
    guardrails = None

@router.post("/ask")
async def ask_assistant(req: ChatRequest):
    if not guardrails:
        raise HTTPException(status_code=500, detail="GEMINI_API_KEY is not configured in the backend.")
    
    try:
        dict_history = []
        for msg in req.history:
            role = msg.get("role")
            text = msg["parts"][0]["text"]
            if role == "user":
                dict_history.append({"role": "user", "content": text})
            else:
                dict_history.append({"role": "assistant", "content": text})
                
        dict_history.append({"role": "user", "content": req.message})
        
        # Invoke Guardrails
        result = await guardrails.ainvoke({"messages": dict_history})
        
        # Extract the final message based on how RunnableRails returns it
        if isinstance(result, dict) and "messages" in result:
            final_message = result["messages"][-1].content
        elif isinstance(result, dict) and "output" in result:
            final_message = result["output"]
        elif isinstance(result, str):
            final_message = result
        else:
            final_message = str(result)
            
        # Ensure final_message is a string (Gemini sometimes returns a list of parts)
        if isinstance(final_message, list):
            text_parts = []
            for part in final_message:
                if isinstance(part, str):
                    text_parts.append(part)
                elif isinstance(part, dict) and "text" in part:
                    text_parts.append(part["text"])
            final_message = " ".join(text_parts)
        elif not isinstance(final_message, str):
            final_message = str(final_message)
        
        return {"response": final_message}
        
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail="Failed to generate AI response")
