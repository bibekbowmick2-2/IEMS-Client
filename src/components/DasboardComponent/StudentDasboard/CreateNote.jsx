import React, { useContext } from 'react'
import { ContextProvider } from '../../AuthProviders/AuthProvider'
import axios from 'axios';
import { axiosSecure } from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

export default function CreateNote() {
    const {user} = useContext(ContextProvider)
    const handleformsubmit = (event) => {
        event.preventDefault();
        if (user && user?.email) {
            //send cart item to the database
            event.preventDefault();
            const form = event.target;
            const email = form.email.value;
            const title = form.title.value;
            const description = form.description.value;

            const session_data = { email, title, description }
            

            



           
            axiosSecure.post(`${import.meta.env.VITE_API_URL}/create-note`, session_data)
                .then(res => {
                    console.log(res.data)
                    if (res.data.insertedId) {
                        form.reset();
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: `${user?.displayName} added a new note!`,
                            showConfirmButton: false,
                            timer: 1500,
                        });
                      
                    }

                })
        }
        else {
            
            Swal.fire({
                title: "You are not Logged In",
                text: "Please login to add a note as a student",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, login!"
            }).then((result) => {
                if (result.isConfirmed) {
                    //   send the user to the login page
                    navigate('/login', { state: { from: location } })
                }
            });
        }
    }
  return (
    <div>
       <p className="mb-7 text-5xl font-extrabold text-center">Create Notes</p>



       
<form class="max-w-sm mx-auto" onSubmit={ handleformsubmit}>
  <label for="website-admin" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email Address</label>
  <div class="flex">
    <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
      <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
      </svg>
    </span>
    <input type="text" name="email" defaultValue={user?.email} id="website-admin" readOnly class="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Bonnie Green"/>
  </div>


  <div class="mb-5">
      <label for="large-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
      <input type="text" name="title" id="large-input" class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
  </div>


  <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
  <textarea id="message" name="description" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a note..."></textarea>
  <button className='btn btn-primary mt-5'>Submit</button>


</form>


       
    </div>
  )
}
