import { FaBars, FaChevronDown, FaMoon, FaSun } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useContext, useEffect, useState } from "react";
import logo from "../../assets/logo/logo.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

// ...imports remain unchanged
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  

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
      .then(() => navigate("/login"))
      .catch((error) => console.error("Logout error:", error));
  };

  const Links = ({ isMobile = false }) => (
    <ul
      className={`${
        isMobile
          ? "flex flex-col space-y-4"
          : "hidden lg:flex space-x-6 items-center"
      }`}
    >
      <li><NavLink to="/" className="font-semibold text-lg">Home</NavLink></li>

      <li className="relative">
      <button
        className="flex items-center gap-2 dark:text-white font-semibold text-lg text-gray-900 hover:text-blue-600"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        Alert Panel
        <FaChevronDown
          className={`transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <ul className="absolute z-40 bg-white dark:bg-gray-800 mt-2 shadow-lg rounded-md overflow-hidden w-48">
          <li>
            <NavLink
              to="/addAlertPanels"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setIsOpen(false)} // close on link click
            >
              Include Alert Panels
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/allAlertPanel"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setIsOpen(false)} // close on link click
            >
              All Alert Panels
            </NavLink>
          </li>
        </ul>
      )}
    </li>

      <li><NavLink to="/request-help" className="font-semibold text-lg">Request Help</NavLink></li>
      <li><NavLink to="/dashboard" className="font-semibold text-lg">Dashboard</NavLink></li>

      {!user ? (
        <>
          <li><NavLink to="/login" className="font-semibold text-lg">Login</NavLink></li>
          <li><NavLink to="/register" className="font-semibold text-lg">Register</NavLink></li>
        </>
      ) : (
        <>
          <li>
            <button
              onClick={handleLogout}
              className="font-semibold text-lg hover:underline hover:text-red-500"
            >
              Logout
            </button>
          </li>
          <li>
            <img
              src={user?.photoURL}
              alt="Profile"
              title={user?.displayName}
              className="w-10 h-10 rounded-full border object-cover"
            />
          </li>
        </>
      )}

      <li>
        <NavLink
  to="/liveAlerts"
  className="inline-flex items-center bg-white text-red-600 border border-red-600 px-3 py-2 rounded-full shadow hover:bg-red-600 hover:text-white transition"
>
  <span className="relative flex h-3 w-5 ">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 hover:bg-white opacity-75"></span>
    <span className="relative flex rounded-full h-3 w-3 bg-red-600"></span>
  </span>
  Live Alerts
</NavLink>

      </li>

      <li>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
          title="Toggle Theme"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </li>
    </ul>
  );

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm w-full fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="w-10 h-10 rounded-full" />
          <span className="ml-2 text-xl font-bold">ResQLink</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:block">
          <Links />
        </nav>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center gap-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
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
        className={`fixed top-0 right-0 h-full w-80 bg-white dark:bg-gray-900 text-black dark:text-white shadow-lg z-40 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={() => setIsMenuOpen(false)}>
            <IoClose size={30} />
          </button>
        </div>
        <div className="px-6 pb-10">
          <Links isMobile />
        </div>
      </div>

      {/* Background overlay */}
      {(isMenuOpen || isOpen) && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => {
            setIsMenuOpen(false);
            setIsOpen(false);
          }}
        ></div>
      )}
    </header>
  );
};

export default Navbar;

