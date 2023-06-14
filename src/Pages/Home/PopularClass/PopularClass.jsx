import React from 'react';
import UseClasses from '../../../Hooks/UseClasses';

const PopularClass = () => {

    const [classes] = UseClasses();
    const approvedClasses = classes.filter(c => c.status = 'approved')
    console.log(approvedClasses)

    return (
        <div className='mt-28'>
            <h1 className='text-center text-4xl font-bold mb-10'>Pupular Classes</h1>
            <div className='grid grid-cols-1'>
                {
                    approvedClasses.map(c => <div key={c?._id}>
                        <div className='w-[70%] mx-auto'>
                            <div className="hero-content flex-col lg:flex-row-reverse">
                                <img src={c?.classimage} className="w-96 rounded-lg shadow-2xl" />
                                <div>
                                    <h1 className="text-2xl font-bold">{c?.classname}</h1>
                                    <p className="py-6">{c?.details.slice(0, 100)}...<span className='btn btn-link'>View Details</span></p>

                                </div>
                            </div>
                        </div>
                    </div>)
                }
            </div>

        </div>
    );
};

export default PopularClass;