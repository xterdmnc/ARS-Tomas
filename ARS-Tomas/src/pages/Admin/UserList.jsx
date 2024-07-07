import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get('http://localhost:3001/api/users');
      if (res.data.success && Array.isArray(res.data.users)) {
        setUsers(res.data.users);
      } else {
        setError('Failed to fetch users: Invalid response structure');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError(`Error fetching users: ${error.message}`);
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>User Management</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul>
        {users.map(user => (
          <li key={user._id}>
            {user.username}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;
