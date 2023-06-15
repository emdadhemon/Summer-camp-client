import { NavLink, Outlet } from "react-router-dom";
import { FaShoppingCart, FaWallet, FaCalendarAlt, FaHome, FaUtensils, FaBook, FaUsers } from 'react-icons/fa';
import useAdmin from "../Hooks/UseAdmin";
import UseInstructor from "../Hooks/UseInstructor";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";

const Dashboard = () => {

    const [isAdmin] = useAdmin();
    const [isInstructor] = UseInstructor();
    const { user } = useContext(AuthContext);

    return (
        <>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center">
                    <Outlet></Outlet>

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 bg-base-200 text-base-content">
                        {
                            isAdmin ?
                                <>
                                    <li><NavLink to="dashboard"><FaHome></FaHome> Dashboard Home</NavLink></li>
                                    <li><NavLink to="/dashboard/manageClasses"><FaHome></FaHome> Manage Classes</NavLink></li>
                                    <li><NavLink to="/dashboard/manageUsers"><FaHome></FaHome> Manage Users</NavLink></li>
                                </> :


                                isInstructor ?
                                    <>
                                        <li><NavLink to="dashboard"><FaHome></FaHome> Dashboard Home</NavLink></li>
                                        <li><NavLink to="/dashboard/addclass"><FaHome></FaHome>Add Class</NavLink></li>
                                        <li><NavLink to="/dashboard/myclasses"><FaHome></FaHome>My Classes</NavLink></li>
                                    </> :

                                    <>
                                        <li><NavLink to="dashboard"><FaHome></FaHome>Dashboard Home</NavLink></li>
                                        <li><NavLink to="/dashboard/selectedclass"><FaHome></FaHome>My Selected Class</NavLink></li>
                                        <li><NavLink to="/dashboard/enrolledclasses"><FaHome></FaHome>My enrolled classes</NavLink></li>
                                        <li><NavLink to={`/dashboard/history/${user?.email}`}><FaHome></FaHome>Payment History</NavLink></li>

                                    </>
                        }
                    </ul>
                    <div className="divider">
                        <ul>
                            <li><NavLink to="/"><FaHome className="inline-block mr-2"></FaHome><span>Home</span></NavLink></li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;