import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, addUser, updateUser, deleteUser } from '../redux/UserAction';

const Crud = () => {
  const [form, setForm] = useState({
    username: '',
    id: null,
  });

  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.username.trim()) {
      alert('Username cannot be empty.');
      return;
    }

    if (form.id !== null) {
      dispatch(updateUser(form.id, { username: form.username }));
    } else {
      dispatch(addUser({ id: Date.now(), username: form.username }));
    }

    setForm({ username: '', id: null });
  };

  const handleEdit = (user) => {
    setForm({
      username: user.username,
      id: user.id,
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <div className="crud-container">
      <h2 className="crud-title">User CRUD with Redux</h2>
      <form onSubmit={handleSubmit} className="crud-form">
        <div className="input-group">
          <input
            type="text"
            className="form-input"
            placeholder={form.id ? 'Editing user...' : 'Enter username'}
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
          />
          <button className="crud-button primary" type="submit">
            {form.id !== null ? 'Update' : 'Add'}
          </button>
        </div>
      </form>

      {loading && <p className="status-message">Loading users...</p>}
      {error && <p className="error-message">Error: {error}</p>}

      {!loading && users.length === 0 && <p className="status-message">No users found. Add one!</p>}

      {!loading && users.length > 0 && (
        <ul className="user-list">
          {users.map((user) => (
            <li key={user.id} className="user-item">
              <span className="user-name">{user.username}</span>
              <div className="user-actions">
                <button className="crud-button warning" onClick={() => handleEdit(user)}>
                  Edit
                </button>
                <button className="crud-button danger" onClick={() => handleDelete(user.id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <style jsx>{`
        .crud-container {
          max-width: 600px;
          margin: 40px auto;
          padding: 30px;
          background-color: #fff;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .crud-title {
          text-align: center;
          color: #1e40af;
          margin-bottom: 30px;
          font-weight: 700;
        }
        .crud-form {
          margin-bottom: 25px;
        }
        .input-group {
          display: flex;
          gap: 10px;
        }
        .form-input {
          flex-grow: 1;
          padding: 12px 15px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 1rem;
          transition: border-color 0.3s;
        }
        .form-input:focus {
          outline: none;
          border-color: #1e40af;
        }
        .crud-button {
          padding: 12px 25px;
          border: none;
          border-radius: 8px;
          color: #fff;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.3s, transform 0.2s;
        }
        .crud-button.primary {
          background-color: #1e40af;
        }
        .crud-button.primary:hover {
          background-color: #1d3b9e;
          transform: translateY(-2px);
        }
        .crud-button.warning {
          background-color: #f59e0b;
        }
        .crud-button.warning:hover {
          background-color: #d97706;
          transform: translateY(-2px);
        }
        .crud-button.danger {
          background-color: #ef4444;
        }
        .crud-button.danger:hover {
          background-color: #dc2626;
          transform: translateY(-2px);
        }
        .status-message {
          text-align: center;
          color: #6b7280;
          font-style: italic;
        }
        .error-message {
          text-align: center;
          color: #dc2626;
          padding: 10px;
          background-color: #fee2e2;
          border-radius: 8px;
          border: 1px solid #fca5a5;
        }
        .user-list {
          list-style-type: none;
          padding: 0;
          margin-top: 20px;
        }
        .user-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: #f9fafb;
          border: 1px solid #eee;
          padding: 15px 20px;
          margin-bottom: 10px;
          border-radius: 8px;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .user-item:hover {
          transform: translateY(-3px);
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
        }
        .user-name {
          font-size: 1.1rem;
          color: #333;
        }
        .user-actions {
          display: flex;
          gap: 8px;
        }
      `}</style>
    </div>
  );
};

export default Crud;