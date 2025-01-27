import React, { useContext, useState } from "react";
import { Sidebar } from "flowbite-react";
// import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser } from "react-icons/hi";
import { HiChartPie, HiInbox,HiTable} from "react-icons/hi";
import { Link, Links, Outlet } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";
import { ContextProvider } from "../AuthProviders/AuthProvider";
import useTutor from "../../hooks/useTutor";
import useStudent from "../../hooks/useStudent";
import { GiHamburgerMenu } from "react-icons/gi";


const SidebarLayout = () => {
   const [isAdmin] = useAdmin();
   const [isTutor] = useTutor();
   const [isStudent] = useStudent();

   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    console.log(isSidebarOpen);
    setIsSidebarOpen(!isSidebarOpen);
  };
   const {user}= useContext(ContextProvider);


   

  return (
    <div className="flex h-full  ">
    
      <div  className={`${
          // isSidebarOpen ? "w-64" : "w-0"
          isSidebarOpen ? "block" : "hidden"
        }  w-64  h-[100vh] bg-teal-700 text-white transition-all duration-1000 absolute lg:static  `}>
      
        <Sidebar style={{
          opacity: 0.7
        }} aria-label="Sidebar with multi-level dropdown example">
        {
          isAdmin && <Sidebar.Items >
            <Sidebar.ItemGroup>

            {
        isSidebarOpen && <div className="flex-none">
            <button
              className="btn btn-primary "
              onClick={toggleSidebar}
              aria-label="Toggle Sidebar"
            >
              <GiHamburgerMenu size={24} />
            </button>
          </div>
      }

            
            
            
              <Link to="dasboard">
                <Sidebar.Item icon={HiChartPie}>Dashboard</Sidebar.Item>
              </Link>
             
              <Link to="allusers">
                <Sidebar.Item icon={HiInbox}>View All Users</Sidebar.Item>
              </Link>
              <Link to="allstudysession">
                <Sidebar.Item icon={HiTable}>View All Study Session</Sidebar.Item>
              </Link>
              <Link to="allmaterials">
                <Sidebar.Item icon={HiTable}>View All Materials</Sidebar.Item>
              </Link>
        
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        }









        {
            isTutor && <Sidebar.Items>
            <Sidebar.ItemGroup>

            {
        isSidebarOpen && <div className="flex-none">
            <button
              className="btn btn-primary "
              onClick={toggleSidebar}
              aria-label="Toggle Sidebar"
            >
              <GiHamburgerMenu size={24} />
            </button>
          </div>
      }

            
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

              <Link to="rejectedfeedback">
                <Sidebar.Item icon={HiTable}>Rejected Sessions Feedback</Sidebar.Item>
              </Link>
        
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        }




{
  isStudent && <Sidebar.Items>
            <Sidebar.ItemGroup>
            {
        isSidebarOpen && <div className="flex-none">
            <button
              className="btn btn-outline btn-ghost"
              onClick={toggleSidebar}
              aria-label="Toggle Sidebar"
            >
              <GiHamburgerMenu size={24} />
            </button>
          </div>
      }

            
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
}
         
        





          
        </Sidebar>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-indigo-400">
      
      <div className="navbar ">

      {
        !isSidebarOpen && <div className="flex-none">
            <button
              className="btn btn-outline btn-ghost "
              onClick={toggleSidebar}
              aria-label="Toggle Sidebar"
            >
              <GiHamburgerMenu size={24} />
            </button>
          </div>
      }

      
      
      
    <div className="flex gap-0 lg:gap-72"> 

  <div >
  {
    isAdmin && <a className="btn btn-ghost text-1xl lg:text-5xl font-extrabold italic">Admin Panel</a>

  }

  {
    isTutor && <a className="btn btn-ghost text-1xl lg:text-5xl font-extrabold italic">Tutor Panel</a>
    
  }


  {
    isStudent && <a className="btn btn-ghost text-1xl lg:text-5xl font-extrabold italic">Student Panel of <br/> {user.displayName}</a>
  }
    
  </div>
  <div className="flex flex-row">
  <Link to= "/" className="btn btn-accent">Home </Link>
    

  


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



</div>

          <div className="mt-10 p-10">
          {isTutor &&  <p className="text-center front-extrabold text-1xl lg:text-3xl ">The TutorPanel is a dynamic and user-friendly platform designed to streamline the experience for tutors managing their teaching sessions and interacting with students. It empowers tutors by providing essential features like session creation, class scheduling, and student registration tracking, all within an intuitive interface. </p>}
          {isAdmin && <p className="text-center front-extrabold text-1xl lg:text-3xl  ">The AdminPanel is a powerful and centralized platform tailored for administrators to efficiently oversee and manage the operations of an educational system or organization. It offers a wide range of features, including user role management, session approval, fee customization, and comprehensive reporting tools, ensuring smooth coordination between tutors, students, and the system's functionalities. With enhanced security and role-based access control, administrators can maintain oversight while ensuring data integrity and user privacy.</p>}
          {isStudent && <p  className="text-center front-extrabold text-1xl lg:text-3xl ">The student panel serves as a centralized platform where students can access study sessions, manage their enrollment, and track their academic progress. It streamlines the learning process by providing an intuitive interface for easy navigation and interaction.</p>}
          </div>
                <Outlet></Outlet>
            </div>
    </div>
  );
};

export default SidebarLayout;
