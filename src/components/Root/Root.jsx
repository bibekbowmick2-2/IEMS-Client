import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';


const Root = () => {
   
    return (
        <div className='bg-[#9c9696] '>
        
            <Navbar/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default Root;