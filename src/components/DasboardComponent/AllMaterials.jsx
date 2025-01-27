import React, { useContext } from 'react'
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



  // const filterMaterials = materials.filter((f) =>f.tutorEmail === user?.email);


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



  return (
    <div>
      <p className="mb-7 text-5xl font-extrabold text-center">View All Materials</p>
      

      <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-4">
        {materials.map((note) => (
          <div className="card bg-pink-500 w-96 shadow-xl">
          <figure>
    <img
      src={note.imageUrl}
      alt="Shoes" />
  </figure>
            <div className="card-body">
              <h2 className="card-title text-black">{note.session_title} Session</h2>
              <h2 className="card-title text-black">Title:{note.title}</h2>
              <p >Session ID:{note.sessionId}</p>
              <p className='overflow-auto' >Drive Link:  <a className='underline' href={note.link}>{note.link}</a></p>
              <div className="card-actions justify-end">
              
                <button onClick={() => handleDeleteNote(note)} className="btn btn-primary">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
