import React, { useContext } from 'react';
import Swal from 'sweetalert2';
import { useNavigate, useLocation } from 'react-router-dom';
import { ContextProvider } from '../../AuthProviders/AuthProvider';
import { axiosSecure } from '../../../hooks/useAxiosSecure';

export default function CreateStudysession() {
  const { user } = useContext(ContextProvider);
  const navigate = useNavigate();
  const location = useLocation();

  const handleformsubmit = async (event) => {
    event.preventDefault();

    if (!user?.email) {
      Swal.fire({
        title: "You're not logged in",
        text: "Please log in to create a study session",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, login!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
      return;
    }

    const form = event.target;
    const sessionData = {
      email: form.email.value,
      session_title: form.session_title.value,
      tutorname: form.tutorname.value,
      description: form.description.value,
      start_date: form.start_date.value,
      end_date: form.end_date.value,
      class_start_date: form.class_start_date.value,
      class_end_date: form.class_end_date.value,
      duration: form.duration.value,
      fee: form.fee.value,
      status: form.status.value,
    };

    try {
      const res = await axiosSecure.post("/create-session", sessionData);
      if (res.data.insertedId) {
        form.reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user?.displayName} added a session`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-gradient-to-r from-[#6DADD9] via-[#9099CD] to-[#8B9ACD] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-10">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
          📚 Create Study Session
        </h1>

        <form onSubmit={handleformsubmit} className="space-y-8">
          {/* Tutor Email & Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-lg font-medium text-gray-700">Tutor Email</label>
              <input
                type="email"
                name="email"
                readOnly
                defaultValue={user?.email}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
              />
            </div>
            <div>
              <label className="text-lg font-medium text-gray-700">Tutor Name</label>
              <input
                type="text"
                name="tutorname"
                readOnly
                defaultValue={user?.displayName}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
              />
            </div>
          </div>

          {/* Session Title & Description */}
          <div>
            <label className="text-lg font-medium text-gray-700">Session Title</label>
            <input
              type="text"
              name="session_title"
              placeholder="Enter session title"
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="text-lg font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              rows="4"
              placeholder="Write a short description..."
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg"
            ></textarea>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-lg font-medium text-gray-700">Registration Start</label>
              <input
                type="date"
                name="start_date"
                required
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="text-lg font-medium text-gray-700">Registration End</label>
              <input
                type="date"
                name="end_date"
                required
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-lg font-medium text-gray-700">Class Start Date</label>
              <input
                type="date"
                name="class_start_date"
                required
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="text-lg font-medium text-gray-700">Class End Date</label>
              <input
                type="date"
                name="class_end_date"
                required
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          {/* Duration & Fee */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-lg font-medium text-gray-700">Duration (in hours)</label>
              <input
                type="text"
                name="duration"
                required
                placeholder="e.g., 20"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="text-lg font-medium text-gray-700">Registration Fee</label>
              <input
                type="number"
                name="fee"
                disabled
                defaultValue={0}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="text-lg font-medium text-gray-700">Status</label>
            <select
              name="status"
              defaultValue=""
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg bg-white"
            >
              <option value="" disabled>
                Choose a status
              </option>
              <option value="pending">Pending</option>
              <option value="approved" disabled>
                Approved (Requires Admin)
              </option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="text-right">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition duration-300"
            >
              Create Session
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
