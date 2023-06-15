import React, { useEffect, useState } from 'react';
import Cover from '../../Components/Cover';
import img from "../../assets/instructor.jpg"

const Instructors = () => {
    const [instructors, setInstructors] = useState([]);

    useEffect(() => {
        fetch('https://summer-camp-school-server-mocha.vercel.app/users')
            .then(res => res.json())
            .then(data => {
                const instructor = data.filter(d => d?.role === 'instructor')
                setInstructors(instructor);
            })
    }, [])

    return (
        <div> 
            <Cover img={img} title={'Instructors'}></Cover>
            <div className='grid grid-cols-4 gap-10'>
                {
                    instructors.map(i => <div key={i._id}>
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

export default Instructors;