import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SlLike } from "react-icons/sl";


const MealsDetails = () => {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [likeCount, setLikeCount] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [user] = useState({ email: "user@example.com" }); // mock user

  useEffect(() => {
    fetch('http://localhost:3000/meals')
      .then(res => res.json())
      .then(data => {
        const foundMeal = data.find(item => item._id === id);
        setMeal(foundMeal);
        setLikeCount(foundMeal?.likes || 0);
      });
  }, [id]);

  const handleLike = () => {
    if (!user) return alert("Please login first!");
    const newLikes = likeCount + 1;
    setLikeCount(newLikes);

    fetch(`http://localhost:3000/meals/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ likes: newLikes }),
    });
  };

  const handleRequest = () => {
    if (!user) return alert("Please login to request this meal.");

    const requestData = {
      userEmail: user.email,
      mealId: id,
      status: "pending",
    };

    fetch('http://localhost:3000/mealRequests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestData),
    }).then(() => alert("Meal request sent!"));
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!user) return alert("Please login to review.");

    const newReview = {
      user: user.email,
      review: reviewText,
      time: new Date().toISOString(),
    };

    fetch(`http://localhost:3000/meals/${id}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newReview),
    }).then(() => {
      alert("Review posted!");
      setMeal(prev => ({
        ...prev,
        reviews: [...(prev.reviews || []), newReview]
      }));
      setReviewText('');
    });
  };

  if (!meal) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-lg text-gray-600 animate-pulse">Loading Meal...</p>
      </div>
    );
  }

  return (
    <div className=" bg-orange-100 py-16 md:py-28 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-3xl overflow-hidden grid md:grid-cols-2">
        
        {/* Image */}
        <img src={meal.image} alt={meal.title} className="w-full h-full object-cover" />

        {/* Content */}
        <div className="p-8 space-y-6 flex flex-col bg-gray-100 justify-between">
          <div>
            <h2 className="text-4xl font-bold text-orange-600 mb-2">{meal.title}</h2>
            <p className="text-gray-700">{meal.description}</p>

            <div className="mt-4 flex flex-wrap gap-2 text-sm">
              <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full">Category: {meal.category}</span>
              <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">⭐ {meal.rating}</span>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">৳ {meal.price}</span>
              <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">Calories: {meal.calories}</span>
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">Distributor: {meal.distributorName}</span>
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Posted: {new Date(meal.postTime).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="flex gap-4">
            <button onClick={handleLike} className=" bg-blue-500 ring-1 flex justify-center items-center gap-2 hover:bg-blue-600 text-white px-6 py-2 rounded-full transition-all duration-200">
            <SlLike className='text-white ' />
            ({likeCount})
            </button>
            <button onClick={handleRequest} className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full transition-all duration-200">
              🍽️ Request Meal
            </button>
          </div>
        </div>
      </div>

      {/* Ingredients + Reviews */}
      <div className="mt-12 grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        
        {/* Ingredients */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h3 className="text-2xl font-semibold text-orange-600 mb-4">🍋 Ingredients</h3>
          <ul className="list-disc list-inside text-gray-700">
            {meal.ingredients.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Reviews */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h3 className="text-2xl font-semibold text-orange-600 mb-4">🗣️ Reviews ({meal.reviews?.length || 0})</h3>

          <form onSubmit={handleReviewSubmit} className="mb-4">
            <textarea
              className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-orange-300"
              placeholder="Write your review..."
              value={reviewText}
              onChange={e => setReviewText(e.target.value)}
              required
            />
            <button type="submit" className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition">
              Post Review
            </button>
          </form>

          <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
            {meal.reviews?.map((rev, idx) => (
              <div key={idx} className="bg-gray-50 p-3 rounded shadow-sm">
                <p className="text-sm text-gray-800 font-semibold">{rev.user} <span className="text-xs text-gray-500">({new Date(rev.time).toLocaleString()})</span></p>
                <p className="text-gray-700">{rev.review}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealsDetails;
