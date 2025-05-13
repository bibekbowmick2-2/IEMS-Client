import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import axios from "axios";
import { Link } from "react-router-dom";
import { ContextProvider } from "../../AuthProviders/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

export default function ViewTutorMaterial() {
  const { user } = useContext(ContextProvider);

  const { data: bookedsessionall = [] } = useQuery({
    queryKey: ["bookedsessionall"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/bookedsessionall`);
      return res.data;
    },
  });

  const axiosSecure = useAxiosSecure();
  const { data: materials = [] } = useQuery({
    queryKey: ["materials"],
    queryFn: async () => {
      const res = await axiosSecure.get("/view-materials");
      return res.data;
    },
  });

  const filteredSessions = materials.filter((material) =>
    bookedsessionall.some((session) => session.session_title === material.session_title)
  );

  const downloadImage = async (imageUrl, imageName) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = imageName || "download";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Failed to download image:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#6DADD9] via-[#9099CD] to-[#8B9ACD] py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-800 mb-10">
          📚 View Tutor Materials
        </h1>

        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="min-w-full divide-y divide-gray-200 text-sm text-gray-700">
            <thead className="bg-gray-100 text-gray-700 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 text-left">Session Title</th>
                <th className="px-6 py-4 text-left">Material Title</th>
                <th className="px-6 py-4 text-left">Session ID</th>
                <th className="px-6 py-4 text-left">Tutor Email</th>
                <th className="px-6 py-4 text-left">Drive Link</th>
                <th className="px-6 py-4 text-left">Image</th>
                <th className="px-6 py-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSessions.map((session) => (
                <tr key={session._id} className="hover:bg-gray-50 transition-all">
                  <td className="px-6 py-4 font-semibold">{session.session_title}</td>
                  <td className="px-6 py-4">{session.title}</td>
                  <td className="px-6 py-4">{session.sessionId}</td>
                  <td className="px-6 py-4">{session.tutorEmail}</td>
                  <td className="px-6 py-4">
                    <a
                      href={session.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline hover:text-blue-800 transition"
                    >
                      Open Link
                    </a>
                  </td>
                  <td className="px-6 py-4">
                    <PhotoProvider>
                      <PhotoView src={session.imageUrl}>
                        <img
                          src={session.imageUrl}
                          alt="Material"
                          className="h-20 w-28 object-cover rounded cursor-pointer border border-gray-300 hover:scale-105 transition-transform duration-200"
                        />
                      </PhotoView>
                    </PhotoProvider>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => downloadImage(session.imageUrl, session.title)}
                      className="inline-block px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition"
                    >
                      Download
                    </button>
                  </td>
                </tr>
              ))}
              {filteredSessions.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-6 text-gray-500">
                    No materials available for your sessions.
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
