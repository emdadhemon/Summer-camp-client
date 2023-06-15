import React from 'react';
import useCart from '../../../Hooks/UseCart';

const EnrolledClasses = () => {
    const [cart] = useCart()
    const enrolled = cart.filter(c => c.paid === true);
    return (
        <div className='mt-20'>
            <div className='grid grid-cols-2 gap-4'>
                {
                    enrolled.map(e => <div >
                        <div className="card bg-base-600 shadow-xl">
                            <figure><img className='h-48' src={e?.classimage} alt="Shoes" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">
                                    {e?.classname}                                </h2>
                                <div className="card-actions justify-end">
                                    <div className="badge badge-outline mt-6">Yoga</div>
                                </div>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default EnrolledClasses;