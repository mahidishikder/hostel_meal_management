import React, { useEffect, useState } from 'react';

function Users() {
  const [users, setUsers] = useState([]);  // State to store users data
  const [loading, setLoading] = useState(true);  // State for loading state
  const [error, setError] = useState(null);  // State for errors

  // Fetch users data from API
  useEffect(() => {
    fetch('http://localhost:3000/users')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);  // Set users data
        setLoading(false);  // Set loading to false after data is fetched
      })
      .catch((err) => {
        setError('Failed to fetch user data');
        setLoading(false);  // Set loading to false in case of an error
      });
  }, []);

  // Handle user deletion
  const handleDelete = (id) => {
    fetch(`http://localhost:3000/users/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then(() => {
        setUsers(users.filter((user) => user._id !== id));  // Remove user from the list after deletion
      })
      .catch((err) => {
        setError('Failed to delete user');
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>User Details</h1>
      <table border="1" style={{ width: '100%', marginTop: '20px', textAlign: 'left' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Badge</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.badge}</td>
              <td>
                {/* Action buttons based on user role */}
                {user.role === 'admin' ? (
                  <button onClick={() => handleDelete(user._id)}>Delete</button>
                ) : (
                  <button>View</button> // Show a different button for students (e.g., "View" for students)
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
