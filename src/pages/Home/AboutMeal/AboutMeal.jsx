import React from 'react';
import mealImage from '../../../assets/wmremove-transformed.png'

function AboutMeal() {
  return (
    <div className="py-20 px-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left: Text content */}
        <div>
          <h2 className="text-4xl font-bold text-orange-600 mb-6">
            <span className='text-black'>About</span> Our Meals
          </h2>
          <p className="text-lg text-gray-700 mb-4 leading-relaxed">
            We offer nutritious and delicious meals specially designed for hostel residents. 
            Each meal is prepared under strict hygienic conditions with a focus on balanced diet and taste.
          </p>
          <p className="text-base text-gray-600 mb-4">
            Whether you're a student or working professional, our flexible packages allow you to 
            choose the meal plan that suits your schedule and preferences. You can rely on us for 
            fresh, tasty, and affordable food delivered right to your room.
          </p>
          <ul className="list-disc pl-5 text-gray-700">
            <li>Fresh ingredients used daily</li>
            <li>Customized meal plans available</li>
            <li>Timely and clean delivery</li>
            <li>Options for vegetarian/non-veg</li>
          </ul>
        </div>

        {/* Right: Image */}
        <div>
          <img
            src={mealImage}
            alt="Delicious Meal"
            className="w-full   hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    </div>
  );
}

export default AboutMeal;
