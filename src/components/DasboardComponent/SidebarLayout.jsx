import React, { useContext, useState } from "react";
import { Sidebar } from "flowbite-react";
// import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser } from "react-icons/hi";
import { HiChartPie, HiInbox, HiTable } from "react-icons/hi";
import { Link, Outlet, useNavigate } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";
import { ContextProvider } from "../AuthProviders/AuthProvider";
import useTutor from "../../hooks/useTutor";
import useStudent from "../../hooks/useStudent";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaChevronRight } from "react-icons/fa";
import { toast } from "react-toastify";

const SidebarLayout = () => {
  const [isAdmin] = useAdmin();
  const [isTutor] = useTutor();
  const [isStudent] = useStudent();
  const {signOutUser} = useContext(ContextProvider);
  const navigate = useNavigate();


  const  handleSignOut = async() =>{
     await signOutUser().then(()=>{
      navigate('/');
      toast.success('Log out successfully');
     }).catch((error)=>{
         console.log("Could not Log out successfully",error)
     })
  }

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    console.log(isSidebarOpen);
    setIsSidebarOpen(!isSidebarOpen);
  };
  const { user } = useContext(ContextProvider);




  return (
    <div className="flex lg:min-h-screen md:max-w-8xl lg:max-w-8xl">

      <div className={`flex-grow ${isSidebarOpen ? "w-64 block" : "hidden"} md:w-[45%] lg:w-[20%] bg-white absolute md:static lg:static z-10`}>

        <Sidebar className="bg-white w-full z-10">
          <h1 className="text-2xl md:text-4xl lg:text-4xl text-justify bg-purple-700 text-white font-bold p-5 rounded-xl">Earlnapp</h1>
          {
            isAdmin && <Sidebar.Items >
              <Sidebar.ItemGroup>

                {
                  isSidebarOpen && <div className="">
                    <button
                      className="btn bg-purple-700 text-white border-none z-10"
                      onClick={toggleSidebar}
                    >
                      <GiHamburgerMenu size={24} />
                    </button>
                  </div>
                }

                <Link to="dasboard" className="mb-2">
                  <Sidebar.Item className="text-purple-700 text-base font-bold "><FaChevronRight className="inline text-xl"/> Dashboard</Sidebar.Item>
                </Link>

                <Link to="allusers" className="mb-2">
                  <Sidebar.Item className="text-purple-700 text-base font-bold "><FaChevronRight className="inline text-xl"/> View All Users</Sidebar.Item>
                </Link>
                <Link to="allstudysession" className="mb-2">
                  <Sidebar.Item className="text-purple-700 text-base font-bold "><FaChevronRight className="inline text-xl"/>View All Study Session</Sidebar.Item>
                </Link>
                <Link to="allmaterials" className="mb-2">
                  <Sidebar.Item className="text-purple-700 text-base font-bold "><FaChevronRight className="inline text-xl"/>View All Materials</Sidebar.Item>
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
      <div className="w-full z-0 ">
        <div className="w-full p-5 bg-purple-700 text-white ">
          {
            !isSidebarOpen && <div className="flex">
              <button
                className="btn bg-white text-purple-700 border-none "
                onClick={toggleSidebar}
                aria-label="Toggle Sidebar"
              >
                <GiHamburgerMenu size={24} />
              </button>
            </div>
          }

          <div className="w-full flex justify-between p-3">
            <div >
              {
                isAdmin && <a className="btn btn-ghost text-2xl lg:text-4xl font-bold outfit-normal">Admin Panel</a>

              }

              {
                isTutor && <a className="btn btn-ghost text-1xl lg:text-5xl font-extrabold italic">Tutor Panel</a>

              }


              {
                isStudent && <a className="btn btn-ghost text-1xl lg:text-5xl font-extrabold italic">Student Panel of <br /> {user.displayName}</a>
              }

            </div>
            <div className="flex items-center">
              <Link to="/" className="btn btn-accent">Home </Link>

              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost  avatar">
                  <div className="w-[60px] rounded-full">
                    <img
                      className="w-[60px] rounded-full"
                      alt="Tailwind CSS Navbar component"
                      src={user?.photoURL} />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-purple-700 text-white rounded-box z-[1] mt-3 w-52 p-2 shadow">
                  <li>
                    <a className="justify-between">
                      Profile
                      <span className="badge">New</span>
                    </a>
                  </li>
                  <li><a>Settings</a></li>
                  <li><button onClick={handleSignOut}>Logout</button></li>
                </ul>
              </div>
            </div>
          </div>



        </div>

        <div className="mt-10 p-4 ">
          {isTutor && <p className="text-center front-extrabold text-1xl lg:text-3xl ">The TutorPanel is a dynamic and user-friendly platform designed to streamline the experience for tutors managing their teaching sessions and interacting with students. It empowers tutors by providing essential features like session creation, class scheduling, and student registration tracking, all within an intuitive interface. </p>}
          {isAdmin && <p className="text-center front-extrabold text-1xl lg:text-3xl ">The Admin Panel is a dynamic and user-friendly platform designed to streamline the experience for tutors managing their teaching sessions and interacting with students. It empowers tutors by providing essential features like session creation, class scheduling, and student registration tracking, all within an intuitive interface. </p>}
          {isStudent && <p className="text-center front-extrabold text-1xl lg:text-3xl ">The student panel serves as a centralized platform where students can access study sessions, manage their enrollment, and track their academic progress. It streamlines the learning process by providing an intuitive interface for easy navigation and interaction.</p>}
        </div>

        <div className="bg-gradient-to-r from-[#6DADD9] via-[#9099CD] to-[#8B9ACD]">
        <Outlet></Outlet>
        </div>
       
      </div>
    </div>
  );
};

export default SidebarLayout;
