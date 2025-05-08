import { FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import logo from "../../assets/logo/logo.jpg"
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = (
    <>
      <li><a>Home</a></li>
      <li><a>Live Updates</a></li>
      <li><a>Request Help</a></li>
      <li><a>Emergency Contacts</a></li>
      <li><a>Safety Tips</a></li>
    </>
  );

  return (
    <div className="w-full relative z-50">
      {/* Navbar always visible */}
      <div className="navbar justify-between  lg:w-full w-[350px] px-10">
        <div className="flex items-center">
          <img className="w-[40px]" src={logo} alt="" />
          <p className=" text-xl ml-2 font-bold">ResQLink</p>
        </div>
        
        {/* Hamburger */}
        <div className="flex">
        <div className="flex">
          <ul className="menu menu-horizontal px-1 hidden lg:flex">
            <li><a>Login</a></li>
            <li><a>Register</a></li>
          </ul>
        </div>
          <button onClick={() => setIsMenuOpen(true)}>
            <FaBars size={30} />
          </button>
        </div>
      </div>

      {/* Slide-in Menu Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
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
