

import ErrorPage from "../components/ErrorPage/ErrorPage";
import Root from "../components/Root/Root";
import { createBrowserRouter } from "react-router-dom";
import Home from "../components/Home";
import Login from "../components/Login";
import Register from "../components/Register";
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
    path: "*",
    element: <ErrorPage />,
  },

 

 
    
]);

export default router;
