import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../Layout/MainLayout";
import Home from "../Components/Home/Home";
import ErrorPage from "../pages/ErrorPage";
import AddAlertPanels from "../pages/AddAlertPanels";
import AllAlertPanel from "../pages/AllAlertPanel";

import AllAlertPanelDetails from "../pages/AllAlertPanelDetails";
import Dashboard from "../DashboardComponents/Dashboard";
import Register from "../pages/Authentication/Register";
import Login from "../pages/Authentication/Login";
import Profile from "../DashboardComponents/RescueMember/Profile";
import LatestHeadlineDetails from "../Components/Home/LatestHeadlineDetails";
import LiveAlert from "../Components/LiveAlerts";
import ManageUser from "../DashboardComponents/AdminRoutes/ManageUser";
import IncidentManagement from "../DashboardComponents/AdminRoutes/IncidentManagement";
import OverviewPanel from "../DashboardComponents/AdminRoutes/OverviewPanel";
import EditIncidentData from "../DashboardComponents/AdminRoutes/EditIncidentData";
import ResourceAllocation from "../DashboardComponents/AdminRoutes/ResourceAllocation";
import ReportIncident from "../DashboardComponents/CitizenRoutes/ReportIncident";
import MyReports from "../DashboardComponents/CitizenRoutes/MyReports";
import LiveUpdates from "../DashboardComponents/CitizenRoutes/LiveUpdates";
import SafetyContents from "../DashboardComponents/CitizenRoutes/SafetyContents";
import BlogDetails from "../Components/Home/BlogDetails";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      errorElement: <ErrorPage></ErrorPage>,
      children: [
        {
        path: "/",
        element: <Home></Home>,
      },
      {
        path:"addAlertPanels",
        element:<AddAlertPanels></AddAlertPanels>
      },
      {
        path:"allAlertPanel",
        element: <AllAlertPanel></AllAlertPanel>
      },
      {
        path:"/latestAlerts/:id",
        element:<LatestHeadlineDetails></LatestHeadlineDetails>
      },
      {
        path: '/alertPanel/:id',
        element: <AllAlertPanelDetails></AllAlertPanelDetails>
      },
      {
        path: '/blogPosts/:id',
        element: <BlogDetails></BlogDetails>
      },
      {
        path: 'register',
        element: <Register></Register>
      },
      {
        path: "login",
        element: <Login></Login>
      },
      {
        path: "liveAlerts",
        element: <LiveAlert></LiveAlert>
      },
      {
        path: '/dashboard',
        element: <Dashboard></Dashboard>,
        children: [
          {
            path: "rescuerProfile",
            element: <Profile></Profile>
          },
          {
            path: "manageUser",
            element: <ManageUser></ManageUser>
          },
          {
            path: "incidentManagement",
            element: <IncidentManagement></IncidentManagement>
          },
          {
            path: "resourceAllocation",
            element: <ResourceAllocation></ResourceAllocation>
          },
          {
            path: "edit-alert/:id",
            element: <EditIncidentData></EditIncidentData>
          },
          {
            path: "overviewPanel",
            element: <OverviewPanel></OverviewPanel>
          },
          {
            path: "reportIncident",
            element: <ReportIncident></ReportIncident>
          },
          {
            path: "myReports",
            element: <MyReports></MyReports>
          },
          {
            path: "liveUpdates",
            element: <LiveUpdates></LiveUpdates>
          },
          {
            path: "safetyContents",
            element: <SafetyContents></SafetyContents>
          }
        ]
      }
     
    ]
    },
  ]);