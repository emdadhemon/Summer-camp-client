import React, { useEffect, useState } from 'react';

const PopularInstructor = () => {
    const [instructors , setInstructors] = useState([]);

    useEffect(()=>{
        fetch('http://localhost:5000/users')
    },[])

    return (
        <div>
            
        </div>
    );
};

export default PopularInstructor;