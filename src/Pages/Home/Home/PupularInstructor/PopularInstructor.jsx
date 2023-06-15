import React, { useEffect, useState } from 'react';

const PopularInstructor = () => {
    const [instructors, setInstructors] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/users')
            .then(res => res.json())
            .then(data => {
                const instructor = data.filter(d => d?.role === 'instructor')
                setInstructors(instructor);
            })
    }, [])

    return (
        <div className='my-24'>
            <h1 className='text-4xl text-center font-bold my-12'>Popular  Instructors</h1>
            <div className='w-[80%] mx-auto grid grid-cols-2 lg:grid-cols-3 gap-10'>
                {
                    instructors.slice(0, 6).map(i => <div key={i._id}>
                        <div className='text-center flex flex-col items-center'>
                            <img className='w-32 h-32 object-cover rounded-full' src={i.photo} alt="" />
                            <p className='font-semibold mt-2'>{i.name}</p>
                            <p>{i.email}</p>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default PopularInstructor;