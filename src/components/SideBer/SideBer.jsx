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
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAdmin from '../../hooks/useAdmin';

const Sidebar = () => {
  const axiosPublic = useAxiosPublic()
  console.log(axiosPublic)
  const [isAdmin] = useAdmin()
  console.log(isAdmin)
  // const isAdmin = true;
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/join');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

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

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1">
        {/* Admin Navigation */}
        {
          isAdmin ? 
          
          <>

            
        <NavLink to="/dashboard" end className={({ isActive }) => isActiveStyle(isActive)}>
          {navLinkContent(<FiHome size={18} />, 'Dashboard')}
        </NavLink>
        <NavLink to="/dashboard/myProfile" end className={({ isActive }) => isActiveStyle(isActive)}>
          {navLinkContent(<CgProfile size={18} />, 'My Profile')}
        </NavLink>
        <NavLink to="/dashboard/requestedMeals" end className={({ isActive }) => isActiveStyle(isActive)}>
          {navLinkContent(<CiSquareQuestion size={18} />, 'My Request Meals')}
        </NavLink>
        <NavLink to="/dashboard/myReviews" end className={({ isActive }) => isActiveStyle(isActive)}>
          {navLinkContent(<MdOutlinePreview size={18} />, 'My Reviews')}
        </NavLink>
        <NavLink to="/dashboard/paymentHistory" end className={({ isActive }) => isActiveStyle(isActive)}>
          {navLinkContent(<MdOutlinePayments size={18} />, 'Payment History')}
        </NavLink>
        <NavLink to="/dashboard/users" className={({ isActive }) => isActiveStyle(isActive)}>
          {navLinkContent(<FiUsers size={18} />, 'Manage Users')}
        </NavLink>
        <NavLink to="/dashboard/addMeal" className={({ isActive }) => isActiveStyle(isActive)}>
          {navLinkContent(<FiPlus size={18} />, 'Add Meal')}
        </NavLink>
        <NavLink to="/dashboard/manageMeals" className={({ isActive }) => isActiveStyle(isActive)}>
          {navLinkContent(<MdManageAccounts size={18} />, 'Manage Meals')}
        </NavLink>
        <NavLink to="/dashboard/addUpcomming" className={({ isActive }) => isActiveStyle(isActive)}>
          {navLinkContent(<FiPlus size={18} />, 'Add Upcoming')}
        </NavLink>
        <NavLink to="/dashboard/manageUpcomming" className={({ isActive }) => isActiveStyle(isActive)}>
          {navLinkContent(<MdManageAccounts size={18} />, 'Manage Upcoming')}
        </NavLink>
        <NavLink to="/dashboard/allReview" className={({ isActive }) => isActiveStyle(isActive)}>
          {navLinkContent(<MdOutlinePreview size={18} />, 'All Review')}
        </NavLink>
          
          </> 
          :
           <>
            <NavLink to="/dashboard" end className={({ isActive }) => isActiveStyle(isActive)}>
          {navLinkContent(<FiHome size={18} />, 'Dashboard')}
        </NavLink>
        <NavLink to="/dashboard/myProfile" end className={({ isActive }) => isActiveStyle(isActive)}>
          {navLinkContent(<CgProfile size={18} />, 'My Profile')}
        </NavLink>
        <NavLink to="/dashboard/requestedMeals" end className={({ isActive }) => isActiveStyle(isActive)}>
          {navLinkContent(<CiSquareQuestion size={18} />, 'My Request Meals')}
        </NavLink>
        <NavLink to="/dashboard/myReviews" end className={({ isActive }) => isActiveStyle(isActive)}>
          {navLinkContent(<MdOutlinePreview size={18} />, 'My Reviews')}
        </NavLink>
        <NavLink to="/dashboard/paymentHistory" end className={({ isActive }) => isActiveStyle(isActive)}>
          {navLinkContent(<MdOutlinePayments size={18} />, 'Payment History')}
        </NavLink>
           </>
        }

      

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
        <NavLink to="/" className={({ isActive }) => isActiveStyle(isActive)}>
          {navLinkContent(<FiHome size={18} />, 'Home')}
        </NavLink>
        <NavLink to="/meals" className={({ isActive }) => isActiveStyle(isActive)}>
          {navLinkContent(<FiFileText size={18} />, 'Meals')}
        </NavLink>
        <NavLink to="/upcoming-meals" className={({ isActive }) => isActiveStyle(isActive)}>
          {navLinkContent(<FiCalendar size={18} />, 'Upcoming')}
        </NavLink>
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

// Reusable style function
const isActiveStyle = (isActive) =>
  `group flex items-center justify-between space-x-2 p-2.5 rounded-lg text-sm transition-all duration-200 ${
    isActive
      ? 'bg-white text-orange-600 font-semibold shadow'
      : 'text-orange-100 hover:bg-orange-500 hover:bg-opacity-30 hover:text-white'
  }`;

// Reusable content function
const navLinkContent = (icon, label) => (
  <>
    <div className="flex items-center space-x-2 overflow-hidden">
      <span>{icon}</span>
      <span className="truncate max-w-[120px]">{label}</span>
    </div>
    <FiChevronRight className="text-orange-400" />
  </>
);

export default Sidebar;
