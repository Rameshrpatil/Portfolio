from unittest.mock import MagicMock

def test_get_signatures(client, mock_supabase):
    # Setup mock
    mock_execute = MagicMock()
    mock_execute.data = [{"id": 1, "name": "John Doe", "message": "Great portfolio!"}]
    
    mock_order = MagicMock()
    mock_order.execute.return_value = mock_execute
    
    mock_select = MagicMock()
    mock_select.order.return_value = mock_order
    
    mock_table = MagicMock()
    mock_table.select.return_value = mock_select
    
    mock_supabase.table.return_value = mock_table
    
    # Execute request
    response = client.get("/api/guestbook/")
    
    # Assert
    assert response.status_code == 200
    assert len(response.json()) == 1
    assert response.json()[0]["name"] == "John Doe"

def test_sign_guestbook_new_user(client, mock_supabase):
    # Setup mock to simulate NO existing user
    mock_existing = MagicMock()
    mock_existing.data = []
    
    mock_ilike = MagicMock()
    mock_ilike.execute.return_value = mock_existing
    
    mock_select = MagicMock()
    mock_select.ilike.return_value = mock_ilike
    
    mock_insert_execute = MagicMock()
    mock_insert_execute.return_value = ([{}, [{"id": 2}]], 1)
    
    mock_insert = MagicMock()
    mock_insert.execute = mock_insert_execute
    
    # Configure table to return the right mock for select vs insert
    def table_side_effect(table_name):
        mock_table = MagicMock()
        mock_table.select.return_value = mock_select
        mock_table.insert.return_value = mock_insert
        return mock_table
        
    mock_supabase.table.side_effect = table_side_effect
    
    # Execute request
    response = client.post("/api/guestbook/", json={"name": "Alice", "message": "Hello!"})
    
    # Assert
    assert response.status_code == 200
    assert response.json()["status"] == "success"
    # Ensure insert was called
    assert mock_insert.execute.called

def test_sign_guestbook_existing_user(client, mock_supabase):
    # Setup mock to simulate EXISTING user
    mock_existing = MagicMock()
    mock_existing.data = [{"id": "123", "name": "Alice"}]
    
    mock_ilike = MagicMock()
    mock_ilike.execute.return_value = mock_existing
    
    mock_select = MagicMock()
    mock_select.ilike.return_value = mock_ilike
    
    mock_update_eq = MagicMock()
    mock_update_eq.execute.return_value = ([{}, [{"id": "123"}]], 1)
    
    mock_update = MagicMock()
    mock_update.eq.return_value = mock_update_eq
    
    def table_side_effect(table_name):
        mock_table = MagicMock()
        mock_table.select.return_value = mock_select
        mock_table.update.return_value = mock_update
        return mock_table
        
    mock_supabase.table.side_effect = table_side_effect
    
    # Execute request
    response = client.post("/api/guestbook/", json={"name": "Alice", "message": "Updated message!"})
    
    # Assert
    assert response.status_code == 200
    assert response.json()["status"] == "success"
    # Ensure update was called, not insert
    assert mock_update.eq.called
