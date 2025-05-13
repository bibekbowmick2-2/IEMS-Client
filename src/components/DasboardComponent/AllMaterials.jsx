import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { ContextProvider } from '../AuthProviders/AuthProvider';

export default function AllMaterials() {
  const { user } = useContext(ContextProvider);
  const axiosSecure = useAxiosSecure();

  const { data: materials = [], refetch } = useQuery({
    queryKey: ["materials"],
    queryFn: async () => {
      const res = await axiosSecure.get("/view-materials");
      return res.data;
    },
  });

  const handleDeleteNote = (material) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/delete-materials/${material._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "The material has been removed.",
              icon: "success",
              position: "center",
            });
          }
        });
      }
    });
  };

  return (
    <div className="px-4 md:px-12 py-10 max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">
        📄 Study Materials
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {materials.map((note) => (
          <div
            key={note._id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100"
          >
            <img
              src={note.imageUrl}
              alt={note.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-5 space-y-3">
              <h3 className="text-lg font-semibold text-gray-800">
                {note.session_title} Session
              </h3>
              <p className="text-gray-600">
                <strong>Title:</strong> {note.title}
              </p>
              <p className="text-gray-500 text-sm">
                <strong>Session ID:</strong> {note.sessionId}
              </p>
              <p className="text-blue-600 text-sm truncate">
                <strong>Drive Link:</strong>{" "}
                <a
                  href={note.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-blue-800"
                >
                  {note.link}
                </a>
              </p>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => handleDeleteNote(note)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all text-sm font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
