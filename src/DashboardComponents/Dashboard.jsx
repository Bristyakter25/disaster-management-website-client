import React, { useState, useEffect, useContext } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { FaHouseMedicalFlag } from "react-icons/fa6";
import { GrHome } from "react-icons/gr";
import { MdQueryStats } from "react-icons/md";
import { NavLink, Outlet, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import ThemeToggle from "../Components/themeToggle/ThemeToggle";
import AccessDenialMessage from "../Shared/SecuredMessage/AccessDenialMessage";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [role, setRole] = useState("");
  const { user,logOut } = useContext(AuthContext);
   const navigate = useNavigate();

  const handleLogout = () => {
    logOut()
      .then(() => navigate("/login"))
      .catch((error) => console.error("Logout error:", error));
  };

  // Fetch user role
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.email) return;
      try {
        const res = await fetch(
          `https://disaster-management-website-server.onrender.com/users/${user.email}`
        );
        const userData = await res.json();
        if (userData?.role) setRole(userData.role);
      } catch (err) {
        console.error("Failed to fetch user role", err);
      }
    };
    fetchUserData();
  }, [user?.email]);

  // If user is not logged in, show friendly message
  if (!user) {
  return (
    // <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-200 to-purple-300 dark:from-gray-800 dark:to-gray-900 px-4 text-center">
    //   <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-12 max-w-lg transform transition duration-500 hover:scale-105">
    //     <div className="text-center mb-6">
    //       <svg
    //         xmlns="http://www.w3.org/2000/svg"
    //         className="mx-auto h-16 w-16 text-red-500 animate-bounce"
    //         fill="none"
    //         viewBox="0 0 24 24"
    //         stroke="currentColor"
    //         strokeWidth={2}
    //       >
    //         <path
    //           strokeLinecap="round"
    //           strokeLinejoin="round"
    //           d="M12 8v4m0 4h.01M21 12c0 4.9706-4.0294 9-9 9s-9-4.0294-9-9 4.0294-9 9-9 9 4.0294 9 9z"
    //         />
    //       </svg>
    //       <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mt-4">
    //         Access Denied
    //       </h2>
    //     </div>
    //     <p className="text-gray-700 dark:text-gray-300 text-lg mb-8">
    //       You must be logged in to access the dashboard. Click below to log in and continue.
    //     </p>
    //     <Link
    //       to="/login"
    //       className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition transform hover:-translate-y-1 hover:scale-105"
    //     >
    //       Go to Login
    //     </Link>
    //   </div>
    // </div>
 <AccessDenialMessage></AccessDenialMessage>
  );
}

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
          <li>
            <NavLink to="/dashboard/overviewPanel"><MdQueryStats /> Overview Panel</NavLink>
          </li>
          <li>
            <NavLink to="/"><GrHome /> Home</NavLink>
          </li>
          <li>
            <NavLink to="/allAlertPanel"><FaHouseMedicalFlag />All Disasters</NavLink>
          </li>

          {role === "Admin" && (
            <>
              <h2 className="text-center my-5 font-bold text-xl text-[#4635B1] dark:text-[#A294F9]">Admin</h2>
              <li><NavLink to="/dashboard/overviewPanel">Overview Panel</NavLink></li>
              <li><NavLink to="/dashboard/incidentManagement">Incident Management</NavLink></li>
              <li><NavLink to="/dashboard/manageUser">User Management</NavLink></li>
              <li><NavLink to="/dashboard/resourceAllocation">Resource Allocation</NavLink></li>
              <li><NavLink to="/dashboard/allPaymentsInfo">All Payments Info</NavLink></li>
              <li><NavLink to="/dashboard/assignMissions">Assign Missions</NavLink></li>
              {/* <li><NavLink>Analytics & Reports</NavLink></li> */}
            </>
          )}

          {role === "Rescue Member" && (
            <>
              <h2 className="text-center my-5 font-bold text-xl text-[#4635B1] dark:text-[#A294F9]">Rescue Member</h2>
              <li><NavLink to="/dashboard/assignedMissions">Assigned Missions</NavLink></li>
              {/* <li><NavLink>Update Status</NavLink></li> */}
              <li><NavLink to="/dashboard/paymentInfo">Payments Info</NavLink></li>
              {/* <li><NavLink>Emergency Alerts</NavLink></li> */}
              <li><NavLink to="/dashboard/rescuerProfile">Profile</NavLink></li>
            </>
          )}

          {role === "Citizen" && (
            <>
              <h2 className="text-center my-5 font-bold text-xl text-[#4635B1] dark:text-[#A294F9]">Citizen</h2>
              <li><NavLink to="/dashboard/reportIncident">Report an Incident</NavLink></li>
              <li><NavLink to="/dashboard/myReports">My Reports</NavLink></li>
              
              <li><NavLink to="/dashboard/myRequests">My Help Requests</NavLink></li>
              <li><NavLink to="/dashboard/liveUpdates">Live Updates</NavLink></li>
              <li><NavLink to="/dashboard/paymentInfo">Payments Info</NavLink></li>
              <li><NavLink to="/dashboard/safetyContents">Safety & Guidelines</NavLink></li>
              
            </>
          )}
        </ul>
        <div className="divider" />
        <button
  onClick={handleLogout}
  className="ml-4 flex items-center gap-2 px-4 py-2 rounded-xl 
             text-red-600 font-semibold text-lg
             hover:bg-red-50 dark:hover:bg-red-900/20
             transition-all duration-200"
>
  <svg xmlns="http://www.w3.org/2000/svg" 
       fill="none" viewBox="0 0 24 24" 
       strokeWidth="1.8" stroke="currentColor"
       className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" 
          d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M9 12h12m0 0l-3-3m3 3l-3 3" />
  </svg>
  Logout
</button>

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
