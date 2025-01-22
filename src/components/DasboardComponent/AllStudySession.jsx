import React from 'react'
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
export default function AllStudySession() {
  
  
  const axiosSecure = useAxiosSecure();
  const { data: sessions = [], refetch } = useQuery({
    queryKey: ["sessions"],
    queryFn: async () => {
      const res = await axiosSecure.get("/sessions");
      return res.data;
    },
  });


  


 
  const filteredrejectedsessions = sessions.filter(session => session.status !== "rejected")



  const handleDeleteSession = (session) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/session/${session._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Session has been deleted.",
              icon: "success",
              position: "center",
            });
          }
        });
      }
    });
  };




  
  const handleStatusChange = async (session, status) => {
    try {
      // Update the session status
      const statusUpdateRes = await axiosSecure.patch(`/sessions/${status}/${session._id}`);
      console.log(statusUpdateRes.data);
  
      if (statusUpdateRes.data.modifiedCount > 0) {
        refetch();

        if (status === "rejected") {
          Swal.fire({
            position: "center",
            icon: "success",
            title: `${session.session_title}  Session Rejected`,
            showConfirmButton: false,
            timer: 1500,
          });
          return; 
        }
  
        // Show Swal confirmation dialog
        const result = await Swal.fire({
          title: `Status updated to ${status.toUpperCase()}!<br/>
          <p className='text-cyan-500 text-sm'>Is the registration fee Paid or Fee?</p>`,
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Paid",
          denyButtonText: `Free`,
        });
  
        if (result.isConfirmed) {
          
          const { value: fee } = await Swal.fire({
            title: "Enter Registration Fee",
            input: "number",
            inputLabel: "Put Down Registration Fee",
            inputPlaceholder: "Enter your registration fee",
            
          });
  
          if (fee) {
          
            const feeUpdateRes = await axiosSecure.patch(`/registration/fee/${session._id}`, { fee });
            if (feeUpdateRes.data.modifiedCount > 0) {
              refetch();
              Swal.fire(`Fee updated to $${fee}`, "Saved!", "success");
            } else {
              Swal.fire("Failed to update fee!", "Please try again.", "error");
            }
          }
        } else if (result.isDenied) {
          Swal.fire(`Registration Fee is $${session.fee}`, "Info", "info");
        }
      }
    } catch (error) {
      console.error("Error updating session:", error);
      Swal.fire("Session is Rejected!",  "error");
    }
  };
  


 
  
  return (

    
    <div ><p className='mb-7 text-5xl font-extrabold text-center'>All Study Session</p>
    

<div class="relative overflow-x-auto shadow-md sm:rounded-lg ">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Session Title
                </th>
                <th scope="col" class="px-6 py-3">
                    Tutor Name
                </th>
                <th scope="col" class="px-6 py-3">
                    Tutor Email
                </th>
                <th scope="col" class="px-6 py-3">
                    Fee
                </th>
                <th scope="col" class="px-6 py-3">
                    Status
                </th>

                <th scope="col" class="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody className=''>
        {
          filteredrejectedsessions.map(session => (

            <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {session.session_title}
                </th>
                <td class="px-6 py-4">
                    {session.tutorname}
                </td>
                <td class="px-6 py-4">
                    {session.email}
                </td>
                <td class="px-6 py-4">
                    {session.fee}
                </td>
                <td>
                  <select
                    value={session.status}
                    onChange={(e) => handleStatusChange(session, e.target.value)}
                    className="form-select"
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </td>


                <td class="px-6 py-4">
                  <div>
                    <button className='btn btn-success mr-4 mt-3'>Edit</button>
                    <button   onClick={() => handleDeleteSession(session)} className='btn btn-error'>Delete</button>
                  </div>
                </td>
            </tr>

          ))

        }
           
           
            
        </tbody>
    </table>
</div>

    </div>
  )
}
