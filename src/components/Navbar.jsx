import React from 'react'
import im1 from '../assets/earlnapp_logo.png'
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar ">
    <div className="navbar-start">
      <div className="dropdown">
        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h8m-8 6h16" />
          </svg>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
          <li><a>Home</a></li>
          <Link to='/login'><li><a>Login</a></li></Link>
      
          <Link to='/register'><li><button className='btn btn-neutral'>Register</button></li></Link>
     
        </ul>
      </div>
      <img src={im1} className='w-[80px] md:w-[120px] lg:w-[150px]' alt="" />
    </div>
    <div className="navbar-center hidden lg:flex">
      <ul className="menu menu-horizontal px-1">
        <li><a>Home</a></li>
        
        <Link to='/login'><li><a>Login</a></li></Link>
        <Link to='/register'><li><a>Register</a></li></Link>
  
        {/* <li><a>Signup</a></li> */}
      </ul>
    </div>
    <div className="navbar-end flex gap-2">
     <button className='btn btn-secondary'>Login</button>
     
    </div>
  </div>
  )
}
