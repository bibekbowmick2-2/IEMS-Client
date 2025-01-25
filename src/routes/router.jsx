

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
import CreateStudysession from "../components/DasboardComponent/TutorDasboard/CreateStudysession";
import ViewStudySession from "../components/DasboardComponent/TutorDasboard/ViewStudySession";
import UploadMaterials from "../components/DasboardComponent/TutorDasboard/UploadMaterials";
import ViewMaterials from "../components/DasboardComponent/TutorDasboard/ViewMaterials";
import PrivateTutorRoute from "../components/Routes/PrivateTutorRoute";
import PrivateRoute from "../components/Routes/PrivateRoute";
import ProductDetailsPage from "../components/ProductDetails/ProductDetailsPage";
import ViewBooked from "../components/DasboardComponent/StudentDasboard/ViewBooked";
import CreateNote from "../components/DasboardComponent/StudentDasboard/CreateNote";
import ManaeNote from "../components/DasboardComponent/StudentDasboard/ManaeNote";
import ViewTutorMaterial from "../components/DasboardComponent/StudentDasboard/ViewTutorMaterial";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
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

      

      {
        path: "/session-details/:session_title",
        element: <PrivateRoute><ProductDetailsPage/></PrivateRoute>,
        loader: () => fetch(`${import.meta.env.VITE_API_URL}/sessions`),
      }

      

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




      {
        path: "createstudysession",
        element:<PrivateTutorRoute><CreateStudysession/></PrivateTutorRoute>,
      },
      
      
      
      {
        path: "viewstudysession",
        element: <PrivateTutorRoute><ViewStudySession/></PrivateTutorRoute>,
      },
      
      
      {
        path: "uploadmaterials",
        element: <PrivateTutorRoute><UploadMaterials/></PrivateTutorRoute>,
      },
      
      {
        path: "viewmaterials",
        element:<PrivateTutorRoute><ViewMaterials/></PrivateTutorRoute>,
      },


      {
        path: "bookedsession",
        element: <PrivateRoute><ViewBooked/></PrivateRoute>,
        loader: () => fetch(`${import.meta.env.VITE_API_URL}/bookedsessionall`),
      },


      {
        path: "createnote",
        element: <PrivateRoute><CreateNote/></PrivateRoute>,
      },


      {
        path: "managenotes",
        element: <PrivateRoute><ManaeNote/></PrivateRoute>,
      },


      {
        path: "viewtutormaterials",
        element: <PrivateRoute><ViewTutorMaterial/></PrivateRoute>,
      },










      
      
      
      
      
        
      
      
    ]
  },


  {
    path: "*",
    element: <ErrorPage />,
  },

 

 
    
]);

export default router;
