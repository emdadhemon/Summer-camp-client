import { NavLink, Outlet } from "react-router-dom";
import { FaShoppingCart, FaWallet, FaCalendarAlt, FaHome, FaUtensils, FaBook, FaUsers } from 'react-icons/fa';
import useAdmin from "../Hooks/UseAdmin";
import UseInstructor from "../Hooks/UseInstructor";

const Dashboard = () => {

    const [isAdmin] = useAdmin();
    const [isInstructor] = UseInstructor();

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
                            isAdmin &&
                            <>
                                <li><NavLink to="dashboard"><FaHome></FaHome> Admin Home</NavLink></li>
                                <li><NavLink to="/dashboard/manageClasses"><FaHome></FaHome> Manage Classes</NavLink></li>
                                <li><NavLink to="/dashboard/manageUsers"><FaHome></FaHome> Manage Users</NavLink></li>
                            </>
                        }
                        {
                            isInstructor &&
                            <>
                                <li><NavLink to="dashboard"><FaHome></FaHome> Instructor Home</NavLink></li>
                                <li><NavLink to="/dashboard/addclass"><FaHome></FaHome>Add Class</NavLink></li>
                                <li><NavLink to="/dashboard/myclasses"><FaHome></FaHome>My Classes</NavLink></li>
                            </>
                        }
                    </ul>
                    <div>
                        <li><NavLink to="/"><FaHome></FaHome>Home</NavLink> </li>
                        <li><NavLink to="/menu"> Our Menu</NavLink></li>
                        <li><NavLink to="/order/salad">Order Food</NavLink></li>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;