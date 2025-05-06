import React, { useState } from 'react';

const meals = [
  { id: 1, title: "Pasta", category: "Lunch", image: "https://i.ibb.co/fdqDtC6/pasta.jpg", rating: 4.5, price: 120 },
  { id: 2, title: "Paratha", category: "Breakfast", image: "https://i.ibb.co/JqykL7d/paratha.jpg", rating: 4.2, price: 60 },
  { id: 3, title: "Chicken Curry", category: "Dinner", image: "https://i.ibb.co/sqBhCWz/chicken-curry.jpg", rating: 4.8, price: 150 },
  { id: 4, title: "Fried Rice", category: "Lunch", image: "https://i.ibb.co/Vp6f7KT/fried-rice.jpg", rating: 4.6, price: 100 },
  { id: 5, title: "Bread & Egg", category: "Breakfast", image: "https://i.ibb.co/9ZZhnVm/bread-egg.jpg", rating: 4.3, price: 70 },
];

const Category = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedTab, setSelectedTab] = useState("All");

  const handleTabClick = (category) => {
    setSelectedTab(category);
  };

  // Filter data based on tab + search
  const filteredMeals = meals.filter((meal) => {
    const matchCategory = selectedTab === "All" || meal.category === selectedTab;
    const matchSearch = meal.title.toLowerCase().includes(searchText.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div>
      {/* Banner Section */}
      <div className="bg-orange-100 py-16 px-4 text-center">
        <h1 className="text-4xl font-bold text-orange-600 mb-4">Welcome to Hostel Meals</h1>
        <p className="text-lg text-gray-600 mb-6">Search your favorite meal and enjoy!</p>
        <div className="max-w-md mx-auto">
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search meals..."
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-4 my-8">
        {["All", "Breakfast", "Lunch", "Dinner"].map((cat) => (
          <button
            key={cat}
            onClick={() => handleTabClick(cat)}
            className={`px-6 py-2 rounded-full font-medium transition ${
              selectedTab === cat ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-orange-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Meals Grid */}
      <div className="py-10 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-orange-500">
          {selectedTab === "All" ? "All Meals" : `${selectedTab} Meals`}
        </h2>
        {filteredMeals.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">No meals found matching your search.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {filteredMeals.map((meal) => (
              <div
                key={meal.id}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition duration-300"
              >
                <img src={meal.image} alt={meal.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">{meal.title}</h3>
                  <p className="text-sm text-gray-500 mb-1">Category: {meal.category}</p>
                  <p className="text-sm text-yellow-600 mb-1">⭐ Rating: {meal.rating}</p>
                  <p className="text-sm text-green-600 font-bold">৳ {meal.price}</p>
                  <button className="mt-4 w-full btn bg-orange-500 text-white hover:bg-orange-600">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
