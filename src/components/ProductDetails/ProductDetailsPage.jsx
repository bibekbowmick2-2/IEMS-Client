import React, { useContext, useEffect } from "react";
import "./ProductDetailsPage.css";
//import dragonbg from '../../assets/shoe_1.jpg'
import { Link, useLoaderData, useNavigate, useParams } from "react-router-dom";
import { ContextProvider } from "../AuthProviders/AuthProvider";
import Animation from "./Animation.json";
import Lottie from "lottie-react";
import useAdmin from "../../hooks/useAdmin";
import useTutor from "../../hooks/useTutor";
import axios from "axios";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

const ProductDetailsPage = () => {
  

  const [isAdmin] = useAdmin();
  const [isTutor] = useTutor();
  const navigate = useNavigate();
  //const {user,handleComment} = useContext(ContextProvider);
  const { user} = useContext(ContextProvider);
   

  const games = useLoaderData();

  const { id } = useParams();
  console.log(id);

  // Find the specific product based on the ID
  const product = games.find((game) => game._id === id);

  const currentDate = new Date();
  const isRegistrationOpen = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return currentDate > start && currentDate < end;
  };



  const { data: comments = [], refetch } = useQuery({
    queryKey: ["comments"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/commentm/${product._id}`);
      console.log(res);
      console.log(res.data);
      return res.data;
    },
  });


  useEffect(() => {

    refetch();
  }, [refetch]);



  const handleBook = (bookedsession, navigate) => {
    axios
      .post(`${import.meta.env.VITE_API_URL}/bookings`, bookedsession)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: `${bookedsession?.session_title} booked by ${user?.displayName}!`,
            showConfirmButton: false,
            timer: 2000,
          });
  
          navigate("/"); // Redirect after successful booking
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "You have already booked this session!",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Booking Failed",
            text: "Something went wrong. Please try again later.",
          });
        }
      });
  };



  const handleComment = (e, navigate, id) => {
    e.preventDefault();
  
    const comment = e.target.comment.value;
    const comment_information = {
      comment,
      email: user?.email,
      displayName: user?.displayName,
      photoURL: user?.photoURL.replace(/"/g, ""),
      productId: id,
    };

  
  
    axios
      .post(`${import.meta.env.VITE_API_URL}/comment`, comment_information)
      .then((response) => {
        if (response.data.insertedId) {
          toast.success("Review added successfully");
          refetch();
          // navigate("/gameWatchList");
        }
      })
      .catch((error) => {
        console.error("Error posting review:", error);
        toast.error("Failed to add review. Please try again.");
      });
  };
  

  


  if (!product) {
    return (
      <div className="container mx-auto py-10 text-center text-red-500">
        <h1>Session Not Found</h1>
      </div>
    );
  }

  // React.useEffect(() => {
  //  const fetchComments = async () => {
  //   try {
  //     const response = await axios.get(`${import.meta.env.VITE_API_URL}/comment/${product._id}`);
  //     const data = await response.json();
  //     console.log(data);
  //     setComments(data);

  //  }
  //  catch(error) {
  //   console.log(error);
  //  }
  //  }

  //  fetchComments();
  // }, [comments]);

  return (
    <div className="card1-wrapper">
      <div className="card1 card2">
        {/* Card Left */}

        <div className="max-w-[900px] max-h-[900px]">
          <Lottie animationData={Animation} loop={true} />
        </div>

        {/* Card Right */}
        <div className="product-content bg-cyan-300 rounded-lg ">
          <h2 className="product-title text-color">{product.session_title}</h2>
          {/* <a href="#" className="product-link">
            Visit Nike Store
          </a> */}
          <div className="product-rating">
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star-half-alt"></i>
            {/* <span className="bg-white p-2 rounded-full ">4.{product.rating}</span> */}
          </div>

          <div className="product-price">
            {/* <p className="last-price text-color">
              Old Price: <span>$257.00</span>
            </p>
            <p className="new-price text-color">
              New Price: <span>$249.00 (5%)</span>
            </p> */}
          </div>

          <div className="product-detail">
            <h2 className="text-slate-100">About this session:</h2>
            <p className="text-color">Description: {product.description}</p>

            <ul className="text-color">
              <li>
                Registration start date : <span>{product.start_date}</span>
              </li>
              <li>
                Registration end date: {product.end_date} <br />
              </li>

              <li>
                Class start date: {product.class_start_date} <br />
              </li>

              <li>
                Class end date: {product.class_end_date} <br />
              </li>

              <li>
                Duration: {product.duration} hours <br />
              </li>

              <li>
                Registration Fee: {product.fee} Tk <br />
              </li>

              {/* <button className="btn" disabled>Pookie</button> */}


              {
                isAdmin &&  isTutor ?(<li>

                  <button className="btn btn-neutral" disabled >Book Now</button>

                </li>):
                <li>
                { isRegistrationOpen(product.start_date, product.end_date) ? (
                  <button className="btn btn-neutral " 
                  onClick={() => handleBook( product, navigate)}>Book Now</button>
                ) : (
                  <button
                    style={{
                      size: "lg",
                      color: "gray",
                      className: "opacity-50 cursor-not-allowed",
                      
                      disabled: true,
                    }}
                    className="btn "
                  >
                    Registration Closed
                  </button>
                )}
              </li>

              }

              
            </ul>
          </div>

          

      

           <form onSubmit={(e) => handleComment(e,navigate,product._id)}>
   <div class="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
       <div class="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800 ">
           <label for="comment" class="sr-only text-lime-400">Your Review</label>
           
        
        
           <textarea id="comment" rows="4" name="comment" class="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Write a review..." required ></textarea>
          
       </div>
       <div class="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
       
           <button type="submit" class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
               Post Review
           </button>
       
           
          
       </div>
   </div>
</form> 

          <p class="ms-auto text-xs text-gray-500 dark:text-gray-400">
            Remember, contributions to this topic should follow our{" "}
            <a
              href="#"
              class="text-blue-600 dark:text-blue-500 hover:underline"
            >
              Community Guidelines
            </a>
            .
          </p>

          <div class="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div class="flex items-center justify-between mb-4">
              <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">
                Latest Reviews
              </h5>
            </div>
            <div class="flow-root">
        <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
        {
          
          comments.map(comment => <li class="py-3 sm:py-4">
                <div class="flex items-center">
                    <div class="flex-shrink-0">
                        <img class="w-8 h-8 rounded-full" src={comment?.photoURL} alt="Neil image"/>
                    </div>
                    <div class="flex-1 min-w-0 ms-4">
                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                           {}
                        </p>
                        <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                            {comment?.email}
                        </p>

   
                        <p class="text-sm text-gray-900 truncate dark:text-gray-400">
                            Comment: {comment?.comment}
                        </p>
                    </div>
                    
                </div>
            </li>)
        }
            
            
        </ul>
   </div>
          </div>

          <div className="social-links">
            <p className="text-color">Share At: </p>
            <a href="#">
              <i className="fab fa-facebook-f  text-indigo-600 "></i>
            </a>
            <a href="#">
              <i className="fab fa-twitter text-indigo-600"></i>
            </a>
            <a href="#">
              <i className="fab fa-instagram text-indigo-600"></i>
            </a>
            <a href="#">
              <i className="fab fa-whatsapp text-indigo-600"></i>
            </a>
            <a href="#">
              <i className="fab fa-pinterest text-indigo-600"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
