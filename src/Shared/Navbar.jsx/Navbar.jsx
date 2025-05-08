import { FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import logo from "../../assets/logo/logo.jpg";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = (
    <>
      <div className="lg:flex space-x-5 list-none">
        <li className="text-lg font-semibold">
          <NavLink to="/">Home</NavLink>
        </li>
        <li className="text-lg font-semibold">
          <NavLink>Live Updates</NavLink>
        </li>
        <li className="text-lg font-semibold">
          <NavLink to="/addAlertPanels">Include Alert Panels</NavLink>
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
