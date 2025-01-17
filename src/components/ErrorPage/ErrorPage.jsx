import React from 'react';
import { NavLink } from 'react-router-dom';

const ErrorPage = () => {

    const containerStyle = {
        display: 'flex',

        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Center vertically within the viewport
      };
    return (
        <div style={containerStyle}>
        <h1 className='text-9xl text-red-700 font-bold'> 404 page</h1>
        <NavLink to='/'>
        <button className='btn bg-green-500'>Go to home</button>
        </NavLink>
         
        </div>
    );
};

export default ErrorPage;


