import React, { useState, useEffect, useContext } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { FaHouseMedicalFlag } from "react-icons/fa6";
import { GrHome } from "react-icons/gr";
import { MdQueryStats } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import ThemeToggle from "../Components/themeToggle/ThemeToggle";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [role, setRole] = useState("");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.email) return;
      try {
        const res = await fetch(`https://disaster-management-website-server.vercel.app/users/${user.email}`);
        const userData = await res.json();
        if (userData?.role) setRole(userData.role);
      } catch (err) {
        console.error("Failed to fetch user role", err);
      }
    };
    fetchUserData();
  }, [user?.email]);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">

      {/* Mobile Toggle Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#4635B1] text-white rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed lg:sticky top-0 left-0 z-40 h-screen w-[200px] lg:w-60 overflow-y-auto bg-[#F5EFFF] dark:bg-[#00072D] p-5 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <h1 className="text-center my-5 font-bold text-2xl dark:text-[#A294F9] text-[#4635B1]">
          Dashboard
        </h1>
        <ul className="menu gap-y-3">
          <h2 className="text-center my-5 font-bold text-xl dark:text-[#A294F9] text-[#4635B1]">
            Menu
          </h2>
          <li><NavLink to="/dashboard/allChart"><MdQueryStats /> Camp Fees Distribution</NavLink></li>
          <li><NavLink to="/"><GrHome /> Home</NavLink></li>
          <li><NavLink to="/availableCamps"><FaHouseMedicalFlag /> Available Camps</NavLink></li>

          {role === "Admin" && (
            <>
              <h2 className="text-center my-5 font-bold text-xl text-[#4635B1] dark:text-[#A294F9]">Admin</h2>
              <li><NavLink to="/dashboard/overviewPanel">Overview Panel</NavLink></li>
              <li><NavLink to="/dashboard/incidentManagement">Incident Management</NavLink></li>
              <li><NavLink to="/dashboard/manageUser">User Management</NavLink></li>
              <li><NavLink to="/dashboard/resourceAllocation">Resource Allocation</NavLink></li>
              <li><NavLink to="/dashboard/assignMissions">Assign Missions</NavLink></li>
              <li><NavLink>Analytics & Reports</NavLink></li>
            </>
          )}

          {role === "Rescue Member" && (
            <>
              <h2 className="text-center my-5 font-bold text-xl text-[#4635B1] dark:text-[#A294F9]">Rescue Member</h2>
              <li><NavLink to="/dashboard/assignedMissions">Assigned Missions</NavLink></li>
              <li><NavLink>Update Status</NavLink></li>
              <li><NavLink>Emergency Alerts</NavLink></li>
              <li><NavLink to="/dashboard/rescuerProfile">Profile</NavLink></li>
            </>
          )}

          {role === "Citizen" && (
            <>
              <h2 className="text-center my-5 font-bold text-xl text-[#4635B1] dark:text-[#A294F9]">Citizen</h2>
              <li><NavLink to="/dashboard/reportIncident">Report an Incident</NavLink></li>
              <li><NavLink to="/dashboard/myReports">My Reports</NavLink></li>
              <li><NavLink to="/dashboard/liveUpdates">Live Updates</NavLink></li>
              <li><NavLink to="/dashboard/safetyContents">Safety & Guidelines</NavLink></li>
            </>
          )}
        </ul>
        <div className="divider" />
      </div>

      {/* Main Content */}
      <div className="flex-1 h-screen overflow-y-auto p-4 pt-6">
        <div className="flex justify-end mb-4">
          <ThemeToggle />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
