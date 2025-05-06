import React, { useContext } from 'react';
import { AuthContext } from '../../provider/AuthProvider';

const upcomingMealsData = [
  { id: 1, name: 'Spaghetti Bolognese', category: 'Lunch', image: '/path/to/image.jpg', likes: 120, isPremium: true },
  { id: 2, name: 'Chicken Curry', category: 'Dinner', image: '/path/to/image2.jpg', likes: 90, isPremium: false },
  { id: 3, name: 'Chicken Curry', category: 'Dinner', image: '/path/to/image2.jpg', likes: 90, isPremium: false },
  { id: 4, name: 'Chicken Curry', category: 'Dinner', image: '/path/to/image2.jpg', likes: 90, isPremium: false },
  { id: 5, name: 'Chicken Curry', category: 'Dinner', image: '/path/to/image2.jpg', likes: 90, isPremium: false },
  { id: 6, name: 'Chicken Curry', category: 'Dinner', image: '/path/to/image2.jpg', likes: 90, isPremium: false },
  { id: 7, name: 'Chicken Curry', category: 'Dinner', image: '/path/to/image2.jpg', likes: 90, isPremium: false },
  { id: 8, name: 'Chicken Curry', category: 'Dinner', image: '/path/to/image2.jpg', likes: 90, isPremium: false },
  // Add more meals here...
];

function UpcomingMeals() {
  const {name,loginUser} = useContext(AuthContext)
  console.log(name,loginUser)
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6">Upcoming Meals</h2>
      
      {/* Meal Cards Container */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {upcomingMealsData.map((meal) => (
          <div key={meal.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            {/* Meal Image */}
            <img src={meal.image} alt={meal.name} className="w-full h-48 object-cover" />
            
            <div className="p-4">
              {/* Meal Info */}
              <h3 className="text-lg font-medium">{meal.name}</h3>
              <p className="text-sm text-gray-500">{meal.category}</p>
              <p className="text-sm text-gray-500 mt-2">Likes: {meal.likes}</p>
              
              {/* Like Button (only for premium users) */}
              {meal.isPremium && (
                <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition duration-200">
                  Like
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UpcomingMeals;
