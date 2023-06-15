import React, { useContext, useState } from 'react';
import UseClasses from '../../Hooks/UseClasses';
import useAdmin from '../../Hooks/UseAdmin';
import UseInstructor from '../../Hooks/UseInstructor';
import { AuthContext } from '../../Providers/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import img from '../../assets/classes.jpg';
import Cover from '../../Components/Cover';
const Courses = () => {
    const [isAdmin] = useAdmin();
    const [isInstructor] = UseInstructor();
    const [classes] = UseClasses();
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const handleAddToCart = item => {
        const { classname, classimage, price, recipe, _id } = item;
        console.log(item);
        if (user && user.email) {
            const cartItem = { classId: _id, classname, classimage, price, email: user.email }
            fetch('http://localhost:5000/carts', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(cartItem)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'This class is added on your Cart',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                })
        }
        else {
            Swal.fire({
                title: 'Please login to Select this class',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Login now!'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } })
                }
            })
        }
    }

    const approvedClasses = classes.filter(c => c.status = 'approved')
    return (
        <div>
            <Cover img={img} title={'Classes'}></Cover>
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
                                    <button onClick={()=>handleAddToCart(c)} disabled={isAdmin || isInstructor ? true : false} className="btn btn-primary">Select</button>
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