import React, { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const AddClass = () => {
    const { user } = useContext(AuthContext);

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = data => {
        fetch("https://summer-camp-school-server-mocha.vercel.app/class", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        })
            .then(res => res.json())
            .then(result => {
                console.log(result)
                if (result.insertedId) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Your class Data Has been Saved',
                        confirmButtonText: "Ok"
                    })
                }
            });
    }

    return ( 
        <div className='w-[80%] my-10'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    className='input border w-[50%] border-gray-800 m-2 bg-white text-black'
                    {...register("name")}
                    placeholder="Your Name"
                    value={user?.displayName}
                    type='text'
                    required
                    readOnly
                />
                <input
                    className='input border w-[50%] border-gray-800 m-2 bg-white text-black'
                    {...register("email")}
                    placeholder="Your Email"
                    value={user?.email}
                    type='email'
                    required
                    readOnly
                /> <br />

                <input
                    className='input border w-[50%] border-gray-800 m-2 bg-white text-black'
                    {...register("classname")}
                    placeholder="Class Name"
                    type='text'
                    required
                />
                <input
                    className='input border w-[50%] border-gray-800 m-2 bg-white text-black'
                    {...register("price")}
                    placeholder="price"
                    type='number'
                    step="any"
                    required
                /> <br />
                <input
                    className='input border w-[50%] border-gray-800 m-2 bg-white text-black'
                    {...register("classimage")}
                    placeholder="Photo URL"
                    type='text'
                    required
                />
                <input
                    className='input border w-[50%] border-gray-800 m-2 bg-white text-black'
                    {...register("availableseats")}
                    placeholder="Available seats"
                    type='number'
                    step="any"
                    required
                /> <br />
                <input
                    className='input border w-[50%] h-20 border-gray-800 m-2 bg-white text-black'
                    {...register("details")}
                    placeholder="Write something about your Class..."
                    type='text'
                    required
                /> <br />
                <input className='btn btn-success border w-[50%] border-gray-800 mt-4' type="submit" value="Add Class" />
            </form>
        </div>
    );
};

export default AddClass;