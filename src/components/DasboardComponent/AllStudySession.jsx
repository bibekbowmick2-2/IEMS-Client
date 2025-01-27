import React, { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";
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

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;




  const filteredRejectedSessions = sessions.filter(
    (session) => session.status !== "rejected"
  );

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentItems = filteredRejectedSessions.slice(startIndex, endIndex);
  const pageCount = Math.ceil(filteredRejectedSessions.length / itemsPerPage);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

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




  const  handleExtra= (session) => {
    const { email, tutorname,session_title } = session;
    Swal.fire({
      position: "center",
      title: "Submit Your Feedback",
      html: `
        <input type="text" id="note-title" class="swal2-input" placeholder="Rejection Reason" />
        <textarea id="note-description" class="swal2-textarea" placeholder="Feedback"></textarea>
      `,
      confirmButtonText: "Submit",
      showCancelButton: true,
      preConfirm: () => {
        const title = Swal.getPopup().querySelector("#note-title").value;
        const description =
          Swal.getPopup().querySelector("#note-description").value;

        if (!title || !description) {
          Swal.showValidationMessage(`Please enter both title and description`);
        }
        return { title, description };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const { title, description } = result.value;
        

        
        axiosSecure
          .post(`/feedback`, { title, description,tutorname,email,session_title })
          .then((res) => {
            if(res.data.insertedId)
            {
              refetch();
              Swal.fire({
                  position: "center",
                  icon: "success",
                  title: `${session.session_title}  Session Rejected.Thank you for your valueable feedback!`,
                  showConfirmButton: false,
                  timer: 1500,
              });
            }
          })
          .catch(() => {
            Swal.fire("Error", "Failed to reject session. Try again later.", "error");
          });
      }
    });
  };

  const handleStatusChange = async (session, status) => {
    try {
      const statusUpdateRes = await axiosSecure.patch(
        `/sessions/${status}/${session._id}`
      );

      if (statusUpdateRes.data.modifiedCount > 0) {
        refetch();

        if (status === "rejected") {
          handleExtra(session);
          
          return;
        }

        const result = await Swal.fire({
          title: `Status updated to ${status.toUpperCase()}!<br/>
          <p className='text-cyan-500 text-sm'>Is the registration fee Paid or Free?</p>`,
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
            const feeUpdateRes = await axiosSecure.patch(
              `/registration/fee/${session._id}`,
              { fee }
            );
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
      Swal.fire("Session is Rejected!", "error");
    }
  };



  const handleUpdate = (session) => {
    Swal.fire({
      title: "Update Session",
      html: `
        <input type="text" id="title" class="swal2-input" placeholder="Session Title" value="${session.session_title}" />
        <textarea id="description" class="swal2-textarea" placeholder="SessionDescription">${session.description}</textarea>
        <input type="date" id="start_date" class="swal2-input" placeholder="Registration Start Date" value="${session.start_date}" />
        <input type="date" id="end_date" class="swal2-input" placeholder="Registration End Date" value="${session.end_date}" />
        <input type="number" id="duration" class="swal2-input" placeholder="Session Duration" value="${session.duration}" />
        <input type="number" id="fee" class="swal2-input" placeholder="Session Fee" value="${session.fee}" />
        <input type="date" id="class_start_date" class="swal2-input" placeholder="Class Start Date" value="${session.class_start_date}" />
        <input type="date" id="class_end_date" class="swal2-input" placeholder="Class End Date" value="${session?.class_end_date}" />
        
      `,
      confirmButtonText: "Update",
      showCancelButton: true,
      preConfirm: () => {
        const title = Swal.getPopup().querySelector("#title").value;
        const description =Swal.getPopup().querySelector("#description").value;
        const start_date = Swal.getPopup().querySelector("#start_date").value;
        const end_date = Swal.getPopup().querySelector("#end_date").value;
        const duration = Swal.getPopup().querySelector("#duration").value;
        const fee = Swal.getPopup().querySelector("#fee").value;
        const class_start_date = Swal.getPopup().querySelector("#class_start_date").value;
        const class_end_date = Swal.getPopup().querySelector("#class_end_date").value;

        // if (!title || !description || !start_date || !end_date || !duration || !fee || !class_start_date || !class_end_date) {
        //   Swal.showValidationMessage( `Please enter input field` );
        // }

        
        return { title, description, start_date, end_date, duration, fee, class_start_date, class_end_date };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const  {title, description, start_date, end_date, duration, fee, class_start_date, class_end_date }  = result.value;

        
        axiosSecure
          .patch(`/manage-session/${session._id}`, {title, description, start_date, end_date, duration, fee, class_start_date, class_end_date })
          .then((response) => {
            if (response.data.modifiedCount > 0) {
              Swal.fire("Success", "Session updated successfully!", "success");
              refetch(); 
            }
          })
          .catch(() => {
            Swal.fire("Error", "Failed to update session. Try again later.", "error");
          });
      }
    });
  };




  



  return (
    <div>
      <p className="mb-7 text-5xl font-extrabold text-center">All Study Sessions</p>





      <div className="flex justify-center mt-8">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={"flex gap-3"}
          pageClassName={
            "flex items-center justify-center px-4 py-2 border rounded-md cursor-pointer hover:bg-gray-200"
          }
          activeClassName={
            "bg-blue-600 text-white font-bold hover:bg-blue-600"
          }
          previousLinkClassName={
            "flex items-center justify-center px-4 py-2 border rounded-md cursor-pointer hover:bg-gray-200"
          }
          nextLinkClassName={
            "flex items-center justify-center px-4 py-2 border rounded-md cursor-pointer hover:bg-gray-200"
          }
          breakClassName={
            "flex items-center justify-center px-4 py-2 border rounded-md cursor-default"
          }
          disabledClassName={"opacity-50 cursor-not-allowed"}
        />
      </div>



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
                Tutor Email
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
            {currentItems.map((session) => (
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
                <td className="px-6 py-4">{session.email}</td>
                <td className="px-6 py-4">{session.fee}</td>
                <td className="px-6 py-4">
                  <select
                    value={session.status}
                    onChange={(e) => handleStatusChange(session, e.target.value)}
                    className="form-select"
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected </option>
                  </select>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <button onClick={() => handleUpdate(session)} className="btn btn-success mr-4 mt-3">Edit</button>
                    <button
                      onClick={() => handleDeleteSession(session)}
                      className="btn btn-error"
                    >
                      Delete
                    </button>
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
