import os
import requests
from dotenv import load_dotenv

# Load env vars
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', '.env'))

api_key = os.environ.get("GEMINI_API_KEY")

if not api_key:
    print("No GEMINI_API_KEY found.")
    exit(1)

url = f"https://generativelanguage.googleapis.com/v1beta/models?key={api_key}"
response = requests.get(url)
if response.status_code == 200:
    models = response.json().get("models", [])
    print("Available Embedding Models for your API Key:")
    found = False
    for m in models:
        name = m.get("name", "")
        if "embed" in name.lower():
            print(f"- {name}")
            found = True
    if not found:
        print("Your API key does not have access to any embedding models!")
else:
    print(f"Failed to fetch models. Status: {response.status_code}")
    print(response.text)
