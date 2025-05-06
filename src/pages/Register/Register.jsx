import React, { useContext, useState } from "react";
import { updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import { FaGoogle, FaFacebook, FaTwitter } from "react-icons/fa";

const Register = () => {
  const { createUser, loginUser, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    // Step 1: Create User
    createUser(email, password)
      .then((result) => {
        const newUser = result.user;

        // Step 2: Update Profile with Name and Photo
        updateProfile(newUser, {
          displayName: name,
          photoURL: photo || "https://i.ibb.co/YBQgd3J/default-avatar.png",
        })
          .then(() => {
            setSuccess("Registration successful!");

            // Step 3: Log the user in right after successful registration
            loginUser(email, password)
              .then(() => {
                navigate("/"); // Redirect to home or wherever you want
              })
              .catch((err) => {
                setError("Login failed after registration.");
                console.error(err);
              });
          })
          .catch((error) => {
            setError("Profile update failed: " + error.message);
          });
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin(); // Trigger Google login
      navigate("/"); // Redirect to home or dashboard after successful login
    } catch (err) {
      setError("Google login failed. Please try again.");
      console.error("Google login error:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-orange-600">Register to MealMate</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block mb-1 text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700">Photo URL</label>
            <input
              type="text"
              name="photo"
              placeholder="https://example.com/photo.jpg"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-md transition"
          >
            Register
          </button>

          {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
          {success && <p className="text-green-500 mt-2 text-sm">{success}</p>}
        </form>

        {/* Social Login Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={handleGoogleLogin}
            className="p-3 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition"
          >
            <FaGoogle size={24} />
          </button>
          <button
            className="p-3 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
          >
            <FaFacebook size={24} />
          </button>
          <button
            className="p-3 rounded-full bg-cyan-100 text-cyan-600 hover:bg-cyan-200 transition"
          >
            <FaTwitter size={24} />
          </button>
        </div>

        <p className="text-center text-gray-600 text-sm mt-4">
          Already have an account?{" "}
          <a href="/join" className="text-orange-600 hover:underline">
            Join here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
