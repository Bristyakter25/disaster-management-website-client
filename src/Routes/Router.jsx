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
            path: "overviewPanel",
            element: <OverviewPanel></OverviewPanel>
          }
        ]
      }
     
    ]
    },
  ]);