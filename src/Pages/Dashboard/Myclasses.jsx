import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import { Link } from 'react-router-dom';

const Myclasses = () => {
    const { user } = useContext(AuthContext);
    const [classes, setclasses] = useState([])
    useEffect(() => {
        fetch(`http://localhost:5000/class/${user?.email}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setclasses(data);
            });
    }, [user]);

    console.log(classes)

    return (
        <div className='w-full ms-8'>
            <h1 className='font-semibold text-2xl mb-2'>Total classes : {classes.length}</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Class Name</th>
                        <th>Instuctor details</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Feedback</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        classes.map(SingleClass => <tr key={SingleClass?._id}>
                            <th><img className='h-20 w-20 rounded object-cover' src={SingleClass?.classimage} alt="" /></th>
                            <th>{SingleClass.classname}</th>
                            <td>{SingleClass.name} <br /> {SingleClass.email}</td>
                            <td>Price : $
                                {SingleClass.price} <br /> Available Seats : {SingleClass.availableseats}</td>
                            <td> { SingleClass?.status !== "approved" && SingleClass?.status !== "denied"  ? "Pending" : <div className='uppercase'>{SingleClass.status}</div> }</td>
                            <td> { SingleClass?.Feedback ? SingleClass?.Feedback : "No Feedback" }</td>
                        </tr>)
                    }

                </tbody>
            </table>

        </div>
    );
};

export default Myclasses;