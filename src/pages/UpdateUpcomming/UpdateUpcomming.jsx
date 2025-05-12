import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../hooks/useAxiosPublic';

function UpdateUpcoming() {
  console.log('fff')
  const axiosPublic = useAxiosPublic();
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    image: '',
    publishDate: '',
    description: '',
    likes: '',
    likedByPremiumUser: false
  });

  // Helper function to convert ISO date to datetime-local format
  const formatDateTimeLocal = (isoString) => {
    const date = new Date(isoString);
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - offset * 60 * 1000);
    return localDate.toISOString().slice(0, 16); // "YYYY-MM-DDTHH:MM"
  };

  // Fetch the existing meal data to populate the form
  useEffect(() => {
    const fetchMealData = async () => {
      try {
        const response = await axiosPublic.get(`/upcoming/${id}`);
        const data = response.data;
        setFormData({
          name: data.name,
          image: data.image,
          publishDate: formatDateTimeLocal(data.publishDate),
          description: data.description,
          likes: data.likes,
          likedByPremiumUser: data.likedByPremiumUser
        });
      } catch (error) {
        console.error('Error fetching meal data:', error);
      }
    };

    fetchMealData();
  }, [id, axiosPublic]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosPublic.put(`/upcoming/${id}`, formData);

      if (response.status === 200) {
        Swal.fire('Success!', 'Upcoming meal updated successfully.', 'success');
        navigate('/dashboard/manageUpcomming');
      } else {
        Swal.fire('Error!', 'Failed to update meal', 'error');
      }
    } catch (error) {
      console.error('Error updating meal:', error);
      Swal.fire('Error!', 'Something went wrong, please try again later.', 'error');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Update Upcoming Meal</h2>
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
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update
        </button>
      </form>
    </div>
  );
}

export default UpdateUpcoming;
