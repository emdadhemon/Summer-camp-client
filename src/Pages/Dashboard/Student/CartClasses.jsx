import React from 'react';
import useCart from '../../../Hooks/UseCart';
import { Link } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';

const CartClasses = () => {

    const [cart, refetch] = useCart();

    const total = cart.reduce((sum, item) => parseFloat(item.price) + sum, 0);

    const handleDelete = item => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://summer-camp-school-server-mocha.vercel.app/carts/${item._id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            refetch();
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                    })
            }
        })
    }
    const carts = cart.filter(c => c.paid !== true)

    return (
        <div className="w-full ms-12">
            <div className="uppercase font-semibold h-[60px] flex justify-between items-center">
                <h3 className="text-3xl">Total Items: {carts.length}</h3>
            </div>
            <div className="w-full">
                <table className="table w-full text-center">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>ClassName</th>
                            <th>Price</th>
                            <th>Pay</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            carts.map((item, index) => <tr
                                key={item._id}
                            >
                                <td>
                                    {index + 1}
                                </td>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={item.classimage} />
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {item.classname}
                                </td>
                                <td>${item.price}</td>
                                <td>
                                    <Link to={`/dashboard/payment/${item?._id}`}>
                                        <button className="btn btn-warning btn-sm">PAY</button>
                                    </Link>
                                </td>
                                <td>
                                    <button onClick={() => handleDelete(item)} className="btn btn-ghost bg-red-600  text-white"><FaTrashAlt></FaTrashAlt></button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CartClasses;