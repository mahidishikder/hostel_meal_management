import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useMealsCard from '../../../hooks/useMealsCard';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../../provider/AuthProvider';

function MealsDetails() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [mealsCard, refetch, loading] = useMealsCard();
  const [mealDetails, setMealDetails] = useState(null);

  useEffect(() => {
    if (!loading && mealsCard?.length) {
      const foundMeal = mealsCard.find(meal => meal._id === id);
      setMealDetails(foundMeal || null);
    }
  }, [loading, mealsCard, id]);

  const handleRequestMeal = () => {
    if (!user) {
      toast.error("⚠️ Please login first to request this meal.");
      return;
    }

    navigate('/membership');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold text-blue-500 animate-pulse">Loading Meal Details...</p>
      </div>
    );
  }

  if (!mealDetails) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-red-500">Meal not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="bg-white shadow-lg rounded-3xl overflow-hidden grid md:grid-cols-2 gap-8 p-8">
        {/* Image */}
        <div className="rounded-2xl overflow-hidden">
          <img
            src={mealDetails.image}
            alt={mealDetails.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Meal Info */}
        <div className="space-y-4">
          <h2 className="text-4xl font-bold text-gray-900">{mealDetails.title}</h2>
          <p className="text-lg text-gray-600">{mealDetails.description}</p>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-gray-50 p-4 rounded-xl text-center shadow-sm">
              <h4 className="text-sm text-gray-500">Category</h4>
              <p className="text-xl font-semibold text-blue-600">{mealDetails.category}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl text-center shadow-sm">
              <h4 className="text-sm text-gray-500">Calories</h4>
              <p className="text-xl font-semibold text-orange-500">{mealDetails.calories} kcal</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl text-center shadow-sm">
              <h4 className="text-sm text-gray-500">Price</h4>
              <p className="text-xl font-bold text-green-600">${mealDetails.price.toFixed(2)}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl text-center shadow-sm">
              <h4 className="text-sm text-gray-500">Distributor</h4>
              <p className="text-md font-semibold text-gray-700">{mealDetails.distributorName}</p>
            </div>
          </div>

          {/* Ingredients */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Ingredients</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {mealDetails.ingredients.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Request Meal Button */}
          <div className="mt-8">
            <button
              onClick={handleRequestMeal}
              className={`w-full py-3 px-6 rounded-xl text-white font-semibold shadow-md transition duration-300 ease-in-out
              bg-indigo-600 hover:bg-indigo-700`}
            >
              🍽️ Request Meal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MealsDetails;
