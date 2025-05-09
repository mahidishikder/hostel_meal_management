import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Meals() {
  const [meals, setMeals] = useState([]);
  const [filteredMeals, setFilteredMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetch("http://localhost:3000/meals")
      .then(res => res.json())
      .then(data => {
        setMeals(data);
        setFilteredMeals(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load meals:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let updatedMeals = meals;

    // Filter by search term
    if (searchTerm) {
      updatedMeals = updatedMeals.filter(meal =>
        meal.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== "All") {
      updatedMeals = updatedMeals.filter(meal =>
        meal.category === selectedCategory
      );
    }

    setFilteredMeals(updatedMeals);
  }, [searchTerm, selectedCategory, meals]);

  const categories = ["All", ...new Set(meals.map(meal => meal.category))];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-orange-500"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12 text-orange-500">
        <span className='text-black'>Our</span> Delicious Meals
      </h1>

      {/* 🔍 Search and Category Filter */}
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
  {/* Search Input */}
  <div className="w-full md:w-[65%]">
    <input
      type="text"
      placeholder="🔍 Search meals..."
      className="input input-bordered w-full px-4 py-2 rounded-full ring-1 ring-orange-300 text-base focus:outline-none focus:ring-2 focus:ring-orange-500"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  </div>

  {/* Category Dropdown */}
  <div className="w-full md:w-[35%]">
    <select
      className="select select-bordered w-full px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-orange-500"
      value={selectedCategory}
      onChange={(e) => setSelectedCategory(e.target.value)}
    >
      {categories.map((cat, i) => (
        <option key={i} value={cat}>{cat}</option>
      ))}
    </select>
  </div>
</div>


      {/* 🧾 Meals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredMeals.length === 0 ? (
          <p className="text-center col-span-full text-gray-500">No meals found.</p>
        ) : (
          filteredMeals.map(meal => (
            <div key={meal._id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-orange-100">
              <figure className="px-4 pt-4">
                <img 
                  src={meal.image} 
                  alt={meal.title} 
                  className="rounded-xl h-48 w-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-gray-800">{meal.title}</h2>
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="badge bg-orange-500 border-0 text-white">{meal.category}</span>
                  <span className="badge bg-amber-600 border-0 text-white">{meal.calories} cal</span>
                  <span className="badge bg-yellow-500 border-0 text-white">⭐ {meal.rating}</span>
                </div>
                <p className="text-lg font-semibold text-gray-700">Price: ${meal.price}</p>
                <p className="text-sm text-gray-600 line-clamp-2">{meal.description}</p>
                
                <div className="card-actions justify-end mt-4">
                  <Link 
                    to={`/mealsDetails/${meal._id}`} 
                    className="btn bg-orange-500 hover:bg-orange-600 border-0 text-white"
                  >
                    View Details
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Meals;
