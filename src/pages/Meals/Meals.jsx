import React, { useState, useEffect } from 'react';

function Meals() {
  const [meals, setMeals] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('default');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        if (!response.ok) {
          throw new Error('Failed to fetch meals');
        }
        const data = await response.json();
        setMeals(data.meals || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, []);

  const filteredMeals = meals.filter(meal => {
    const searchLower = searchTerm.toLowerCase();
    return (
      meal.strMeal.toLowerCase().includes(searchLower) ||
      meal.strCategory.toLowerCase().includes(searchLower) ||
      meal.strArea.toLowerCase().includes(searchLower)
    );
  });

  const sortedMeals = [...filteredMeals].sort((a, b) => {
    switch (sortOption) {
      case 'price-low':
        return (Math.random() * 20) - (Math.random() * 20); // Simulated price sort
      case 'price-high':
        return (Math.random() * 20) - (Math.random() * 20); // Simulated price sort
      case 'rating':
        return parseFloat(b.strRating || 4.5) - parseFloat(a.strRating || 4.5);
      case 'calories':
        return parseInt(a.strCalories || 500) - parseInt(b.strCalories || 500);
      default:
        return 0;
    }
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF6900]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-red-500">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (!meals.length) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>No meals found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search and Sort Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[#FF6900] md:mt-12  mt-6 mb-8 text-center"><span className='text-black'>Our</span> Delicious Meals</h1>
        
        <div className="flex flex-col md:flex-row justify-center items-stretch md:items-center gap-3 mb-6 max-w-3xl mx-auto">
          {/* Search Box */}
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search meals by name or category..."
              className="block w-full pl-10 pr-3 py-2 md:py-3 border border-orange-300 bg-white shadow rounded-full focus:outline-none focus:ring-2 focus:ring-[#FF6900] focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Sort Dropdown */}
          <div className="relative w-full md:w-auto">
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
              </svg>
            </div>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="appearance-none w-full md:w-48 pl-3 pr-10 py-2 md:py-3 bg-orange-400 rounded-full border border-orange-300 text-white/80 focus:outline-none shadow shadow-gray-400 "
            >
              <option value="default">Sort by</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
              <option value="calories">Lowest Calories</option>
            </select>
          </div>
        </div>
      </div>

      {/* Meals Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedMeals.map(meal => (
          <MealCard key={meal.idMeal} meal={meal} />
        ))}
      </div>

      {!sortedMeals.length && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No meals match your search criteria.</p>
        </div>
      )}
    </div>
  );
}

function MealCard({ meal }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <img 
        src={meal.strMealThumb} 
        alt={meal.strMeal} 
        className="w-full h-48 object-cover"
        loading="lazy"
      />
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800">{meal.strMeal}</h3>
          <span className="bg-[#FF6900] text-white text-xs px-2 py-1 rounded-full">
            {meal.strCategory}
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{meal.strInstructions.substring(0, 100)}...</p>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-gray-700 text-sm ml-1">4.5</span>
          </div>
          <div className="text-right">
            <span className="text-[#FF6900] font-bold">${(Math.random() * 20).toFixed(2)}</span>
            <span className="block text-xs text-gray-500">{Math.floor(Math.random() * 500 + 300)} cal</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Meals;