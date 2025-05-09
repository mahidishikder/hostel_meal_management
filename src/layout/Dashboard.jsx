import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SideBer from '../components/SideBer/SideBer'; // Assuming this exists
import { FiBell, FiSearch, FiUser, FiMenu, FiX } from 'react-icons/fi'; // Added FiMenu and FiX for toggle

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      {/* - Hidden on small screens by default (`hidden`).
        - Visible on medium screens and up (`md:block`).
        - When `isSidebarOpen` is true, it's fixed and takes full height/width on small screens (`fixed inset-y-0 left-0 z-40 w-64 md:static md:w-64`).
        - `transform` and `transition` for smooth slide-in/out animation.
      */}
      <div
        className={`
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
          transition-transform duration-300 ease-in-out
          fixed inset-y-0 left-0 z-40 w-64 
          bg-gradient-to-b from-orange-400 to-orange-500 shadow-xl 
          md:relative md:w-64 md:block 
        `}
      >
        <SideBer />
      </div>

      {/* Overlay for small screens when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black opacity-50 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between px-4 py-4 sm:px-6 md:px-8">
            {/* Hamburger Menu for Mobile */}
            <button
              className="md:hidden p-2 text-gray-500 hover:text-gray-700"
              onClick={toggleSidebar}
              aria-label="Toggle sidebar"
            >
              {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>

            {/* Search Bar */}
            <div className="flex items-center space-x-6 flex-grow"> {/* Changed w-full sm:w-auto to flex-grow */}
              <div className="relative w-full max-w-md"> {/* Added max-w-md for better control */}
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Search..."
                />
              </div>
            </div>
            
            {/* Right-aligned Icons and User Profile */}
            <div className="flex items-center space-x-6 ml-auto"> {/* Added ml-auto to push to right */}
              <button className="relative p-1 text-gray-500 hover:text-gray-700" aria-label="Notifications">
                <FiBell size={20} />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
              </button>
              
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                  <FiUser size={16} />
                </div>
                <span className="text-sm font-medium text-gray-700 hidden sm:block">Admin</span> {/* Hidden on very small screens */}
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            {/* The Outlet component renders the child routes' content.
              Ensure the components rendered by Outlet are themselves responsive.
            */}
            <div className="bg-white rounded-xl shadow-sm p-6 min-h-[calc(100vh-180px)] md:min-h-[calc(100vh-160px)]"> {/* Added min-h for visual consistency */}
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;