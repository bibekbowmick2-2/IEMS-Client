import  { useContext } from 'react'
import im1 from '../assets/earlnapp_logo.png'
import { Link } from "react-router-dom";
import { ContextProvider } from './AuthProviders/AuthProvider';
import { Tooltip as ReactTooltip } from "react-tooltip";
import { toast } from 'react-toastify';

export default function Navbar() {
  const { user, signOutUser} = useContext(ContextProvider);
  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        // Sign-out successful.
        toast.success("Sign-out successfully");
        console.log("sign out");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="bg-[#FFFFFF] z-10 navbar fixed top-0 text-gray-800 outfit-normal  ">
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
          <li className='font-bold text-xl outfit-normal'><a>Home</a></li>
          {
            !user&&<>
              <Link to='/login'><li className='font-bold text-xl outfit-normal'><a>Login</a></li></Link>
      
          <Link to='/register'><li className='font-bold text-xl outfit-normal'><a>Register</a></li></Link>
            </>
          }


          {
            user&&<> 
            <Link to='/dasboard'><li className='font-bold text-xl outfit-normal'><a>Dashboard</a></li></Link>
            </>
          }
          
     
        </ul>
      </div>
      <div><img src={im1} className='w-[80px] md:w-[120px] lg:w-[150px]' alt="" /></div>
    </div>
    <div className="navbar-center hidden lg:flex">
      <ul className="menu menu-horizontal px-1">
      <Link to='/'><li className='font-bold text-xl outfit-normal'><a>Home</a></li></Link>
        
       {
            !user&&<>
              <Link to='/login'><li className='font-bold text-xl outfit-normal'><a>Login</a></li></Link>
      
          <Link to='/register'><li className='font-bold text-xl outfit-normal'><a>Register</a></li></Link>
            </>
          }


          {
            user&&<> 
            <Link to='/sidebar'><li className='font-bold text-xl outfit-normal'><a>Dashboard</a></li></Link>
            </>
          }
  
        {/* <li><a>Signup</a></li> */}
      </ul>
    </div>
    <div className="navbar-end flex gap-2">
     {/* <button className='btn btn-secondary'>Login</button> */}

     {user ? (
          <>
            <button data-tooltip-id="my-tooltip-2" className=" lg:btn mr-2 text-[12px]">
              {user?.email}
              <br/>{user?.displayName}
            </button>
            <ReactTooltip
              id="my-tooltip-2"
              place="left-start"
              variant="info"
              content=<>
                <div className="avatar z-10">
                  <div className="w-24 rounded-full">
                    <img src={user?.photoURL.replace(/"/g, "")} />
                  </div>
                </div>

                
              </>
            />

            
            <a className="btn" onClick={handleSignOut}>
              Sign Out
            </a>
          </>
        ) : (
          <>
            {/* <li>
              <NavLink to="/login">Login</NavLink>
            </li> */}
            {/* <li>
              <NavLink to="/registration">Registration</NavLink>
            </li> */}

            

            
          </>
        )}
     
    </div>
  </div>
  )
}
