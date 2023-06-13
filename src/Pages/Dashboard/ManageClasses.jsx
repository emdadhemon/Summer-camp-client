import React from 'react';
import UseClasses from '../../Hooks/UseClasses';
import Swal from 'sweetalert2';

const ManageClasses = () => {
    const [classes, loading, refetch] = UseClasses();


    const handleApprove = course => {
        fetch(`http://localhost:5000/class/${course?._id}`, {
            method: 'PATCH'
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.modifiedCount){
                refetch();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `${course.name} is Approved!`,
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
        })
    }

    const handleDenied = course => {
        fetch(`http://localhost:5000/deny/${course?._id}`, {
            method: 'PATCH'
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.modifiedCount){
                refetch();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `${course.name} is Denied!`,
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
        })
    }

    console.log(classes)
    return (
        <div>
            <h1> Total Classes : {classes.length}</h1>
            <table className="table text-center">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Class Name</th>
                        <th>Instuctor details</th>
                        <th>Price</th>
                        <th>Action</th>
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
                            <td> {SingleClass?.status !== "approved" && SingleClass?.status !== "Denied" ? <>
                            <button onClick={() => handleApprove(SingleClass)} className='btn w-[100%] bg-green-600 mb-2'>Approve</button>
                            <button onClick={()=> handleDenied(SingleClass)} className='btn w-[100%] bg-red-600'>Deny</button>
                            </> : <div className='uppercase'> {SingleClass?.status}</div> }</td>
                            <td> {SingleClass?.Feedback ? SingleClass?.Feedback : "No Feedback"}</td>
                        </tr>)
                    }

                </tbody>
            </table>
        </div>
    );
};

export default ManageClasses;