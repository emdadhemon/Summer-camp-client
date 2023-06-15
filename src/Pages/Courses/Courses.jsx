import React, { useContext, useState } from 'react';
import UseClasses from '../../Hooks/UseClasses';
import useAdmin from '../../Hooks/UseAdmin';
import UseInstructor from '../../Hooks/UseInstructor';
import { AuthContext } from '../../Providers/AuthProvider';

const Courses = () => {
    const [isAdmin] = useAdmin();
    const [isInstructor] = UseInstructor();

    const [classes] = UseClasses();

    const approvedClasses = classes.filter(c => c.status = 'approved')
    return (
        <div>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                {
                    approvedClasses.map(c => <div key={c?._id}>
                        <div className="card card-compact w-96 bg-base-100 shadow-xl">
                            <figure><img src={c?.classimage} alt="Shoes" className='h-60' /></figure>
                            <div className="card-body">
                                <h2 className="card-title">{c?.classname}</h2>
                                <p className='text-xs'>{c?.details.slice(0, 120)}</p>
                                <h2><strong>Instructor name :</strong> {c?.name}</h2>
                                <h2><strong>Available seats : </strong> {c?.availableseats}</h2>
                                <h2><strong>Price :</strong> ${c?.price}</h2>
                                <div className="card-actions justify-end">
                                    <button disabled={ isAdmin || isInstructor ? true : false } className="btn btn-primary">Select</button>
                                </div>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Courses;