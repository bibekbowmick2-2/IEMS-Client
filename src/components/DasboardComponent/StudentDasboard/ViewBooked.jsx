import React, { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { ContextProvider } from "../../AuthProviders/AuthProvider";
import axios from "axios";
import { Link } from "react-router-dom";


export default function ViewBooked() {
 
  const {user} = useContext(ContextProvider)

  const { data: bookedsessionall = [], refetch } = useQuery({
    queryKey: ["bookedsessionall"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/bookedsessionall`);
      console.log( "bookedsessionall",res.data);
      return  res.data;
    },
  });



  const filteredSessions =  bookedsessionall.filter(
    (session) => session.email == user?.email
  );

 



  

//   const handleDeleteSession = (session) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         axiosSecure.delete(`/session/${session._id}`).then((res) => {
//           if (res.data.deletedCount > 0) {
//             refetch();
//             Swal.fire({
//               title: "Deleted!",
//               text: "Session has been deleted.",
//               icon: "success",
//               position: "center",
//             });
//           }
//         });
//       }
//     });
//   };

  
  return (
    <div>
      <p className="mb-7 text-5xl font-extrabold text-center">View Booked Sessions</p>




      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Session Title
              </th>
              <th scope="col" className="px-6 py-3">
                Tutor Name
              </th>
              <th scope="col" className="px-6 py-3">
                Duration
              </th>


              <th scope="col" className="px-6 py-3">
                Class Start Date
              </th>


              <th scope="col" className="px-6 py-3">
                Class End Date
              </th>


              <th scope="col" className="px-6 py-3">
                Fee
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredSessions.map((session) => (
              <tr
                key={session._id}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {session.session_title}
                </th>
                <td className="px-6 py-4">{session.tutorname}</td>
                <td className="px-6 py-4">{session.duration} hour</td>
                <td className="px-6 py-4">{session.class_start_date}</td>
                <td className="px-6 py-4">{session.class_end_date}</td>
                <td className="px-6 py-4">{session.fee}</td>
                <td className="px-6 py-4">
                  {session.status}
                </td>
                <td className="px-6 py-4">
                  <div>
                
                    <Link to={`/session-details/${session.session_title}`} className="btn btn-outline btn-primary">Details</Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    
    </div>
  );
}
