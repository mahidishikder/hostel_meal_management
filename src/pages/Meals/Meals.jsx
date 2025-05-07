import React, { useState, useEffect, useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Search, Filter, Clock, Star, DollarSign, Loader2 } from 'lucide-react';

// Fake meal data - replace with API calls later
const generateFakeMeals = () => {
  return Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `Meal ${i + 1}`,
    description: `Delicious meal option ${i + 1} prepared with fresh ingredients`,
    price: Math.floor(Math.random() * 20) + 5,
    rating: (Math.random() * 2 + 3).toFixed(1),
    prepTime: `${Math.floor(Math.random() * 30) + 10} mins`,
    category: ['Vegetarian', 'Non-Veg', 'Vegan', 'Keto'][Math.floor(Math.random() * 4)],
    image: `https://source.unsplash.com/random/300x200/?food,meal${i}`
  }));
};

const categories = ['All', 'Vegetarian', 'Non-Veg', 'Vegan', 'Keto'];
const priceRanges = [
  { label: 'All', min: 0, max: 100 },
  { label: 'Under $10', min: 0, max: 10 },
  { label: '$10-$15', min: 10, max: 15 },
  { label: 'Over $15', min: 15, max: 100 }
];

const MealsPage = () => {
  const [meals, setMeals] = useState([]);
  const [displayedMeals, setDisplayedMeals] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0]);

  // Debounce search term
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  // Initial data load - replace with API call
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));
        const fakeData = generateFakeMeals();
        setMeals(fakeData);
        setDisplayedMeals(fakeData.slice(0, 12));
        setHasMore(fakeData.length > 12);
      } catch (err) {
        setError('Failed to load meals. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  // Memoized filtered meals
  const filteredMeals = useMemo(() => {
    return meals.filter(meal => {
      const matchesCategory = selectedCategory === 'All' || meal.category === selectedCategory;
      const matchesPrice = meal.price >= selectedPriceRange.min && 
                         meal.price <= selectedPriceRange.max;
      const matchesSearch = debouncedSearchTerm === '' || 
                          meal.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
                          meal.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
      
      return matchesCategory && matchesPrice && matchesSearch;
    });
  }, [meals, selectedCategory, selectedPriceRange, debouncedSearchTerm]);

  // Reset displayed meals when filters change
  useEffect(() => {
    setDisplayedMeals(filteredMeals.slice(0, 12));
    setHasMore(filteredMeals.length > 12);
  }, [filteredMeals]);

  // Load more meals for infinite scroll
  const fetchMoreData = () => {
    setTimeout(() => {
      const moreMeals = filteredMeals.slice(
        displayedMeals.length,
        displayedMeals.length + 8
      );
      
      setDisplayedMeals([...displayedMeals, ...moreMeals]);
      setHasMore(displayedMeals.length + moreMeals.length < filteredMeals.length);
    }, 800);
  };

  return (
    <div className="bg-orange-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-orange-600 mb-2 text-center">Our Meals</h1>
        <p className="text-lg text-gray-600 mb-12 text-center">
          Discover delicious meals tailored for hostel residents
        </p>
        
        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Search Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Search meals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Category Filter */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-5 w-5 text-gray-400" />
              </div>
              <select
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-orange-500 focus:border-orange-500 appearance-none"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            {/* Price Range Filter */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="h-5 w-5 text-gray-400" />
              </div>
              <select
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-orange-500 focus:border-orange-500 appearance-none"
                value={selectedPriceRange.label}
                onChange={(e) => {
                  const selected = priceRanges.find(range => range.label === e.target.value);
                  setSelectedPriceRange(selected || priceRanges[0]);
                }}
              >
                {priceRanges.map((range) => (
                  <option key={range.label} value={range.label}>{range.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-8 text-center">
            {error}
          </div>
        )}
        
        {/* Meals Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-12 w-12 text-orange-500 animate-spin" />
          </div>
        ) : displayedMeals.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-700">No meals found</h3>
            <p className="mt-2 text-gray-500">Try adjusting your search or filters</p>
          </div>
        ) : (
          <InfiniteScroll
            dataLength={displayedMeals.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 text-orange-500 animate-spin" />
              </div>
            }
            endMessage={
              <p className="text-center py-8 text-gray-500">
                You've seen all our delicious meals!
              </p>
            }
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {displayedMeals.map((meal) => (
              <div 
                key={meal.id} 
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative pb-[60%] overflow-hidden">
                  <img
                    src={meal.image}
                    alt={meal.name}
                    className="absolute h-full w-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-800">{meal.name}</h3>
                    <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-sm font-medium">
                      ${meal.price}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-2">{meal.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{meal.prepTime}</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span>{meal.rating}</span>
                    </div>
                    <span className="bg-gray-100 px-2 py-1 rounded-full">
                      {meal.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
};

export default MealsPage;