import React, { useContext } from 'react'
import { ContextProvider } from '../../AuthProviders/AuthProvider'
import Swal from 'sweetalert2'
import { useNavigate, useLocation } from 'react-router-dom';
import { axiosSecure } from '../../../hooks/useAxiosSecure';

export default function CreateStudysession() {
    const { user } = useContext(ContextProvider);
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

            const session_data = { email, session_title, tutorname, description, start_date, end_date, class_start_date, class_end_date, duration, fee, status }




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
        <div className='bg-white p-5 lg:py-[100px] z-0'>
            <div className="">
            <h1 className='text-5xl font-bold text-center text-gray-800'> Create Study Session</h1>
            <form className="max-w-full md:max-w-7xl lg:max-w-7xl mx-auto mt-4 bg-[#DDF3F0] p-10  rounded-xl" onSubmit={handleformsubmit}>
                <div className="text-black relative z-0 w-full mb-5 group ">
                    <label className="text-black text-xl">Tutor Email address</label>
                    <input type="email" readOnly name="email" defaultValue={user?.email} id="email" className="text-black w-full rounded-xl" placeholder=" " required />

                </div>

                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                        <label for="session_title" className="text-black text-xl">Session Title</label>
                        <input type="text" name="session_title" id="session_title" className="text-black w-full rounded-xl" placeholder="Enter Session title " required />
                    </div>
                    <div class="relative z-0 w-full mb-5 group">
                        <label for="tutorname" className="text-black text-xl">Tutor Name</label>
                        <input type="text" readOnly defaultValue={user?.displayName} name="tutorname" id="tutorname" className="text-black w-full rounded-xl" placeholder=" " required />
                    </div>
                </div>

                <div class="relative z-0 w-full mb-5 group">

                    <label for="message" className="text-black text-xl">Description</label>
                    <textarea id="message" name='description' rows="4" className="text-black w-full rounded-xl" placeholder="Write your thoughts here..."></textarea>

                </div>



                <div class="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                        <label for="start_date" className="text-black text-xl">Registration Start Date</label>
                        <input type="date" name="start_date" id="start_date" className="text-black w-full rounded-xl" placeholder=" " required />

                    </div>
                    <div class="relative z-0 w-full mb-5 group">
                        <label for="end_date" className="text-black text-xl">Registration End Date</label>
                        <input type="date" name="end_date" id="end_date" className="text-black w-full rounded-xl" placeholder=" " required />
                    </div>
                </div>



                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                        <label for="class_start_date" className="text-black text-xl">Class Start Date</label>
                        <input type="date" name="class_start_date" id="class_start_date" className="text-black w-full rounded-xl" placeholder=" " required />

                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <label for="class_end_date" className="text-black text-xl">Class End Date</label>
                        <input type="date" name="class_end_date" id="class_end_date" className="text-black w-full rounded-xl" placeholder=" " required />
                    </div>
                </div>


                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                        <label for="duration" className="text-black text-xl">Session Duration(Hours)</label>
                        <input type="text" name="duration" id="duration" className="text-black w-full rounded-xl" placeholder=" " required />
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                    <label for="fee" className="text-black text-xl">Registration Fee</label>
                        <input type="number" name="fee" disabled defaultValue={0} id="fee" className="text-black w-full rounded-xl" placeholder=" " required />
                        
                    </div>
                </div>



                <div className="w-full mb-5 group">
                    <label for="status" className="text-black text-xl">Status</label>
                    <select className='mt-2 text-black w-full rounded-xl"' defaultValue="" name="status" id="status">
                        <option value="" disabled>Choose a status</option>
                        <option value="pending">Pending</option>
                        <option value="approved" disabled>Approved(❗Requires Permission)</option>
                    </select>

                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            </div>
            
            
        </div>
    )
}
