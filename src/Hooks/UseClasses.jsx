import { useQuery } from '@tanstack/react-query';
import React from 'react';

const UseClasses = () => {
    const {data: classes = [], isLoading: loading, refetch} = useQuery({
        queryKey: ['menu'],
        queryFn: async() => {
            const res = await fetch(`https://summer-camp-school-server-mocha.vercel.app/class`);
            return res.json();
        }
    })

    return [classes, loading, refetch]
};

export default UseClasses;