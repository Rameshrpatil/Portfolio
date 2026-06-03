from unittest.mock import MagicMock

def test_submit_contact(client, mock_supabase):
    mock_insert_execute = MagicMock()
    mock_insert_execute.return_value = ([{}, [{"id": 1}]], 1)
    
    mock_insert = MagicMock()
    mock_insert.execute = mock_insert_execute
    
    mock_table = MagicMock()
    mock_table.insert.return_value = mock_insert
    
    mock_supabase.table.return_value = mock_table
    
    payload = {
        "name": "Jane Doe",
        "email": "jane@example.com",
        "subject": "Hello",
        "message": "Nice portfolio"
    }
    
    response = client.post("/api/contact/", json=payload)
    
    assert response.status_code == 200
    assert response.json()["status"] == "success"
    assert mock_insert.execute.called
