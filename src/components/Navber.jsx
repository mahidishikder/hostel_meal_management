import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import { useContext, useState } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { SiFoodpanda } from "react-icons/si";
import { AuthContext } from "../provider/AuthProvider";
import { RiNotificationSnoozeFill } from "react-icons/ri";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate(); // ✅ useNavigate added here

  const handleLogout = async () => {
    try {
      await logout();
      setShowModal(false);
      navigate("/join"); // ✅ navigate to /join after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Meals", path: "/meals" },
    { name: "Upcoming Meals", path: "/upcoming-meals" },
    { name: "Contact", path: "/contact" },
  ];

  const handleMenuItemClick = () => {
    setMenuOpen(false);
    setShowModal(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 lg:py-5 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl lg:text-3xl font-bold text-orange-500 flex items-center gap-2">
          <img className="w-10" src="https://i.ibb.co.com/HpGH7h4B/Green-Beige-Circle-Healthy-Food-Logo-modified.png" alt="" />
          <span className="text-black">MealMate</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? "text-orange-500 text-lg font-medium"
                  : "text-gray-700 text-lg hover:text-orange-500 transition"
              }
            >
              {item.name}
            </NavLink>
          ))}

          <RiNotificationSnoozeFill className="text-xl text-gray-600 hover:text-orange-500 cursor-pointer" />

          {user?.photoURL ? (
            <div className="relative">
              <img
                src={user.photoURL}
                alt="User"
                className="lg:w-10 lg:h-10 w-9 h-9 ring-1 bg-gray-200 shadow shadow-black ring-gray-100 p-1 rounded-full object-cover border-2 border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => setShowModal(!showModal)}
              />
              {showModal && (
                <div className="absolute right-0 top-10 bg-white shadow-md border rounded w-48 z-50">
                  <ul className="py-2 text-sm text-gray-700">
                    <li>
                      <Link to="/profile" className="block px-4 py-2 hover:bg-orange-100" onClick={handleMenuItemClick}>
                        My Profile
                      </Link>
                    </li>
                    <li>
                      <Link to="/dashboard" className="block px-4 py-2 hover:bg-orange-100" onClick={handleMenuItemClick}>
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 hover:bg-orange-100 text-red-500"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <Link to="/join" className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded transition text-sm">
              Join Us
            </Link>
          )}
        </div>

        <div className="md:hidden flex items-center gap-2 relative">
          {user?.photoURL ? (
            <>
              <img
                className="w-8 h-8 rounded-full border-2 border-orange-500 cursor-pointer"
                src={user.photoURL}
                alt="User"
                onClick={() => setShowModal(!showModal)}
              />
              {showModal && (
                <div className="absolute right-12 top-10 bg-white shadow-md border rounded w-48 z-50">
                  <ul className="py-2 text-sm text-gray-700">
                    <li>
                      <Link to="/profile" className="block px-4 py-2 hover:bg-orange-100" onClick={handleMenuItemClick}>
                        My Profile
                      </Link>
                    </li>
                    <li>
                      <Link to="/dashboard" className="block px-4 py-2 hover:bg-orange-100" onClick={handleMenuItemClick}>
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          logout();
                          setShowModal(false);
                          navigate("/join"); // ✅ same fix added here too
                        }}
                        className="block w-full text-left px-4 py-2 hover:bg-orange-100 text-red-500"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </>
          ) : (
            <Link to="/join" className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded text-sm">
              Join Us
            </Link>
          )}

          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <HiX className="text-3xl text-orange-500" />
            ) : (
              <HiMenuAlt3 className="text-3xl text-orange-500" />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3 bg-white shadow-sm">
          <div className="flex flex-col items-center justify-between">
            <Link to="/" className="text-xl font-bold text-orange-500 flex items-center gap-2">
              <SiFoodpanda />
              <span>MealMate</span>
            </Link>

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
              {!user && (
                <Link
                  to="/join"
                  onClick={handleMenuItemClick}
                  className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-4 lg:py-3 py-2 rounded text-sm"
                >
                  Join Us
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
