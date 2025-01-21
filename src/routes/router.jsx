

import ErrorPage from "../components/ErrorPage/ErrorPage";
import Root from "../components/Root/Root";
import { createBrowserRouter } from "react-router-dom";
import Home from "../components/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import Dasboard from "../components/DasboardComponent/Dasboard";
import AllStudySession from "../components/DasboardComponent/AllStudySession";
import AllMaterials from "../components/DasboardComponent/AllMaterials";
import AllUsers from "../components/DasboardComponent/AllUsers";
import SidebarLayout from "../components/DasboardComponent/SidebarLayout";
import AdminRoute from "../components/Routes/AdminRoute";
const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home/>
      },


      {
        path: "/login",
        element: <Login />,
      },


      {
        path: "/register",
        element: <Register/>,
      },

      

    ],
    
  },



  

  {
    path: "/sidebar",
    element:<SidebarLayout/>,
    children: [
      
      {
        path: "dasboard",
        element:<AdminRoute><Dasboard/></AdminRoute>,
      },
      
      
      
      {
        path: "allusers",
        element: <AdminRoute><AllUsers/></AdminRoute>,
      },
      
      
      {
        path: "allstudysession",
        element: <AdminRoute><AllStudySession/></AdminRoute>,
      },
      
      {
        path: "allmaterials",
        element:<AdminRoute><AllMaterials/></AdminRoute>,
      },
      
      
      
      
        
      
      
    ]
  },


  {
    path: "*",
    element: <ErrorPage />,
  },

 

 
    
]);

export default router;
