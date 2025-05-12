import React, { useState } from 'react';
import Swal from 'sweetalert2';
import useUpcoming from '../../hooks/useUpcoming';

function Upcomming() {
  const [upcomingCard, refetch] = useUpcoming();
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
        refetch(); // নতুন ডেটা পেলে reload করবে
      } else {
        Swal.fire('Error', 'Failed to submit the meal.', 'error');
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire('Error', 'Something went wrong.', 'error');
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-orange-600">Add Upcoming Meal</h2>
      
      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow-md p-6 rounded mb-10">
        <input type="text" name="name" placeholder="Meal Name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="datetime-local" name="publishDate" value={formData.publishDate} onChange={handleChange} className="w-full p-2 border rounded" required />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="number" name="likes" placeholder="Likes" value={formData.likes} onChange={handleChange} className="w-full p-2 border rounded" required />
        <label className="flex items-center space-x-2">
          <input type="checkbox" name="likedByPremiumUser" checked={formData.likedByPremiumUser} onChange={handleChange} />
          <span>Liked by Premium User</span>
        </label>
        <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
          Submit
        </button>
      </form>

      {/* Show Upcoming Cards */}
      <h2 className="text-2xl font-bold mb-4 text-orange-600">Upcoming Meals</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {upcomingCard?.length === 0 ? (
          <p className="text-gray-500">No upcoming meals found.</p>
        ) : (
          upcomingCard.map((item) => (
            <div key={item._id} className="card shadow-lg p-4 border border-orange-100 rounded-md">
              <img src={item.image} alt={item.name} className="w-full h-48 object-cover rounded-md mb-3" />
              <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
              <p className="text-gray-600 text-sm mt-1 mb-2">{item.description}</p>
              <div className="text-sm text-gray-500 mb-1">Publish: {new Date(item.publishDate).toLocaleString()}</div>
              <div className="flex gap-2 text-sm">
                <span className="badge bg-orange-500 text-white">👍 {item.likes}</span>
                {item.likedByPremiumUser && <span className="badge bg-yellow-500 text-white">Premium ❤️</span>}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Upcomming;
