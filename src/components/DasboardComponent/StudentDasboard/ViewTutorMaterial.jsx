import React, { useContext, useState } from "react";
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
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/bookedsessionall`
      );
      console.log("bookedsessionall", res.data);
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
    bookedsessionall.some(
      (session) => session.session_title === material.session_title
    )
  );

  console.log(filteredSessions);


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
    <div>
      <p className="mb-7 text-5xl font-extrabold text-center ">
        View Tutor Materials
      </p>

      <div className="relative   shadow-md sm:rounded-lg mt-10">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Session Title
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Session ID
              </th>

              <th scope="col" className="px-6 py-3">
                Tutor Email
              </th>

              <th scope="col" className="px-6 py-3">
                Drive Link
              </th>

              <th scope="col" className="px-6 py-3">
                Image
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
                <td className="px-6 py-4">{session.session_title}</td>
                <td className="px-6 py-4">{session.title}</td>
                <td className="px-6 py-4">{session.sessionId}</td>
                <td className="px-6 py-4">{session.tutorEmail} </td>
                <td className="px-6 py-4">
                  <a
                    className="underline text-light-blue-600"
                    href={session.link}
                  >
                    {session.link}
                  </a>
                </td>
                <td className="px-4 py-2">
                 
                  <PhotoProvider>
                    <PhotoView src={session.imageUrl}>
                    <img  src={session.imageUrl} alt="" />
                    </PhotoView>
                  </PhotoProvider>
                </td>

                <td className="px-6 py-4">
                <button
                    onClick={() => downloadImage(session.imageUrl, session.title)}
                    className="btn btn-outline btn-primary"
                  >
                    Download Image
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
