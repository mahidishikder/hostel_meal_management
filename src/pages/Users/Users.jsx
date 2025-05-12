import React from 'react';
import Swal from 'sweetalert2';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosPublic from '../../hooks/useAxiosPublic';

function Users() {
  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();

  // Fetch users with react-query
  const { data: users = [], isLoading, isError } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      console.log("Fetching users..."); // Debugging console log
      const res = await axiosPublic.get('/users', {
        headers: {
          authorization: `Bearer ${localStorage.getItem('access-token')}`,
        },
      });
      console.log("Data received:", res.data); // Debugging console log
      return res.data;
    },
  });

  // Mutation: Make Admin
  const makeAdminMutation = useMutation({
    mutationFn: (userId) => axiosPublic.patch(`/users/admin/${userId}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
    },
  });

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
        makeAdminMutation.mutate(user._id, {
          onSuccess: () => {
            Swal.fire('Success!', `${user.name} is now an admin.`, 'success');
          },
          onError: () => {
            Swal.fire('Error!', 'Failed to update user role', 'error');
          },
        });
      }
    });
  };

  // Mutation: Delete User
  const deleteMutation = useMutation({
    mutationFn: (id) => axiosPublic.delete(`/users/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
    },
  });

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
        deleteMutation.mutate(id, {
          onSuccess: () => {
            Swal.fire('Deleted!', 'User has been deleted.', 'success');
          },
          onError: () => {
            Swal.fire('Error!', 'Failed to delete user', 'error');
          },
        });
      }
    });
  };

  if (isLoading) return <div className="text-center mt-10 text-lg">Loading...</div>;
  if (isError) return <div className="text-center mt-10 text-red-500">Failed to fetch user data</div>;

  return (
    <div className="p-4 md:p-8 font-sans">
      <h1 className="text-2xl md:text-4xl font-bold text-orange-600 mb-6 text-center">User Management</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Badge</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-t">
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">
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
                <td className="p-3">{user.badge}</td>
                <td className="p-3">
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
