import { Link, NavLink } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import { useContext, useState } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { SiFoodpanda } from "react-icons/si";
import { AuthContext } from "../provider/AuthProvider";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Meals", path: "/meals" },
    { name: "Upcoming Meals", path: "/upcoming-meals" },
  ];

  const handleMenuItemClick = () => {
    if (menuOpen) {
      setMenuOpen(false); // Close the menu when a menu item is clicked
    }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-bold text-orange-500 flex items-center gap-2"
        >
          <SiFoodpanda />
          <span>MealMate</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? "text-orange-500 font-medium"
                  : "text-gray-700 hover:text-orange-500 transition"
              }
            >
              {item.name}
            </NavLink>
          ))}

          <FaBell className="text-xl text-gray-600 hover:text-orange-500 cursor-pointer" />

          {/* Show user photo if logged in */}
          {user?.photoURL && (
            <img
              src={user.photoURL}
              alt="User"
              className="w-8 h-8 rounded-full object-cover border-2 border-orange-500"
            />
          )}

          <Link
            to="/join"
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded transition text-sm"
          >
            Join Us
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          {
            user && <><img className="w-8 h-8 rounded-full" src={user.photoURL} alt="" /></>
          }
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <HiX className="text-3xl text-orange-500" />
            ) : (
              <HiMenuAlt3 className="text-3xl text-orange-500" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3 bg-white shadow-sm">
          <div className="flex flex-col items-center justify-between">
            {/* Left side: Logo */}
            <Link
              to="/"
              className="text-xl font-bold text-orange-500 flex items-center gap-2"
            >
              <SiFoodpanda />
              <span>MealMate</span>
            </Link>

            {/* Right side: User Image */}
            {user?.photoURL && (
              <img
                src={user.photoURL}
                alt="User"
                className="w-10 h-10 mt-2 rounded-full object-cover border-2 border-orange-500"
              />
            )}

            {/* Menu Items Below User Image */}
            <div className="mt-4 space-y-3 text-center">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={handleMenuItemClick}
                  className="block text-gray-700 hover:text-orange-500"
                >
                  {item.name}
                </NavLink>
              ))}

              <Link
                to="/join"
                onClick={handleMenuItemClick}
                className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded text-sm"
              >
                Join Us
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
