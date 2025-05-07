import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { FaSearch, FaSearchengin } from 'react-icons/fa';

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

  const bannerImages = [
    "https://img.freepik.com/free-photo/top-view-eid-al-fitr-celebration-with-delicious-food_23-2151205080.jpg?t=st=1746587659~exp=1746591259~hmac=661ec2db7eea6d2100e485ae1bd1a290b59cf6190b805026c8b23739c23e4c4d&w=996",
    "https://img.freepik.com/free-photo/midsection-waiter-serving-two-dishes-wooden-table_181624-54414.jpg?t=st=1746550993~exp=1746554593~hmac=edebaef7dceb27fbd309fd3471ffa1814c9d0bb4dd9143b9434a9330643718fd&w=996",
    "https://img.freepik.com/premium-photo/top-view-indian-food-biryani-with-side-dishes-tablecloth_665346-76433.jpg?w=996"
  ];

  const filteredMeals = meals.filter((meal) => {
    const matchCategory = selectedTab === "All" || meal.category === selectedTab;
    const matchSearch = meal.title.toLowerCase().includes(searchText.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div>
      {/* Banner Section */}
      <div className="relative ">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 8000, // 1 second
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }} // Pagination for mobile
        >
          {bannerImages.map((img, idx) => (
            <SwiperSlide key={idx}>
              <div
                className="relative bg-cover bg-center md:py-80 py-48 px-4 text-center"
                style={{
                  backgroundImage: `url('${img}')`,
                }}
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
        {filteredMeals.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">No meals found matching your search.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {filteredMeals.map((meal) => (
              <div
                key={meal.id}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition duration-300"
              >
                <img src={meal.image} alt={meal.title} className="w-full h-60 object-cover" />
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
