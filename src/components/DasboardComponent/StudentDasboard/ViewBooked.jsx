import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { ContextProvider } from "../../AuthProviders/AuthProvider";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ViewBooked() {
  const { user } = useContext(ContextProvider);

  const { data: bookedsessionall = [], refetch } = useQuery({
    queryKey: ["bookedsessionall"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/bookedsessionall`);
      return res.data;
    },
  });

  const filteredSessions = bookedsessionall.filter(
    (session) => session.email === user?.email
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#6DADD9] via-[#9099CD] to-[#8B9ACD] py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-800 mb-10">
          🎓 View Booked Sessions
        </h1>

        <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
          <table className="min-w-full divide-y divide-gray-200 text-sm text-gray-700">
            <thead className="bg-gray-100 text-gray-700 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 text-left">Session Title</th>
                <th className="px-6 py-4 text-left">Tutor Name</th>
                <th className="px-6 py-4 text-left">Duration</th>
                <th className="px-6 py-4 text-left">Start Date</th>
                <th className="px-6 py-4 text-left">End Date</th>
                <th className="px-6 py-4 text-left">Fee</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSessions.map((session) => (
                <tr key={session._id} className="hover:bg-gray-50 transition-all">
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {session.session_title}
                  </td>
                  <td className="px-6 py-4">{session.tutorname}</td>
                  <td className="px-6 py-4">{session.duration} hr</td>
                  <td className="px-6 py-4">{session.class_start_date}</td>
                  <td className="px-6 py-4">{session.class_end_date}</td>
                  <td className="px-6 py-4">${session.fee}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        session.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : session.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {session.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      to={`/session-details/${session.session_title}`}
                      className="inline-block text-sm px-4 py-2 rounded-md border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
              {filteredSessions.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center py-6 text-gray-500">
                    No sessions booked yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
