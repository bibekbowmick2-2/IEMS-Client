import React, { useContext } from 'react'
import { ContextProvider } from '../../AuthProviders/AuthProvider'
import Swal from 'sweetalert2'
import { useNavigate,useLocation } from 'react-router-dom';
import { axiosSecure } from '../../../hooks/useAxiosSecure';

export default function CreateStudysession() {
    const {user} = useContext(ContextProvider);
    const navigate = useNavigate();
    const handleformsubmit = (event) => {
        event.preventDefault();
        if (user && user?.email) {
            //send cart item to the database
            event.preventDefault();
            const form = event.target;
            const email = form.email.value;
            const session_title = form.session_title.value;
            const tutorname = form.tutorname.value;
            const description = form.description.value;
            const start_date = form.start_date.value;
            const end_date = form.end_date.value;
            const class_start_date = form.class_start_date.value;
            const class_end_date = form.class_end_date.value;
            const duration = form.duration.value;
            const fee = form.fee.value;
            const status = form.status.value;

            const session_data = { email, session_title, tutorname, description, start_date, end_date, class_start_date, class_end_date, duration, fee,status }



           
            axiosSecure.post('/create-session', session_data)
                .then(res => {
                    console.log(res.data)
                    if (res.data.insertedId) {
                        form.reset();
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: `${user?.displayName} added a session`,
                            showConfirmButton: false,
                            timer: 2000,
                        });
                        // refetch cart to update the cart items count
                        // refetch();
                    }

                })
        }
        else {
            
            Swal.fire({
                title: "You are not Logged In",
                text: "Please login to add a session as a tutor",
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
    <h1 className='text-5xl font-extrabold text-center mt-10'> Create Study Session</h1>

    

<form class="max-w-lg mx-auto mt-4 " onSubmit={handleformsubmit}>
  <div class="relative z-0 w-full mb-5 group ">
      <input type="email" readOnly name="email" defaultValue={user?.email} id="email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label for="email" class="peer-focus:font-medium absolute text-sm text-gray-700 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Tutor Email address</label>
  </div>
  
  <div class="grid md:grid-cols-2 md:gap-6">
    <div class="relative z-0 w-full mb-5 group">
        <input type="text" name="session_title" id="session_title" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label for="session_title" class="peer-focus:font-medium absolute text-sm text-gray-700 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Session Title</label>
    </div>
    <div class="relative z-0 w-full mb-5 group">
        <input type="text" readOnly defaultValue={user?.displayName}  name="tutorname" id="tutorname" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label for="tutorname" class="peer-focus:font-medium absolute text-sm text-gray-700 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Tutor Name</label>
    </div>
  </div>

  <div class="relative z-0 w-full mb-5 group">
    
<label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
<textarea id="message" name='description' rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-indigo-300 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-900 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>

  </div>



  <div class="grid md:grid-cols-2 md:gap-6">
    <div class="relative z-0 w-full mb-5 group">
        <input type="date" name="start_date" id="start_date" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label for="start_date" class="peer-focus:font-medium absolute text-sm text-gray-700 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Registration Start Date</label>
    </div>
    <div class="relative z-0 w-full mb-5 group">
        <input type="date" name="end_date" id="end_date" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label for="end_date" class="peer-focus:font-medium absolute text-sm text-gray-700 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Registration End Date</label>
    </div>
  </div>



  <div class="grid md:grid-cols-2 md:gap-6">
    <div class="relative z-0 w-full mb-5 group">
        <input type="date" name="class_start_date" id="class_start_date" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label for="class_start_date" class="peer-focus:font-medium absolute text-sm text-gray-700 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Class Start Date</label>
    </div>
    <div class="relative z-0 w-full mb-5 group">
        <input type="date" name="class_end_date" id="class_end_date" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label for="class_end_date" class="peer-focus:font-medium absolute text-sm text-gray-700 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Class End Date</label>
    </div>
  </div>


  <div class="grid md:grid-cols-2 md:gap-6">
    <div class="relative z-0 w-full mb-5 group">
        <input type="text" name="duration" id="duration" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label for="duration" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Session Duration(Hours)</label>
    </div>
    <div class="relative z-0 w-full mb-5 group">
        <input type="number" name="fee" disabled defaultValue={0} id="fee" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label for="fee" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Registration Fee</label>
    </div>
  </div>



    <div class="flex relative z-0 w-full mb-5 group">
        
        <label for="status" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ">Status</label>
        <select className='mt-2' defaultValue="" name="status" id="status">
            <option value="" disabled>Choose a status</option>
            <option value="pending">Pending</option>
            <option value="approved" disabled>Approved(❗Requires Permission)</option>
         
        </select>
    
  </div>

  <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
</form>

    
    
    
    </div>
  )
}
