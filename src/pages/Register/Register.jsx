import React, { useContext, useState } from "react";
import { updateProfile } from "firebase/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import SocialLogin from "../../components/SocialLogin/SocialLogin";

const Register = () => {
  const { createUser, loginUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value || "https://i.ibb.co/YBQgd3J/default-avatar.png";
    const email = form.email.value;
    const password = form.password.value;

    // Password validation
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      setIsLoading(false);
      return;
    }

    try {
      // Create Firebase user
      const result = await createUser(email, password);
      const newUser = result.user;

      // Update Firebase user profile
      await updateProfile(newUser, {
        displayName: name,
        photoURL: photo,
      });

      // Prepare user data to send to the backend
      const saveUser = {
        name: name,
        email: email,
        photo: photo,
        role: "student",        // Default role
        badge: "Bronze",        // Default badge
        createdAt: new Date()   // Registration time
      };

      console.log("Sending user data to backend:", saveUser); // Debug log

      // Send user data to the backend
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(saveUser),
      });

      // Check if the user data was successfully saved
      if (response.ok) {
        setSuccess("Registration successful!");
      } else {
        throw new Error("Failed to save user data");
      }

      // Log the user in after registration
      const loginResult = await loginUser(email, password);

      if (loginResult.user) {
        navigate(from, { replace: true });
      } else {
        setError("Login failed after registration.");
      }
    } catch (err) {
      console.error("Error during registration:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
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
            disabled={isLoading}
            className={`w-full ${
              isLoading ? "bg-orange-400 cursor-not-allowed" : "bg-orange-600 hover:bg-orange-700"
            } text-white py-2 rounded-md transition`}
          >
            {isLoading ? "Registering..." : "Register"}
          </button>

          {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
          {success && <p className="text-green-500 mt-2 text-sm">{success}</p>}
        </form>

        {/* Social login buttons */}
        <SocialLogin isLoading={isLoading} setError={setError} />

        <p className="text-center text-gray-600 text-sm mt-4">
          Already have an account?{" "}
          <Link to="/join" className="text-orange-600 hover:underline">
            Join here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
