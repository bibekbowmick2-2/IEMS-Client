import React, { useContext } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { ContextProvider } from "../../AuthProviders/AuthProvider";
import Swal from "sweetalert2";

export default function ManageNote() {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(ContextProvider);

  const { data: notes = [], refetch } = useQuery({
    queryKey: ["notes"],
    queryFn: async () => {
      const res = await axiosSecure.get("/manage-note");
      return res.data;
    },
  });

  const filteredNotes = notes.filter((note) => note.email === user?.email);

  const handleUpdate = (note) => {
    Swal.fire({
      title: "Update Note",
      html: `
        <input type="text" id="note-title" class="swal2-input" placeholder="Title" value="${note.title}" />
        <textarea id="note-description" class="swal2-textarea" placeholder="Description">${note.description}</textarea>
      `,
      confirmButtonText: "Update",
      showCancelButton: true,
      preConfirm: () => {
        const title = Swal.getPopup().querySelector("#note-title").value;
        const description = Swal.getPopup().querySelector("#note-description").value;

        if (!title || !description) {
          Swal.showValidationMessage(`Please enter both title and description`);
        }
        return { title, description };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const { title, description } = result.value;

        axiosSecure
          .patch(`/manage-note/${note._id}`, { title, description })
          .then((response) => {
            if (response.data.modifiedCount > 0) {
              Swal.fire("Success", "Note updated successfully!", "success");
              refetch();
            }
          })
          .catch(() => {
            Swal.fire("Error", "Failed to update note. Try again later.", "error");
          });
      }
    });
  };

  const handleDeleteNote = (note) => {
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
        axiosSecure.delete(`/delete-note/${note._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire("Deleted!", "Note has been deleted.", "success");
          }
        });
      }
    });
  };

  if (filteredNotes.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <h1 className="text-3xl text-red-500 font-semibold">No Notes Available</h1>
      </div>
    );
  }

  return (
    <div className="px-4 py-10 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-10 text-purple-700">📚 Manage Your Notes</h1>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredNotes.map((note) => (
          <div
            key={note._id}
            className="bg-white border border-gray-200 shadow-lg rounded-xl p-6 hover:shadow-2xl transition duration-300 ease-in-out"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{note.title}</h2>
            <p className="text-gray-600 mb-4">{note.description}</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => handleUpdate(note)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
              >
                Update
              </button>
              <button
                onClick={() => handleDeleteNote(note)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
