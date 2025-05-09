import React, { useEffect, useState } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

function ManageMeals() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/meals')
      .then(res => res.json())
      .then(data => setMeals(data))
      .catch(err => console.error('Error fetching meals:', err));
  }, []);

  const handleDelete = id => {
    const confirmDelete = window.confirm('Are you sure you want to delete this meal?');
    if (confirmDelete) {
      fetch(`http://localhost:3000/meals/${id}`, {
        method: 'DELETE',
      })
        .then(res => res.json())
        .then(data => {
          if (data.deletedCount > 0) {
            setMeals(meals.filter(meal => meal._id !== id));
            alert('Meal deleted successfully!');
          }
        });
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-semibold mb-5">Manage Meals</h2>

      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="table table-zebra w-full">
          <thead className="bg-orange-600 text-white">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Meal Title</th>
              <th>Category</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {meals.map((meal, index) => (
              <tr key={meal._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="w-16 h-16">
                    <img src={meal.image} alt={meal.title} className="rounded-md w-full h-full object-cover" />
                  </div>
                </td>
                <td>{meal.title}</td>
                <td>{meal.category}</td>
                <td>${meal.price}</td>
                <td>
                  <div className="flex gap-3">
                    <button className="text-blue-500 hover:text-blue-700">
                      <FiEdit size={18} />
                    </button>
                    <button onClick={() => handleDelete(meal._id)} className="text-red-500 hover:text-red-700">
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {meals.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center text-gray-500 py-5">
                  No meals found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageMeals;
