import { FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import logo from "../../assets/logo/logo.jpg";
import { NavLink } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const links = (
    <>
      <div className="lg:flex space-x-5 list-none">
        <li className="text-lg font-semibold">
          <NavLink to="/">Home</NavLink>
        </li>
        <li className="text-lg font-semibold">
          <NavLink>Live Updates</NavLink>
        </li>
        <li className="text-lg font-semibold relative">
  <div
    tabIndex={0}
    className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 rounded-md"
    onClick={() => setIsOpen(!isOpen)}
  >
    Alert Panel
    <FaChevronDown
      className={`transform transition-transform duration-200 ${
        isOpen ? "rotate-180" : "rotate-0"
      }`}
    />
  </div>

  {isOpen && (
  <>
    {/* Overlay */}
    <div
      className="fixed inset-0 bg-black/30 z-40"
      onClick={() => setIsOpen(false)}
    ></div>

    {/* Dropdown positioned near top-center */}
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50">
      <ul
        className="bg-base-100 rounded-lg shadow-lg w-64 py-4 space-y-2"
        onClick={(e) => e.stopPropagation()} // prevent close on internal clicks
      >
        <li>
          <NavLink
            to="/addAlertPanels"
            className="hover:bg-gray-100 px-4 py-2 rounded-md block hover:underline "
            onClick={() => setIsOpen(false)}
          >
            Include Alert Panels
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/allAlertPanel"
            className="hover:bg-gray-100 px-4 py-2 hover:underline rounded-md block "
            onClick={() => setIsOpen(false)}
          >
            All Alert Panels
          </NavLink>
        </li>
      </ul>
    </div>
  </>
)}

</li>

  

        <li className="text-lg font-semibold">
          <NavLink>Request Help</NavLink>
        </li>
        <li className="text-lg font-semibold">
          <NavLink>Emergency Contacts</NavLink>
        </li>
        <li className="text-lg font-semibold">
          <NavLink>Login</NavLink>
        </li>
        <li className="text-lg font-semibold">
          <NavLink>Register</NavLink>
        </li>

      </div>
    </>
  );

  return (
    <div className="w-full relative z-50">
      {/* Navbar always visible */}
      <div className="navbar justify-between lg:w-full w-[350px] px-10">
        <div className="flex items-center">
          <img className="w-[40px]" src={logo} alt="Logo" />
          <p className="text-xl ml-2 font-bold">ResQLink</p>
        </div>

        {/* Links for large screens */}
        <div className="hidden lg:flex items-center space-x-8">
          {links}
        </div>

        {/* Hamburger icon for smaller devices */}
        <div className="lg:hidden flex items-center">
          <button onClick={() => setIsMenuOpen(true)}>
            <FaBars size={30} />
          </button>
        </div>
      </div>

      {/* Slide-in Menu Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-96 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={() => setIsMenuOpen(false)}>
            <IoClose size={30} />
          </button>
        </div>
        <ul className="menu p-4">{links}</ul>
      </div>

      {/* Overlay when menu is open */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Navbar;
