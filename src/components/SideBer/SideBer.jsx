import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  FiHome,
  FiUsers,
  FiPlus,
  FiChevronRight,
  FiFileText,
  FiCalendar,
  FiLogOut,
} from 'react-icons/fi';
import { MdManageAccounts, MdOutlinePayments, MdOutlinePreview } from 'react-icons/md';
import { CiSquareQuestion } from 'react-icons/ci';
import { CgProfile } from 'react-icons/cg';

import { AuthContext } from '../../provider/AuthProvider';

const Sidebar = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  // Logout function
  const handleLogout = async () => {
    try {
      await logout(); // logout process
      navigate('/join'); // navigate to the join page
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Admin nav items
  const adminNavItems = [
    { icon: <FiHome size={18} />, label: 'Dashboard', path: '/dashboard', end: true },
    { icon: <CgProfile size={18} />, label: 'My Profile', path: '/dashboard/myProfile', end: true },
    { icon: <CiSquareQuestion size={18} />, label: 'My Request Meals', path: '/dashboard/requestedMeals', end: true },
    { icon: <MdOutlinePreview size={18} />, label: 'My Reviews', path: '/dashboard/myReviews', end: true },
    { icon: <MdOutlinePayments size={18} />, label: 'Payment History', path: '/dashboard/paymentHistory', end: true },
    { icon: <FiUsers size={18} />, label: 'Manage Users', path: '/dashboard/users' },
    { icon: <FiPlus size={18} />, label: 'Add Meal', path: '/dashboard/addMeal' },
    { icon: <MdManageAccounts size={18} />, label: 'Manage Meals', path: '/dashboard/manageMeals' },
    { icon: <FiPlus size={18} />, label: 'Add Upcoming', path: '/dashboard/addUpcomming' },
    { icon: <MdManageAccounts size={18} />, label: 'Manage Upcoming', path: '/dashboard/manageUpcomming' },
    { icon: <MdOutlinePreview size={18} />, label: 'All Review', path: '/dashboard/allReview' },
  ];

  // Main nav items
  const mainNavItems = [
    { icon: <FiHome size={18} />, label: 'Home', path: '/' },
    { icon: <FiFileText size={18} />, label: 'Meals', path: '/meals' },
    { icon: <FiCalendar size={18} />, label: 'Upcoming', path: '/upcoming-meals' },
  ];

  return (
    <div className="h-screen flex flex-col px-4 py-6 bg-gradient-to-b from-orange-600 to-orange-700 shadow-xl overflow-y-auto">
      
      {/* Logo */}
      <div className="mb-8 px-2">
        <h1 className="text-2xl font-bold tracking-wide text-white">
          Meal<span className="text-yellow-300">Mate</span>
        </h1>
        <p className="text-xs text-orange-200 mt-1">Admin Panel</p>
      </div>

      {/* User Info */}
      <div className="flex items-center space-x-3 mb-8 p-2.5 rounded-lg bg-orange-500 bg-opacity-20 backdrop-blur-sm text-white hover:bg-opacity-30 transition">
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-orange-700 font-bold shadow-md text-sm">
            {user?.displayName?.slice(0, 2).toUpperCase() || 'NA'}
          </div>
          <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-400 border-2 border-orange-600"></div>
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-sm">{user?.displayName || 'Admin'}</h3>
          <p className="text-xs text-orange-100">Administrator</p>
        </div>
        <FiChevronRight className="text-orange-200 text-sm" />
      </div>

      {/* Admin Navigation */}
      <nav className="flex-1 space-y-1">
        {adminNavItems.map((item, index) => (
          <NavLink
            key={`admin-${index}`}
            to={item.path}
            end={item.end || false}
            className={({ isActive }) =>
              `group flex items-center justify-between space-x-2 p-2.5 rounded-lg text-sm transition-all duration-200 ${
                isActive
                  ? 'bg-white text-orange-600 font-semibold shadow'
                  : 'text-orange-100 hover:bg-orange-500 hover:bg-opacity-30 hover:text-white'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className="flex items-center space-x-2 overflow-hidden">
                  <span>{item.icon}</span>
                  <span className="truncate max-w-[120px]">{item.label}</span>
                </div>
                {isActive && <FiChevronRight className="text-orange-400" />}
              </>
            )}
          </NavLink>
        ))}

        {/* Divider */}
        <div className="pt-5 pb-2">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-orange-400 border-opacity-30"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-2 text-xs text-orange-200 bg-orange-600">Main Website</span>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        {mainNavItems.map((item, index) => (
          <NavLink
            key={`main-${index}`}
            to={item.path}
            className={({ isActive }) =>
              `group flex items-center justify-between space-x-2 p-2.5 rounded-lg text-sm transition-all duration-200 ${
                isActive
                  ? 'bg-white text-orange-600 font-semibold shadow'
                  : 'text-orange-100 hover:bg-orange-500 hover:bg-opacity-30 hover:text-white'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className="flex items-center space-x-2 overflow-hidden">
                  <span>{item.icon}</span>
                  <span className="truncate max-w-[120px]">{item.label}</span>
                </div>
                {isActive && <FiChevronRight className="text-orange-400" />}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Logout Button */}
      <div
        onClick={handleLogout}
        className="p-2.5 mt-6 rounded-lg bg-orange-500 bg-opacity-20 text-orange-100 hover:bg-opacity-40 hover:text-white transition cursor-pointer group text-sm"
      >
        <div className="flex items-center space-x-2">
          <FiLogOut size={18} className="group-hover:animate-pulse" />
          <span className="font-medium">Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
