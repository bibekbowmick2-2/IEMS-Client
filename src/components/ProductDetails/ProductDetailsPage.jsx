import React, { useContext } from "react";
import "./ProductDetailsPage.css";
//import dragonbg from '../../assets/shoe_1.jpg'
import { Link, useLoaderData, useNavigate, useParams } from "react-router-dom";
import { ContextProvider } from "../AuthProviders/AuthProvider";
import Animation from "./Animation.json";
import Lottie from "lottie-react";
import useAdmin from "../../hooks/useAdmin";
import useTutor from "../../hooks/useTutor";

const ProductDetailsPage = () => {
  const {isAdmin} = useAdmin();
  const {isTutor} = useTutor();
  const navigate = useNavigate();
  //const {user,handleComment} = useContext(ContextProvider);
  const { user } = useContext(ContextProvider);
  // const [comments, setComments] = React.useState([]);

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
  //     const response = await fetch(`https://server-tech-tales.vercel.app/comment/${product._id}`);
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
        <div className="product-content bg-gray-600 rounded-lg ">
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

              <li>
                {!isAdmin && !isTutor && isRegistrationOpen(product.start_date, product.end_date) ? (
                  <button className="btn btn-accent">Book Now</button>
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
            </ul>
          </div>

          {/* {user?.email === product?.email && (
              <div className="flex gap-14">
                <Link to={`/update/${product._id}`} className="btn btn-primary">
                  Update
                </Link>

                
              </div>
            )} */}

          {/* <div className="purchase-info">
            <input type="number" min="0" value="1" />
            <button type="button" className="btn" onClick={() => handleAddToWatchList(product,navigate,user.email)}>
              Add to WatchList <i className="fas fa-shopping-cart"></i>
            </button>
          
          </div> */}

          {/* <form onSubmit={(e) => handleComment(e,navigate,product._id)}>
   <div class="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
       <div class="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800 ">
           <label for="comment" class="sr-only text-lime-400">Your comment</label>
           {
            user?.email==product?.email ?
            <textarea disabled  id="comment" rows="4" name="comment" class="w-full px-0 text-lg text-lime-500 font-extrabold bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 " placeholder="You can not add Comment on your own blog" required ></textarea>
           :<textarea id="comment" rows="4" name="comment" class="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Write a comment..." required ></textarea>}
          
       </div>
       <div class="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
       {
        user?.email==product?.email ?
        <button type="submit" disabled class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
               Can Not Post comment
           </button>:
           <button type="submit" class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
               Post comment
           </button>
       }
           
          
       </div>
   </div>
</form> */}

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
                Latest Comments
              </h5>
            </div>
            {/* <div class="flow-root">
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
   </div> */}
          </div>

          <div className="social-links">
            <p className="text-color">Share At: </p>
            <a href="#">
              <i className="fab fa-facebook-f  text-green-400 "></i>
            </a>
            <a href="#">
              <i className="fab fa-twitter text-green-400"></i>
            </a>
            <a href="#">
              <i className="fab fa-instagram text-green-400"></i>
            </a>
            <a href="#">
              <i className="fab fa-whatsapp text-green-400"></i>
            </a>
            <a href="#">
              <i className="fab fa-pinterest text-green-400"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
