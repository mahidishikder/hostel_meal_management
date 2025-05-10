import React, { useContext, useState } from 'react';
import { FaGoogle, FaFacebook, FaTwitter } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../provider/AuthProvider';

function SocialLogin() {
  const { googleLogin } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const result = await googleLogin();
      const user = result.user;

      // ✅ Prepare user data with default role and badge
      const saveUser = {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        role: "student",     // Default role
        badge: "Bronze"      // Default badge
      };

      console.log("Sending user to backend:", saveUser); // Debug log

      // ✅ Save user to backend
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(saveUser)
      });

      const data = await response.json();
      console.log("Server response:", data);

      // ✅ Redirect
      navigate(from, { replace: true });

    } catch (err) {
      setError(err.message || "Google login failed. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <>
      {error && (
        <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm text-center mb-2">
          {error}
        </div>
      )}

      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="px-2 bg-white text-sm text-gray-500">or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <button
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="p-3 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition flex items-center justify-center"
          aria-label="Login with Google"
        >
          <FaGoogle className="text-red-500 text-xl" />
        </button>
        <button
          disabled={isLoading}
          className="p-3 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition flex items-center justify-center"
          aria-label="Login with Facebook"
        >
          <FaFacebook className="text-blue-600 text-xl" />
        </button>
        <button
          disabled={isLoading}
          className="p-3 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition flex items-center justify-center"
          aria-label="Login with Twitter"
        >
          <FaTwitter className="text-cyan-500 text-xl" />
        </button>
      </div>
    </>
  );
}

export default SocialLogin;
