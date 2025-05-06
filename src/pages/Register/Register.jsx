import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaGoogle, FaFacebook, FaTwitter } from "react-icons/fa";
import { AuthContext } from "../../provider/AuthProvider";
import { updateProfile } from "firebase/auth";

function Register() {
  const { createUser } = useContext(AuthContext);

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const image = form.image.value;

    createUser(email, password).then((userCredential) => {
      const user = userCredential.user;
      console.log("User registered:", user);

      updateProfile(user, {
        photoURL: image,
      }).then(() => {
        console.log("Profile photo updated");
        form.reset(); // ফর্ম ক্লিয়ার
      });
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-orange-600 mb-6">Register</h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-400 outline-none"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-400 outline-none"
              placeholder="Enter password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <input
              type="text"
              name="image"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-400 outline-none"
              placeholder="Profile picture link"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-md transition duration-300"
          >
            Register
          </button>
        </form>

        <div className="flex items-center gap-2 my-4">
          <div className="h-px bg-gray-300 flex-1" />
          <span className="text-sm text-gray-500">or</span>
          <div className="h-px bg-gray-300 flex-1" />
        </div>

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

        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/join" className="text-orange-500 hover:underline font-medium">
            Join
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
