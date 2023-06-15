import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';
import { Link } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';

const PaymentHistory = () => {

    const [payments, setPayments] = useState([])
    const {user} = useContext(AuthContext);

    useEffect(()=>{
        fetch(`http://localhost:5000/payment/${user?.email}`)
        .then(res=>res.json())
        .then(data => setPayments(data))
    },[])

    return (
        <div>
            <div className="w-full">
                <table className="table w-full text-center">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>ClassName</th>
                            <th>Price</th>
                            <th>Transaction id</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            payments.map((item, index) => <tr
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
                                    {item.transactionId}
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;