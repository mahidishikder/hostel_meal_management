// Join.jsx
import React from "react";
import { FaGoogle, FaFacebook, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Join = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-orange-500">Join to MealMate</h2>
       

        {/* Login Form */}
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md transition font-medium"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-2">
          <div className="h-px bg-gray-300 flex-1" />
          <span className="text-sm text-gray-500">or</span>
          <div className="h-px bg-gray-300 flex-1" />
        </div>

        {/* Social Login */}
        <div className="flex justify-center gap-4">
          <button className="p-3 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition">
            <FaGoogle />
          </button>
          <button className="p-3 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition">
            <FaFacebook />
          </button>
          <button className="p-3 rounded-full bg-cyan-100 text-cyan-600 hover:bg-cyan-200 transition">
            <FaTwitter />
          </button>
        </div>
        <p className="text-center text-gray-600 text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-orange-500 hover:underline font-medium">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Join;
