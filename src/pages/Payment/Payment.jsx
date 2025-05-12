import React from 'react';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from 'react-router-dom';
import CheckOut from './CheckOut';

const stripePromise = loadStripe('pk_test_51QfZqyRpZKbHxwE70Mc3wzn8zlMv9cywatS9Tb2AZ5QzYST6b0nHNXslWQydJ1Oq58GMD8oaU5O4KeDmYA695aEm00bWTXDE57');

function Payment() {
  const location = useLocation();
  const pkg = location.state; // Retrieve the package data from the location state

  if (!pkg) {
    return (
      <div className="flex justify-center items-center  bg-gray-100 ">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center text-red-600">No package data found!</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
        <h2 className="text-3xl font-semibold text-center text-orange-600 mb-4">Payment Page</h2>
        <div className="text-center mb-6">
          <h3 className="text-2xl font-semibold text-gray-800">{pkg.name}</h3>
          <p className="text-lg text-gray-600 mt-2">Price: <span className="font-bold text-orange-500">${pkg.price}</span></p>
        </div>

        <div>
          <Elements stripe={stripePromise}>
            <CheckOut pkg={pkg} />
          </Elements>
        </div>
        
      </div>
    </div>
  );
}

export default Payment;
