import { FaBars, FaChevronDown, FaMoon, FaSun } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useContext, useEffect, useState } from "react";
import logo from "../../assets/logo/logo.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  // Dark mode toggle state
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        localStorage.theme === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      );
    }
    return false;
  });

  // Apply dark/light mode on mount and when toggled
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleLogout = () => {
    logOut()
      .then(() => {
        navigate("/login");
      })
      .catch((error) => console.error("Logout error:", error));
  };

  const Links = ({ isMobile = false }) => (
    <ul
      className={`list-none ${
        isMobile ? "space-y-4" : "lg:flex space-x-5 items-center"
      }`}
    >
      <li className="text-lg font-semibold">
        <NavLink to="/">Home</NavLink>
      </li>

      <li className="text-lg font-semibold relative">
        <div
          tabIndex={0}
          className="flex items-center gap-2 dark:hover:bg-gray-800 cursor-pointer hover:bg-gray-100 rounded-md"
          onClick={() => setIsOpen(!isOpen)}
        >
          Alert Panel
          <FaChevronDown
            className={`transform transition-transform duration-200 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>

        {isOpen && !isMobile && (
          <div className="absolute top-full left-0 mt-2 dark:bg-black bg-white shadow-md rounded-md w-56 z-50">
            <ul onClick={(e) => e.stopPropagation()} className="p-2 space-y-2">
              <li>
                <NavLink
                  to="/addAlertPanels"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2 dark:hover:bg-gray-800 hover:bg-gray-100"
                >
                  Include Alert Panels
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/allAlertPanel"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2 dark:hover:bg-gray-800 hover:bg-gray-100"
                >
                  All Alert Panels
                </NavLink>
              </li>
            </ul>
          </div>
        )}
      </li>

      <li className="text-lg font-semibold">
        <NavLink to="/request-help">Request Help</NavLink>
      </li>

      <li className="text-lg font-semibold">
        <NavLink to="/dashboard">Dashboard</NavLink>
      </li>

      {!user && (
        <>
          <li className="text-lg font-semibold">
            <NavLink to="/login">Login</NavLink>
          </li>
          <li className="text-lg font-semibold">
            <NavLink to="/register">Register</NavLink>
          </li>
        </>
      )}

      {user && (
        <>
          <li className="text-lg font-semibold">
            <button
              onClick={handleLogout}
              className="hover:text-blue-500 hover:underline"
            >
              Logout
            </button>
          </li>
          <li className="ml-4">
            <div className="relative group w-10 h-10">
              <img
                src={user?.photoURL}
                alt="Profile"
                className="w-10 h-10 rounded-full border border-gray-300 object-cover"
                title={user?.displayName}
              />
            </div>
          </li>
        </>
      )}

      <li>
        <NavLink to="/liveAlerts">
          <button className="relative bg-white text-red-600 border border-red-600 px-4 py-2 rounded-full shadow-lg flex items-center gap-2 hover:bg-red-600 hover:text-white transition">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
            </span>
            <span className="ml-1">Live Alerts</span>
          </button>
        </NavLink>
      </li>

      {/* 🌙 Theme Toggle (Both Desktop & Mobile) */}
      <li>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-black dark:text-white transition"
          title="Toggle Theme"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </li>
    </ul>
  );

  return (
    <div className="w-full relative z-50">
      {/* Main Navbar */}
      <div className="navbar justify-between items-center px-6 lg:px-10">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="w-[40px]" />
          <p className="text-xl ml-2 font-bold">ResQLink</p>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center">
          <Links />
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center gap-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-black dark:text-white transition"
            title="Toggle Theme"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>

          <button onClick={() => setIsMenuOpen(true)}>
            <FaBars size={28} />
          </button>
        </div>
      </div>

      {/* Mobile Slide Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white dark:bg-[#0f172a] text-black dark:text-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={() => setIsMenuOpen(false)}>
            <IoClose size={30} />
          </button>
        </div>
        <div className="px-6 pb-6">
          <Links isMobile />
        </div>
      </div>

      {/* Overlay */}
      {(isMenuOpen || isOpen) && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => {
            setIsMenuOpen(false);
            setIsOpen(false);
          }}
        ></div>
      )}
    </div>
  );
};

export default Navbar;
