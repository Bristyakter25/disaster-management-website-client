import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../Layout/MainLayout";
import Home from "../Components/Home/Home";
import ErrorPage from "../pages/ErrorPage";
import AddAlertPanels from "../pages/AddAlertPanels";

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
      }
     
    ]
    },
  ]);