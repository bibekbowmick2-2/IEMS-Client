import React, { useContext } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { ContextProvider } from '../../AuthProviders/AuthProvider';
import Swal from 'sweetalert2';

export default function ViewMaterials() {
  const { user } = useContext(ContextProvider);
  const axiosSecure = useAxiosSecure();

  const { data: materials = [], refetch } = useQuery({
    queryKey: ['materials'],
    queryFn: async () => {
      const res = await axiosSecure.get('/view-materials');
      return res.data;
    },
  });

  const filterMaterials = materials.filter((f) => f.tutorEmail === user?.email);

  const handleDeleteNote = (material) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/delete-materials/${material._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire('Deleted!', 'Material has been deleted.', 'success');
          }
        });
      }
    });
  };

  const handleUpdate = (material) => {
    Swal.fire({
      title: 'Update Material',
      html: `
        <label class="block text-sm font-semibold mb-1 text-gray-700">Title</label>
        <input type="text" id="title" class="swal2-input" value="${material.title}" placeholder="Enter new title" />
        
        <label class="block text-sm font-semibold mb-1 text-gray-700">Google Drive Link</label>
        <input type="text" id="link" class="swal2-input" value="${material.link}" placeholder="Enter new link" />
      `,
      confirmButtonText: 'Update',
      showCancelButton: true,
      preConfirm: () => {
        const title = Swal.getPopup().querySelector('#title').value;
        const link = Swal.getPopup().querySelector('#link').value;

        if (!title || !link) {
          Swal.showValidationMessage(`Please enter both title and link`);
        }

        return { title, link };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const { title, link } = result.value;

        axiosSecure
          .patch(`/update-materials/${material._id}`, { title, link })
          .then((response) => {
            if (response.data.modifiedCount > 0) {
              Swal.fire('Success', 'Material updated successfully!', 'success');
              refetch();
            }
          });
      }
    });
  };

  return (
    <div className="bg-gradient-to-r from-[#6DADD9] via-[#9099CD] to-[#8B9ACD] min-h-screen p-6 md:p-16">
      <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-12">
        View Your Materials
      </h1>

      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filterMaterials.map((note) => (
          <div
            key={note._id}
            className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden flex flex-col"
          >
            <img
              src={note.imageUrl}
              alt="Material"
              className="w-full h-60 object-cover"
            />

            <div className="p-6 flex flex-col flex-grow justify-between">
              <div className="space-y-2">
                <h2 className="text-lg font-bold text-indigo-700">
                  {note.session_title} Session
                </h2>
                <p className="text-gray-800 font-medium">Title: {note.title}</p>
                <p className="text-sm text-gray-500">Session ID:</p>
                <p className="break-all text-sm text-gray-700">{note.sessionId}</p>
                <p className="text-sm font-semibold text-gray-500 mt-2">Drive Link:</p>
                <a
                  href={note.link}
                  className="text-blue-600 underline break-words"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {note.link}
                </a>
              </div>

              <div className="mt-6 flex space-x-3">
                <button
                  onClick={() => handleUpdate(note)}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDeleteNote(note)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition"
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
