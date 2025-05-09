import React, { useState, useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";

function UserProfile() {
  const { user } = useContext(AuthContext);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    // Logic for logout (adjust as needed)
    console.log("Logging out...");
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-md mx-auto p-6">
      {/* Profile Info Section */}
      <div className="text-center">
        <img
          src={user?.photoURL || "https://via.placeholder.com/150"}
          alt="Profile"
          className="w-32 h-32 rounded-full mx-auto mb-4 shadow-lg"
        />
        <h2 className="text-xl font-semibold text-gray-800">{user?.displayName || "User Name"}</h2>
        <p className="text-gray-600 mb-4">{user?.email || "email@example.com"}</p>

        {/* Buttons */}
        <div className="space-x-4">
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 focus:outline-none"
          >
            Logout
          </button>
          <button
            onClick={openModal}
            className="px-4 py-2 bg-orange-500 text-white rounded-md shadow-md hover:bg-orange-600 focus:outline-none"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* Update Profile Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center transition-opacity duration-300 ease-in-out">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96 max-w-full">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Edit Profile</h2>
            <div className="space-y-4">
              {/* Name Input */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full p-3 mt-1 border border-gray-300 rounded-md"
                  placeholder="Enter your name"
                  defaultValue={user?.displayName || ""}
                />
              </div>

              {/* Photo URL Input */}
              <div>
                <label htmlFor="photoURL" className="block text-sm font-medium text-gray-700">
                  Profile Image URL
                </label>
                <input
                  type="text"
                  id="photoURL"
                  className="w-full p-3 mt-1 border border-gray-300 rounded-md"
                  placeholder="Enter your photo URL"
                  defaultValue={user?.photoURL || ""}
                />
              </div>
            </div>

            {/* Save and Cancel Buttons */}
            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-orange-500 text-white rounded-md"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
