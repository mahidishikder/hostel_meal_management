import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';


function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch users
  useEffect(() => {
    fetch('http://localhost:3000/users')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch user data');
        setLoading(false);
      });
  }, []);

  // Change role to admin
 // Change role to admin
const handleRoleChange = (user) => {
  Swal.fire({
    title: 'Are you sure?',
    text: `Make ${user.name} an admin?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, make admin!',
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(`http://localhost:3000/users/admin/${user._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.modifiedCount > 0) {
            const updatedUsers = users.map((u) =>
              u._id === user._id ? { ...u, role: 'admin' } : u
            );
            setUsers(updatedUsers);
            Swal.fire('Success!', `${user.name} is now an admin.`, 'success');
          }
        })
        .catch(() => {
          Swal.fire('Error!', 'Failed to update user role', 'error');
        });
    }
  });
};


  // Delete user
  const handleDelete = (id) => {
    const userToDelete = users.find((user) => user._id === id);
    Swal.fire({
      title: 'Are you sure?',
      text: `Delete user ${userToDelete.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e74c3c',
      cancelButtonColor: '#95a5a6',
      confirmButtonText: 'Yes, delete!',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/users/${id}`, {
          method: 'DELETE',
        })
          .then((response) => response.json())
          .then(() => {
            setUsers(users.filter((user) => user._id !== id));
            Swal.fire('Deleted!', 'User has been deleted.', 'success');
          })
          .catch(() => {
            Swal.fire('Error!', 'Failed to delete user', 'error');
          });
      }
    });
  };
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h1 style={{ color: '#FF6F00' }}>User Management</h1>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          marginTop: '20px',
          textAlign: 'left',
        }}
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Badge</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} style={{ borderBottom: '1px solid #ddd' }}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
              <td>
  <button
    onClick={() => handleRoleChange(user)}
    className={`px-4 py-2 rounded text-white font-semibold ${
      user.role === 'admin'
        ? 'bg-gray-600 cursor-not-allowed'
        : 'bg-orange-500 hover:bg-orange-600'
    }`}
    disabled={user.role === 'admin'}
  >
    {user.role === 'admin' ? 'Admin' : 'Student'}
  </button>
</td>

              </td>
              <td>{user.badge}</td>
              <td>
                <button
                  onClick={() => handleDelete(user._id)}
                  style={{
                    backgroundColor: '#FF6F00',
                    color: '#fff',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginRight: '10px',
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
