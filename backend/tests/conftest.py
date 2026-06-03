import pytest
from fastapi.testclient import TestClient
from unittest.mock import MagicMock, patch
import os
import sys

# Add the backend directory to sys.path so we can import the FastAPI app
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

# Mock create_client before importing main so database.py doesn't crash on init
mock_supabase_client = MagicMock()
with patch("supabase.create_client", return_value=mock_supabase_client):
    from main import app

@pytest.fixture
def client():
    # Return a TestClient instance for our FastAPI app
    with TestClient(app) as c:
        yield c

@pytest.fixture
def mock_supabase():
    # Return the already mocked client that database.py received
    from database import supabase
    yield supabase
