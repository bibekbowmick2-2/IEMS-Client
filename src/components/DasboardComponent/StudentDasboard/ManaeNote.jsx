import React, { useContext } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { ContextProvider } from "../../AuthProviders/AuthProvider";
import Swal from "sweetalert2";

export default function ManaeNote() {
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
            Swal.fire({
              title: "Deleted!",
              text: "Note has been deleted.",
              icon: "success",
              position: "center",
            });
          }
        });
      }
    });
  };


  if (filteredNotes.length === 0) {
    return (
      <div className="container   mx-auto py-10 text-center text-red-500">
        <h1 className="text-3xl">Note Not Available</h1>
      </div>
    );
  }
  return (
    <div>
      <p className="mb-7 text-5xl font-extrabold text-center">Manage Notes</p>

      <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-4">
        {filteredNotes.map((note) => (
          <div className="card bg-light-blue-500 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-black">{note.title}</h2>
              <p>{note.description}</p>
              <div className="card-actions justify-end">
                <button onClick={() => handleUpdate(note)} className="btn btn-primary">Update</button>
                <button onClick={() => handleDeleteNote(note)} className="btn btn-primary">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
