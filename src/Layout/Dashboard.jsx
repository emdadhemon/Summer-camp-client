import { NavLink, Outlet } from "react-router-dom";
import { FaShoppingCart, FaWallet, FaCalendarAlt, FaHome, FaUtensils, FaBook, FaUsers, FaClipboardList, FaUserAlt, FaBookOpen, FaBookDead, FaBookReader, FaRegCreditCard, FaHandPointUp } from 'react-icons/fa';
import useAdmin from "../Hooks/UseAdmin";
import UseInstructor from "../Hooks/UseInstructor";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    // const [users, setusers] = useState([]);
    // console.log(user)

    // useEffect(()=>{
       
    //     fetch('https://summer-camp-school-server-mocha.vercel.app/users')
    //     .then(res => res.json())
    //     .then(data=>setusers(data))
    // },[])

    // const checkAdmin = users.find(u => u.email === user.email)
    // console.log(checkAdmin)

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
                            isAdmin ?
                                <>
                                    <li><NavLink to="dashboard"><FaHome></FaHome> Admin Home</NavLink></li>
                                    <li><NavLink to="/dashboard/manageClasses"><FaClipboardList></FaClipboardList> Manage Classes</NavLink></li>
                                    <li><NavLink to="/dashboard/manageUsers"><FaUserAlt></FaUserAlt> Manage Users</NavLink></li>
                                </> :

                                isInstructor ?
                                    <>
                                        <li><NavLink to="dashboard"><FaHome></FaHome> Instructor Home</NavLink></li>
                                        <li><NavLink to="/dashboard/addclass"><FaBookOpen></FaBookOpen> Add Class</NavLink></li>
                                        <li><NavLink to="/dashboard/myclasses"><FaBookReader></FaBookReader> My Classes</NavLink></li>
                                    </> 
                                    :

                                    <>
                                        <li><NavLink to="dashboard"><FaHome></FaHome>Student Home</NavLink></li>
                                        <li><NavLink to="/dashboard/selectedclass"><FaHandPointUp></FaHandPointUp>My Selected Class</NavLink></li>
                                        <li><NavLink to="/dashboard/enrolledclasses"><FaBookOpen></FaBookOpen> My enrolled classes</NavLink></li>
                                        <li><NavLink to={`/dashboard/history/${user?.email}`}><FaRegCreditCard></FaRegCreditCard> Payment History</NavLink></li>

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