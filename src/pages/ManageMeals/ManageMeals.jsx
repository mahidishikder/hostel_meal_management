import React from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import useMealsCard from '../../hooks/useMealsCard';
import Swal from 'sweetalert2';

function ManageMeals() {
  const [mealsCard, refetch] = useMealsCard();

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this meal!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/meals/${id}`, {
          method: 'DELETE',
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire('Deleted!', 'The meal has been deleted.', 'success');
              refetch(); // Refetch updated list
            } else {
              Swal.fire('Failed!', 'Failed to delete the meal.', 'error');
            }
          })
          .catch((error) => {
            console.error('Delete error:', error);
            Swal.fire('Error!', 'Something went wrong.', 'error');
          });
      }
    });
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
            {mealsCard.length > 0 ? (
              mealsCard.map((meal, index) => (
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
                      <Link to={`/dashboard/meal/update/${meal._id}`} className="text-blue-500 hover:text-blue-700">
                        <FiEdit size={18} />
                      </Link>
                      <button onClick={() => handleDelete(meal._id)} className="text-red-500 hover:text-red-700">
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
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
