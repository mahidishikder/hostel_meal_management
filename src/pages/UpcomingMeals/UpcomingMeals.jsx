import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../provider/AuthProvider";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaThumbsUp } from "react-icons/fa";

const API_URL = "http://localhost:3000/upcoming";

function UpcomingMeals() {
  const { user } = useContext(AuthContext);
  const [meals, setMeals] = useState([]);
  const [likedMeals, setLikedMeals] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await axios.get(API_URL);
        const currentDate = moment();
        const upcomingMeals = response.data.filter(meal =>
          moment(meal.publishDate).isAfter(currentDate)
        );
        setMeals(upcomingMeals);
      } catch (error) {
        console.error("Error fetching meals:", error);
        toast.error("Failed to load meals.");
      }
    };
    fetchMeals();
  }, []);

  const isPremium = (membership) =>
    ["Silver", "Gold", "Platinum"].includes(membership);

  const handleLike = (mealId) => {
    if (!user) {
      toast.warning("Please log in to like meals.");
      return;
    }

    if (!isPremium(user.membership)) {
      toast.warning("Only premium users can like meals.");
      return;
    }

    if (likedMeals.includes(mealId)) {
      toast.info("You already liked this meal.");
      return;
    }

    setLikedMeals((prev) => [...prev, mealId]);
    setMeals((prevMeals) =>
      prevMeals.map((meal) =>
        meal._id === mealId ? { ...meal, likes: meal.likes + 1 } : meal
      )
    );

    toast.success("You liked the meal!");
    // Optional: Send to server
    // axios.patch(`${API_URL}/like/${mealId}`);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-center">🍽️ Upcoming Meals</h2>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {meals.map((meal) => (
          <div
            key={meal._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 flex flex-col"
          >
            <img
              src={meal.image}
              alt={meal.name}
              className="w-full h-56 object-cover rounded-t-2xl"
            />

            <div className="p-5 flex flex-col justify-between flex-grow relative">
              <div>
                <h3 className="text-xl font-bold text-gray-800">{meal.name}</h3>
                <p className="text-gray-600 text-sm mt-2">{meal.description}</p>

                <div className="mt-3 text-sm text-gray-500 space-y-1">
                  <p><span className="font-medium text-gray-700">Meal ID:</span> {meal.id}</p>
                  <p className="text-xs text-gray-400">
                    Publishes On: {moment(meal.publishDate).format("MMM D, YYYY - h:mm A")}
                  </p>
                  <p><span className="font-medium text-gray-700">Likes:</span> {meal.likes}</p>
                  
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => handleLike(meal._id)}
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition duration-200 ${
                    likedMeals.includes(meal._id)
                      ? "bg-blue-500 text-white scale-105"
                      : "bg-gray-200 text-gray-600 hover:bg-blue-100 hover:text-blue-600"
                  }`}
                  title={likedMeals.includes(meal._id) ? "You liked this meal" : "Like"}
                >
                  <FaThumbsUp className="text-md" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ToastContainer />
    </div>
  );
}

export default UpcomingMeals;
