import React, { useState, useEffect, useContext } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { FaHouseMedicalFlag } from "react-icons/fa6";
import { GrHome } from "react-icons/gr";
import { MdQueryStats } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

// 🔧 Replace this with how you get the logged-in user email (auth context, etc.)
// const loggedInUserEmail =  // hardcoded for now

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [role, setRole] = useState("");

  const { user } = useContext(AuthContext); // ✅ Correct usage

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.email) return; // guard clause

      try {
        const res = await fetch(`http://localhost:5000/users/${user.email}`);
        const userData = await res.json();
        if (userData?.role) {
          setRole(userData.role);
        }
      } catch (err) {
        console.error("Failed to fetch user role", err);
      }
    };

    fetchUserData();
  }, [user?.email]); // Add dependency so it runs when user loads

  return (
    <div className="flex w-full h-full">
      <button
        className="lg:hidden fixed top-4 left-4 z-40 p-2 bg-[#4635B1] text-white rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
      </button>

      <div
        className={`fixed lg:relative min-h-screen top-0 left-0 lg:w-72 w-[200px]  overflow-y-auto bg-[#F5EFFF] dark:bg-[#00072D] p-5 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
         <h1 className="text-center my-5 font-bold text-2xl dark:text-[#A294F9] text-[#4635B1]">
              Dashboard
            </h1>
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

          {/* Role-based routes */}
          {role === "Admin" && (
            <>
              <h2 className="text-center my-5 font-bold text-xl text-[#4635B1] dark:text-[#A294F9]">
                Admin 
              </h2>
              <li><NavLink>Overview Panel</NavLink></li>
              <li><NavLink>Incident Management</NavLink></li>
              <li><NavLink>User Management</NavLink></li>
              <li><NavLink>Resource Allocation</NavLink></li>
              <li><NavLink>Analytics & Reports</NavLink></li>
            </>
          )}

          {role === "Rescue Member" && (
            <>
              <h2 className="text-center my-5 font-bold text-xl text-[#4635B1] dark:text-[#A294F9]">
                Rescue Member 
              </h2>
              <li><NavLink>Assigned Missions</NavLink></li>
              <li><NavLink>Update Status</NavLink></li>
              <li><NavLink>Emergency Alerts</NavLink></li>
              <li><NavLink to="/dashboard/rescuerProfile">Profile</NavLink></li>
            </>
          )}

          {role === "Citizen" && (
            <>
              <h2 className="text-center my-5 font-bold text-xl text-[#4635B1] dark:text-[#A294F9]">
                Citizen 
              </h2>
              <li><NavLink>Report an Incident</NavLink></li>
              <li><NavLink>My Reports</NavLink></li>
              <li><NavLink>Live Updates</NavLink></li>
              <li><NavLink>Safety & Guidelines</NavLink></li>
            </>
          )}
        </ul>
        <div className="divider"></div>
      </div>

      <div className="flex-1 ml-5 lg:ml-0 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
