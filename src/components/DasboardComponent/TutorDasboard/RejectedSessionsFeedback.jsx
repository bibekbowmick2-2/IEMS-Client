import React, { useContext } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { ContextProvider } from '../../AuthProviders/AuthProvider';
import { useQuery } from '@tanstack/react-query';

export default function RejectedSessionsFeedback() {
  const { user } = useContext(ContextProvider);
  const axiosSecure = useAxiosSecure();

  const { data: feedbacks = [], refetch } = useQuery({
    queryKey: ['feedbacks'],
    queryFn: async () => {
      const res = await axiosSecure.get('/feedbacks');
      return res.data;
    },
  });

  const filterFeedback = feedbacks.filter(
    (f) => f.tutorname === user?.displayName && f.email === user?.email
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#6DADD9] via-[#9099CD] to-[#8B9ACD] px-6 py-12 md:px-16">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-800 mb-12">
        Rejection Feedbacks
      </h1>

      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filterFeedback.map((note) => (
          <div
            key={note._id}
            className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-indigo-700">
                {note.session_title} Session
              </h2>
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-gray-800">Reason:</span> {note.description}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-gray-800">Feedback:</span> {note.title}
              </p>
            </div>
          </div>
        ))}
      </div>

      {filterFeedback.length === 0 && (
        <p className="text-center text-gray-500 text-lg mt-10">
          No feedbacks found for your rejected sessions.
        </p>
      )}
    </div>
  );
}
