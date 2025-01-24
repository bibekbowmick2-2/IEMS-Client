import React, { useContext } from "react";
import { Sidebar } from "flowbite-react";
// import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser } from "react-icons/hi";
import { HiChartPie, HiInbox,HiTable} from "react-icons/hi";
import { Link, Links, Outlet } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";
import { ContextProvider } from "../AuthProviders/AuthProvider";
import useTutor from "../../hooks/useTutor";


const SidebarLayout = () => {
   const [isAdmin] = useAdmin();
   const [isTutor] = useTutor();
   const {user}= useContext(ContextProvider);
  return (
    <div className="flex h-full ">
      <div className="w-64 min-h-[100vh]   text-white">
        <Sidebar aria-label="Sidebar with multi-level dropdown example">
        {
          isAdmin && <Sidebar.Items >
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









        {
            isTutor && <Sidebar.Items>
            <Sidebar.ItemGroup>

            
              <Link to="createstudysession">
                <Sidebar.Item icon={HiChartPie}>Create study session</Sidebar.Item>
              </Link>
              <Link to="viewstudysession">
                <Sidebar.Item icon={HiInbox}>View all study sessions(Tutor)</Sidebar.Item>
              </Link>
              <Link to="uploadmaterials">
                <Sidebar.Item icon={HiTable}>Upload materials </Sidebar.Item>
              </Link>
              <Link to="viewmaterials">
                <Sidebar.Item icon={HiTable}>View all materials</Sidebar.Item>
              </Link>
        
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        }





         <Sidebar.Items>
            <Sidebar.ItemGroup>

            
              <Link to="bookedsession">
                <Sidebar.Item icon={HiChartPie}>View booked session</Sidebar.Item>
              </Link>
              <Link to="createnote">
                <Sidebar.Item icon={HiInbox}>Create note</Sidebar.Item>
              </Link>
              <Link to="managenotes">
                <Sidebar.Item icon={HiTable}>Manage Personal Notes </Sidebar.Item>
              </Link>
              <Link to="viewtutormaterials">
                <Sidebar.Item icon={HiTable}>View all tutor materials</Sidebar.Item>
              </Link>
        
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        





          
        </Sidebar>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-indigo-400">
      <div className="navbar ">
  <div className="flex-1">
  {
    isAdmin && <a className="btn btn-ghost text-5xl font-extrabold italic">Admin Panel</a>

  }

  {
    isTutor && <a className="btn btn-ghost text-5xl font-extrabold italic">Tutor Panel</a>
    
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

          <div className="mt-10 p-20">
          {isTutor &&  <p className="text-center front-extrabold text-3xl ">The TutorPanel is a dynamic and user-friendly platform designed to streamline the experience for tutors managing their teaching sessions and interacting with students. It empowers tutors by providing essential features like session creation, class scheduling, and student registration tracking, all within an intuitive interface. </p>}
          {isAdmin && <p className="text-center front-extrabold text-3xl ">The AdminPanel is a powerful and centralized platform tailored for administrators to efficiently oversee and manage the operations of an educational system or organization. It offers a wide range of features, including user role management, session approval, fee customization, and comprehensive reporting tools, ensuring smooth coordination between tutors, students, and the system's functionalities. With enhanced security and role-based access control, administrators can maintain oversight while ensuring data integrity and user privacy.</p>}
          </div>
                <Outlet></Outlet>
            </div>
    </div>
  );
};

export default SidebarLayout;
