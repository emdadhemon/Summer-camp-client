import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Providers/AuthProvider';
import { FaUserCircle } from 'react-icons/fa';
import img from '../../../assets/logo.png'

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext)

    const handleLogout = () => {
        logOut();
    }

    return (
        <div className="navbar text-white bg-black bg-opacity-50 fixed z-10 max-w-screen-xl">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <li><Link>Home</Link></li>
                        <li><Link>Instructors</Link></li>
                        <li><Link>Classes</Link></li>
                    </ul>
                </div>
                <Link to="/" className="bg-white bg-opacity-30 w-48 rounded hover:bg-white">
                    <img src={img} className='h-10' alt="" />
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/instructors">Instructors</Link></li>
                    <li><Link to="/classes">Classes</Link></li>
                    {
                        user ? <li><Link to="/dashboard/dashboard">Dashboard</Link></li> : ''
                    }
                </ul>
            </div>
            <div className="navbar-end">
                {
                    !user && <Link to="/signup" className="btn hover:text-white  border-none hidden lg:block lg:pt-4 mr-4">Register</Link>
                }
                {
                    user ? <Link onClick={handleLogout} className="btn border-none hover:text-white  mr-3">Logout</Link> : <Link to="/login" className="btn border-none hover:text-white mr-3">Login</Link>
                }
                {user?.photoURL && <img title={user?.displayName} className="w-11 h-11 rounded-full object-cover" src={user.photoURL} />}
                {
                    user?.photoURL === null && <FaUserCircle title={user?.displayName} style={{ fontSize: "40px" }}></FaUserCircle>
                }
            </div>
        </div>
    );
};

export default Navbar;