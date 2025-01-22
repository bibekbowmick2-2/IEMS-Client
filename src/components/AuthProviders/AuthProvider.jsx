import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
  GithubAuthProvider 
} from "firebase/auth";
import auth from "../../firebase.init";
import axios from 'axios'
// import Swal from "sweetalert2";
import { data } from "react-router-dom";
import { toast } from 'react-toastify';


export const ContextProvider = createContext();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const provider = new GoogleAuthProvider();
  const provider2 = new GithubAuthProvider();
  const [passwordError, setPasswordError] = useState("");
 

 


  const handleSubmit = async (event, navigate) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;
    const role = form.role.value;
    
    console.log(name, email, photo, password, role);
    
      setLoading(true);
     

    

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

     
      const user = userCredential.user;

      // Update user profile with additional data
      await updateProfile(user, {
        displayName: name,
        photoURL: photo,
  
      }
       );


       const res =await axios.post(
        `${import.meta.env.VITE_API_URL}/users/${user?.email}`,
        {
          email: user?.email,
          name: user?.displayName,
          image: user?.photoURL,
          role: 'student',
         


        }

      )
       console.log(res.data?.message);



      


      // setLoading(false);
      toast.success("User created successfully");

      console.log("Signed up User", user);
      navigate("/");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
       toast.error(errorMessage);
      console.error("Error during sign-up", errorCode, errorMessage);
    }finally
    {
      setLoading(false);
    }

  };

  const handleSubmit2 =  async(e, navigate) => {
    e.preventDefault();
   
    const email = e.target.email.value;
    const password = e.target.password.value;
    setLoading(true);
  

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
       
       setLoading(false);
        console.log("Signed in  User", user);
        toast.success("User logged in successfully");
        navigate("/");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
         
      }

      
      )
  };

  

  const handleGoogle = async (navigate) => {
    setLoading(true);
  
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user; // Use the returned user directly
      console.log("Signed in Google:", user);
  
      // Save user to DB
      await axios.post(
        `${import.meta.env.VITE_API_URL}/users/${user.email}`,
        {
          email: user.email,
          name: user.displayName,
          image: user.photoURL,
          role: "student",
        }
      );
  
      toast.success("Google Sign in successfully");
      navigate("/");
  
    } catch (error) {
      console.error("Google Sign-in Error:", error);
      toast.error("Google Sign-in failed");
    } finally {
      setLoading(false);
    }
  };
  



  const handleGithub = async (navigate) => {
    setLoading(true);
  
    try {
      // Sign in with GitHub popup
      const result = await signInWithPopup(auth, provider2);
      const user = result.user; // Use the returned user directly
      console.log("Signed in with GitHub:", user);
  
      // Save user to DB
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/${user.email}`,
        {
          email: user.email,
          name: user.displayName,
          image: user.photoURL,
          role: "student",
        }
      );
      console.log(res.data?.message);
  
      toast.success("GitHub Sign in successfully");
      navigate("/");
  
    } catch (error) {
      console.error("GitHub Sign-in Error:", error);
      toast.error("GitHub Sign-in failed");
    } finally {
      setLoading(false);
    }
  };

  

  const signInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };




  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log("Auth State Changed:", currentUser);
  
      if (currentUser) {
        setUser(currentUser); // Update user state
        try {
          // Save user info to DB and get JWT
          await axios.post(
            `${import.meta.env.VITE_API_URL}/jwt`,
            { email: currentUser.email },
            { withCredentials: true }
          );
        } catch (error) {
          console.error("Error during JWT token retrieval:", error);
        }
      } else {
        setUser(null); // Clear user state
        try {
          await axios.get(`${import.meta.env.VITE_API_URL}/logout`, {
            withCredentials: true,
          });
        } catch (error) {
          console.error("Error during logout:", error);
        }
      }
  
      setLoading(false); // Stop loading
    });
  
    return () => unsubscribe();
  }, []);
  


  return (
    <ContextProvider.Provider
      value={{
        handleGoogle,
        handleSubmit,
        handleSubmit2,
        signInUser,
        signOutUser,
        loading,
        user,
        passwordError,
        handleGithub
      
      }}
    >
      {children}
    </ContextProvider.Provider>
  );
};

export default AuthProvider;
