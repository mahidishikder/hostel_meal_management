import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FiHome,
  FiPieChart,
  FiUsers,
  FiSettings,
  FiFileText,
  FiCalendar,
  FiMail,
  FiLogOut,
  FiChevronRight,
  FiPlus,
} from 'react-icons/fi';
import { MdManageAccounts } from "react-icons/md";


const Sidebar = () => {
  const adminNavItems = [
    { icon: <FiHome size={20} />, label: 'Dashboard', path: '/dashboard/chart' },
    { icon: <FiUsers size={20} />, label: 'Manage Users', path: '/dashboard/users' },
    { icon: <FiPlus size={20} />, label: 'Add Meal', path: '/dashboard/addMeal' },
    { icon: <MdManageAccounts size={20} />, label: 'Manage Meals', path: '/dashboard/manageMeals' },
    { icon: <FiPlus size={20} />, label: 'Add Upcoming', path: '/dashboard/addUpcomming' },
  ];
  MdManageAccounts



  const mainNavItems = [
    { icon: <FiHome size={20} />, label: 'Home', path: '/' },
    { icon: <FiFileText size={20} />, label: 'Meals', path: '/meals' },
    { icon: <FiCalendar size={20} />, label: 'Upcoming', path: '/upcoming-meals' },
  ];

  return (
    <div className="h-full flex flex-col px-5 py-8 bg-gradient-to-b from-orange-600 to-orange-700 shadow-xl">
      {/* Logo */}
      <div className="mb-12 px-3">
        <h1 className="text-3xl font-bold tracking-wide text-white">
          Meal<span className="text-yellow-300">Mate</span>
        </h1>
        <p className="text-xs text-orange-200 mt-1">Admin Panel</p>
      </div>

      {/* User Profile */}
      <div className="flex items-center space-x-4 mb-10 p-3 rounded-xl bg-orange-500 bg-opacity-20 backdrop-blur-sm text-white hover:bg-opacity-30 transition-all duration-300 cursor-pointer">
        <div className="relative">
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-orange-700 font-bold shadow-md">
            JD
          </div>
          <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-green-400 border-2 border-orange-600"></div>
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg">John Doe</h3>
          <p className="text-xs text-orange-100">Administrator</p>
        </div>
        <FiChevronRight className="text-orange-200" />
      </div>

      {/* Admin Navigation */}
      <nav className="flex-1 space-y-1.5">
        {adminNavItems.map((item, index) => (
          <NavLink
            key={`admin-${index}`}
            to={item.path}
            className={({ isActive }) =>
              `group flex items-center justify-between space-x-3 p-3.5 rounded-xl transition-all duration-300 ${
                isActive
                  ? 'bg-white text-orange-600 font-semibold shadow-md'
                  : 'text-orange-100 hover:bg-orange-500 hover:bg-opacity-30 hover:text-white'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className="flex items-center space-x-3">
                  <span className={`${item.badge ? 'relative' : ''}`}>
                    {item.icon}
                    {item.badge && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </span>
                  <span>{item.label}</span>
                </div>
                {isActive && <FiChevronRight className="text-orange-400" />}
              </>
            )}
          </NavLink>
        ))}

        {/* Divider and Main Website Links */}
        <div className="pt-6 pb-2">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-orange-400 border-opacity-30"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-2 text-xs text-orange-200 bg-orange-600">Main Website</span>
            </div>
          </div>
        </div>

        {mainNavItems.map((item, index) => (
          <NavLink
            key={`main-${index}`}
            to={item.path}
            className={({ isActive }) =>
              `group flex items-center justify-between space-x-3 p-3.5 rounded-xl transition-all duration-300 ${
                isActive
                  ? 'bg-white text-orange-600 font-semibold shadow-md'
                  : 'text-orange-100 hover:bg-orange-500 hover:bg-opacity-30 hover:text-white'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className="flex items-center space-x-3">
                  <span className={`${item.badge ? 'relative' : ''}`}>
                    {item.icon}
                    {item.badge && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </span>
                  <span>{item.label}</span>
                </div>
                {isActive && <FiChevronRight className="text-orange-400" />}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-3.5 mt-6 rounded-xl bg-orange-500 bg-opacity-20 text-orange-100 hover:bg-opacity-40 hover:text-white transition-all duration-300 cursor-pointer group">
        <div className="flex items-center space-x-3">
          <FiLogOut size={20} className="group-hover:animate-pulse" />
          <span className="font-medium">Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;