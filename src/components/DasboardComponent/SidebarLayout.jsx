import React, { useContext } from "react";
import { Sidebar } from "flowbite-react";
// import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser } from "react-icons/hi";
import { HiChartPie, HiInbox,HiTable} from "react-icons/hi";
import { Link, Links, Outlet } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";
import { ContextProvider } from "../AuthProviders/AuthProvider";


const SidebarLayout = () => {
   const [isAdmin] = useAdmin();
   const {user}= useContext(ContextProvider);
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 h-screen  bg-gray-800 text-white">
        <Sidebar aria-label="Sidebar with multi-level dropdown example">
        {
          isAdmin && <Sidebar.Items>
            <Sidebar.ItemGroup>

            
              <Link to="dasboard">
                <Sidebar.Item icon={HiChartPie}>Dashboard</Sidebar.Item>
              </Link>
              {/* <Sidebar.Collapse icon={HiShoppingBag} label="E-commerce">
                <Link to="/products">
                  <Sidebar.Item>Products</Sidebar.Item>
                </Link>
                <Link to="/sales">
                  <Sidebar.Item>Sales</Sidebar.Item>
                </Link>
                <Link to="/refunds">
                  <Sidebar.Item>Refunds</Sidebar.Item>
                </Link>
                <Link to="/shipping">
                  <Sidebar.Item>Shipping</Sidebar.Item>
                </Link>
              </Sidebar.Collapse> */}
              <Link to="allusers">
                <Sidebar.Item icon={HiInbox}>All Users</Sidebar.Item>
              </Link>
              <Link to="allstudysession">
                <Sidebar.Item icon={HiTable}> All Study Session</Sidebar.Item>
              </Link>
              <Link to="allmaterials">
                <Sidebar.Item icon={HiTable}> All Materials</Sidebar.Item>
              </Link>
        
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        }
          
        </Sidebar>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
      <div className="navbar bg-base-100">
  <div className="flex-1">
  {
    isAdmin && <a className="btn btn-ghost text-5xl font-extrabold italic">Admin Panel</a>
  }
    
  </div>
  <div className="flex-none gap-2">
  <Link to= "/" className="btn btn-accent">Home </Link>
    <div className="form-control">
      <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
    </div>
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src={user?.photoURL}/>
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>
  </div>
</div>

      
                <Outlet></Outlet>
            </div>
    </div>
  );
};

export default SidebarLayout;
