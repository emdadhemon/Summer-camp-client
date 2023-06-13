import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Login/Register";
import Dashboard from "../Layout/Dashboard";
import ManageUsers from "../Pages/Dashboard/ManageUsers";
import ManageClasses from "../Pages/Dashboard/ManageClasses";
import AdminHome from "../Pages/Dashboard/AdminHome";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children : [
        {
            path : "/",
            element : <Home></Home>
        },
        {
            path : 'login',
            element : <Login></Login>
        },
        {
            path : "signup",
            element : <Register></Register>
        }
      ]
    },
    {
        path : 'dashboard',
        element : <Dashboard></Dashboard>,
        children : [
            {
                path : 'dashboard',
                element : <AdminHome></AdminHome>
            },
            {
                path : 'manageUsers',
                element : <ManageUsers></ManageUsers>
            },
            {
                path : 'manageClasses',
                element : <ManageClasses></ManageClasses>
            }
        ]
    }
  ]);

  export default router;