import React, { useState } from "react";
import {
  FaBars,
  FaClinicMedical,
  FaHospitalUser,
  FaMoneyCheckAlt,
  FaRegAddressBook,
  FaTimes,
  FaUsers,
  FaUserTie,
} from "react-icons/fa";
import { FaHouseMedicalFlag } from "react-icons/fa6";
import { GrHome } from "react-icons/gr";
import { MdManageAccounts, MdQueryStats } from "react-icons/md";
import { TbBrandGoogleAnalytics, TbCashRegister } from "react-icons/tb";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex w-full h-full">
      {/* Toggle Sidebar Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-40 p-2 bg-[#4635B1] text-white rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
      </button>

      {/* Dark/Light Toggle Button */}
      {/* <button
              className="fixed top-4 right-24 z-40 p-2 bg-gray-300 dark:bg-gray-800 text-black dark:text-white rounded-md"
              onClick={toggleDarkMode}
            >
              {darkMode ? <FaSus size={20} /> : <FaMoon size={20} />}
            </button>
       */}
      {/* Sidebar */}
      <div
        className={`fixed lg:relative top-0 left-0 lg:w-72 w-[200px] h-screen overflow-y-auto bg-[#F5EFFF] dark:bg-[#00072D] p-5 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <ul className="menu">
          <h2 className="text-center my-5 font-bold text-xl dark:text-[#A294F9] text-[#4635B1]">
            Menu
          </h2>
          <li>
            <NavLink to="/dashboard/allChart">
              <MdQueryStats /> Camp Fees Distribution
            </NavLink>
          </li>
          <li>
            <NavLink to="/">
              <GrHome /> Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/availableCamps">
              <FaHouseMedicalFlag /> Available Camps
            </NavLink>
          </li>
          {/* Admin Section */}
          {/* {isAdmin && ( */}
          <>
            <h2 className="text-center my-5 font-bold text-xl dark:text-[#A294F9] text-[#4635B1]">
              Admin Dashboard
            </h2>
            <li>
              <NavLink>Overview Panel</NavLink>
            </li>
            <li>
              <NavLink>Incident Management</NavLink>
            </li>
            <li>
              <NavLink>User Management</NavLink>
            </li>
            <li>
              <NavLink>Resource Allocation</NavLink>
            </li>
            <li>
              <NavLink>Analytics & Reports</NavLink>
            </li>
          </>
        </ul>

        <div className="divider"></div>
        {/* Rescue member dashboard */}
        {/* {!isAdmin && ( */}
        <ul className="menu">
          <h2 className="text-center my-5 font-bold text-xl dark:text-[#A294F9] text-[#4635B1]">
            Rescue Member Dashboard
          </h2>
          <li>
            <NavLink>Assigned Missions</NavLink>
          </li>
          <li>
            <NavLink>Update Status</NavLink>
          </li>
          <li>
            <NavLink>Emergency Alerts</NavLink>
          </li>
          <li>
            <NavLink>Profile</NavLink>
          </li>
        </ul>

        <div className="divider"></div>
        {/* Citizen dashboard */}
        {/* {!isAdmin && ( */}
        <ul className="menu">
          <h2 className="text-center my-5 font-bold text-xl dark:text-[#A294F9] text-[#4635B1]">
            Citizen Dashboard
          </h2>
          <li>
            <NavLink>Report an Incident</NavLink>
          </li>
          <li>
            <NavLink>My Reports</NavLink>
          </li>
          <li>
            <NavLink>Live Updates</NavLink>
          </li>
          <li>
            <NavLink>Safety & Guidelines</NavLink>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-5 lg:ml-0 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
