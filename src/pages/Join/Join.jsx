import React, { useContext, useState } from "react";
import { FaGoogle, FaFacebook, FaTwitter } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";

const Join = () => {
  const { loginUser, googleLogin } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);  // Reset error state on each login attempt

    try {
      // Using loginUser function from AuthContext to login
      await loginUser(email, password)
        .then((user) => {
          console.log("User logged in:", user);
          // Redirecting to another page after successful login (e.g., dashboard)
          navigate("/");
        })
        .catch((err) => {
          setError("Login failed. Please try again.");
          console.error(err);
        });
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error("Login error:", err);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();  // Call googleLogin from AuthContext
      navigate("/");  // Redirect to home or dashboard after successful login
    } catch (err) {
      setError("Google login failed. Please try again.");
      console.error("Google login error:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-orange-500">Join to MealMate</h2>

        {/* Login Form */}
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-gray-700 text-sm mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

        {/* Error Message */}
        {error && <p className="text-center text-red-500 text-sm">{error}</p>}

        {/* Divider */}
        <div className="flex items-center gap-2">
          <div className="h-px bg-gray-300 flex-1" />
          <span className="text-sm text-gray-500">or</span>
          <div className="h-px bg-gray-300 flex-1" />
        </div>

        {/* Social Login */}
        <div className="flex justify-center gap-4">
          <button
            onClick={handleGoogleLogin} // Trigger google login
            className="p-3 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition"
          >
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
