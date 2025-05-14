import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../Layout/MainLayout";
import Home from "../Components/Home/Home";
import ErrorPage from "../pages/ErrorPage";
import AddAlertPanels from "../pages/AddAlertPanels";
import AllAlertPanel from "../pages/AllAlertPanel";
import LiveAlertDetails from "../Components/Home/LiveAlertDetails";
import AllAlertPanelDetails from "../pages/AllAlertPanelDetails";
import Dashboard from "../DashboardComponents/Dashboard";
import Register from "../pages/Authentication/Register";
import Login from "../pages/Authentication/Login";
import Profile from "../DashboardComponents/RescueMember/Profile";

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
        element:<LiveAlertDetails></LiveAlertDetails>
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
        path: '/dashboard',
        element: <Dashboard></Dashboard>,
        children: [
          {
            path: "rescuerProfile",
            element: <Profile></Profile>
          }
        ]
      }
     
    ]
    },
  ]);