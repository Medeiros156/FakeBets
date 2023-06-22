import React from 'react';

export default function TestComponent({ test }) {
    return (
        <div>
            <h1 className='bg-green-500'> test </h1>
            <h1>{test}</h1>
        </div>
    )
}