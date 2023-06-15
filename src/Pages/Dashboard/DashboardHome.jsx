import React from 'react';
import useAdmin from '../../Hooks/UseAdmin';
import UseInstructor from '../../Hooks/UseInstructor';

const DashboardHome = () => {
    const [isAdmin] = useAdmin();
    const [isInstructor] = UseInstructor()
    return (
        <div>
            {
                isAdmin ?
                    <>
                        <h2 className='text-4xl font-bold'>Admin Home</h2>
                    </> :
                    isInstructor ?
                        <>
                            <h2 className='text-4xl font-bold'>Admin Home</h2>
                        </> :
                        <>
                            <h2 className='text-4xl font-bold'>Student Dashboard</h2>
                        </>
            }
        </div>
    );
};

export default DashboardHome;