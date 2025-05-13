import React, { useContext } from 'react';
import { ContextProvider } from '../../AuthProviders/AuthProvider';
import { axiosSecure } from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export default function CreateNote() {
  const { user } = useContext(ContextProvider);
  const navigate = useNavigate();

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (user?.email) {
      const form = event.target;
      const email = form.email.value;
      const title = form.title.value;
      const description = form.description.value;

      const sessionData = { email, title, description };

      axiosSecure.post(`${import.meta.env.VITE_API_URL}/create-note`, sessionData)
        .then(res => {
          if (res.data.insertedId) {
            form.reset();
            Swal.fire({
              position: "center",
              icon: "success",
              title: `${user?.displayName} added a new note!`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
    } else {
      Swal.fire({
        title: "You are not Logged In",
        text: "Please login to add a note as a student",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, login!"
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login', { state: { from: location } });
        }
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#6DADD9] via-[#9099CD] to-[#8B9ACD] py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">📝 Create a New Note</h2>

        <form onSubmit={handleFormSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-semibold text-gray-700">Email Address</label>
            <input
              type="text"
              name="email"
              id="email"
              readOnly
              defaultValue={user?.email}
              className="w-full px-4 py-3 text-gray-800 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Title */}
          <div>
            <label htmlFor="title" className="block mb-2 text-sm font-semibold text-gray-700">Note Title</label>
            <input
              type="text"
              name="title"
              id="title"
              required
              placeholder="Enter your note title"
              className="w-full px-4 py-3 text-gray-800 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block mb-2 text-sm font-semibold text-gray-700">Description</label>
            <textarea
              name="description"
              id="description"
              rows="5"
              required
              placeholder="Write your note description..."
              className="w-full px-4 py-3 text-gray-800 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="inline-block w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg rounded-lg transition duration-300 ease-in-out"
            >
              ➕ Add Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
