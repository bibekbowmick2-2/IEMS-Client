import React, { useContext } from 'react'
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { ContextProvider } from '../../AuthProviders/AuthProvider';
import { useQuery } from '@tanstack/react-query';

export default function RejectedSessionsFeedback() {
  const { user } = useContext(ContextProvider);
  const axiosSecure = useAxiosSecure();
  const { data: feedbacks = [], refetch } = useQuery({
    queryKey: ["feedbacks"],
    queryFn: async () => {
      const res = await axiosSecure.get("/feedbacks");
      return res.data;
    },
  });



  const filterFeedback = feedbacks.filter((f) => f.tutorname === user?.displayName && f.email === user?.email);
  

  return (
    <div>
      <p className="mb-7 text-5xl font-extrabold text-center">Rejection Feedbacks</p>
      

      <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-4">
        {filterFeedback.map((note) => (
          <div className="card bg-light-blue-300 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-black">{note.session_title} Session</h2>
              <p >Rejection Reason:{note.description}</p>
              <p >Rejection Feedback:{note.title}</p>
              <div className="card-actions justify-end">
                {/* <button onClick={() => handleUpdate(note)} className="btn btn-primary">Update</button>
                <button onClick={() => handleDeleteNote(note)} className="btn btn-primary">Delete</button> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
