import React, { useState } from 'react';
import Swal from 'sweetalert2';

function Upcomming() {
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    publishDate: '',
    description: '',
    likes: '',
    likedByPremiumUser: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData({
      ...formData,
      [name]: newValue
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/upcoming', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500
        });

        setFormData({
          name: '',
          image: '',
          publishDate: '',
          description: '',
          likes: '',
          likedByPremiumUser: false
        });
      } else {
        Swal.fire('Error', 'Failed to submit the meal.', 'error');
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire('Error', 'Something went wrong.', 'error');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Add Upcoming Meal</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Meal Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="datetime-local"
          name="publishDate"
          value={formData.publishDate}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="likes"
          placeholder="Likes"
          value={formData.likes}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="likedByPremiumUser"
            checked={formData.likedByPremiumUser}
            onChange={handleChange}
          />
          <span>Liked by Premium User</span>
        </label>
        <button
          type="submit"
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Upcomming;
