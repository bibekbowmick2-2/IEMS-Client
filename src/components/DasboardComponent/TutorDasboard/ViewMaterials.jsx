import React, { useContext } from 'react'
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { ContextProvider } from '../../AuthProviders/AuthProvider';
import Swal from 'sweetalert2';

export default function ViewMaterials() {
  const { user } = useContext(ContextProvider);
  const axiosSecure = useAxiosSecure();
  const { data: materials = [], refetch } = useQuery({
    queryKey: ["materials"],
    queryFn: async () => {
      const res = await axiosSecure.get("/view-materials");
      return res.data;
    },
  });



  const filterMaterials = materials.filter((f) => f.tutorEmail === user?.email);


  const handleDeleteNote = (material) => {
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
        axiosSecure.delete(`/delete-materials/${material._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Material has been deleted.",
              icon: "success",
              position: "center",



            });
          }
        });
      }
    });
  };





  const handleUpdate = (material) => {
    Swal.fire({
      title: "Update Material",
      html: `
      <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
        <input type="text" id="title" class="swal2-input" placeholder="Title" value="${material.title}" />
        
      <label for="link" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Drive Link</label>
        <input type="text" id="link" class="swal2-input" placeholder="Link" value="${material.link}" />
      `,
      confirmButtonText: "Update",
      showCancelButton: true,
      preConfirm: () => {
        const title = Swal.getPopup().querySelector("#title").value;

        const link = Swal.getPopup().querySelector("#link").value;

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
              Swal.fire("Success", "Material updated successfully!", "success");
              refetch();
            }
          });
      }
    });
  };






  return (
    <div className='bg-white p-5 md:p-[100px] lg:p-[100px]'>
      <p className="mb-7 text-5xl font-bold text-black text-center">View Materials</p>


      <div className="grid grid-cols-1 md:grid-cols-1  lg:grid-cols-3 gap-4">
        {filterMaterials.map((note) => (
          <>
            <div className="card bg-green-100 w-96 shadow-xl mx-auto mt-5">
              <figure>
                <img
                  src={note.imageUrl}
                  alt="Shoes" />
              </figure>
              <div className="w-full h-[380px] space-y-3 mx-auto p-5">
                <h2 className="card-title text-black">{note.session_title} Session</h2>
                <h2 className="card-title text-black">Title:{note.title}</h2>
                <p className='text-black font-bold'>Session ID:</p>
                <a className=' text-black' >{note.sessionId}</a>
                <div className="w-full overflow-scroll text-black ">
                  <p className='font-bold'>Drive Link:</p>  
                  <a className='text-black ' href={note.link}>{note.link}</a></div>
                <div className="card-actions justify-start">
                  <button onClick={() => handleUpdate(note)} className="btn btn-success text-white border-none">Update</button>
                  <button onClick={() => handleDeleteNote(note)} className="btn bg-red-500 text-white border-none">Delete</button>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  )
}
