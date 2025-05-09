import React, { useEffect, useState } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

function ManageUpcomming() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/upcoming')
      .then(res => res.json())
      .then(data => setMeals(data))
      .catch(err => console.error('Error fetching data:', err));
  }, []);

  const handleDelete = (id) => {
    // Delete logic will go here
    console.log('Delete:', id);
  };

  const handleUpdate = (id) => {
    // Update logic will go here
    console.log('Update:', id);
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Manage Upcoming Meals</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
          <thead className="bg-orange-600 text-white">
            <tr>
              <th className="text-left py-3 px-4">Image</th>
              <th className="text-left py-3 px-4">Name</th>
              <th className="text-left py-3 px-4">Description</th>
              <th className="text-left py-3 px-4">Publish Date</th>
              <th className="text-left py-3 px-4">Likes</th>
              <th className="text-center py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {meals.map((meal) => (
              <tr key={meal._id} className="border-b hover:bg-orange-50 transition">
                <td className="py-3 px-4">
                  <img src={meal.image} alt={meal.name} className="w-14 h-14 object-cover rounded" />
                </td>
                <td className="py-3 px-4">{meal.name}</td>
                <td className="py-3 px-4 text-sm text-gray-700">{meal.description}</td>
                <td className="py-3 px-4">{new Date(meal.publishDate).toLocaleDateString()}</td>
                <td className="py-3 px-4">{meal.likes}</td>
                <td className="py-3 px-4 text-center space-x-2">
                  <button
                    onClick={() => handleUpdate(meal._id)}
                    className="text-blue-600 hover:text-blue-800"
                    title="Edit"
                  >
                    <FiEdit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(meal._id)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {meals.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No upcoming meals found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageUpcomming;
