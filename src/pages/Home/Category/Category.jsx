import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { FaSearchengin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Category = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedTab, setSelectedTab] = useState("All");
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch meals from API
  useEffect(() => {
    fetch("http://localhost:3000/meals")
      .then(res => res.json())
      .then(data => {
        setMeals(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load meals:", err);
        setLoading(false);
      });
  }, []);
  

  const handleTabClick = (category) => {
    setSelectedTab(category);
  };

  const bannerImages = [
    "https://img.freepik.com/free-photo/top-view-eid-al-fitr-celebration-with-delicious-food_23-2151205080.jpg",
    "https://img.freepik.com/free-photo/midsection-waiter-serving-two-dishes-wooden-table_181624-54414.jpg",
    "https://img.freepik.com/premium-photo/top-view-indian-food-biryani-with-side-dishes-tablecloth_665346-76433.jpg"
  ];

  const filteredMeals = meals.filter((meal) => {
    const matchCategory = selectedTab === "All" || meal.category === selectedTab;
    const matchSearch = meal.title.toLowerCase().includes(searchText.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div>
      {/* Banner */}
      <div className="relative ">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 8000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
        >
          {bannerImages.map((img, idx) => (
            <SwiperSlide key={idx}>
              <div
                className="relative bg-cover bg-center md:py-80 py-48 px-4 text-center"
                style={{ backgroundImage: `url('${img}')` }}
              >
                <div className="absolute inset-0 bg-[rgba(0,0,0,0.51)]"></div>
                <div className="relative z-10">
                  <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-md">
                    Discover Delicious Hostel Meals
                  </h1>
                  <p className="text-lg md:text-xl text-white mb-8 max-w-2xl mx-auto drop-shadow-sm">
                    Tired of boring hostel food? Search and enjoy a variety of tasty, healthy, and affordable meals made just for students!
                  </p>
                  <div className="relative max-w-md mx-auto mt-8">
                    <input
                      type="text"
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                      placeholder="Search for meals like biryani, pasta, etc."
                      className="w-full pl-14 pr-10 py-2 ring-1 ring-orange-500 border border-gray-300 rounded-full bg-white text-gray-800 shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    <FaSearchengin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-500 text-lg pointer-events-none" />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Tabs */}
      <div className="flex justify-center sm:gap-4 gap-1 my-8 flex-wrap">
        {["All", "Breakfast", "Lunch", "Dinner"].map((cat) => (
          <button
            key={cat}
            onClick={() => handleTabClick(cat)}
            className={`px-6 py-2 rounded-full font-medium text-sm sm:text-base transition-all duration-300 ${
              selectedTab === cat
                ? "bg-orange-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-orange-200"
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

        {loading ? (
          <p className="text-center text-gray-500 mt-10">Loading meals...</p>
        ) : filteredMeals.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">No meals found matching your search.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {filteredMeals.map((meal) => (
              <div
                key={meal._id || meal.id}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition duration-300"
              >
                <img src={meal.image} alt={meal.title} className="w-full h-60 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">{meal.title}</h3>
                  <p className="text-sm text-gray-500 mb-1">Category: {meal.category}</p>
                  <p className="text-sm text-yellow-600 mb-1">⭐ Rating: {meal.rating}</p>
                  <p className="text-sm text-green-600 font-bold">$ {meal.price}</p>
                  <Link to={`/mealsDetails/${meal._id}`}>
                  <button className="mt-4 w-full btn bg-orange-500 text-white hover:bg-orange-600">
                    View Details
                  </button>
                  </Link>
                  
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
