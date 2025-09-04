import { FaBars, FaChevronDown, FaMoon, FaSun } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useContext, useEffect, useState } from "react";
import logo from "../../assets/logo/logo.jpg";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

const UnderlineNavLink = ({ to, children, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      `relative font-semibold text-lg group ${
        isActive ? "text-[#799EFF]" : ""
      }`
    }
  >
    {children}
    <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-blue-300 transition-all duration-300 group-hover:w-full"></span>
  </NavLink>
);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const location = useLocation();
  const isHome = location.pathname === "/";

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
      <li><UnderlineNavLink to="/">Home</UnderlineNavLink></li>

      {/* Dropdown */}
      <li className="relative">
        <button
          className="flex items-center gap-2 font-semibold text-lg transition relative group"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          Alert Panel
          <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-blue-300 transition-all duration-300 group-hover:w-full"></span>
          <FaChevronDown
            className={`transition-transform duration-300 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>

        {isOpen && (
          <ul className="absolute py-10 px-6 z-40 bg-white dark:bg-gray-800 mt-2 shadow-lg rounded-md overflow-hidden w-80">
            <li className="p-3">
              <UnderlineNavLink
                to="/addAlertPanels"
                onClick={() => setIsOpen(false)}
              >
                Include Alert Panels
              </UnderlineNavLink>
            </li>
            <li className="p-3">
              <UnderlineNavLink
                to="/allAlertPanel"
                onClick={() => setIsOpen(false)}
              >
                All Alert Panels
              </UnderlineNavLink>
            </li>
          </ul>
        )}
      </li>

      <li><UnderlineNavLink to="/request-help">Request Help</UnderlineNavLink></li>
      <li><UnderlineNavLink to="/donateUs">Donate</UnderlineNavLink></li>
      <li><UnderlineNavLink to="/dashboard">Dashboard</UnderlineNavLink></li>

      {!user ? (
        <>
          <li><UnderlineNavLink to="/login">Login</UnderlineNavLink></li>
          <li><UnderlineNavLink to="/register">Register</UnderlineNavLink></li>
        </>
      ) : (
        <>
          <li>
            <button
              onClick={handleLogout}
              className="relative font-semibold text-lg group text-red-500 hover:underline"
            >
              Logout
            </button>
          </li>
          <li>
            <img
              src={user?.photoURL}
              alt="Profile"
              title={user?.displayName}
              className="w-10 h-10 rounded-full ring-2 ring-blue-500 shadow-md object-cover"
            />
          </li>
        </>
      )}

      <li>
        <NavLink
          to="/liveAlerts"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-600 text-red-600 bg-white hover:bg-red-600 hover:text-white transition shadow-md"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
            <span className="relative rounded-full h-3 w-3 bg-red-600"></span>
          </span>
          Live Alerts
        </NavLink>
      </li>

      <li>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-black dark:text-white shadow"
          title="Toggle Theme"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </li>
    </ul>
  );

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 
        ${scrolled 
          ? "bg-white/30 dark:bg-gray-900/50 backdrop-blur-md shadow-md text-black dark:text-white" 
          : isHome 
            ? "bg-transparent text-white" 
            : "bg-transparent text-black dark:text-white"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src={logo}
            alt="Logo"
            className="w-10 h-10 rounded-full shadow-md"
          />
          <span className="text-2xl italic font-extrabold tracking-wide">
            ResQLink
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:block">
          <Links />
        </nav>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center gap-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-black dark:text-white shadow"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
          <button onClick={() => setIsMenuOpen(true)}>
            <FaBars size={26} className="text-gray-900 dark:text-white" />
          </button>
        </div>
      </div>

      {/* Mobile Slide Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white dark:bg-gray-900 text-black dark:text-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={() => setIsMenuOpen(false)}>
            <IoClose size={28} />
          </button>
        </div>
        <div className="px-6 pb-10">
          <Links isMobile />
        </div>
      </div>

      {/* Background overlay */}
      {(isMenuOpen || isOpen) && (
        <div
          className="fixed inset-0 bg-black/50 z-30"
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
