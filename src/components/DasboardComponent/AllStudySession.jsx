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

  const currentItems = filteredRejectedSessions.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const pageCount = Math.ceil(filteredRejectedSessions.length / itemsPerPage);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  // All your existing handleX functions here...
  // (handleDeleteSession, handleStatusChange, handleExtra, handleUpdate)

  return (
    <div className="px-4 md:px-12 py-10 max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">
        📚 Manage Study Sessions
      </h2>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full text-sm md:text-base text-left text-gray-600">
            <thead className="bg-gray-100 text-gray-700 text-xs uppercase">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Tutor</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Fee ($)</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((session) => (
                <tr
                  key={session._id}
                  className="border-t hover:bg-gray-50 transition-all duration-200"
                >
                  <td className="px-6 py-4 font-semibold">{session.session_title}</td>
                  <td className="px-6 py-4">{session.tutorname}</td>
                  <td className="px-6 py-4">{session.email}</td>
                  <td className="px-6 py-4">{session.fee}</td>
                  <td className="px-6 py-4">
                    <select
                      value={session.status}
                      onChange={(e) =>
                        handleStatusChange(session, e.target.value)
                      }
                      className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 space-x-2">
                    <button
                      onClick={() => handleUpdate(session)}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-1.5 rounded-md transition-all"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteSession(session)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-md transition-all"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center py-6">
          <ReactPaginate
            previousLabel={"← Prev"}
            nextLabel={"Next →"}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName="flex space-x-2"
            pageClassName="px-3 py-1 rounded-md border text-gray-700 hover:bg-blue-100 transition-all"
            activeClassName="bg-blue-500 text-white font-bold"
            previousLinkClassName="px-3 py-1 rounded-md border hover:bg-gray-100"
            nextLinkClassName="px-3 py-1 rounded-md border hover:bg-gray-100"
            disabledClassName="opacity-50 cursor-not-allowed"
          />
        </div>
      </div>
    </div>
  );
}
