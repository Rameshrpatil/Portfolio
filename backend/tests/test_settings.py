import json
import os
from unittest.mock import patch, mock_open

# Mock the RESUME_FILE_PATH properly
def test_get_portfolio_data(client):
    mock_data = {
        "profile": {
            "name": "Test User",
            "title": "Software Engineer",
            "tagline": "Test Tagline",
            "summary": "Summary",
            "email": "test@test.com",
            "phone": "12345",
            "linkedin": "link",
            "github": "git",
            "location": "Earth",
            "initials": "TU"
        }
    }
    
    with patch("builtins.open", mock_open(read_data=json.dumps(mock_data))):
        response = client.get("/api/settings/portfolio")
        assert response.status_code == 200
        assert response.json()["profile"]["name"] == "Test User"

def test_update_portfolio_data(client):
    mock_data = {
        "profile": {
            "name": "Old Name",
            "initials": "ON"
        }
    }
    
    new_data = {
        "name": "New User Name",
        "title": "Dev",
        "tagline": "Code",
        "summary": "Sum",
        "email": "a@a.com",
        "phone": "1",
        "linkedin": "li",
        "github": "gh",
        "location": "loc"
    }
    
    m_open = mock_open(read_data=json.dumps(mock_data))
    
    with patch("builtins.open", m_open):
        response = client.post("/api/settings/portfolio", json=new_data)
        
        assert response.status_code == 200
        assert response.json()["status"] == "success"
        
        # Verify it wrote to the file
        m_open().write.assert_called()
        written_data = "".join(call.args[0] for call in m_open().write.call_args_list)
        written_json = json.loads(written_data)
        
        assert written_json["profile"]["name"] == "New User Name"
        # Verify it regenerated initials correctly
        assert written_json["profile"]["initials"] == "NUN"
