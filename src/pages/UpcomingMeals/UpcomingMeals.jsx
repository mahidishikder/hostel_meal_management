import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../provider/AuthProvider";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaThumbsUp } from "react-icons/fa"; // Like icon

// Replace this with your actual API endpoint
const API_URL = "http://localhost:3000/upcoming";

function UpcomingMeals() {
  const { user } = useContext(AuthContext);
  const [meals, setMeals] = useState([]);

  // Fetch upcoming meals data from API
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await axios.get(API_URL);
        setMeals(response.data);
      } catch (error) {
        console.error("Error fetching meals:", error);
        toast.error("Failed to load meals.", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    };
    fetchMeals();
  }, []);

  // Handle Like button click
  const handleLike = (mealId) => {
    if (user && user.membership !== "premium") {
      // Show toast if user is not premium
      toast.warning("Premium membership is required to like this meal.", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      // Handle the like action for premium users (You can update the likes here)
      console.log("Meal liked:", mealId);
      toast.success("You liked this meal!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">Upcoming Meals</h2>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {meals.map((meal) => (
          <div
            key={meal._id}
            className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col lg:flex-row"
          >
            {/* Fixed Image Size */}
            <img
              src={meal.image}
              alt={meal.name}
              className="w-full lg:w-[300px] h-[200px] object-cover"
            />

            {/* Info */}
            <div className="p-6 flex flex-col justify-between w-full">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{meal.name}</h3>
                <p className="text-gray-600 mt-2">{meal.description}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Publish Date: {moment(meal.publishDate).format("MMMM Do YYYY, h:mm A")}
                </p>
                <p className="text-sm text-gray-600 mt-2">Likes: {meal.likes}</p>
              </div>

              {/* Like Button with Icon */}
              <button
                onClick={() => handleLike(meal._id)}
                className="mt-4 shadow-lg bg-gray-300 text-black py-2 px-4 justify-center rounded-full  transition flex items-center"
              >
                <FaThumbsUp className="mr-2 text-blue-600" />
                Like
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Toast Container for showing alerts */}
      <ToastContainer />
    </div>
  );
}

export default UpcomingMeals;
