import { useQuery } from "@tanstack/react-query";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";
import { LuSearchX } from "react-icons/lu";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const [searchResults, setSearchResults] = useState(null);

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const dataToDisplay = searchResults || users;

  const handleDeleteUser = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This user will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${user._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire("Deleted!", "User has been deleted.", "success");
          }
        });
      }
    });
  };

  const handleRoleChange = (user, role) => {
    axiosSecure.patch(`/users/${role}/${user._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name} is now a ${role}!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) {
      setError("Please enter a search query.");
      return;
    }

    setError("");
    try {
      const response = await axiosSecure.get(`/search?q=${query}`, {
        timeout: 8000,
      });

      if (response.data) {
        setSearchResults(response.data);
        setQuery("");
      }
    } catch (err) {
      setError("Error fetching data. Please try again.");
    }
  };

  const handleClearSearch = () => {
    setSearchResults(null);
    setQuery("");
    refetch();
  };

  return (
    <div className="px-4 py-10 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h2 className="text-4xl font-bold text-black">👥 All Users</h2>
        <h2 className="text-xl text-black mt-2 md:mt-0">
          Total Users: <span className="font-semibold">{dataToDisplay.length}</span>
        </h2>
      </div>

      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center gap-3 mb-6">
        <input
          type="text"
          placeholder="Search users by name or email"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full sm:w-80 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
        >
          Search
        </button>
        {searchResults && (
          <button
            type="button"
            onClick={handleClearSearch}
            className="flex items-center gap-1 text-red-500 hover:text-red-700"
          >
            <LuSearchX className="text-xl" />
            Clear
          </button>
        )}
      </form>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left">#</th>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Role</th>
              <th className="px-6 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {dataToDisplay.map((user, index) => (
              <tr key={user._id} className="border-b hover:bg-gray-50 transition">
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user, e.target.value)}
                    className="border px-2 py-1 rounded-md text-sm"
                  >
                    <option value="student">Student</option>
                    <option value="tutor">Tutor</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleDeleteUser(user)}
                    className="text-red-600 hover:text-red-800 transition text-lg"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
