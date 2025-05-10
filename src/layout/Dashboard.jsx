import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SideBer from '../components/SideBer/SideBer';
import { FiBell, FiSearch, FiUser, FiMenu, FiX } from 'react-icons/fi';

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden font-sans">
      {/* Sidebar */}
      <div
        className={`
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
          transition-transform duration-300 ease-in-out
          fixed inset-y-0 left-0 z-40 w-64 
          shadow-xl 
          md:relative md:w-64 md:block 
          bg-white
        `}
      >
        <SideBer />
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black opacity-50 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Topbar */}
        <header className="bg-gray-100 shadow-lg shadow-gray-200 z-10">
          <div className="flex items-center justify-between px-4 py-4 sm:px-6 md:px-8">
            <button
              className="md:hidden p-2 text-gray-500 hover:text-gray-700"
              onClick={toggleSidebar}
              aria-label="Toggle sidebar"
            >
              {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>

            <div className="flex items-center space-x-6 flex-grow">
              <div className="relative w-full max-w-md">
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

            <div className="flex items-center space-x-6 ml-auto">
              <button className="relative p-1 text-gray-500 hover:text-gray-700" aria-label="Notifications">
                <FiBell size={20} />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
              </button>
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                  <FiUser size={16} />
                </div>
                <span className="text-sm font-medium text-gray-700 hidden sm:block">Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-orange-50">
          <div className="p-4 sm:p-6 md:p-8 max-w-11/12 mx-auto h-full">
            <div className="bg-gray-50 rounded-xl shadow-sm p-6 h-full">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
