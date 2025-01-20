import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
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

  const handleGoogle = (navigate) => {
    setLoading(true);
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
        toast.success("Google Sign in successfully");
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  const signInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };





  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async currentUser => {
      console.log('CurrentUser-->', currentUser?.email, currentUser?.displayName, currentUser?.photoURL);
      //  console.log('role-->', role);
      if (currentUser?.email) {
        setUser(currentUser)
        // save user info in db
        const res =await axios.post(
          `${import.meta.env.VITE_API_URL}/users/${currentUser?.email}`,
          {
            email: currentUser?.email,
            name: currentUser?.displayName,
            image: currentUser?.photoURL,
            role: 'admin',
           


          }

        )


         console.log(res.data?.message);
        
        // Get JWT token
        await axios.post(
          `${import.meta.env.VITE_API_URL}/jwt`,
          {
            email: currentUser?.email,
          },
          { withCredentials: true }
        )
      } else {
        setUser(currentUser)
        await axios.get(`${import.meta.env.VITE_API_URL}/logout`, {
          withCredentials: true,
        })
      }
      setLoading(false)
    })
    return () => {
      return unsubscribe()
    }
  }, [])



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
      
      }}
    >
      {children}
    </ContextProvider.Provider>
  );
};

export default AuthProvider;
