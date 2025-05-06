import React from "react";

const Meals = () => {
  const meals = [
    {
      day: "Sunday",
      breakfast: "Bread, Egg, Banana",
      lunch: "Rice, Chicken Curry, Salad",
      dinner: "Paratha, Vegetable, Lentil Soup",
    },
    {
      day: "Monday",
      breakfast: "Paratha, Egg, Tea",
      lunch: "Rice, Fish Curry, Mixed Veg",
      dinner: "Khichuri, Eggplant Fry",
    },
    {
      day: "Tuesday",
      breakfast: "Ruti, Vegetable Curry",
      lunch: "Rice, Beef Curry, Salad",
      dinner: "Polao, Chicken Roast",
    },
    // Add more days if needed
  ];

  return (
    <div className="min-h-screen bg-orange-50 py-16 px-4 md:px-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-orange-500 mb-10">
          Weekly Meal Schedule
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {meals.map((meal, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <h2 className="text-xl font-semibold text-orange-600 mb-4 text-center">
                {meal.day}
              </h2>
              <div className="space-y-2 text-gray-700">
                <p><span className="font-medium text-black">Breakfast:</span> {meal.breakfast}</p>
                <p><span className="font-medium text-black">Lunch:</span> {meal.lunch}</p>
                <p><span className="font-medium text-black">Dinner:</span> {meal.dinner}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Meals;
