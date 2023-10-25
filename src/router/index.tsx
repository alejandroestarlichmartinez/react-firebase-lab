// vendors
import { createBrowserRouter } from "react-router-dom";
// layouts
import {
  LayoutPrivate,
  LayoutRoot
} from "../layouts";
// components
import {
  Dashboard,
  Home,
  Login,
  Register
} from "../pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutRoot />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/dashboard",
        element: <LayoutPrivate />,
        children: [
          {
            index: true,
            element: <Dashboard />
          }
        ]
      }
    ]
  }
]);