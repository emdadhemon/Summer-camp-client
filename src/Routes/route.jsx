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
import AddClass from "../Pages/Dashboard/AddClass";
import Myclasses from "../Pages/Dashboard/Myclasses";
import Courses from "../Pages/Courses/Courses";
import Instructors from "../Pages/instructors/instructors";
import ErrorPage from "../Pages/Shared/ErrorPage/ErrorPage";
import CartClasses from "../Pages/Dashboard/Student/CartClasses";
import Payment from "../Pages/Dashboard/Payment/Payment";
import EnrolledClasses from "../Pages/Dashboard/Student/EnrolledClasses";

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
        },
        {
            path : "classes",
            element : <Courses></Courses>
        },
        {
            path : "instructors",
            element : <Instructors></Instructors>
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
            },
            {
                path : 'addclass',
                element : <AddClass></AddClass>
            },
            {
                path : 'myclasses',
                element : <Myclasses></Myclasses>
            },
            {
                path : 'selectedclass',
                element : <CartClasses></CartClasses>
            },
            {
                path : "payment/:id",
                element : <Payment></Payment>,
                loader : ({params}) => fetch(`http://localhost:5000/carts/${params.id}`) 
            },
            {
                path : 'enrolledclasses',
                element : <EnrolledClasses></EnrolledClasses>
            }
        ]
    },
    {
        path : "*" ,
        element : <ErrorPage></ErrorPage>
    }
  ]);

  export default router;